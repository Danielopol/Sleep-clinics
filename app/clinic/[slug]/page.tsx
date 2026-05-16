import { Navigation } from "@/components/navigation"
import { ClinicDetailCard } from "@/components/clinic-detail-card"
import { getClinicBySlug, getClinicById, getClinicsData, formatOpeningHours } from "@/lib/clinics"
import { notFound, permanentRedirect } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"

export async function generateStaticParams() {
  const clinics = getClinicsData()
  return clinics
    .filter(c => c.slug)
    .map(c => ({ slug: c.slug! }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const clinic = /^\d+$/.test(slug)
    ? getClinicById(Number(slug))
    : getClinicBySlug(slug)

  if (!clinic) {
    return { title: "Clinic Not Found" }
  }

  // Multi-location clinics sharing the same name+city get identical titles, which
  // Google flags as "Duplicate without user-selected canonical". Include the street
  // to differentiate them. Strip city/state/zip (already in the title suffix).
  const allClinics = getClinicsData()
  const isMultiLocation = allClinics.some(
    c => c.id !== clinic.id && c.name === clinic.name && c.city === clinic.city
  )
  // Strip ", City, ST ZIP" from address end to get street+suite only
  const streetWithSuite = clinic.address
    .replace(new RegExp(`,\\s*${clinic.city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')},\\s*${clinic.state}.*$`, 'i'), '')
    .trim()
  const locationSuffix = isMultiLocation ? ` (${streetWithSuite})` : ''

  const title = `${clinic.name}${locationSuffix} - Sleep Clinic in ${clinic.city}, ${clinic.state}`
  const description = clinic.description
    || `${clinic.name} is a sleep clinic located in ${clinic.city}, ${clinic.state}. Specializing in ${clinic.specialty?.join(", ") || "sleep medicine"}. Call ${clinic.phone} to schedule an appointment.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.ussleepclinics.com/clinic/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.ussleepclinics.com/clinic/${slug}`,
    },
  }
}

// Maps disorder names (clinic.specialty) → SEO treatment search terms
const DISORDER_TO_TREATMENT: Record<string, string> = {
  'insomnia': 'Insomnia Treatment',
  'sleep apnea': 'Sleep Apnea Treatment',
  'obstructive sleep apnea (osa)': 'Sleep Apnea Treatment',
  'central sleep apnea (csa)': 'Sleep Apnea Treatment',
  'narcolepsy': 'Narcolepsy Treatment',
  'restless legs syndrome (rls)': 'Restless Legs Syndrome Treatment',
  'restless leg syndrome': 'Restless Legs Syndrome Treatment',
  'parasomnias': 'Parasomnia Treatment',
  'circadian rhythm disorders': 'Circadian Rhythm Disorder Treatment',
  'pediatric sleep disorders': 'Pediatric Sleep Disorder Treatment',
  'snoring': 'Snoring Treatment',
  'hypersomnia/excessive daytime sleepiness': 'Hypersomnia Treatment',
  'periodic limb movement disorder (plmd)': 'Periodic Limb Movement Disorder Treatment',
  'rem sleep behavior disorder (rbd)': 'REM Sleep Behavior Disorder Treatment',
  'sleep-disordered breathing': 'Sleep-Disordered Breathing Treatment',
  'sleep-related movement disorders': 'Sleep-Related Movement Disorder Treatment',
}

// Maps service names (clinic.services) → SEO-friendly schema labels
const SERVICE_TO_SCHEMA: Record<string, string> = {
  'home sleep testing': 'Home Sleep Test',
  'in-lab sleep testing (polysomnography)': 'Sleep Study',
  'sleep studies': 'Sleep Study',
  'sleep medicine consultation': 'Sleep Medicine Consultation',
  'sleep disorders therapy': 'Sleep Disorder Treatment',
  'sleep disorders diagnosis': 'Sleep Disorder Diagnosis',
  'cpap therapy': 'CPAP Therapy',
  'cpap/bipap therapy': 'CPAP BiPAP Therapy',
  'bipap/bpap therapy': 'BiPAP Therapy',
  'oral appliance therapy': 'Oral Appliance Therapy',
  'behavioral sleep medicine': 'Behavioral Sleep Medicine',
  'pediatric sleep medicine': 'Pediatric Sleep Medicine',
  'dental sleep medicine': 'Dental Sleep Medicine',
  'multiple sleep latency test (mslt)': 'MSLT Sleep Test',
  'adaptive servo-ventilation (asv)': 'ASV Therapy',
  'non-invasive ventilation': 'Non-Invasive Ventilation Therapy',
  'inspire therapy (upper airway stimulation)': 'Inspire Therapy',
  'sleep apnea surgery': 'Sleep Apnea Surgery',
  'pulmonary medicine': 'Pulmonary Sleep Medicine',
  // These overlap with DISORDER_TO_TREATMENT — deduplication handles it
  'sleep apnea treatment': 'Sleep Apnea Treatment',
  'insomnia treatment': 'Insomnia Treatment',
  'narcolepsy treatment': 'Narcolepsy Treatment',
  'restless leg syndrome treatment': 'Restless Legs Syndrome Treatment',
  'snoring treatment': 'Snoring Treatment',
  'parasomnias treatment': 'Parasomnia Treatment',
  'hypersomnia treatment': 'Hypersomnia Treatment',
  'circadian rhythm disorder treatment': 'Circadian Rhythm Disorder Treatment',
  'periodic limb movement disorder treatment': 'Periodic Limb Movement Disorder Treatment',
  'rem behavior disorder treatment': 'REM Sleep Behavior Disorder Treatment',
}

function buildAvailableServices(specialty: string[], services: string[], city: string, state: string) {
  const seen = new Set<string>()
  const result: { "@type": string; name: string }[] = []

  const add = (label: string) => {
    if (!seen.has(label)) {
      seen.add(label)
      result.push({ "@type": "MedicalTherapy", name: `${label} in ${city}, ${state}` })
    }
  }

  for (const s of specialty) {
    const treatment = DISORDER_TO_TREATMENT[s.toLowerCase().trim()]
    if (treatment) add(treatment)
  }

  for (const s of services) {
    const label = SERVICE_TO_SCHEMA[s.toLowerCase().trim()]
    if (label) add(label)
  }

  return result
}

export default async function ClinicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Handle legacy numeric ID URLs — permanently redirect to slug URL
  if (/^\d+$/.test(slug)) {
    const clinic = getClinicById(Number(slug))
    if (clinic?.slug) permanentRedirect(`/clinic/${clinic.slug}`)
    notFound()
  }

  const clinic = getClinicBySlug(slug)

  if (!clinic) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[image:var(--bg-primary)]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: clinic.name,
          alternateName: [
            `Sleep Clinic in ${clinic.city}, ${clinic.state}`,
            `Sleep Center in ${clinic.city}, ${clinic.state}`,
            `Sleep Lab in ${clinic.city}, ${clinic.state}`,
          ],
          description: clinic.description || `Sleep clinic in ${clinic.city}, ${clinic.state}`,
          url: `https://www.ussleepclinics.com/clinic/${slug}`,
          telephone: clinic.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: clinic.address,
            addressLocality: clinic.city,
            addressRegion: clinic.state,
            postalCode: clinic.zip,
            addressCountry: "US",
          },
          ...(clinic.coordinates && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: clinic.coordinates.lat,
              longitude: clinic.coordinates.lng,
            },
          }),
          ...(clinic.image && { image: clinic.image }),
          ...(clinic.website && { sameAs: clinic.website }),
          ...(clinic.accreditation && clinic.accreditation.length > 0 && {
            hasCredential: clinic.accreditation.map(name => ({
              "@type": "EducationalOccupationalCredential",
              name,
            })),
          }),
          ...(clinic.hours && formatOpeningHours(clinic.hours).length > 0 && {
            openingHours: formatOpeningHours(clinic.hours),
          }),
          ...(clinic.rating && {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: clinic.rating,
              reviewCount: clinic.reviewCount || 0,
            },
          }),
          ...(clinic.services && clinic.services.length > 0 && {
            medicalSpecialty: clinic.services,
          }),
          ...(() => {
            const services = buildAvailableServices(
              clinic.specialty ?? [],
              clinic.services ?? [],
              clinic.city,
              clinic.state
            )
            return services.length > 0 ? { availableService: services } : {}
          })(),
        }}
      />
      <Navigation />

      {/* Hero Section with new gradient */}
      <section className="bg-gradient-to-br from-[var(--midnight)] via-[var(--deep-navy)] to-[var(--twilight)] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2 transition-colors">
            ← Back to Directory
          </Link>
          <h1 className="font-[var(--font-display)] text-4xl font-bold bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] bg-clip-text text-transparent mt-4">
            {clinic.name}
            <span className="block text-2xl font-normal text-white/70 mt-1">
              Sleep Clinic in {clinic.city}, {clinic.state}
            </span>
          </h1>
        </div>
      </section>

      {/* Content Section with new card */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClinicDetailCard clinic={clinic} />
        </div>
      </section>
    </div>
  )
}
