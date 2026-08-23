/**
 * Thin wrapper around gtag for custom GA4 events.
 *
 * Every helper is a no-op when gtag is absent (server rendering, development,
 * or an ad blocker), so callers never need to guard.
 */

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      targetOrEvent: string | Date,
      params?: EventParams,
    ) => void
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return
  }
  window.gtag("event", name, params)
}

/**
 * Fired when a visitor clicks a monetised outbound link.
 *
 * `placement` should describe where on the page the link sat (for example
 * "comparison-table", "inline", "clinic-page-module") so we can compare which
 * formats convert. `page` should be the slug the click came from, which is what
 * lets us line these up against the sub-IDs reported by the affiliate network.
 */
export function trackAffiliateClick(details: {
  partner: string
  placement: string
  page: string
  product?: string
}): void {
  trackEvent("affiliate_click", {
    partner: details.partner,
    placement: details.placement,
    page: details.page,
    product: details.product,
  })
}

/**
 * Fired when a visitor clicks through to a clinic's own website or phone
 * number from one of our clinic pages.
 *
 * This is not a monetisation event today, but it is the number that proves
 * referral value when pitching clinics on a paid listing later, so it is worth
 * collecting from the start.
 */
export function trackClinicOutboundClick(details: {
  clinicSlug: string
  target: "website" | "phone" | "directions"
}): void {
  trackEvent("clinic_outbound_click", {
    clinic_slug: details.clinicSlug,
    target: details.target,
  })
}
