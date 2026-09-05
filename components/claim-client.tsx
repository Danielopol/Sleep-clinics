"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, Loader2, MapPin, Plus, Search, ShieldCheck, Star } from "lucide-react"
import {
  getPlan,
  getPlanPrice,
  formatPrice,
  FEATURED_SLOTS_PER_CITY,
  type SubscriptionPlanId,
} from "@/lib/pricing"

const CLAIM_PLAN = getPlan("claim-verified")
const FEATURED_PLAN = getPlan("featured-city")
const CLAIM_YEARLY = getPlanPrice("claim-verified", "year")
const FEATURED_YEARLY = getPlanPrice("featured-city", "year")
const FEATURED_MONTHLY = getPlanPrice("featured-city", "month")

interface ClinicResult {
  id: number
  name: string
  address: string
  city: string
  state: string
}

interface Availability {
  clinicId: number
  clinicName?: string
  city: string
  state: string
  cityUrl?: string
  eligible: boolean
  claimEligible?: boolean
  hasActivePlan?: boolean
  activePlan?: string | null
  taken: number | null
  total: number
  soldOut?: boolean
}

const EMPTY_NEW_CLINIC = {
  clinicName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  specialty: "",
  website: "",
  description: "",
}

const fieldClass =
  "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--healing-teal)]"

export function ClaimClient() {
  const searchParams = useSearchParams()

  // Which clinic the plan applies to: one already in the directory, or one we
  // are being asked to add as part of the purchase.
  const [mode, setMode] = useState<"existing" | "new">("existing")
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ClinicResult[] | null>(null)
  const [searching, setSearching] = useState(false)
  const [selected, setSelected] = useState<ClinicResult | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)
  const [newClinic, setNewClinic] = useState(EMPTY_NEW_CLINIC)
  const [contactEmail, setContactEmail] = useState("")

  const [interval, setInterval] = useState<"year" | "month">("year")
  const [busyPlan, setBusyPlan] = useState<SubscriptionPlanId | null>(null)
  const [error, setError] = useState<string | null>(
    searchParams.get("canceled") ? "Checkout was canceled, so you have not been charged." : null
  )
  const [showWaitlist, setShowWaitlist] = useState(false)

  const [waitlist, setWaitlist] = useState({ contactName: "", contactEmail: "", phone: "", notes: "" })
  const [waitlistState, setWaitlistState] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const loadAvailability = useCallback(async (clinicId: number) => {
    setAvailability(null)
    try {
      const response = await fetch(`/api/featured-availability?clinicId=${clinicId}`)
      if (response.ok) setAvailability(await response.json())
    } catch (err) {
      console.error("Availability lookup failed:", err)
    }
  }, [])

  // Deep link from a cancelled checkout, or from "claim this listing" on a page.
  useEffect(() => {
    const preselected = Number(searchParams.get("clinic"))
    if (Number.isFinite(preselected) && preselected > 0) {
      loadAvailability(preselected)
    }
  }, [searchParams, loadAvailability])

  const runSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim().length < 3) return
    setSearching(true)
    setResults(null)
    try {
      const response = await fetch(`/api/clinics?q=${encodeURIComponent(query.trim())}&limit=8`)
      const data = await response.json()
      setResults(data.clinics ?? [])
    } catch (err) {
      console.error("Search failed:", err)
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  const select = (clinic: ClinicResult) => {
    setSelected(clinic)
    setMode("existing")
    setError(null)
    setShowWaitlist(false)
    loadAvailability(clinic.id)
  }

  const newClinicReady =
    newClinic.clinicName.trim().length > 1 &&
    newClinic.address.trim().length > 2 &&
    newClinic.city.trim().length > 0 &&
    newClinic.state.trim().length > 1 &&
    newClinic.zip.trim().length > 2 &&
    newClinic.phone.trim().length > 6 &&
    newClinic.specialty.trim().length > 0

  const existingClinicId = mode === "existing" ? selected?.id ?? availability?.clinicId ?? null : null
  const clinicLabel =
    mode === "new"
      ? newClinic.clinicName.trim() || null
      : selected?.name ?? availability?.clinicName ?? null

  const ready = mode === "new" ? newClinicReady : existingClinicId != null

  const startCheckout = async (plan: SubscriptionPlanId) => {
    if (!ready) return
    setBusyPlan(plan)
    setError(null)
    setShowWaitlist(false)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: plan,
          interval: plan === "featured-city" ? interval : "year",
          ...(mode === "new"
            ? { newClinic }
            : { clinicId: existingClinicId }),
          ...(contactEmail ? { contactEmail } : {}),
        }),
      })
      const data = await response.json()
      if (!response.ok || !data.url) {
        setError(data.error || "We could not start checkout. Please try again.")
        if (data.soldOut) setShowWaitlist(true)
        return
      }
      window.location.href = data.url
    } catch (err) {
      console.error("Checkout failed:", err)
      setError("We could not start checkout. Please try again.")
    } finally {
      setBusyPlan(null)
    }
  }

  const submitWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    setWaitlistState("sending")
    try {
      const response = await fetch("/api/claim-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clinicId: existingClinicId, ...waitlist }),
      })
      setWaitlistState(response.ok ? "sent" : "error")
    } catch (err) {
      console.error("Waitlist failed:", err)
      setWaitlistState("error")
    }
  }

  const featuredPrice = interval === "year" ? FEATURED_YEARLY : FEATURED_MONTHLY
  const featuredBlocked = mode === "existing" && availability?.eligible === false
  const claimBlocked = mode === "existing" && availability?.claimEligible === false

  return (
    <>
      {/* Step 1: which clinic */}
      <section className="bg-[image:var(--bg-primary)] py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            1. Find your clinic
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Search by clinic name or city. We list over 6,000 sleep clinics, so yours is probably
            already here. If it is not, you can add it as part of any plan below.
          </p>

          <form onSubmit={runSearch} className="flex gap-3 mb-6">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Clinic name or city"
              aria-label="Clinic name or city"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--healing-teal)]"
            />
            <button
              type="submit"
              disabled={searching || query.trim().length < 3}
              className="px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </button>
          </form>

          {results && results.length === 0 && (
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              No match for that search.
            </p>
          )}

          {results && results.length > 0 && (
            <ul className="space-y-2 mb-6">
              {results.map((clinic) => (
                <li key={clinic.id}>
                  <button
                    type="button"
                    onClick={() => select(clinic)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      mode === "existing" && selected?.id === clinic.id
                        ? "border-[var(--healing-teal)] bg-[var(--healing-teal)]/5"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-900"
                    }`}
                  >
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{clinic.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {clinic.city}, {clinic.state}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Not listed yet: every plan covers adding the clinic. */}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "new" ? "existing" : "new")
              setError(null)
            }}
            aria-expanded={mode === "new"}
            className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
              mode === "new"
                ? "border-[var(--healing-teal)] bg-[var(--healing-teal)]/5"
                : "border-dashed border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
            }`}
          >
            <Plus className="w-5 h-5 text-[var(--healing-teal)] shrink-0" />
            <span>
              <span className="block font-semibold text-slate-900 dark:text-slate-100">
                My clinic is not listed yet
              </span>
              <span className="block text-sm text-slate-500 dark:text-slate-400">
                Every plan includes adding it, at no extra charge.
              </span>
            </span>
          </button>

          {mode === "new" && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className={`${fieldClass} sm:col-span-2`}
                placeholder="Clinic name *"
                aria-label="Clinic name"
                value={newClinic.clinicName}
                onChange={(e) => setNewClinic({ ...newClinic, clinicName: e.target.value })}
              />
              <input
                className={`${fieldClass} sm:col-span-2`}
                placeholder="Street address *"
                aria-label="Street address"
                value={newClinic.address}
                onChange={(e) => setNewClinic({ ...newClinic, address: e.target.value })}
              />
              <input
                className={fieldClass}
                placeholder="City *"
                aria-label="City"
                value={newClinic.city}
                onChange={(e) => setNewClinic({ ...newClinic, city: e.target.value })}
              />
              <input
                className={fieldClass}
                placeholder="State *"
                aria-label="State"
                value={newClinic.state}
                onChange={(e) => setNewClinic({ ...newClinic, state: e.target.value })}
              />
              <input
                className={fieldClass}
                placeholder="ZIP code *"
                aria-label="ZIP code"
                value={newClinic.zip}
                onChange={(e) => setNewClinic({ ...newClinic, zip: e.target.value })}
              />
              <input
                className={fieldClass}
                placeholder="Phone *"
                aria-label="Phone"
                value={newClinic.phone}
                onChange={(e) => setNewClinic({ ...newClinic, phone: e.target.value })}
              />
              <select
                className={fieldClass}
                aria-label="Specialty"
                value={newClinic.specialty}
                onChange={(e) => setNewClinic({ ...newClinic, specialty: e.target.value })}
              >
                <option value="">Specialty *</option>
                <option value="Sleep Medicine">Sleep Medicine</option>
                <option value="Pulmonology">Pulmonology</option>
                <option value="Neurology">Neurology</option>
                <option value="Psychiatry">Psychiatry</option>
              </select>
              <input
                className={fieldClass}
                placeholder="Website (optional)"
                aria-label="Website"
                value={newClinic.website}
                onChange={(e) => setNewClinic({ ...newClinic, website: e.target.value })}
              />
              <textarea
                className={`${fieldClass} sm:col-span-2`}
                rows={3}
                placeholder="Short description (optional)"
                aria-label="Description"
                value={newClinic.description}
                onChange={(e) => setNewClinic({ ...newClinic, description: e.target.value })}
              />
            </div>
          )}
        </div>
      </section>

      {/* Step 2: which plan */}
      <section className="bg-[image:var(--bg-primary)] pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            2. Choose your plan
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            {clinicLabel
              ? `For: ${clinicLabel}`
              : "Pick your clinic above, or add it, and these become available."}
          </p>

          <div className="mb-6 max-w-md">
            <input
              type="email"
              className={fieldClass}
              placeholder="Your email (optional, Stripe will ask anyway)"
              aria-label="Your email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="mb-6 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200 text-sm"
            >
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Claimed and Verified */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-lg bg-[var(--healing-teal)]/10 text-[var(--healing-teal)]">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {CLAIM_PLAN.name}
                </h3>
              </div>
              <p className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {formatPrice(CLAIM_YEARLY.amountCents)}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  {CLAIM_YEARLY.label}
                </span>
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {CLAIM_PLAN.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[var(--healing-teal)] mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => startCheckout("claim-verified")}
                disabled={!ready || busyPlan !== null || claimBlocked}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {busyPlan === "claim-verified" && <Loader2 className="w-4 h-4 animate-spin" />}
                {claimBlocked
                  ? "This clinic already has a plan"
                  : ready
                    ? `Claim it, ${formatPrice(CLAIM_YEARLY.amountCents)} ${CLAIM_YEARLY.label}`
                    : "Pick your clinic first"}
              </button>
            </div>

            {/* Featured */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-amber-400/70 ring-1 ring-amber-400/30 p-6 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <Star className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {FEATURED_PLAN.name}
                </h3>
              </div>

              <div className="flex gap-3 mb-4">
                {(["year", "month"] as const).map((option) => {
                  const optionPrice = option === "year" ? FEATURED_YEARLY : FEATURED_MONTHLY
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setInterval(option)}
                      aria-pressed={interval === option}
                      className={`flex-1 p-3 rounded-xl border-2 text-left transition-all ${
                        interval === option
                          ? "border-amber-400 bg-amber-50 dark:bg-amber-500/10"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {formatPrice(optionPrice.amountCents)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{optionPrice.label}</p>
                    </button>
                  )
                })}
              </div>

              <ul className="space-y-2 mb-4 flex-1">
                {FEATURED_PLAN.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[var(--healing-teal)] mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {mode === "existing" && availability && (
                <p className="mb-4 text-sm">
                  {availability.hasActivePlan ? (
                    <span className="text-amber-600 dark:text-amber-400">
                      This clinic already has an active plan.
                    </span>
                  ) : availability.soldOut ? (
                    <span className="text-amber-600 dark:text-amber-400">
                      All {availability.total} featured slots in {availability.city} are taken.
                    </span>
                  ) : availability.taken != null ? (
                    <span className="text-slate-600 dark:text-slate-300">
                      {availability.total - availability.taken} of {availability.total} slots open in{" "}
                      {availability.city}, {availability.state}.
                    </span>
                  ) : (
                    <span className="text-slate-600 dark:text-slate-300">
                      Up to {FEATURED_SLOTS_PER_CITY} clinics are featured per city.
                    </span>
                  )}
                </p>
              )}

              <button
                type="button"
                onClick={() => startCheckout("featured-city")}
                disabled={!ready || busyPlan !== null || featuredBlocked}
                className="w-full py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {busyPlan === "featured-city" && <Loader2 className="w-4 h-4 animate-spin" />}
                {featuredBlocked
                  ? "Not available for this clinic"
                  : ready
                    ? `Feature it, ${formatPrice(featuredPrice.amountCents)} ${featuredPrice.label}`
                    : "Pick your clinic first"}
              </button>

              <p className="text-xs text-slate-400 mt-3 text-center leading-relaxed">
                Featured placement is paid advertising and is labeled "Featured" on the site.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6 leading-relaxed">
            Payment is handled by Stripe, and you can cancel any time. The "Verified" badge is added
            once we confirm you represent the clinic, usually within 48 hours on business days, and
            we refund you in full if we cannot.
          </p>

          {/* Waitlist, only once a city turns out to be full */}
          {(showWaitlist || (mode === "existing" && availability?.soldOut)) && (
            <div className="mt-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                Join the waitlist for the next featured slot
              </h3>
              {waitlistState === "sent" ? (
                <p className="p-4 rounded-lg bg-green-50 text-green-800 border border-green-200 text-sm">
                  Thank you. We will email you when a slot opens in your city.
                </p>
              ) : (
                <form onSubmit={submitWaitlist} className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      aria-label="Your name"
                      value={waitlist.contactName}
                      onChange={(e) => setWaitlist({ ...waitlist, contactName: e.target.value })}
                      className={fieldClass}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work email *"
                      aria-label="Work email"
                      value={waitlist.contactEmail}
                      onChange={(e) => setWaitlist({ ...waitlist, contactEmail: e.target.value })}
                      className={fieldClass}
                    />
                  </div>
                  {waitlistState === "error" && (
                    <p role="alert" className="text-sm text-red-700">
                      Something went wrong. Please check your email address and try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={waitlistState === "sending"}
                    className="w-full py-3 px-4 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {waitlistState === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
                    Join the waitlist
                  </button>
                </form>
              )}
            </div>
          )}

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-8 text-center">
            Just want a one-time listing instead?{" "}
            <Link href="/submit" className="text-[var(--healing-teal)] hover:underline">
              Add your clinic for {formatPrice(getPlanPrice("priority-add", "one-time").amountCents)}
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
