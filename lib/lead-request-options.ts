/**
 * The choices on the appointment request form, shared by the form and the API
 * route so the two can never disagree. Client safe: no server imports here.
 *
 * The values are stored in lead_requests and checked by constraints in
 * supabase/migrations/004_lead_requests.sql. Adding a value means adding it
 * there too.
 */

export const INSURANCE_OPTIONS = [
  { value: "commercial", label: "Commercial or private insurance" },
  { value: "medicare", label: "Medicare" },
  { value: "medicaid", label: "Medicaid" },
  { value: "tricare_va", label: "Tricare or VA" },
  { value: "self_pay", label: "Self-pay (no insurance)" },
  { value: "unsure", label: "Not sure" },
] as const

export const REASON_OPTIONS = [
  { value: "sleep_apnea", label: "Snoring or sleep apnea" },
  { value: "sleep_study", label: "Sleep study (testing)" },
  { value: "insomnia", label: "Trouble falling or staying asleep" },
  { value: "cpap", label: "CPAP or equipment help" },
  { value: "daytime_sleepiness", label: "Daytime sleepiness" },
  { value: "other", label: "Something else" },
] as const

export const CONTACT_TIME_OPTIONS = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Early evening" },
  { value: "any", label: "Any time" },
] as const

export type InsuranceType = (typeof INSURANCE_OPTIONS)[number]["value"]
export type VisitReason = (typeof REASON_OPTIONS)[number]["value"]
export type ContactTime = (typeof CONTACT_TIME_OPTIONS)[number]["value"]

/**
 * Requests from these patients are never billed to the clinic. Charging a
 * provider for referring a patient whose care a federal program pays for is
 * what the Anti-Kickback Statute targets, so the line is drawn in code and,
 * again, by a check constraint in the database.
 */
export const NON_BILLABLE_INSURANCE: ReadonlySet<InsuranceType> = new Set([
  "medicare",
  "medicaid",
  "tricare_va",
])

export function labelFor(
  options: ReadonlyArray<{ value: string; label: string }>,
  value: string
): string {
  return options.find((o) => o.value === value)?.label ?? value
}

/** The sentence the patient agrees to, stored verbatim with the request. */
export function consentText(clinicName: string): string {
  return `I agree US Sleep Clinics may share this request with ${clinicName}.`
}

/** A short, quotable reference for a request, e.g. "REQ-8F3A2C". */
export function leadRequestRef(id: string): string {
  return `REQ-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`
}
