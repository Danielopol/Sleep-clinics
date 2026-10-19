import { getSupabaseAdmin, isStoreConfigured } from "./supabase"
import type { ContactTime, InsuranceType, VisitReason } from "./lead-request-options"

/**
 * Persistence for appointment requests sent to lead partner clinics.
 *
 * Server only: this module reaches Supabase with the service role key.
 *
 * The form is shown for a clinic only when all of these hold, and the API
 * route checks the same thing before accepting a request:
 *   * Supabase is configured, so every request is recorded,
 *   * email can actually reach the clinic (RESEND_API_KEY and a verified
 *     EMAIL_FROM), except in development, where the email is logged instead,
 *   * the clinic has a lead_partners row with active = true.
 * Anything missing means no form at all: never a teaser, never a request that
 * goes nowhere.
 */

export interface LeadPartner {
  clinicSlug: string
  clinicName: string | null
  destinationEmails: string[]
  feeCents: number | null
}

export function isLeadEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM)
}

export function isLeadFormConfigured(): boolean {
  if (!isStoreConfigured()) return false
  if (isLeadEmailConfigured()) return true
  // Lets the whole flow run locally without a Resend key. The email is logged
  // and the request stays undelivered, so it is never billable.
  return process.env.NODE_ENV === "development"
}

// --- partner lookups (runs on every clinic page view, via the form's GET) ---

let partnerCache: { partners: Map<string, LeadPartner>; at: number } | null = null
const PARTNER_TTL_MS = 60_000

/**
 * Every active partner, cached for a minute. The table holds a few rows, so
 * one query covers every clinic page. Never throws: a database error means
 * "no partners", which hides the form rather than breaking the page.
 */
async function getActivePartners(): Promise<Map<string, LeadPartner>> {
  const now = Date.now()
  if (partnerCache && now - partnerCache.at < PARTNER_TTL_MS) return partnerCache.partners

  const empty = new Map<string, LeadPartner>()
  const supabase = getSupabaseAdmin()
  if (!supabase) return empty

  try {
    const { data, error } = await supabase
      .from("lead_partners")
      .select("clinic_slug, clinic_name, destination_emails, fee_cents")
      .eq("active", true)

    if (error) throw error

    const partners = new Map<string, LeadPartner>()
    for (const row of data ?? []) {
      const emails = ((row.destination_emails as string[] | null) ?? [])
        .map((e) => e.trim())
        .filter(Boolean)
      if (emails.length === 0) continue
      partners.set(row.clinic_slug as string, {
        clinicSlug: row.clinic_slug as string,
        clinicName: (row.clinic_name as string | null) ?? null,
        destinationEmails: emails,
        feeCents: (row.fee_cents as number | null) ?? null,
      })
    }

    partnerCache = { partners, at: now }
    return partners
  } catch (error) {
    console.error("getActivePartners failed:", error)
    // Cache the miss briefly so an outage does not cost a query per page view.
    partnerCache = { partners: empty, at: now }
    return empty
  }
}

/** The active partner for this clinic, or null when the form must not show. */
export async function getActiveLeadPartner(clinicSlug: string): Promise<LeadPartner | null> {
  if (!isLeadFormConfigured()) return null
  return (await getActivePartners()).get(clinicSlug) ?? null
}

// --- requests ---

export interface LeadRequestInput {
  clinicSlug: string
  clinicName: string
  patientName: string
  phone: string
  email: string | null
  insuranceType: InsuranceType
  reason: VisitReason
  note: string | null
  contactTime: ContactTime
  consentText: string
  billable: boolean
  feeCents: number | null
  ipHash: string | null
}

export async function saveLeadRequest(input: LeadRequestInput): Promise<string | null> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("lead_requests")
    .insert({
      clinic_slug: input.clinicSlug,
      clinic_name: input.clinicName,
      patient_name: input.patientName,
      phone: input.phone,
      email: input.email,
      insurance_type: input.insuranceType,
      reason: input.reason,
      note: input.note,
      contact_time: input.contactTime,
      consent_text: input.consentText,
      billable: input.billable,
      fee_cents: input.feeCents,
      status: "new",
      ip_hash: input.ipHash,
    })
    .select("id")
    .single()

  if (error || !data) {
    console.error("saveLeadRequest failed:", error)
    return null
  }
  return data.id as string
}

export async function recordLeadDelivery(
  id: string,
  result: { delivered: true; sentTo: string[] } | { delivered: false; sentTo: string[]; error: string | null }
): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  // No error and not delivered means no email provider (development only):
  // the row stays "new" so it can never be invoiced.
  const status = result.delivered ? "delivered" : result.error ? "delivery_failed" : "new"

  const { error } = await supabase
    .from("lead_requests")
    .update({
      status,
      sent_to: result.sentTo,
      delivered_at: result.delivered ? new Date().toISOString() : null,
      delivery_error: result.delivered ? null : result.error,
    })
    .eq("id", id)

  if (error) console.error("recordLeadDelivery failed:", error)
}

/**
 * Requests from this sender in the last day, for the durable half of the rate
 * limit. The in-memory limiter in the route only sees one server instance.
 * Null on error: the caller fails open rather than turning a patient away.
 */
export async function countRecentRequestsFromIp(ipHash: string, sinceMs: number): Promise<number | null> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { count, error } = await supabase
    .from("lead_requests")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", new Date(Date.now() - sinceMs).toISOString())

  if (error) {
    console.error("countRecentRequestsFromIp failed:", error)
    return null
  }
  return count ?? 0
}

/**
 * The id of a request with the same phone number to the same clinic in the
 * last day, if any. A double submit is one patient, so it is neither emailed
 * nor billed twice.
 */
export async function findRecentDuplicate(
  clinicSlug: string,
  phone: string,
  sinceMs: number
): Promise<string | null> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("lead_requests")
    .select("id")
    .eq("clinic_slug", clinicSlug)
    .eq("phone", phone)
    .neq("status", "void")
    .gte("created_at", new Date(Date.now() - sinceMs).toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error("findRecentDuplicate failed:", error)
    return null
  }
  return (data?.id as string | undefined) ?? null
}
