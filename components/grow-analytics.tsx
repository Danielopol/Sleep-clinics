// The Grow site id is not a secret (it ships in the page source), so it falls
// back to a literal. Set NEXT_PUBLIC_GROW_SITE_ID to override it.
const GROW_SITE_ID =
  process.env.NEXT_PUBLIC_GROW_SITE_ID ??
  "U2l0ZTo2Nzg3YmRhMi03YmJlLTQ2NWEtYTQ5NS05MTE3YjYwZWIwMWE="

const GROW_SNIPPET = `!(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","${GROW_SITE_ID}");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();`

/**
 * Loads Grow by Mediavine.
 *
 * Grow Analytics is how Mediavine counts sessions, and Journey cannot be
 * approved until it has collected for 30 days, so this needs to be live
 * sitewide and stay that way. Mediavine warns that a script missing from parts
 * of a site skews their reporting, hence mounting it in the root layout.
 *
 * This deliberately renders a plain <script> rather than using next/script.
 * Both afterInteractive and beforeInteractive serialise the snippet into the
 * RSC flight payload instead of emitting a script element, so the served HTML
 * contains the code only as escaped JSON that becomes a script after
 * hydration. Mediavine's installation check reads the raw HTML and fails with
 * "We're Having Trouble Seeing Your Script", which is the failure other
 * Next.js publishers report. A plain element with dangerouslySetInnerHTML puts
 * a real tag in the markup. The snippet is a constant, never user input.
 *
 * Disabled in development so local browsing does not inflate their session
 * counts. Set NEXT_PUBLIC_GROW_DEBUG=true in .env to load it locally.
 */
export function GrowAnalytics() {
  const enabled =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_GROW_DEBUG === "true"

  if (!enabled || !GROW_SITE_ID) {
    return null
  }

  return (
    <script
      data-grow-initializer=""
      dangerouslySetInnerHTML={{ __html: GROW_SNIPPET }}
    />
  )
}
