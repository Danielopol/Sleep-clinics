/**
 * Single source of truth for the paid listing plans.
 *
 * Prices live here, not in the Stripe dashboard, so the site copy and the
 * amount charged can never drift apart. Stripe Price IDs are optional: when the
 * matching env var is absent the checkout route builds the line item inline
 * from `amountCents` (`price_data`), so the plans work with nothing but a
 * Stripe secret key configured. Set the env vars later if you want the revenue
 * to roll up per Product in the Stripe dashboard.
 */

export type PlanId = "priority-add" | "claim-verified" | "featured-city"

export type BillingInterval = "one-time" | "month" | "year"

export interface PlanPrice {
  interval: BillingInterval
  amountCents: number
  /** Optional Stripe Price ID env var name. Overrides amountCents when set. */
  priceIdEnv: string
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
  /**
   * Recurring plans are Stripe subscriptions; the one-time add is a payment.
   * Drives checkout mode and which lifecycle events matter.
   */
  subscription: boolean
  /**
   * Grants the "Verified" badge, but only after a human confirms the buyer
   * actually represents the clinic. Paying never grants it on its own: see
   * `verified_at` in lib/listings.ts.
   */
  grantsVerifiedBadge: boolean
  /** Puts the clinic at the top of its city results, labeled as advertising. */
  grantsFeaturedPlacement: boolean
}

/**
 * Every plan covers adding the clinic to the directory when it is not listed
 * yet, so a brand new clinic can buy any tier directly instead of buying the
 * one-time add first and then upgrading.
 */
export const ALL_PLANS_INCLUDE_LISTING = true

/** Maximum number of featured slots sold per city. Scarcity is the product. */
export const FEATURED_SLOTS_PER_CITY = 3

export const PLANS: Plan[] = [
  {
    id: "priority-add",
    name: "Priority Listing Add",
    tagline: "For a clinic that is not in the directory yet.",
    prices: [
      {
        interval: "one-time",
        amountCents: 9900,
        priceIdEnv: "STRIPE_PRICE_PRIORITY_ADD",
        label: "one time",
      },
    ],
    features: [
      "Manual review within 48 hours on business days",
      "A live, indexable page for your clinic",
      "Services, hours, phone, and website included",
      '"Listed on US Sleep Clinics" badge for your own site',
      "Checked against public records before it goes live",
      "Full refund if we cannot verify and publish your clinic",
    ],
    cta: "Add my clinic",
    href: "/submit",
    footnote: "One payment, no subscription. Refunded if we cannot publish you.",
    subscription: false,
    grantsVerifiedBadge: false,
    grantsFeaturedPlacement: false,
  },
  {
    id: "claim-verified",
    name: "Claimed and Verified",
    tagline: "For a clinic that wants its page verified and kept current.",
    prices: [
      {
        interval: "year",
        amountCents: 14900,
        priceIdEnv: "STRIPE_PRICE_CLAIM_VERIFIED",
        label: "per year",
      },
    ],
    features: [
      "Everything in Priority Listing Add, including adding your clinic if it is not listed yet",
      '"Verified" badge once we confirm you represent the clinic',
      "Hours, services, description, and photos kept current for you",
      "Direct link and call to action to your website",
      "Send changes any time, applied within one business day",
    ],
    cta: "Claim my listing",
    href: "/claim",
    footnote:
      "The Verified badge appears once we confirm you represent the clinic, usually within 48 hours.",
    subscription: true,
    grantsVerifiedBadge: true,
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
      "Everything in Claimed and Verified, including adding your clinic if it is not listed yet",
      `Top of your city and state results, limited to ${FEATURED_SLOTS_PER_CITY} clinics per city`,
      '"Featured" label on your card everywhere it appears',
      "Monthly report of views and clicks on your listing",
    ],
    cta: "Check my city",
    href: "/claim",
    highlight: true,
    footnote: "Featured placement is paid advertising and is labeled as such.",
    subscription: true,
    grantsVerifiedBadge: true,
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

/** "$349" or "$99", no trailing ".00" for whole-dollar amounts. */
export function formatPrice(amountCents: number): string {
  const dollars = amountCents / 100
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`
}
