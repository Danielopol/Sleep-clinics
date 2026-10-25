import { getSupabaseAdmin } from "./supabase"
import { FEATURED_SLOTS_PER_CITY, type SubscriptionPlanId } from "./pricing"
import type { Clinic } from "./data"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { parseEnhancedProfile, type EnhancedProfile, type EnhancedProfileRow } from "./enhanced-profile"

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

/**
 * Records a free submission for a clinic we have not listed yet. Paid plans
 * carry a new clinic in `pending_clinic` on their subscription row instead.
 */
export async function saveSubmission(input: SubmissionInput): Promise<SavedSubmission> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    // No database: mint a reference anyway so the operator email and the
    // submitter's acknowledgement quote the same thing.
    return { id: crypto.randomUUID(), stored: false }
  }

  const { data, error } = await supabase
    .from("clinic_submissions")
    .insert({
      // 'priority' rows are the retired $99 add and still read back.
      tier: "free",
      status: "pending",
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

/**
 * Reads a submission back so the paid notification can carry the full details.
 * Returns null without a database, or when the row was never stored.
 */
export async function getSubmission(submissionId: string): Promise<SubmissionInput | null> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("clinic_submissions")
    .select("clinic_name, address, city, state, zip, phone, specialty, website, description, contact_email")
    .eq("id", submissionId)
    .maybeSingle()

  if (error) {
    console.error("getSubmission failed:", error)
    return null
  }
  if (!data) return null

  return {
    clinicName: data.clinic_name as string,
    address: data.address ?? undefined,
    city: data.city ?? undefined,
    state: data.state ?? undefined,
    zip: data.zip ?? undefined,
    phone: data.phone ?? undefined,
    specialty: data.specialty ?? undefined,
    website: data.website ?? undefined,
    description: data.description ?? undefined,
    contactEmail: data.contact_email ?? undefined,
  }
}

// --- featured placements ---

/**
 * A clinic that is not in the directory yet, bought as part of a subscription.
 * Held verbatim until the listing is created by hand and linked by clinic_slug.
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
  /** The key for everything paid. Null when the clinic is not in the directory yet. */
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
 * Only the featured plan consumes a slot. Enhanced Profile has no cap: every
 * clinic in a city can have a full page, only three can be advertised.
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
export async function getSubscriptionForClinic(clinicSlug: string) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("featured_listings")
    .select("id, plan, status, verified_at, current_period_end")
    .eq("clinic_slug", clinicSlug)
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
 * A new clinic has no clinic_slug to conflict on, so each such checkout inserts
 * its own row. That is intended: the rows are pending until paid, and the
 * webhook only ever promotes the one whose session completed.
 */
export async function reserveSubscriptionSlot(input: SubscriptionInput): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  const row = {
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
    input.clinicSlug != null
      ? await supabase.from("featured_listings").upsert(row, { onConflict: "clinic_slug" })
      : await supabase.from("featured_listings").insert(row)

  if (error) console.error("reserveSubscriptionSlot failed:", error)
}

/**
 * Turns a paid subscription live.
 *
 * Grants no trust marker. "Details confirmed by the clinic" is free, set by a
 * human after an identity check (see clinic_claims below), and never sold.
 * Featured placement, which is advertising rather than a claim about anyone,
 * goes live here.
 *
 * Upserts rather than updates when the clinic is known: the reservation row is
 * written before the customer leaves for Stripe, and if that write failed (or
 * Supabase was added between the two steps) an update would match nothing and
 * the clinic would have paid for something that never appears.
 */
export async function activateSubscription(params: {
  plan: SubscriptionPlanId
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

  // A new clinic has no slug to upsert on, so promote the pending row by its
  // Stripe session instead. That row was written when checkout opened.
  const { error } =
    params.clinicSlug != null
      ? await supabase.from("featured_listings").upsert(row, { onConflict: "clinic_slug" })
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

/** Links a paid subscription to the listing once it has been created by hand. */
export async function attachClinicToSubscription(params: {
  subscriptionRowId: string
  clinicSlug: string
  citySlug: string
  stateSlug: string
}): Promise<boolean> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return false

  const { error } = await supabase
    .from("featured_listings")
    .update({
      clinic_slug: params.clinicSlug,
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
    .select("clinic_slug, clinic_name, city_slug, state_slug, plan, contact_email")
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
    .is("clinic_slug", null)
    .in("status", ["active", "past_due"])
    .order("created_at", { ascending: true })

  if (error) {
    console.error("getUnlinkedSubscriptions failed:", error)
    return []
  }
  return data ?? []
}

// --- listing reads (hot path: runs on every city page render) ---

/**
 * Clinic slugs, never `clinic.id`: the id is the clinic's row position in the
 * Excel file and shifts on every data update, which would move a paid badge
 * onto a different clinic.
 */
export interface ListingFlags {
  /** Live featured placement (paid advertising). */
  featured: Set<string>
  /**
   * "Details confirmed by the clinic", free and human-granted. The value is
   * the ISO date it was confirmed, or null when only an env override says so.
   */
  confirmed: Map<string, string | null>
  /** Any live paid plan. These clinic pages carry no third-party ads. */
  paid: Set<string>
}

let listingCache: { flags: ListingFlags; at: number } | null = null
const LISTING_TTL_MS = 60_000

export function invalidateListingCaches(): void {
  listingCache = null
}

function manualSlugs(envValue: string | undefined): string[] {
  return (envValue ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean)
}

// The id-based overrides these replaced would now point at whatever clinic
// happens to sit on that row, so they are ignored rather than honored.
for (const legacy of ["FEATURED_CLINIC_IDS", "VERIFIED_CLINIC_IDS"]) {
  if (process.env[legacy]) {
    console.warn(`${legacy} is no longer read: list clinic slugs in ${legacy.replace("_IDS", "_SLUGS")} instead.`)
  }
}

/**
 * CONFIRMED_CLINIC_SLUGS entries are "slug" or "slug:YYYY-MM-DD". The older
 * VERIFIED_CLINIC_SLUGS is still read so an existing deploy keeps its markers.
 */
function manualConfirmed(): Map<string, string | null> {
  const entries = [
    ...manualSlugs(process.env.VERIFIED_CLINIC_SLUGS),
    ...manualSlugs(process.env.CONFIRMED_CLINIC_SLUGS),
  ]
  const confirmed = new Map<string, string | null>()
  for (const entry of entries) {
    const [slug, date] = entry.split(":")
    confirmed.set(slug, date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null)
  }
  return confirmed
}

/** Keeps the most recent confirmation date when a clinic has several. */
function addConfirmed(map: Map<string, string | null>, slug: string, at: string | null) {
  const existing = map.get(slug)
  if (existing === undefined || (at && (!existing || at > existing))) map.set(slug, at)
}

/**
 * One read for every listing flag, since every page that needs one needs the
 * others.
 *
 * FEATURED_CLINIC_SLUGS and CONFIRMED_CLINIC_SLUGS (comma separated) are merged
 * on top of the database result, so placements can be run manually, or
 * previewed, without a Supabase project.
 *
 * Never throws: a database hiccup degrades to "nobody is featured or confirmed"
 * rather than taking down a city page.
 */
async function getListingFlags(): Promise<ListingFlags> {
  const manualFeatured = manualSlugs(process.env.FEATURED_CLINIC_SLUGS)

  const merge = (flags: ListingFlags): ListingFlags => {
    const confirmed = new Map(flags.confirmed)
    for (const [slug, at] of manualConfirmed()) addConfirmed(confirmed, slug, at)
    return {
      featured: new Set([...flags.featured, ...manualFeatured]),
      confirmed,
      // A comped featured placement is a paid placement for ad purposes too.
      paid: new Set([...flags.paid, ...manualFeatured]),
    }
  }

  const now = Date.now()
  if (listingCache && now - listingCache.at < LISTING_TTL_MS) {
    return merge(listingCache.flags)
  }

  const empty: ListingFlags = { featured: new Set(), confirmed: new Map(), paid: new Set() }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    listingCache = { flags: empty, at: now }
    return merge(empty)
  }

  try {
    // past_due keeps a placement live through Stripe's retry window rather than
    // yanking a paying customer off the page over one failed card charge.
    const [subscriptions, claims] = await Promise.all([
      supabase
        .from("featured_listings")
        .select("clinic_slug, plan, verified_at")
        .in("status", ["active", "past_due"])
        .not("clinic_slug", "is", null),
      supabase
        .from("clinic_claims")
        .select("clinic_slug, confirmed_at")
        .not("confirmed_at", "is", null),
    ])

    if (subscriptions.error) throw subscriptions.error

    const flags: ListingFlags = { featured: new Set(), confirmed: new Map(), paid: new Set() }
    for (const row of subscriptions.data ?? []) {
      const slug = row.clinic_slug as string
      flags.paid.add(slug)
      if (row.plan === "featured-city") flags.featured.add(slug)
      // verified_at is the old paid "Verified" check. It was the same identity
      // check a free claim gets now, so it carries over as a confirmation.
      if (row.verified_at) addConfirmed(flags.confirmed, slug, row.verified_at as string)
    }

    // A missing clinic_claims table (migration 005 not run yet) must not hide
    // the paid flags above, so its error is logged rather than thrown.
    if (claims.error) {
      console.error("getListingFlags could not read clinic_claims:", claims.error)
    } else {
      for (const row of claims.data ?? []) {
        addConfirmed(flags.confirmed, row.clinic_slug as string, row.confirmed_at as string)
      }
    }

    listingCache = { flags, at: now }
    return merge(flags)
  } catch (error) {
    console.error("getListingFlags failed:", error)
    listingCache = { flags: empty, at: now }
    return merge(empty)
  }
}

/** Clinic slugs with a live featured placement. */
export async function getFeaturedClinicSlugs(): Promise<Set<string>> {
  return (await getListingFlags()).featured
}

/** Every flag in one call, for pages that render more than one. */
export async function getListingBadges(): Promise<ListingFlags> {
  return getListingFlags()
}

/**
 * Attaches the request-time listing flags to a clinic from the static data.
 *
 * `featured: false` in options leaves the featured flag off, for result sets
 * where placement does not apply (the national list, "near me"); `paid` is
 * still attached there so the card's impressions are counted.
 */
export function withListingBadges<C extends Clinic>(
  clinic: C,
  badges: ListingFlags,
  options: { featured?: boolean } = {}
): C {
  if (!clinic.slug) return clinic
  const featured = options.featured !== false && badges.featured.has(clinic.slug)
  const confirmed = badges.confirmed.has(clinic.slug)
  const paid = badges.paid.has(clinic.slug)
  if (!featured && !confirmed && !paid) return clinic
  const confirmedAt = badges.confirmed.get(clinic.slug)
  return {
    ...clinic,
    ...(featured && { featured }),
    ...(confirmed && { confirmed, ...(confirmedAt && { confirmedAt }) }),
    ...(paid && { paid }),
  }
}

/**
 * Picks which featured clinics a state's results promote today, at most `max`.
 *
 * A state can hold far more featured clinics than it can show at the top, so
 * they take turns: the list is put in a stable order (by slug) and the window
 * advances by `max` each UTC day, which gives every placement the same share
 * of days over time.
 */
export function rotateFeatured<T>(
  items: T[],
  max: number,
  key: (item: T) => string,
  now: Date = new Date()
): T[] {
  if (items.length <= max) return items
  const ordered = [...items].sort((a, b) => key(a).localeCompare(key(b)))
  const day = Math.floor(now.getTime() / 86_400_000)
  const start = (day * max) % ordered.length
  return Array.from({ length: max }, (_, i) => ordered[(start + i) % ordered.length])
}

// --- enhanced profiles ---

const enhancedCache = new Map<string, { row: EnhancedProfileRow | null; at: number }>()

/**
 * Development only, with no Supabase configured: rows from
 * data/enhanced-profiles.preview.json (an array of enhanced_profiles rows), so
 * the layout can be previewed locally. data/ is gitignored and production
 * never reads it.
 */
function previewEnhancedRow(clinicSlug: string): EnhancedProfileRow | null {
  if (process.env.NODE_ENV === "production") return null
  try {
    const file = join(process.cwd(), "data", "enhanced-profiles.preview.json")
    if (!existsSync(file)) return null
    const rows = JSON.parse(readFileSync(file, "utf8")) as EnhancedProfileRow[]
    return rows.find((r) => r.clinic_slug === clinicSlug) ?? null
  } catch (error) {
    console.error("Could not read enhanced-profiles.preview.json:", error)
    return null
  }
}

/**
 * The Enhanced Profile content for a clinic, or null. Callers must check that
 * the clinic holds a live paid plan first (ListingFlags.paid): the row is kept
 * after a plan ends, and must stop rendering when it does.
 *
 * Cached per clinic for the same 60 seconds as the listing flags. Never throws:
 * a database error renders the plain listing.
 */
export async function getEnhancedProfile(
  clinicSlug: string,
  clinicName: string
): Promise<EnhancedProfile | null> {
  const now = Date.now()
  const cached = enhancedCache.get(clinicSlug)
  if (cached && now - cached.at < LISTING_TTL_MS) {
    return cached.row ? parseEnhancedProfile(cached.row, clinicName) : null
  }

  let row: EnhancedProfileRow | null = null
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    row = previewEnhancedRow(clinicSlug)
  } else {
    const { data, error } = await supabase
      .from("enhanced_profiles")
      .select(
        "clinic_slug, description, photos, services, equipment, insurance, insurance_note, call_phone, website_url, updated_at"
      )
      .eq("clinic_slug", clinicSlug)
      .maybeSingle()
    // A missing table (migration 006 not run) lands here too: log, render plainly.
    if (error) console.error("getEnhancedProfile failed:", error)
    row = (data as EnhancedProfileRow | null) ?? null
  }

  enhancedCache.set(clinicSlug, { row, at: now })
  if (enhancedCache.size > 2_000) enhancedCache.clear()
  return row ? parseEnhancedProfile(row, clinicName) : null
}

// --- free claims ---

export interface ClaimInput {
  clinicSlug: string
  clinicName: string
  contactName: string
  contactRole?: string | null
  contactEmail: string
  phone?: string | null
  corrections?: string | null
  /** True when the email is at the clinic's own website domain. A hint, not a check. */
  emailDomainMatches: boolean
}

/**
 * Records a free claim. Nothing is granted here: a human checks the claimant's
 * identity (an email at the clinic's own domain, or a call to its listed
 * number), applies the corrections, and only then sets confirmed_at, which is
 * what shows "Details confirmed by the clinic" on the page.
 */
export async function saveClaim(input: ClaimInput): Promise<SavedSubmission> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return { id: crypto.randomUUID(), stored: false }

  const { data, error } = await supabase
    .from("clinic_claims")
    .insert({
      clinic_slug: input.clinicSlug,
      clinic_name: input.clinicName,
      contact_name: input.contactName,
      contact_role: input.contactRole ?? null,
      contact_email: input.contactEmail,
      phone: input.phone ?? null,
      corrections: input.corrections ?? null,
      email_domain_matches: input.emailDomainMatches,
    })
    .select("id")
    .single()

  if (error || !data) {
    console.error("saveClaim failed:", error)
    return { id: crypto.randomUUID(), stored: false }
  }

  return { id: data.id as string, stored: true }
}

/** A short, human-quotable reference for a claim, e.g. "CLM-8F3A2C". */
export function claimRef(id: string): string {
  return `CLM-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`
}

// --- claim waitlist ---

export interface WaitlistInput {
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
