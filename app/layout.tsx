import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AdSense } from "@/components/adsense"
import { ImpactTag } from "@/components/impact"
import { GoogleAnalytics } from "@/components/google-analytics"
import { GrowAnalytics } from "@/components/grow-analytics"
import { JsonLd } from "@/components/json-ld"
import { OG_IMAGE } from "@/lib/og-image"
import { getClinicsData } from "@/lib/clinics"
import "./globals.css"

// <CHANGE> Using Inter font as specified in the requirements
const inter = Inter({ subsets: ["latin"] })

// The homepage inherits this title and description. Its search demand is
// "sleep clinic / sleep center / sleep study near me", so those words lead.
// The clinic count is read from the data so it never goes stale, rounded down
// to the hundred.
const CLINIC_COUNT = `${(Math.floor(getClinicsData().length / 100) * 100).toLocaleString("en-US")}+`
const SITE_TITLE = "Sleep Clinics & Sleep Study Centers Near You | US Sleep Clinics"
const SITE_DESCRIPTION = `Find a sleep clinic, sleep study center, or sleep doctor near you. Compare ${CLINIC_COUNT} sleep centers by city and state, with phone numbers, reviews, and AASM accreditation.`

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ussleepclinics.com"),
  title: {
    default: SITE_TITLE,
    template: "%s | US Sleep Clinics",
  },
  description: SITE_DESCRIPTION,
  // Sends only the origin (www.ussleepclinics.com) on cross-origin requests,
  // never the full path, so a visitor's specific health-topic browsing is not
  // leaked to third parties. Affiliate networks need to see us as the referring
  // domain to credit commissions, which "no-referrer" would have blocked.
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "US Sleep Clinics",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://www.ussleepclinics.com",
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      `Find a sleep clinic, sleep study, or sleep doctor near you. ${CLINIC_COUNT} sleep centers for sleep apnea, insomnia, and more.`,
    images: OG_IMAGE,
  },
  alternates: {
    canonical: "https://www.ussleepclinics.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* Google's instructions say to place the AdSense script between
          <head></head> on every page. Next.js merges an explicit <head> here
          with the one it generates from the Metadata API above. */}
      <head>
        <ImpactTag />
        <AdSense />
      </head>
      <body className={`${inter.className} antialiased`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "US Sleep Clinics",
            url: "https://www.ussleepclinics.com",
            logo: "https://www.ussleepclinics.com/images/Logo.png",
            description:
              "The nation's largest directory of verified sleep clinics and AASM-accredited sleep centers. Find expert sleep care providers near you.",
            contactPoint: {
              "@type": "ContactPoint",
              email: "contact@ussleepclinics.com",
              contactType: "customer service",
            },
            sameAs: ["https://x.com/DanielGPT2022"],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "US Sleep Clinics",
            url: "https://www.ussleepclinics.com",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://www.ussleepclinics.com/?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }}
        />
        {children}
        <Analytics />
        <GoogleAnalytics />
        <GrowAnalytics />
      </body>
    </html>
  )
}
