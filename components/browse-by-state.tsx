import Link from "next/link"
import { getStatesIndex } from "@/lib/locations"

/**
 * Server-rendered index of every state, linking into the location pages.
 *
 * The homepage previously served no links at all: useSearchParams in the
 * client component ran without a Suspense boundary, so Next abandoned server
 * rendering for the whole page and shipped an empty shell. Even once that is
 * fixed, the clinic grid is fetched client side, so a crawler still sees no
 * route into the directory. This section is the crawl path: homepage to state,
 * state to city, city to clinic.
 */
export function BrowseByState() {
  const states = getStatesIndex()

  if (states.length === 0) {
    return null
  }

  const totalClinics = states.reduce((sum, s) => sum + s.clinicCount, 0)

  return (
    <section className="bg-[image:var(--bg-primary)] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-2 font-[var(--font-display)] text-2xl font-bold text-[var(--text-primary)]">
          Browse sleep clinics by state
        </h2>
        <p className="mb-6 text-[var(--text-secondary)]">
          {totalClinics.toLocaleString()} sleep clinics and sleep centers across{" "}
          {states.length} states.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/locations/${state.slug}`}
              className="flex items-baseline justify-between gap-2 rounded-lg border border-[var(--border-subtle)] px-4 py-3 transition-colors hover:border-[var(--healing-teal)]"
            >
              <span className="font-medium text-[var(--text-primary)]">
                {state.name}
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                {state.clinicCount}
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/locations"
          className="mt-6 inline-block text-sm font-medium text-[var(--healing-teal)] hover:underline"
        >
          View all locations
        </Link>
      </div>
    </section>
  )
}
