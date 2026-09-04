"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, Loader2, MapPin, Search, ShieldCheck, Star } from "lucide-react"
import { getPlan, getPlanPrice, formatPrice, FEATURED_SLOTS_PER_CITY } from "@/lib/pricing"

const FEATURED_PLAN = getPlan("featured-city")
const CLAIM_PLAN = getPlan("claim-verified")
const YEARLY = getPlanPrice("featured-city", "year")
const MONTHLY = getPlanPrice("featured-city", "month")

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
  alreadyFeatured?: boolean
  reason?: string
  taken: number | null
  total: number
  soldOut?: boolean
}

export function ClaimClient() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ClinicResult[] | null>(null)
  const [searching, setSearching] = useState(false)
  const [selected, setSelected] = useState<ClinicResult | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)
  const [interval, setInterval] = useState<"year" | "month">("year")
  const [checkoutError, setCheckoutError] = useState<string | null>(
    searchParams.get("canceled")
      ? "Checkout was canceled, so you have not been charged."
      : null
  )
  const [busy, setBusy] = useState(false)

  // Waitlist form
  const [waitlist, setWaitlist] = useState({ contactName: "", contactEmail: "", phone: "", notes: "" })
  const [waitlistState, setWaitlistState] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const loadAvailability = useCallback(async (clinicId: number) => {
    setAvailability(null)
    try {
      const response = await fetch(`/api/featured-availability?clinicId=${clinicId}`)
      if (response.ok) setAvailability(await response.json())
    } catch (error) {
      console.error("Availability lookup failed:", error)
    }
  }, [])

  // Deep link from a cancelled checkout, or from a "claim this listing" link.
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
    } catch (error) {
      console.error("Search failed:", error)
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  const select = (clinic: ClinicResult) => {
    setSelected(clinic)
    setCheckoutError(null)
    loadAvailability(clinic.id)
  }

  const startFeaturedCheckout = async () => {
    const clinicId = selected?.id ?? availability?.clinicId
    if (!clinicId) return
    setBusy(true)
    setCheckoutError(null)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "featured-city", clinicId, interval }),
      })
      const data = await response.json()
      if (!response.ok || !data.url) {
        setCheckoutError(data.error || "We could not start checkout. Please try again.")
        return
      }
      window.location.href = data.url
    } catch (error) {
      console.error("Checkout failed:", error)
      setCheckoutError("We could not start checkout. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  const submitWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    setWaitlistState("sending")
    try {
      const response = await fetch("/api/claim-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicId: selected?.id ?? availability?.clinicId ?? null,
          ...waitlist,
        }),
      })
      setWaitlistState(response.ok ? "sent" : "error")
    } catch (error) {
      console.error("Waitlist failed:", error)
      setWaitlistState("error")
    }
  }

  const clinicLabel = selected?.name ?? availability?.clinicName
  const price = interval === "year" ? YEARLY : MONTHLY

  return (
    <>
      {/* Step 1: find the listing */}
      <section className="bg-[image:var(--bg-primary)] py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            1. Find your clinic
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Search the directory by clinic name or city. We list over 6,000 sleep clinics, so yours
            is probably already here.
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
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No match. If your clinic is not in the directory yet,{" "}
              <Link href="/submit" className="text-[var(--healing-teal)] hover:underline">
                add it here
              </Link>
              .
            </p>
          )}

          {results && results.length > 0 && (
            <ul className="space-y-2">
              {results.map((clinic) => (
                <li key={clinic.id}>
                  <button
                    type="button"
                    onClick={() => select(clinic)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selected?.id === clinic.id
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
        </div>
      </section>

      {/* Step 2: the two plans */}
      <section className="bg-[image:var(--bg-primary)] pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            2. Choose what you want
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            {clinicLabel
              ? `Selected: ${clinicLabel}`
              : "Select your clinic above first, or join the verified waitlist below."}
          </p>

          {/* Featured */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-amber-400/70 ring-1 ring-amber-400/30 p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                <Star className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {FEATURED_PLAN.name}
              </h3>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{FEATURED_PLAN.tagline}</p>

            <ul className="space-y-2 mb-5">
              {FEATURED_PLAN.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--healing-teal)] mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Billing interval */}
            <div className="flex gap-3 mb-5">
              {(["year", "month"] as const).map((option) => {
                const optionPrice = option === "year" ? YEARLY : MONTHLY
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setInterval(option)}
                    aria-pressed={interval === option}
                    className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                      interval === option
                        ? "border-amber-400 bg-amber-50 dark:bg-amber-500/10"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {formatPrice(optionPrice.amountCents)}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{optionPrice.label}</p>
                    {optionPrice.note && (
                      <p className="text-xs text-slate-400 mt-1">{optionPrice.note}</p>
                    )}
                  </button>
                )
              })}
            </div>

            {availability && (
              <div className="mb-5 text-sm">
                {availability.alreadyFeatured ? (
                  <p className="text-amber-600 dark:text-amber-400">
                    This clinic already has a featured placement.
                  </p>
                ) : availability.soldOut ? (
                  <p className="text-amber-600 dark:text-amber-400">
                    All {availability.total} featured slots in {availability.city} are taken. Join the
                    waitlist below and we will contact you when one opens.
                  </p>
                ) : availability.taken != null ? (
                  <p className="text-slate-600 dark:text-slate-300">
                    {availability.total - availability.taken} of {availability.total} featured slots
                    are still open in {availability.city}, {availability.state}.
                  </p>
                ) : (
                  <p className="text-slate-600 dark:text-slate-300">
                    Up to {FEATURED_SLOTS_PER_CITY} clinics are featured per city.
                  </p>
                )}
              </div>
            )}

            {checkoutError && (
              <p role="alert" className="mb-4 p-3 rounded-lg bg-red-50 text-red-800 border border-red-200 text-sm">
                {checkoutError}
              </p>
            )}

            <button
              type="button"
              onClick={startFeaturedCheckout}
              disabled={busy || !clinicLabel || availability?.eligible === false}
              className="w-full py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {clinicLabel
                ? `Feature ${clinicLabel.length > 28 ? "my clinic" : clinicLabel}, ${formatPrice(price.amountCents)} ${price.label}`
                : "Select your clinic first"}
            </button>

            <p className="text-xs text-slate-400 mt-3 text-center leading-relaxed">
              Featured placement is paid advertising and is labeled "Featured" on the site. Payment is
              handled by Stripe. Cancel any time.
            </p>
          </div>

          {/* Claimed and verified: waitlist */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 rounded-lg bg-[var(--healing-teal)]/10 text-[var(--healing-teal)]">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{CLAIM_PLAN.name}</h3>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Edit access and a verified badge, {formatPrice(getPlanPrice("claim-verified", "year").amountCents)} per
              year. This is opening soon. Tell us who you are and we will verify your clinic and set
              you up first, with no obligation.
            </p>

            {waitlistState === "sent" ? (
              <p className="p-4 rounded-lg bg-green-50 text-green-800 border border-green-200 text-sm">
                Thank you. We will email you to verify your clinic. Verification uses an email address
                at your clinic's own domain, so please write from your work address if you can.
              </p>
            ) : (
              <form onSubmit={submitWaitlist} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    aria-label="Your name"
                    value={waitlist.contactName}
                    onChange={(e) => setWaitlist({ ...waitlist, contactName: e.target.value })}
                    className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--healing-teal)]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work email *"
                    aria-label="Work email"
                    value={waitlist.contactEmail}
                    onChange={(e) => setWaitlist({ ...waitlist, contactEmail: e.target.value })}
                    className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--healing-teal)]"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  aria-label="Phone"
                  value={waitlist.phone}
                  onChange={(e) => setWaitlist({ ...waitlist, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--healing-teal)]"
                />
                <textarea
                  rows={3}
                  placeholder="Anything that needs correcting on your listing?"
                  aria-label="Notes"
                  value={waitlist.notes}
                  onChange={(e) => setWaitlist({ ...waitlist, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--healing-teal)]"
                />
                {waitlistState === "error" && (
                  <p role="alert" className="text-sm text-red-700">
                    Something went wrong. Please check your email address and try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={waitlistState === "sending"}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {waitlistState === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
                  Join the verified waitlist
                </button>
              </form>
            )}
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-8 text-center">
            Comparing options?{" "}
            <Link href="/pricing" className="text-[var(--healing-teal)] hover:underline">
              See all plans
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
