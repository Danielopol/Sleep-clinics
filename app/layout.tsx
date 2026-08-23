import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@/components/google-analytics"
import { GrowAnalytics } from "@/components/grow-analytics"
import { JsonLd } from "@/components/json-ld"
import "./globals.css"

// <CHANGE> Using Inter font as specified in the requirements
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ussleepclinics.com"),
  title: {
    default: "US Sleep Clinics - Find Expert Sleep Care Near You",
    template: "%s | US Sleep Clinics",
  },
  description:
    "Find sleep clinics near you from 4,000+ verified providers. Search AASM-accredited sleep centers, compare specialists, and get expert treatment for sleep apnea, insomnia, and more.",
  // Sends only the origin (www.ussleepclinics.com) on cross-origin requests,
  // never the full path, so a visitor's specific health-topic browsing is not
  // leaked to third parties. Affiliate networks need to see us as the referring
  // domain to credit commissions, which "no-referrer" would have blocked.
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "US Sleep Clinics",
    title: "US Sleep Clinics - Find Expert Sleep Care Near You",
    description:
      "Find sleep clinics near you from 4,000+ verified providers. Search AASM-accredited sleep centers, compare specialists, and get expert treatment for sleep apnea, insomnia, and more.",
    url: "https://www.ussleepclinics.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "US Sleep Clinics - Find Expert Sleep Care Near You",
    description:
      "Find sleep clinics near you from 4,000+ verified providers. AASM-accredited sleep centers for sleep apnea, insomnia, and more.",
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
