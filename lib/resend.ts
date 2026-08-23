import { Resend } from "resend"

/**
 * Builds the Resend client at request time rather than at module scope.
 *
 * The Resend constructor throws when no API key is present. Calling it while
 * the module is evaluated meant that a missing RESEND_API_KEY failed
 * `next build` for the entire site during page data collection, not just for
 * the two routes that actually send email. Building lazily keeps a missing key
 * contained to the request that needs it.
 *
 * Returns null when the key is absent so callers can answer with a 500 of
 * their own instead of throwing.
 */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return null
  }

  return new Resend(apiKey)
}
