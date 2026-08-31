// The pixel path is not a secret, it ships in the page source. Set
// NEXT_PUBLIC_IMPACT_PIXEL to override it.
const IMPACT_PIXEL_URL =
  process.env.NEXT_PUBLIC_IMPACT_PIXEL ??
  "https://utt.impactcdn.com/P-A7707230-898a-4f95-ae96-929cfc27f0631.js"

/**
 * Loads Impact.com's Universal Tracking Tag for website channel verification.
 *
 * Deliberately omits the vendor snippet's impactStat('transformLinks') call.
 * That call makes Impact automatically rewrite any outbound link matching an
 * enrolled advertiser's domain into a tracked affiliate link, sitewide, with
 * no trace in the codebase. That conflicts with the explicit AffiliateLink
 * approach used elsewhere on this site (manual, carries rel="sponsored",
 * triggers the FTC disclosure), and it would apply retroactively to whatever
 * brand gets enrolled next without a deliberate decision each time. Only
 * trackImpression is kept, which is the beacon Impact's channel verification
 * appears to check for.
 *
 * Rendered as a plain <script>, not next/script, for the same reason as Grow
 * and AdSense: next/script serialises an inline snippet into the RSC flight
 * payload in this App Router setup instead of emitting a real script element,
 * and Impact's verification reads the raw HTML.
 *
 * Disabled in development so local browsing does not register as traffic.
 * Set NEXT_PUBLIC_IMPACT_DEBUG=true in .env to load it locally.
 */
export function ImpactTag() {
  const enabled =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_IMPACT_DEBUG === "true"

  if (!enabled) {
    return null
  }

  const snippet = `(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('${IMPACT_PIXEL_URL}','script','impactStat',document,window);impactStat('trackImpression');`

  return <script dangerouslySetInnerHTML={{ __html: snippet }} />
}
