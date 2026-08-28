// The AdSense publisher id is not a secret (it ships in the page source and
// in ads.txt), so it falls back to a literal. Set NEXT_PUBLIC_ADSENSE_CLIENT
// to override it.
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-9363191043798291"

/**
 * Loads the Google AdSense verification and ad-serving script.
 *
 * Rendered as a plain <script> rather than next/script. Both afterInteractive
 * and beforeInteractive serialise an inline next/script snippet into the RSC
 * flight payload instead of emitting a real script element in this App Router
 * setup, so the served HTML contains it only as escaped JSON that becomes a
 * script after hydration (this is what happened installing Grow by
 * Mediavine). AdSense's site-verification check reads the raw HTML for a
 * literal <script src="...adsbygoogle.js?client=..."> tag, so it needs the
 * same plain-element treatment.
 *
 * Mounted in the root layout so it is present on every page, matching
 * Google's instruction to place it between <head></head> on each page.
 *
 * Disabled in development so local browsing does not affect the account.
 * Set NEXT_PUBLIC_ADSENSE_DEBUG=true in .env to load it locally.
 */
export function AdSense() {
  const enabled =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_ADSENSE_DEBUG === "true"

  if (!enabled || !ADSENSE_CLIENT) {
    return null
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  )
}
