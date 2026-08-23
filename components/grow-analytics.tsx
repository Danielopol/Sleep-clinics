import Script from "next/script"

// The Grow site id is not a secret (it ships in the page source), so it falls
// back to a literal. Set NEXT_PUBLIC_GROW_SITE_ID to override it.
const GROW_SITE_ID =
  process.env.NEXT_PUBLIC_GROW_SITE_ID ??
  "U2l0ZTo2Nzg3YmRhMi03YmJlLTQ2NWEtYTQ5NS05MTE3YjYwZWIwMWE="

/**
 * Loads Grow by Mediavine.
 *
 * Grow Analytics is what Mediavine counts sessions with, and Journey cannot be
 * approved until it has been collecting for 30 days, so this needs to be live
 * sitewide and stay that way. Mediavine warns that a script missing from parts
 * of a site skews their reporting, which is why it is mounted in the root
 * layout rather than per page.
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
    <Script
      id="grow-initializer"
      strategy="afterInteractive"
      data-grow-initializer=""
    >
      {`!(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","${GROW_SITE_ID}");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();`}
    </Script>
  )
}
