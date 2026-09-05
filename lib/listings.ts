import { getSupabaseAdmin } from "./supabase"
import { FEATURED_SLOTS_PER_CITY, type SubscriptionPlanId } from "./pricing"

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

/**
 * A clinic that is not in the directory yet, bought as part of a subscription.
 * Held verbatim until the listing is created by hand and linked by clinic_id.
 */
export interface PendingClinic {
  clinicName: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  specialty: string
  website?: string
  description?: string
}

export interface SubscriptionInput {
  plan: SubscriptionPlanId
  /** Null when the clinic is not in the directory yet. */
  clinicId?: number | null
  clinicSlug?: string | null
  clinicName?: string | null
  /** Null for a new clinic outside any known city page. */
  citySlug?: string | null
  stateSlug?: string | null
  pendingClinic?: PendingClinic | null
  sessionId: string
  contactEmail?: string | null
}

/**
 * Placements that count against a city's slot cap: live ones, plus checkouts
 * opened in the last hour that have not completed yet. Holding the pending
 * slot stops two clinics from buying the last slot in the same minute.
 *
 * Only the featured plan consumes a slot. Claimed and Verified has no cap:
 * every clinic in a city can be verified, only three can be advertised.
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
      .eq("plan", "featured-city")
      .eq("state_slug", stateSlug)
      .eq("city_slug", citySlug)
      .in("status", ["active", "past_due"]),
    supabase
      .from("featured_listings")
      .select("id", { count: "exact", head: true })
      .eq("plan", "featured-city")
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

/** The subscription this clinic already holds, live or pending, if any. */
export async function getSubscriptionForClinic(clinicId: number) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("featured_listings")
    .select("id, plan, status, verified_at, current_period_end")
    .eq("clinic_id", clinicId)
    .maybeSingle()

  if (error) {
    console.error("getSubscriptionForClinic failed:", error)
    return null
  }
  return data
}

/**
 * Reserves the row while the customer is in Stripe Checkout.
 *
 * A new clinic has no clinic_id to conflict on, so each such checkout inserts
 * its own row. That is intended: the rows are pending until paid, and the
 * webhook only ever promotes the one whose session completed.
 */
export async function reserveSubscriptionSlot(input: SubscriptionInput): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  const row = {
    clinic_id: input.clinicId ?? null,
    clinic_slug: input.clinicSlug ?? null,
    clinic_name: input.clinicName ?? null,
    city_slug: input.citySlug ?? null,
    state_slug: input.stateSlug ?? null,
    plan: input.plan,
    status: "pending",
    pending_clinic: input.pendingClinic ?? null,
    stripe_session_id: input.sessionId,
    contact_email: input.contactEmail ?? null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const { error } =
    input.clinicId != null
      ? await supabase.from("featured_listings").upsert(row, { onConflict: "clinic_id" })
      : await supabase.from("featured_listings").insert(row)

  if (error) console.error("reserveSubscriptionSlot failed:", error)
}

/**
 * Turns a paid subscription live.
 *
 * Deliberately does not set verified_at: the Verified badge is an identity
 * claim and only a human sets it, via markVerified below. Featured placement,
 * which is advertising rather than a claim about anyone, goes live here.
 *
 * Upserts rather than updates when a clinic id is known: the reservation row is
 * written before the customer leaves for Stripe, and if that write failed (or
 * Supabase was added between the two steps) an update would match nothing and
 * the clinic would have paid for something that never appears.
 */
export async function activateSubscription(params: {
  plan: SubscriptionPlanId
  clinicId?: number | null
  clinicSlug?: string | null
  clinicName?: string | null
  citySlug?: string | null
  stateSlug?: string | null
  pendingClinic?: PendingClinic | null
  sessionId: string
  customerId?: string | null
  subscriptionId?: string | null
  contactEmail?: string | null
  currentPeriodEnd?: number | null
}): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  const row = {
    clinic_id: params.clinicId ?? null,
    clinic_slug: params.clinicSlug ?? null,
    clinic_name: params.clinicName ?? null,
    city_slug: params.citySlug ?? null,
    state_slug: params.stateSlug ?? null,
    plan: params.plan,
    status: "active",
    pending_clinic: params.pendingClinic ?? null,
    stripe_session_id: params.sessionId,
    stripe_customer_id: params.customerId ?? null,
    stripe_subscription_id: params.subscriptionId ?? null,
    contact_email: params.contactEmail ?? null,
    current_period_end: params.currentPeriodEnd
      ? new Date(params.currentPeriodEnd * 1000).toISOString()
      : null,
    updated_at: new Date().toISOString(),
  }

  // A new clinic has no id to upsert on, so promote the pending row by its
  // Stripe session instead. That row was written when checkout opened.
  const { error } =
    params.clinicId != null
      ? await supabase.from("featured_listings").upsert(row, { onConflict: "clinic_id" })
      : await supabase
          .from("featured_listings")
          .upsert(row, { onConflict: "stripe_session_id" })

  if (error) console.error("activateSubscription failed:", error)
  invalidateListingCaches()
}

export async function setSubscriptionStatus(
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

  if (error) console.error("setSubscriptionStatus failed:", error)
  invalidateListingCaches()
}

/**
 * Grants the Verified badge after a human has confirmed the buyer represents
 * the clinic. Nothing in the payment path calls this: run it by hand once the
 * check is done (see docs/PAID-LISTINGS.md).
 */
export async function markVerified(clinicId: number, verified = true): Promise<boolean> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return false

  const { error } = await supabase
    .from("featured_listings")
    .update({
      verified_at: verified ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("clinic_id", clinicId)

  if (error) {
    console.error("markVerified failed:", error)
    return false
  }
  invalidateListingCaches()
  return true
}

/** Links a paid subscription to the listing once it has been created by hand. */
export async function attachClinicToSubscription(params: {
  subscriptionRowId: string
  clinicId: number
  clinicSlug?: string | null
  citySlug: string
  stateSlug: string
}): Promise<boolean> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return false

  const { error } = await supabase
    .from("featured_listings")
    .update({
      clinic_id: params.clinicId,
      clinic_slug: params.clinicSlug ?? null,
      city_slug: params.citySlug,
      state_slug: params.stateSlug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.subscriptionRowId)

  if (error) {
    console.error("attachClinicToSubscription failed:", error)
    return false
  }
  invalidateListingCaches()
  return true
}

/** The clinic and city a subscription belongs to, for revalidation and email. */
export async function getSubscriptionByStripeId(subscriptionId: string) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("featured_listings")
    .select("clinic_id, clinic_slug, clinic_name, city_slug, state_slug, plan, contact_email")
    .eq("stripe_subscription_id", subscriptionId)
    .maybeSingle()

  if (error) {
    console.error("getSubscriptionByStripeId failed:", error)
    return null
  }
  return data
}

/** The row reserved when checkout opened, keyed by the Stripe session. */
export async function getSubscriptionByStripeSession(sessionId: string) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("featured_listings")
    .select("id, plan, pending_clinic, contact_email")
    .eq("stripe_session_id", sessionId)
    .maybeSingle()

  if (error) {
    console.error("getSubscriptionByStripeSession failed:", error)
    return null
  }
  return data
}

/** Paid subscriptions still waiting on a listing to be created by hand. */
export async function getUnlinkedSubscriptions() {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []

  const { data, error } = await supabase
    .from("featured_listings")
    .select("id, plan, pending_clinic, contact_email, created_at")
    .is("clinic_id", null)
    .in("status", ["active", "past_due"])
    .order("created_at", { ascending: true })

  if (error) {
    console.error("getUnlinkedSubscriptions failed:", error)
    return []
  }
  return data ?? []
}

// --- listing reads (hot path: runs on every city page render) ---

interface ListingFlags {
  featured: Set<number>
  verified: Set<number>
}

let listingCache: { flags: ListingFlags; at: number } | null = null
const LISTING_TTL_MS = 60_000

export function invalidateListingCaches(): void {
  listingCache = null
}

function manualIds(envValue: string | undefined): number[] {
  return (envValue ?? "")
    .split(",")
    .map((v) => Number(v.trim()))
    .filter((n) => Number.isFinite(n) && n > 0)
}

/**
 * One query for both badges, since every page that needs one needs the other.
 *
 * FEATURED_CLINIC_IDS and VERIFIED_CLINIC_IDS (comma separated) are merged on
 * top of the database result, so placements can be run manually, or previewed,
 * without a Supabase project.
 *
 * Never throws: a database hiccup degrades to "nobody is featured or verified"
 * rather than taking down a city page.
 */
async function getListingFlags(): Promise<ListingFlags> {
  const manualFeatured = manualIds(process.env.FEATURED_CLINIC_IDS)
  const manualVerified = manualIds(process.env.VERIFIED_CLINIC_IDS)

  const merge = (flags: ListingFlags): ListingFlags => ({
    featured: new Set([...flags.featured, ...manualFeatured]),
    verified: new Set([...flags.verified, ...manualVerified]),
  })

  const now = Date.now()
  if (listingCache && now - listingCache.at < LISTING_TTL_MS) {
    return merge(listingCache.flags)
  }

  const empty: ListingFlags = { featured: new Set(), verified: new Set() }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    listingCache = { flags: empty, at: now }
    return merge(empty)
  }

  try {
    // past_due keeps a placement live through Stripe's retry window rather than
    // yanking a paying customer off the page over one failed card charge.
    const { data, error } = await supabase
      .from("featured_listings")
      .select("clinic_id, plan, verified_at")
      .in("status", ["active", "past_due"])
      .not("clinic_id", "is", null)

    if (error) throw error

    const flags: ListingFlags = { featured: new Set(), verified: new Set() }
    for (const row of data ?? []) {
      const id = row.clinic_id as number
      if (row.plan === "featured-city") flags.featured.add(id)
      // Both plans carry the badge, but only once a human has signed off.
      if (row.verified_at) flags.verified.add(id)
    }

    listingCache = { flags, at: now }
    return merge(flags)
  } catch (error) {
    console.error("getListingFlags failed:", error)
    listingCache = { flags: empty, at: now }
    return merge(empty)
  }
}

/** Clinic ids with a live featured placement. */
export async function getFeaturedClinicIds(): Promise<Set<number>> {
  return (await getListingFlags()).featured
}

/** Clinic ids whose owner has been verified and holds a live subscription. */
export async function getVerifiedClinicIds(): Promise<Set<number>> {
  return (await getListingFlags()).verified
}

/** Both sets in one call, for pages that render both badges. */
export async function getListingBadges(): Promise<ListingFlags> {
  return getListingFlags()
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
