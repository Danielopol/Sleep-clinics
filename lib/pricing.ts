/**
 * Single source of truth for the listing plans.
 *
 * Prices live here, not in the Stripe dashboard, so the site copy and the
 * amount charged can never drift apart. Stripe Price IDs are optional: when the
 * matching env var is absent the checkout route builds the line item inline
 * from `amountCents` (`price_data`), so the plans work with nothing but a
 * Stripe secret key configured. Set the env vars later if you want the revenue
 * to roll up per Product in the Stripe dashboard.
 *
 * Pricing model (decided 2026-10-24, see us-sleep-clinics-pricing-decision.md):
 * being listed, claiming a listing, and correcting its facts are free. Money
 * buys presentation (Enhanced Profile) and placement (Featured), never the
 * listing itself and never a trust marker.
 */

/**
 * "claim-verified" is the Enhanced Profile. The id predates the rename and is
 * kept because it is stored in featured_listings.plan (with a check
 * constraint) and in the metadata of every live Stripe subscription.
 */
export type PlanId = "free-listing" | "claim-verified" | "featured-city"

export type BillingInterval = "free" | "month" | "year"

export interface PlanPrice {
  interval: BillingInterval
  amountCents: number
  /** Optional Stripe Price ID env var name. Overrides amountCents when set. */
  priceIdEnv?: string
  label: string
  /** Small print under the price, e.g. the annual equivalent of a monthly plan. */
  note?: string
}

export interface Plan {
  id: PlanId
  name: string
  tagline: string
  prices: PlanPrice[]
  features: string[]
  /** Shown as the primary button. */
  cta: string
  /** Where the button goes. */
  href: string
  highlight?: boolean
  footnote?: string
  /** Paid plans are Stripe subscriptions. The free listing never touches Stripe. */
  subscription: boolean
  /** No third-party ads on the clinic's own page while the plan is live. */
  adFreePage: boolean
  /** Puts the clinic at the top of its city results, labeled as advertising. */
  grantsFeaturedPlacement: boolean
}

/** Maximum number of featured slots sold per city. Scarcity is the product. */
export const FEATURED_SLOTS_PER_CITY = 3

/**
 * How many featured clinics a state's results promote at once. A state has
 * many cities, so when more than this many hold a slot they take turns.
 */
export const FEATURED_PER_STATE_PAGE = 6

/** The label on every featured card, everywhere it appears. FTC-facing. */
export const FEATURED_LABEL = "Featured · Ad"

/** Review and turnaround promises, quoted on the site and in emails. */
export const TURNAROUND = {
  /** A free submission for a clinic we have not listed yet. */
  freeSubmissionDays: 10,
  /** A new clinic added as part of any paid plan. */
  paidSubmissionDays: 2,
  /** Fact corrections from a free claim, once the identity check passes. */
  freeCorrectionDays: 5,
  /** Profile changes for Enhanced and Featured subscribers. */
  paidChangeDays: 1,
} as const

/** Clinic Group: one discount per location for practices with several. */
export const CLINIC_GROUP = {
  percentOff: 20,
  minLocations: 2,
  maxLocations: 9,
} as const

export const CONTACT_EMAIL = "contact@ussleepclinics.com"

export const CLINIC_GROUP_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Clinic Group pricing"
)}`

const days = (n: number) => `${n} business ${n === 1 ? "day" : "days"}`

export const PLANS: Plan[] = [
  {
    id: "free-listing",
    name: "Free Listing",
    tagline: "Every sleep clinic, listed and correctable at no cost.",
    prices: [{ interval: "free", amountCents: 0, label: "always free" }],
    features: [
      "Your page with name, address, phone, hours, website, services, and accreditation",
      `Not listed yet? Submit your clinic free, checked against public records within ${days(TURNAROUND.freeSubmissionDays)}`,
      "Claim your listing free, after a quick identity check",
      `Correct your facts free, applied within ${days(TURNAROUND.freeCorrectionDays)}`,
      '"Details confirmed by the clinic" on your page once you confirm them',
      "Free badge for your own website",
    ],
    cta: "Claim my listing free",
    href: "/claim",
    footnote: "No card needed. Staying free never changes how your clinic is listed or ranked.",
    subscription: false,
    adFreePage: false,
    grantsFeaturedPlacement: false,
  },
  {
    id: "claim-verified",
    name: "Enhanced Profile",
    tagline: "For a clinic that wants a fuller page patients can act on.",
    prices: [
      {
        interval: "year",
        amountCents: 14900,
        priceIdEnv: "STRIPE_PRICE_CLAIM_VERIFIED",
        label: "per year",
        note: "Renews yearly, cancel any time",
      },
    ],
    features: [
      "Everything in the Free Listing",
      "Up to 10 photos and a full description",
      "Structured services, equipment, and insurance: in-lab sleep study, home sleep test, titration, CPAP clinic, CBT-I, pediatric, telehealth",
      "Prominent Call and Visit website buttons",
      "No third-party ads on your clinic's page",
      `Changes applied within ${days(TURNAROUND.paidChangeDays)}`,
      "Monthly report: profile views, website clicks, and call clicks",
      `Not listed yet? We add your clinic within ${days(TURNAROUND.paidSubmissionDays)}`,
    ],
    cta: "Upgrade my listing",
    href: "/claim",
    footnote: "Does not change your ranking in search or city results.",
    subscription: true,
    adFreePage: true,
    grantsFeaturedPlacement: false,
  },
  {
    id: "featured-city",
    name: "Featured in Your City",
    tagline: "For a clinic that wants the top of its local results.",
    prices: [
      {
        interval: "year",
        amountCents: 34900,
        priceIdEnv: "STRIPE_PRICE_FEATURED_YEARLY",
        label: "per year",
        note: "Best value, about 9 months at the monthly rate",
      },
      {
        interval: "month",
        amountCents: 3900,
        priceIdEnv: "STRIPE_PRICE_FEATURED_MONTHLY",
        label: "per month",
        note: "Cancel any time",
      },
    ],
    features: [
      "Everything in Enhanced Profile",
      `Top of your city page, limited to ${FEATURED_SLOTS_PER_CITY} clinics per city, with a waitlist when full`,
      `Shown in your state's results, up to ${FEATURED_PER_STATE_PAGE} at a time, rotating`,
      `"${FEATURED_LABEL}" label everywhere your card appears`,
      'Never placed above closer clinics in "near me" results',
      "Monthly report: impressions, profile views, website clicks, and call clicks",
    ],
    cta: "Check my city",
    href: "/claim",
    highlight: true,
    footnote: "Featured placement is paid advertising and is labeled as such.",
    subscription: true,
    adFreePage: true,
    grantsFeaturedPlacement: true,
  },
]

/** The two recurring plans, which is what /claim sells. */
export const SUBSCRIPTION_PLAN_IDS = ["claim-verified", "featured-city"] as const
export type SubscriptionPlanId = (typeof SUBSCRIPTION_PLAN_IDS)[number]

export function isSubscriptionPlanId(value: string): value is SubscriptionPlanId {
  return (SUBSCRIPTION_PLAN_IDS as readonly string[]).includes(value)
}

export function getPlan(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id)
  if (!plan) throw new Error(`Unknown plan: ${id}`)
  return plan
}

export function getPlanPrice(id: PlanId, interval: BillingInterval): PlanPrice {
  const price = getPlan(id).prices.find((p) => p.interval === interval)
  if (!price) throw new Error(`Plan ${id} has no ${interval} price`)
  return price
}

/** "$349" or "$0", no trailing ".00" for whole-dollar amounts. */
export function formatPrice(amountCents: number): string {
  const dollars = amountCents / 100
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`
}
