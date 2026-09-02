/**
 * The default social share card, shown when a page is posted to X, Facebook,
 * LinkedIn, WhatsApp, Slack, and so on.
 *
 * Next.js does not deep merge the `openGraph` and `twitter` metadata objects:
 * a page that exports its own `openGraph` replaces the one from the root
 * layout, image included. So every page that sets `openGraph` has to spread
 * these in, otherwise its link previews render with no image at all.
 *
 * Regenerate the file itself with `npm run generate-og-image`.
 */
export const OG_IMAGE = [
  {
    url: "/images/og-default.jpg",
    width: 1200,
    height: 630,
    alt: "US Sleep Clinics: find expert sleep care near you, with 4,000+ verified clinics and AASM-accredited sleep centers.",
  },
]
