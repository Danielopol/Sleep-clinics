import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { getStatesIndex } from "@/lib/locations"
import { MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

const BASE_URL = "https://www.ussleepclinics.com"

export const metadata: Metadata = {
  title: "Sleep Clinics by State - Find a Sleep Center Near You",
  description:
    "Browse sleep clinics, sleep centers, and sleep labs by state. Find accredited sleep specialists for sleep apnea, insomnia, and other sleep disorders across the United States.",
  alternates: { canonical: `${BASE_URL}/locations` },
  openGraph: {
    title: "Sleep Clinics by State - Find a Sleep Center Near You",
    description:
      "Browse sleep clinics, sleep centers, and sleep labs by state across the United States.",
    url: `${BASE_URL}/locations`,
  },
}

export default function LocationsHubPage() {
  const states = getStatesIndex()
  const totalClinics = states.reduce((sum, s) => sum + s.clinicCount, 0)

  return (
    <div className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Sleep Clinics by State", item: `${BASE_URL}/locations` },
          ],
        }}
      />
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--midnight)] via-[var(--deep-navy)] to-[var(--twilight)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">Sleep Clinics by State</span>
          </nav>
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] bg-clip-text text-transparent">
            Sleep Clinics by State
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mt-4">
            Find sleep clinics, sleep centers, and sleep labs near you. Browse {totalClinics.toLocaleString()} verified
            providers across {states.length} states for the diagnosis and treatment of sleep apnea, insomnia, and other
            sleep disorders.
          </p>
        </div>
      </section>

      {/* State grid */}
      <section className="bg-[image:var(--bg-primary)] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/locations/${state.slug}`}
                className="group bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[var(--healing-teal)] dark:hover:border-[var(--healing-teal)] transition-all duration-300 p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-[var(--healing-teal)]/10 text-[var(--healing-teal)] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h2
                      title={`Sleep Clinics in ${state.name}`}
                      className="text-slate-900 dark:text-slate-100 font-semibold text-base leading-snug break-words"
                    >
                      Sleep Clinics in {state.name}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {state.clinicCount} {state.clinicCount === 1 ? "clinic" : "clinics"} in {state.cityCount}{" "}
                      {state.cityCount === 1 ? "city" : "cities"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[var(--healing-teal)] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
