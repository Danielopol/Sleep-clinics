import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { BrowseByState } from "@/components/browse-by-state"
import { HomeClient } from "./home-client"

/**
 * The homepage is a server component so the shell renders on the server.
 *
 * The searchable clinic grid lives in HomeClient, which calls useSearchParams.
 * Without a Suspense boundary around it Next opts the entire route out of
 * server rendering, and the homepage was serving roughly 16KB of markup
 * containing no links and not even the navigation. Keeping that hook inside
 * Suspense confines the client-only rendering to the grid, so everything
 * around it reaches crawlers.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* HeroSection also calls useSearchParams, so it needs its own boundary.
          Any such hook left outside Suspense opts the whole route out of
          server rendering, not just the component that uses it. */}
      <Suspense
        fallback={
          <div className="bg-gradient-to-br from-[var(--midnight)] via-[var(--deep-navy)] to-[var(--twilight)] py-20" />
        }
      >
        <HeroSection />
      </Suspense>

      <Suspense
        fallback={
          <section className="bg-[image:var(--bg-primary)] py-12">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4 text-lg text-[var(--text-secondary)]">
                Loading clinics...
              </p>
            </div>
          </section>
        }
      >
        <HomeClient />
      </Suspense>

      <BrowseByState />

      <FAQSection />

      <Footer />
    </div>
  )
}
