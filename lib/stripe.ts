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

/**
 * The origin Stripe sends the customer back to after checkout.
 *
 * NEXT_PUBLIC_BASE_URL is the setting of record. The Vercel fallbacks exist so
 * that forgetting it in the dashboard cannot send a paying customer to
 * localhost: VERCEL_PROJECT_PRODUCTION_URL is the project's production domain,
 * VERCEL_URL the specific deployment (right for preview branches). Both are
 * bare hostnames, so they need the scheme added.
 */
export function getBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.trim()
  if (configured) return configured.replace(/\/$/, "")

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  if (vercelHost) return `https://${vercelHost.replace(/^https?:\/\//, "").replace(/\/$/, "")}`

  return "http://localhost:3000"
}
