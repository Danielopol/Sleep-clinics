import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ClinicCard } from "@/components/clinic-card"
import { JsonLd } from "@/components/json-ld"
import { getCityData, getTopCityParams, humanList } from "@/lib/locations"
import { getListingBadges } from "@/lib/listings"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { OG_IMAGE } from "@/lib/og-image"

const BASE_URL = "https://www.ussleepclinics.com"

// Pre-render only the busiest cities at build time; the rest are generated
// on-demand on first request and then cached (ISR), which keeps build CPU low.
export const dynamicParams = true

export async function generateStaticParams() {
  return getTopCityParams(100)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>
}): Promise<Metadata> {
  const { state, city } = await params
  const data = getCityData(state, city)
  // Only the top 100 cities are prerendered and dynamicParams stays enabled, so
  // an unknown city renders with HTTP 200 rather than 404. noindex keeps Google
  // from indexing that soft 404.
  if (!data) return { title: "City Not Found", robots: { index: false, follow: false } }

  const count = data.clinics.length
  const title = `Sleep Clinics in ${data.cityName}, ${data.stateAbbr} - ${count} Sleep ${count === 1 ? "Center" : "Centers"}`
  const description = `Find ${count} sleep ${count === 1 ? "clinic" : "clinics"} in ${data.cityName}, ${data.stateName}. Compare sleep centers and labs for sleep apnea, insomnia, and other sleep disorders, with addresses, phone numbers, and services.`

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/locations/${data.stateSlug}/${data.citySlug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/locations/${data.stateSlug}/${data.citySlug}`,
      images: OG_IMAGE,
    },
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>
}) {
  const { state, city } = await params
  const data = getCityData(state, city)
  if (!data) notFound()

  // Paid featured placements go to the top of the list, in the order the data
  // already had them. The rest of the page is untouched, so a city with no
  // featured clinic renders exactly as before. The verified badge does not
  // affect ordering: it is a fact about the listing, not an ad slot.
  const badges = await getListingBadges()
  const clinics = data.clinics.map((c) => {
    const featured = badges.featured.has(c.id)
    const verified = badges.verified.has(c.id)
    return featured || verified ? { ...c, ...(featured && { featured }), ...(verified && { verified }) } : c
  })
  const hasFeatured = clinics.some((c) => c.featured)
  const orderedClinics = hasFeatured
    ? [...clinics].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    : clinics

  const count = data.clinics.length
  const servicesSentence =
    data.topServices.length > 0
      ? ` Services available include ${humanList(data.topServices)}.`
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
            { "@type": "ListItem", position: 3, name: `Sleep Clinics in ${data.stateName}`, item: `${BASE_URL}/locations/${data.stateSlug}` },
            { "@type": "ListItem", position: 4, name: `Sleep Clinics in ${data.cityName}`, item: `${BASE_URL}/locations/${data.stateSlug}/${data.citySlug}` },
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
            <Link href={`/locations/${data.stateSlug}`} className="hover:text-white transition-colors">{data.stateName}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90">{data.cityName}</span>
          </nav>
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] bg-clip-text text-transparent">
            Sleep Clinics in {data.cityName}, {data.stateAbbr}
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mt-4">
            {count === 1 ? "There is" : "There are"} {count} sleep {count === 1 ? "clinic" : "clinics"} in{" "}
            {data.cityName}, {data.stateName}.{servicesSentence}{aasmSentence} Compare locations, services, and contact
            details below to find care for sleep apnea, insomnia, and other sleep disorders.
          </p>
        </div>
      </section>

      {/* Clinic grid */}
      <section className="bg-[image:var(--bg-primary)] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {orderedClinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>

          {/* Advertising disclosure, required wherever paid placement changes
              the order of results. */}
          {hasFeatured && (
            <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
              Listings marked "Featured" are paid placements. Paying does not change a clinic's
              information, its rating, or whether it appears in this directory.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
