import Script from "next/script"

// The GA4 measurement ID is not a secret (it is visible in the page source),
// so it falls back to a literal. Set NEXT_PUBLIC_GA_ID to override it, for
// example to point a staging deploy at a separate property.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-E784P507RG"

/**
 * Loads Google Analytics 4.
 *
 * Disabled in development so local traffic does not pollute the reports.
 * Set NEXT_PUBLIC_GA_DEBUG=true in .env to load it locally for testing.
 *
 * Client-side route changes are tracked automatically by gtag via GA4's
 * Enhanced Measurement ("Page changes based on browser history events"),
 * which is on by default, so no manual router listener is needed here.
 */
export function GoogleAnalytics() {
  const enabled =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_GA_DEBUG === "true"

  if (!enabled || !GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
