"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { CalendarCheck, CheckCircle, Loader2 } from "lucide-react"
import { trackEvent } from "@/lib/analytics"
import {
  CONTACT_TIME_OPTIONS,
  INSURANCE_OPTIONS,
  REASON_OPTIONS,
  consentText,
} from "@/lib/lead-request-options"

/**
 * "Request an appointment" for lead partner clinics.
 *
 * Renders nothing until /api/lead-request says this clinic is an active
 * partner, and nothing at all for every other clinic: no teaser, no fallback.
 * The check runs in the browser so switching a partner on or off takes effect
 * within a couple of minutes, without regenerating the prerendered page.
 *
 * Analytics never see what the patient typed. The only event is
 * lead_request_submitted with the clinic slug.
 */

interface LeadRequestFormProps {
  clinicSlug: string
  clinicName: string
  clinicPhone?: string
}

const fieldClass =
  "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--healing-teal)]"
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"

const EMPTY = {
  patientName: "",
  phone: "",
  email: "",
  insuranceType: "",
  reason: "",
  note: "",
  contactTime: "",
  consent: false,
  website: "",
}

export function LeadRequestForm({ clinicSlug, clinicName, clinicPhone }: LeadRequestFormProps) {
  const [enabled, setEnabled] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle")
  const [error, setError] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)
  const shownAt = useRef(0)
  const sectionRef = useRef<HTMLElement>(null)

  // The confirmation is much shorter than the form, so without this the
  // patient is left looking at whatever sits below it.
  useEffect(() => {
    if (state === "sent") sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [state])

  useEffect(() => {
    let cancelled = false
    fetch(`/api/lead-request?clinic=${encodeURIComponent(clinicSlug)}`)
      .then((response) => (response.ok ? response.json() : { enabled: false }))
      .then((data: { enabled?: boolean }) => {
        if (cancelled || !data.enabled) return
        shownAt.current = Date.now()
        setEnabled(true)
      })
      .catch(() => {
        // Any failure leaves the form hidden, which is the safe default.
      })
    return () => {
      cancelled = true
    }
  }, [clinicSlug])

  if (!enabled) return null

  const update = <K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setState("sending")
    try {
      const response = await fetch("/api/lead-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          clinicSlug,
          elapsedMs: Date.now() - shownAt.current,
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again, or call the clinic directly.")
        setState("idle")
        return
      }
      setReference(data.reference ?? null)
      setState("sent")
      trackEvent("lead_request_submitted", { clinic_slug: clinicSlug })
    } catch {
      setError("We could not reach our server. Please check your connection and try again.")
      setState("idle")
    }
  }

  const phone = clinicPhone?.split(";")[0].trim()

  return (
    <section
      ref={sectionRef}
      id="request-appointment"
      className="mt-8 p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"
    >
      {state === "sent" ? (
        <div className="text-center py-6" role="status">
          <CheckCircle className="w-12 h-12 mx-auto text-[var(--healing-teal)] mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Your request was sent
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
            {clinicName} has your details and will contact you directly to schedule. This is a
            request, not a confirmed appointment, so keep an eye on your phone
            {form.email ? " and email" : ""}.
          </p>
          {phone && (
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto mt-3">
              If you have not heard back within two business days, call them at{" "}
              <a href={`tel:${phone}`} className="font-semibold text-[var(--healing-teal)] hover:underline">
                {phone}
              </a>
              .
            </p>
          )}
          {reference && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Your reference: <span className="font-mono font-semibold">{reference}</span>
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3 mb-6">
            <CalendarCheck className="w-7 h-7 shrink-0 text-[var(--healing-teal)] mt-0.5" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Request an appointment
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Send your details to {clinicName} and their team will contact you to schedule.
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="lr-name" className={labelClass}>Your name</label>
                <input
                  id="lr-name"
                  required
                  minLength={2}
                  maxLength={120}
                  autoComplete="name"
                  value={form.patientName}
                  onChange={(e) => update("patientName", e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="lr-phone" className={labelClass}>Phone</label>
                <input
                  id="lr-phone"
                  type="tel"
                  required
                  maxLength={40}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="lr-email" className={labelClass}>
                  Email <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <input
                  id="lr-email"
                  type="email"
                  maxLength={200}
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="lr-time" className={labelClass}>Best time to reach you</label>
                <select
                  id="lr-time"
                  required
                  value={form.contactTime}
                  onChange={(e) => update("contactTime", e.target.value)}
                  className={fieldClass}
                >
                  <option value="" disabled>Choose one</option>
                  {CONTACT_TIME_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="lr-insurance" className={labelClass}>Insurance</label>
                <select
                  id="lr-insurance"
                  required
                  value={form.insuranceType}
                  onChange={(e) => update("insuranceType", e.target.value)}
                  className={fieldClass}
                >
                  <option value="" disabled>Choose one</option>
                  {INSURANCE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="lr-reason" className={labelClass}>Reason for visit</label>
                <select
                  id="lr-reason"
                  required
                  value={form.reason}
                  onChange={(e) => update("reason", e.target.value)}
                  className={fieldClass}
                >
                  <option value="" disabled>Choose one</option>
                  {REASON_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="lr-note" className={labelClass}>
                Anything else the clinic should know? <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <textarea
                id="lr-note"
                rows={3}
                maxLength={500}
                value={form.note}
                onChange={(e) => update("note", e.target.value)}
                className={fieldClass}
                placeholder="For example, a referral from your doctor or days that do not work for you. Please do not include detailed medical history."
              />
            </div>

            {/* Honeypot: hidden from people and from screen readers. */}
            <div aria-hidden="true" className="absolute -left-[10000px] w-px h-px overflow-hidden">
              <label htmlFor="lr-website">Website</label>
              <input
                id="lr-website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--healing-teal)]"
              />
              <span>{consentText(clinicName)}</span>
            </label>

            {error && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "sending"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--healing-teal)] hover:opacity-90 disabled:opacity-60 text-white font-semibold transition-opacity"
            >
              {state === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
              {state === "sending" ? "Sending..." : "Send request"}
            </button>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              This is a request to be contacted, not a booked appointment. For a medical emergency,
              call 911. US Sleep Clinics is paid by {clinicName} for some appointment requests, which
              does not change this listing or its rating. See our{" "}
              <Link href="/privacy-policy#appointment-requests" className="underline hover:text-slate-700 dark:hover:text-slate-200">
                privacy policy
              </Link>{" "}
              for how your request is handled.
            </p>
          </form>
        </>
      )}
    </section>
  )
}
