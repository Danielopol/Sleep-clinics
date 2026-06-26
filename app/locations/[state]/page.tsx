import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { getStateData, getAllStateSlugs, humanList } from "@/lib/locations"
import { MapPin, ChevronRight, Building2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"

const BASE_URL = "https://www.ussleepclinics.com"

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

  const title = `Sleep Clinics in ${data.name} - ${data.clinicCount} Sleep Centers & Labs`
  const description = `Find ${data.clinicCount} sleep clinics in ${data.name} across ${data.cityCount} cities. Compare sleep centers and labs for sleep apnea, insomnia, and other sleep disorders, and book an appointment near you.`

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/locations/${data.slug}` },
    openGraph: { title, description, url: `${BASE_URL}/locations/${data.slug}` },
  }
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
        </div>
      </section>

      <Footer />
    </div>
  )
}
