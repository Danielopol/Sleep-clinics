import type React from "react"
import Link from "next/link"
import { ChevronRight, MapPin, Search } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { FaqList, type FaqItem } from "@/components/faq-list"
import { GuideLinks } from "@/components/guide-links"

const BASE_URL = "https://www.ussleepclinics.com"

export interface TopicState {
  name: string
  slug: string
  matchCount: number
}

/**
 * Shared layout for the "near me" topic hubs (sleep studies, sleep doctors,
 * insomnia, VA clinics). Each hub answers the question behind its searches,
 * then routes the reader to a location: a search box, and a state grid whose
 * counts are specific to the topic.
 */
export function TopicHub({
  path,
  breadcrumb,
  heading,
  intro,
  states,
  stateLabel,
  countNoun,
  children,
  faq,
  guideSlugs,
}: {
  path: string
  breadcrumb: string
  heading: string
  intro: React.ReactNode
  states?: TopicState[]
  stateLabel?: (state: TopicState) => string
  countNoun?: [singular: string, plural: string]
  children?: React.ReactNode
  faq: FaqItem[]
  guideSlugs: string[]
}) {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: breadcrumb, item: `${BASE_URL}${path}` },
          ],
        }}
      />
      <Navigation />

      <section className="bg-gradient-to-br from-[var(--midnight)] via-[var(--deep-navy)] to-[var(--twilight)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">{breadcrumb}</span>
          </nav>
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] bg-clip-text text-transparent">
            {heading}
          </h1>
          <div className="text-lg text-slate-200 leading-relaxed max-w-3xl mt-4 space-y-3">{intro}</div>

          {/* A plain GET form, so it works without JavaScript and lands on the
              directory search the homepage already supports. */}
          <form action="/" method="get" className="mt-8 flex max-w-xl gap-2">
            <label htmlFor="topic-hub-search" className="sr-only">City, state, or clinic name</label>
            <input
              id="topic-hub-search"
              name="q"
              placeholder="City, state, or clinic name"
              className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--healing-teal)]"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--healing-teal)] px-5 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="bg-[image:var(--bg-primary)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {states && states.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Browse by state</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {states.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/locations/${state.slug}`}
                    className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 flex items-center justify-between hover:border-[var(--healing-teal)] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <MapPin className="w-5 h-5 text-[var(--healing-teal)] shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 leading-snug break-words">
                          {stateLabel ? stateLabel(state) : state.name}
                        </h3>
                        {countNoun && (
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {state.matchCount} {state.matchCount === 1 ? countNoun[0] : countNoun[1]}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[var(--healing-teal)] shrink-0" />
                  </Link>
                ))}
              </div>
            </>
          )}

          {children}

          <FaqList items={faq} />

          <GuideLinks slugs={guideSlugs} title="Related guides" />
        </div>
      </section>

      <Footer />
    </div>
  )
}
