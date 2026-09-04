import Stripe from "stripe"

/**
 * Builds the Stripe client at request time, not at module scope.
 *
 * Same reasoning as lib/resend.ts: a missing key must not fail `next build`
 * for the whole site, only for the routes that actually charge money. Returns
 * null when STRIPE_SECRET_KEY is absent so callers answer with their own error.
 */
let cached: Stripe | null = null

export function getStripeClient(): Stripe | null {
  const apiKey = process.env.STRIPE_SECRET_KEY
  if (!apiKey) return null
  if (cached) return cached
  // No apiVersion override: the SDK pins the version its own types were
  // generated from, so leaving it alone keeps requests and types in step.
  cached = new Stripe(apiKey, {
    appInfo: { name: "US Sleep Clinics", url: "https://www.ussleepclinics.com" },
  })
  return cached
}

/** True when the site is talking to a Stripe test-mode key. */
export function isTestMode(): boolean {
  return (process.env.STRIPE_SECRET_KEY ?? "").startsWith("sk_test_")
}

export function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  )
}
