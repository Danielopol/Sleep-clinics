import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { getStateData, getAllStateSlugs, humanList, type CitySummary } from "@/lib/locations"
import { GuideLinks } from "@/components/guide-links"
import { MapPin, ChevronRight, Building2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { OG_IMAGE } from "@/lib/og-image"

const BASE_URL = "https://www.ussleepclinics.com"

// generateStaticParams below returns every valid slug, so unknown params can be
// rejected by the router with a real 404. Without this, notFound() inside a
// prerendered page renders the 404 UI but still answers HTTP 200 (a soft 404).
export const dynamicParams = false

export async function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state } = await params
  const data = getStateData(state)
  if (!data) return { title: "State Not Found" }

  const title =
    data.abbr === "PR"
      ? `Sleep Centers in Puerto Rico: ${data.clinicCount} Sleep Clinics & Labs (Centros de Sueño)`
      : `Sleep Clinics in ${data.name}: ${data.clinicCount} Sleep Centers, Labs & Sleep Doctors`
  const description =
    data.abbr === "PR"
      ? `Find ${data.clinicCount} sleep centers in Puerto Rico across ${data.cityCount} cities, including San Juan, Caguas, Bayamón, Ponce, and Mayagüez. Estudios de sueño y apnea del sueño: compare clinics, phone numbers, and services.`
      : `Find ${data.clinicCount} sleep clinics in ${data.name} across ${data.cityCount} cities. Compare sleep centers, sleep labs, and sleep doctors for sleep studies, sleep apnea, and insomnia, with phone numbers and reviews.`

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/locations/${data.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/locations/${data.slug}`,
      images: OG_IMAGE,
    },
  }
}

/**
 * Much of Puerto Rico's search demand is in Spanish ("estudio de apnea del
 * sueño caguas", "laboratorio del sueño bayamon"), and no English page matches
 * those words. This section gives the hub a Spanish summary and city links.
 */
function PuertoRicoSpanishSection({ cities, stateSlug }: { cities: CitySummary[]; stateSlug: string }) {
  const total = cities.reduce((sum, c) => sum + c.clinicCount, 0)
  return (
    <div lang="es" className="mt-12 rounded-2xl border border-[var(--border-subtle)] p-6">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
        Centros de sueño y estudios de apnea del sueño en Puerto Rico
      </h2>
      <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
        Encuentre {total} centros y laboratorios del sueño en Puerto Rico. Muchos ofrecen estudios del sueño en el
        laboratorio (polisomnografía), pruebas de apnea del sueño en el hogar, y consultas con neumólogos y médicos
        especialistas en medicina del sueño.
      </p>
      <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
        Llame a la clínica para confirmar qué estudios ofrece, si acepta su plan médico, y si necesita un referido de
        su médico primario.
      </p>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/locations/${stateSlug}/${city.slug}`}
            className="rounded-full border border-[var(--border-subtle)] px-4 py-2 text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--healing-teal)] hover:text-[var(--healing-teal)]"
          >
            Centros de sueño en {city.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const data = getStateData(state)
  if (!data) notFound()

  const servicesSentence =
    data.topServices.length > 0
      ? ` These sleep centers and labs offer services including ${humanList(data.topServices)}.`
      : ""
  const aasmSentence =
    data.aasmCount > 0
      ? ` ${data.aasmCount} ${data.aasmCount === 1 ? "is" : "are"} AASM-accredited.`
      : ""

  return (
    <div className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Sleep Clinics by State", item: `${BASE_URL}/locations` },
            { "@type": "ListItem", position: 3, name: `Sleep Clinics in ${data.name}`, item: `${BASE_URL}/locations/${data.slug}` },
          ],
        }}
      />
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--midnight)] via-[var(--deep-navy)] to-[var(--twilight)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-4 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/locations" className="hover:text-white transition-colors">Sleep Clinics by State</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">{data.name}</span>
          </nav>
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] bg-clip-text text-transparent">
            Sleep Clinics in {data.name}
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mt-4">
            Browse {data.clinicCount} sleep {data.clinicCount === 1 ? "clinic" : "clinics"} across {data.cityCount}{" "}
            {data.cityCount === 1 ? "city" : "cities"} in {data.name}.{servicesSentence}{aasmSentence} Select a city
            below to find local sleep clinics for sleep apnea, insomnia, narcolepsy, and other sleep disorders.
          </p>
        </div>
      </section>

      {/* City grid */}
      <section className="bg-[image:var(--bg-primary)] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[var(--healing-teal)]" />
            Cities in {data.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${data.slug}/${city.slug}`}
                className="group bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[var(--healing-teal)] dark:hover:border-[var(--healing-teal)] transition-all duration-300 p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-[var(--healing-teal)]/10 text-[var(--healing-teal)] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3
                      title={`Sleep Clinics in ${city.name}`}
                      className="text-slate-900 dark:text-slate-100 font-semibold text-base leading-snug break-words"
                    >
                      Sleep Clinics in {city.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {city.clinicCount} {city.clinicCount === 1 ? "clinic" : "clinics"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[var(--healing-teal)] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>

          {data.abbr === "PR" && <PuertoRicoSpanishSection cities={data.cities} stateSlug={data.slug} />}

          <GuideLinks
            slugs={[
              "how-to-choose-the-right-sleep-clinic",
              "what-to-expect-during-a-sleep-study",
              "home-sleep-test-vs-in-lab-sleep-study",
              "does-insurance-cover-sleep-studies",
            ]}
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
