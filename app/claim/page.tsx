import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ClaimClient } from "@/components/claim-client"
import { Metadata } from "next"
import { OG_IMAGE } from "@/lib/og-image"

export const metadata: Metadata = {
  title: "Claim Your Sleep Clinic Listing",
  description:
    "Claim your sleep clinic's listing on US Sleep Clinics. Get a verified badge, edit your details, and take a featured placement at the top of your city's results.",
  alternates: { canonical: "https://www.ussleepclinics.com/claim" },
  openGraph: {
    title: "Claim Your Sleep Clinic Listing",
    description:
      "Verify your clinic, control your listing, and appear at the top of your city on US Sleep Clinics.",
    url: "https://www.ussleepclinics.com/claim",
    images: OG_IMAGE,
  },
}

export default function ClaimPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="bg-gradient-to-br from-[var(--midnight)] via-[var(--deep-navy)] to-[var(--twilight)] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] bg-clip-text text-transparent">
            Claim Your Listing
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed mt-5">
            Find your clinic in the directory, then choose how you want it to appear. Claiming a
            listing never changes its reviews or its rating.
          </p>
        </div>
      </section>

      {/* useSearchParams needs a Suspense boundary so the shell can prerender. */}
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ClaimClient />
      </Suspense>

      <Footer />
    </div>
  )
}
