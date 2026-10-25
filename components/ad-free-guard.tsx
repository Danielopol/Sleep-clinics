import { getListingBadges } from "@/lib/listings"

/**
 * Pauses AdSense on the clinic pages of clinics with a live paid plan, which
 * promise "no third-party ads on your clinic's page".
 *
 * AdSense is loaded sitewide from the root layout (components/adsense.tsx), so
 * a page cannot leave it out. `pauseAdRequests = 1` is the AdSense switch that
 * holds every ad request, auto ads included. It only works if it is set before
 * adsbygoogle.js runs. React hoists the async AdSense tag to the top of <head>,
 * so it still comes first in the HTML, but this inline script sits a few
 * hundred bytes after it in the same first chunk and runs synchronously while
 * that chunk is parsed, before the async download can execute. Checked in
 * October 2026: a paid clinic page made no ad request, an unpaid one did.
 *
 * The paths are baked in when the page is rendered, so they are as current as
 * the page itself (the clinic page reads the same flags). AdFreePage covers a
 * client-side navigation onto a clinic page. The reliable backstop is an
 * excluded-pages rule in the AdSense dashboard (docs/PAID-LISTINGS.md).
 */
export async function AdFreeGuard() {
  const { paid } = await getListingBadges()
  if (paid.size === 0) return null

  // Slugs are [a-z0-9-] only; "<" is escaped anyway so nothing can close the tag.
  const paths = JSON.stringify([...paid].map((slug) => `/clinic/${slug}`)).replace(/</g, "\\u003c")
  const script = `(function(){var p=${paths};var h=location.pathname.replace(/\\/$/,"");if(p.indexOf(h)>-1){(window.adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=1}})();`

  // AdSense inserts its own <script> into <head> before hydration, which React
  // reports as a mismatch on this element. Harmless (nothing re-renders), so
  // the warning is suppressed.
  return <script dangerouslySetInnerHTML={{ __html: script }} suppressHydrationWarning />
}
