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
 * Fired once when a paid clinic's card has been at least half on screen for a
 * second (see useClinicImpression). Feeds the "impressions" line of the
 * monthly report, next to page views of /clinic/<slug> and clinic_outbound_click.
 *
 * Only paid clinics fire it: they are the only ones who get a report, and one
 * event per card on a long list would multiply event volume for nothing. GA4's
 * page_location says which list the card was in; `featured` says whether it
 * was shown as a featured placement there.
 */
export function trackClinicImpression(details: { clinicSlug: string; featured: boolean }): void {
  trackEvent("clinic_card_impression", {
    clinic_slug: details.clinicSlug,
    featured: details.featured,
  })
}

export type ClinicOutboundTarget ="website" | "phone" | "directions" | "fax" | "email"

/**
 * Where the clicked contact detail sat: "clinic_page" is the clinic's own
 * detail page, "clinic_card" is a card in a list (homepage results, a city
 * page, the VA page). GA4's page_location says which list it was.
 */
export type ClinicClickPlacement = "clinic_page" | "clinic_card"

/**
 * Fired when a visitor acts on a clinic's contact details: opens its website,
 * taps its phone number or email, opens directions, or copies its fax number.
 *
 * Per-clinic monthly counts of this event, split by target and placement, feed
 * the reports we send to partner clinics, so every contact link should call it.
 * A clinic without a slug is skipped rather than keyed by its id, which shifts
 * whenever the data is regenerated.
 */
export function trackClinicOutboundClick(details: {
  clinicSlug: string | undefined
  target: ClinicOutboundTarget
  placement: ClinicClickPlacement
}): void {
  if (!details.clinicSlug) return
  trackEvent("clinic_outbound_click", {
    clinic_slug: details.clinicSlug,
    target: details.target,
    placement: details.placement,
  })
}
