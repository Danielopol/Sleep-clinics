import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ClinicCard } from "@/components/clinic-card"
import { JsonLd } from "@/components/json-ld"
import { getCityData, getTopCityParams, humanList, type CityData } from "@/lib/locations"
import { FaqList, type FaqItem } from "@/components/faq-list"
import { GuideLinks } from "@/components/guide-links"
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
  // Search demand for these pages is "sleep study <city>" and "sleep center
  // <city>" as much as "sleep clinic", so the title carries both.
  // Puerto Rico searches are often in Spanish ("estudio de apnea del sueño").
  const title =
    data.stateAbbr === "PR"
      ? `Sleep Centers in ${data.cityName}, PR: Estudios del Sueño (${count} ${count === 1 ? "Centro" : "Centros"})`
      : `Sleep Clinics & Sleep Studies in ${data.cityName}, ${data.stateAbbr} (${count} ${count === 1 ? "Center" : "Centers"})`
  const testing = [
    data.inLabCount > 0 && `${data.inLabCount} ${data.inLabCount === 1 ? "offers" : "offer"} in-lab sleep studies`,
    data.homeTestCount > 0 && `${data.homeTestCount} ${data.homeTestCount === 1 ? "offers" : "offer"} home sleep testing`,
  ].filter(Boolean) as string[]
  const description = `Compare ${count} sleep ${count === 1 ? "clinic" : "clinics"} in ${data.cityName}, ${data.stateName}${testing.length > 0 ? `: ${humanList(testing)}` : ""}. Addresses, phone numbers, reviews, and services for sleep apnea, insomnia, and other sleep disorders.`

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

// Answers built from this city's own listings, so every city page says
// something specific instead of repeating one template paragraph.
function cityFaq(data: CityData): FaqItem[] {
  const count = data.clinics.length
  const place = `${data.cityName}, ${data.stateAbbr}`
  const of = count === 1 ? "The one clinic" : `Of the ${count} clinics`
  const items: FaqItem[] = []

  if (data.inLabCount > 0 || data.homeTestCount > 0) {
    const parts = [
      data.inLabCount > 0 && `${data.inLabCount} list in-lab sleep studies (polysomnography)`,
      data.homeTestCount > 0 && `${data.homeTestCount} list home sleep apnea testing`,
    ].filter(Boolean) as string[]
    items.push({
      question: `Where can I get a sleep study in ${place}?`,
      answer: `${of} listed in ${data.cityName}, ${humanList(parts)}. An in-lab study is done overnight at the sleep center and can diagnose the full range of sleep disorders. A home test is done in your own bed and is mainly used to check for obstructive sleep apnea. Call the clinic to confirm which tests it currently offers.`,
    })
  }

  items.push({
    question: `Do I need a referral to see a sleep doctor in ${data.cityName}?`,
    answer: `It depends on your insurance, not on the clinic. Many HMO plans require a referral from your primary care doctor, and most insurers require prior authorization for a sleep study. Check with your plan first, then ask the clinic whether it accepts self-referrals.`,
  })

  items.push({
    question: `Are sleep centers in ${data.cityName} accredited?`,
    answer:
      data.aasmCount > 0
        ? `${data.aasmCount} of the ${count} ${count === 1 ? "clinic" : "clinics"} listed in ${data.cityName} ${data.aasmCount === 1 ? "is" : "are"} accredited by the American Academy of Sleep Medicine (AASM), which reviews a center's staff, equipment, and testing standards. You can confirm a center's status on the AASM website.`
        : `None of the clinics listed in ${data.cityName} are marked as AASM-accredited in our data. Accreditation is voluntary, so an unaccredited clinic can still provide good care, but it is worth asking who reads your sleep study and whether they are board-certified in sleep medicine.`,
  })

  return items
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
          {data.stateAbbr === "PR" && (
            <p lang="es" className="text-base text-slate-300 leading-relaxed max-w-3xl mt-3">
              Centros de sueño en {data.cityName}: compare {count === 1 ? "la clínica" : `las ${count} clínicas`} para
              estudios del sueño, pruebas de apnea del sueño y consultas con especialistas del sueño.
            </p>
          )}
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

          <FaqList items={cityFaq(data)} title={`Sleep studies and sleep doctors in ${data.cityName}`} />

          <GuideLinks
            slugs={[
              "what-to-expect-during-a-sleep-study",
              "home-sleep-test-vs-in-lab-sleep-study",
              "how-much-does-a-sleep-study-cost",
              "does-insurance-cover-sleep-studies",
            ]}
          />

          <p className="mt-10 text-[var(--text-secondary)]">
            Looking beyond {data.cityName}? See all{" "}
            <Link href={`/locations/${data.stateSlug}`} className="text-[var(--healing-teal)] hover:underline">
              sleep clinics in {data.stateName}
            </Link>
            , or browse by need:{" "}
            <Link href="/sleep-study-near-me" className="text-[var(--healing-teal)] hover:underline">
              sleep studies
            </Link>
            ,{" "}
            <Link href="/sleep-doctors-near-me" className="text-[var(--healing-teal)] hover:underline">
              sleep doctors
            </Link>
            , and{" "}
            <Link href="/insomnia-treatment-near-me" className="text-[var(--healing-teal)] hover:underline">
              insomnia treatment
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
