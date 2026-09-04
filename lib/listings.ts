import { getSupabaseAdmin } from "./supabase"
import { FEATURED_SLOTS_PER_CITY } from "./pricing"

/**
 * Persistence for everything the paid listing flows need to remember.
 *
 * Every function degrades to a safe no-op when Supabase is not configured, so
 * a missing database never breaks a checkout or a page render. `stored: false`
 * in a result means the caller should fall back to the notification email as
 * the only record of the transaction.
 */

export interface SubmissionInput {
  clinicName: string
  address?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  specialty?: string
  website?: string
  description?: string
  contactEmail?: string
}

export interface SavedSubmission {
  id: string
  stored: boolean
}

/** A short, human-quotable reference for a submission, e.g. "SUB-8F3A2C". */
export function submissionRef(id: string): string {
  return `SUB-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`
}

export async function saveSubmission(input: SubmissionInput): Promise<SavedSubmission> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    // No database: mint a reference anyway so the notification email and the
    // Stripe session metadata point at the same thing.
    return { id: crypto.randomUUID(), stored: false }
  }

  const { data, error } = await supabase
    .from("clinic_submissions")
    .insert({
      // Every submission is a paid priority add: the free queue was removed.
      // The column keeps its check constraint so an old row still reads back.
      tier: "priority",
      status: "awaiting_payment",
      clinic_name: input.clinicName,
      address: input.address ?? null,
      city: input.city ?? null,
      state: input.state ?? null,
      zip: input.zip ?? null,
      phone: input.phone ?? null,
      specialty: input.specialty ?? null,
      website: input.website ?? null,
      description: input.description ?? null,
      contact_email: input.contactEmail ?? null,
    })
    .select("id")
    .single()

  if (error || !data) {
    console.error("saveSubmission failed:", error)
    return { id: crypto.randomUUID(), stored: false }
  }

  return { id: data.id as string, stored: true }
}

export async function markSubmissionPaid(params: {
  submissionId: string
  sessionId: string
  paymentIntentId?: string | null
  amountCents?: number | null
}): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  const { error } = await supabase
    .from("clinic_submissions")
    .update({
      status: "paid",
      stripe_session_id: params.sessionId,
      stripe_payment_intent_id: params.paymentIntentId ?? null,
      amount_cents: params.amountCents ?? null,
      paid_at: new Date().toISOString(),
    })
    .eq("id", params.submissionId)

  if (error) console.error("markSubmissionPaid failed:", error)
}

// --- featured placements ---

export interface FeaturedInput {
  clinicId: number
  clinicSlug?: string
  clinicName?: string
  citySlug: string
  stateSlug: string
  sessionId: string
  contactEmail?: string | null
}

/**
 * Placements that count against a city's slot cap: live ones, plus checkouts
 * opened in the last hour that have not completed yet. Holding the pending
 * slot stops two clinics from buying the last slot in the same minute.
 */
const PENDING_HOLD_MINUTES = 60

export async function countClaimedSlots(
  stateSlug: string,
  citySlug: string
): Promise<number | null> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const holdSince = new Date(Date.now() - PENDING_HOLD_MINUTES * 60_000).toISOString()

  const [live, pending] = await Promise.all([
    supabase
      .from("featured_listings")
      .select("id", { count: "exact", head: true })
      .eq("state_slug", stateSlug)
      .eq("city_slug", citySlug)
      .in("status", ["active", "past_due"]),
    supabase
      .from("featured_listings")
      .select("id", { count: "exact", head: true })
      .eq("state_slug", stateSlug)
      .eq("city_slug", citySlug)
      .eq("status", "pending")
      .gte("created_at", holdSince),
  ])

  if (live.error || pending.error) {
    console.error("countClaimedSlots failed:", live.error ?? pending.error)
    return null
  }

  return (live.count ?? 0) + (pending.count ?? 0)
}

export interface SlotAvailability {
  /** Null when the store is not configured and the count is unknown. */
  taken: number | null
  total: number
  soldOut: boolean
}

export async function getCitySlotAvailability(
  stateSlug: string,
  citySlug: string
): Promise<SlotAvailability> {
  const taken = await countClaimedSlots(stateSlug, citySlug)
  return {
    taken,
    total: FEATURED_SLOTS_PER_CITY,
    soldOut: taken != null && taken >= FEATURED_SLOTS_PER_CITY,
  }
}

/** Whether this exact clinic already holds a live or pending placement. */
export async function getFeaturedForClinic(clinicId: number) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("featured_listings")
    .select("id, status, current_period_end")
    .eq("clinic_id", clinicId)
    .maybeSingle()

  if (error) {
    console.error("getFeaturedForClinic failed:", error)
    return null
  }
  return data
}

/** Reserves the slot while the customer is in Stripe Checkout. */
export async function reserveFeaturedSlot(input: FeaturedInput): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  const { error } = await supabase.from("featured_listings").upsert(
    {
      clinic_id: input.clinicId,
      clinic_slug: input.clinicSlug ?? null,
      clinic_name: input.clinicName ?? null,
      city_slug: input.citySlug,
      state_slug: input.stateSlug,
      status: "pending",
      stripe_session_id: input.sessionId,
      contact_email: input.contactEmail ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "clinic_id" }
  )

  if (error) console.error("reserveFeaturedSlot failed:", error)
}

/**
 * Turns a paid subscription into a live placement.
 *
 * Upserts rather than updates: the reservation row is written before the
 * customer leaves for Stripe, and if that write failed (or Supabase was added
 * between the two steps) an update would match nothing and the clinic would
 * have paid for a placement that never appears.
 */
export async function activateFeatured(params: {
  clinicId: number
  clinicSlug?: string | null
  clinicName?: string | null
  citySlug: string
  stateSlug: string
  sessionId: string
  customerId?: string | null
  subscriptionId?: string | null
  contactEmail?: string | null
  currentPeriodEnd?: number | null
}): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  const { error } = await supabase.from("featured_listings").upsert(
    {
      clinic_id: params.clinicId,
      clinic_slug: params.clinicSlug ?? null,
      clinic_name: params.clinicName ?? null,
      city_slug: params.citySlug,
      state_slug: params.stateSlug,
      status: "active",
      stripe_session_id: params.sessionId,
      stripe_customer_id: params.customerId ?? null,
      stripe_subscription_id: params.subscriptionId ?? null,
      contact_email: params.contactEmail ?? null,
      current_period_end: params.currentPeriodEnd
        ? new Date(params.currentPeriodEnd * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "clinic_id" }
  )

  if (error) console.error("activateFeatured failed:", error)
  invalidateFeaturedCache()
}

export async function setFeaturedStatusBySubscription(
  subscriptionId: string,
  status: "active" | "past_due" | "canceled",
  currentPeriodEnd?: number | null
): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  const { error } = await supabase
    .from("featured_listings")
    .update({
      status,
      current_period_end: currentPeriodEnd
        ? new Date(currentPeriodEnd * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscriptionId)

  if (error) console.error("setFeaturedStatusBySubscription failed:", error)
  invalidateFeaturedCache()
}

/** The clinic and city a subscription belongs to, for revalidation and email. */
export async function getFeaturedBySubscription(subscriptionId: string) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("featured_listings")
    .select("clinic_id, clinic_slug, clinic_name, city_slug, state_slug, contact_email")
    .eq("stripe_subscription_id", subscriptionId)
    .maybeSingle()

  if (error) {
    console.error("getFeaturedBySubscription failed:", error)
    return null
  }
  return data
}

// --- featured reads (hot path: runs on every city page render) ---

let featuredCache: { ids: Set<number>; at: number } | null = null
const FEATURED_TTL_MS = 60_000

export function invalidateFeaturedCache(): void {
  featuredCache = null
}

/**
 * Clinic ids with a live featured placement.
 *
 * FEATURED_CLINIC_IDS (comma separated) is merged in on top of the database
 * result. It is there so placements can be run manually, or previewed, without
 * a Supabase project, and so the ordering can be tested locally.
 *
 * Never throws: a database hiccup degrades to "nobody is featured" rather than
 * taking down a city page.
 */
export async function getFeaturedClinicIds(): Promise<Set<number>> {
  const manual = (process.env.FEATURED_CLINIC_IDS ?? "")
    .split(",")
    .map((v) => Number(v.trim()))
    .filter((n) => Number.isFinite(n) && n > 0)

  const now = Date.now()
  if (featuredCache && now - featuredCache.at < FEATURED_TTL_MS) {
    return new Set([...featuredCache.ids, ...manual])
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    featuredCache = { ids: new Set(), at: now }
    return new Set(manual)
  }

  try {
    // past_due keeps the placement live through Stripe's retry window rather
    // than yanking a paying customer off the page over one failed card charge.
    const { data, error } = await supabase
      .from("featured_listings")
      .select("clinic_id")
      .in("status", ["active", "past_due"])

    if (error) throw error

    const ids = new Set<number>((data ?? []).map((row) => row.clinic_id as number))
    featuredCache = { ids, at: now }
    return new Set([...ids, ...manual])
  } catch (error) {
    console.error("getFeaturedClinicIds failed:", error)
    featuredCache = { ids: new Set(), at: now }
    return new Set(manual)
  }
}

// --- claim waitlist ---

export interface WaitlistInput {
  clinicId?: number | null
  clinicSlug?: string | null
  clinicName?: string | null
  contactName?: string | null
  contactEmail: string
  phone?: string | null
  notes?: string | null
}

export async function addToClaimWaitlist(input: WaitlistInput): Promise<boolean> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return false

  const { error } = await supabase.from("claim_waitlist").insert({
    clinic_id: input.clinicId ?? null,
    clinic_slug: input.clinicSlug ?? null,
    clinic_name: input.clinicName ?? null,
    contact_name: input.contactName ?? null,
    contact_email: input.contactEmail,
    phone: input.phone ?? null,
    notes: input.notes ?? null,
  })

  if (error) {
    console.error("addToClaimWaitlist failed:", error)
    return false
  }
  return true
}

// --- webhook idempotency ---

/**
 * Records a Stripe event id, returning false if it was already recorded.
 *
 * Stripe retries a webhook until it gets a 2xx and can deliver the same event
 * more than once, so every handler runs through here first. Without a database
 * this returns true every time: handlers stay idempotent on their own (the
 * writes are updates keyed by id), the only duplicate is a repeated email.
 */
export async function claimStripeEvent(id: string, type: string): Promise<boolean> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return true

  const { error } = await supabase.from("stripe_events").insert({ id, type })
  if (!error) return true

  // 23505 is unique_violation: this event has already been handled.
  if ((error as { code?: string }).code === "23505") return false

  console.error("claimStripeEvent failed:", error)
  return true // fail open: better a duplicate email than a dropped order
}

/**
 * Gives an event id back after a handler failed, so Stripe's retry is allowed
 * to run instead of being skipped as a duplicate.
 */
export async function releaseStripeEvent(id: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  const { error } = await supabase.from("stripe_events").delete().eq("id", id)
  if (error) console.error("releaseStripeEvent failed:", error)
}
