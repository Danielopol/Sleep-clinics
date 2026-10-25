import Link from "next/link"
import { BadgeCheck, Star } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ClinicDetailCard } from "@/components/clinic-detail-card"
import { LeadRequestForm } from "@/components/lead-request-form"
import { getEnhancedProfile, getListingBadges } from "@/lib/listings"
import { EnhancedActionBar, EnhancedProfileDetails } from "@/components/enhanced-profile"
import { getClinicBySlug, getClinicsData, formatOpeningHours } from "@/lib/clinics"
import { resolveLegacyClinicId } from "@/lib/legacy-ids"
import { notFound, permanentRedirect } from "next/navigation"
import { BackLink } from "@/components/back-link"
import { ClinicRelatedLinks } from "@/components/clinic-related-links"
import { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { OG_IMAGE } from "@/lib/og-image"
import { offersSleepStudy } from "@/lib/locations"
import { FEATURED_LABEL } from "@/lib/pricing"
import { formatConfirmedDate } from "@/lib/confirmed-date"
import { AdFreePage } from "@/components/ad-free-page"

// Pre-render only the highest-signal clinics (by review count) at build time; the
// rest render on-demand on first request and are then cached (ISR). This keeps the
// build from statically rendering all ~4,700 clinic pages, cutting build CPU.
export const dynamicParams = true

// No time-based revalidate, deliberately: every regeneration is a billed ISR
// write, and ~4,700 pages on a timer adds up. A page is rebuilt on deploy, or
// on demand when a paid plan starts or ends (the Stripe webhook). Supabase
// edits (an Enhanced Profile, a confirmation) appear on the next deploy.

export async function generateStaticParams() {
  const clinics = getClinicsData()
  return clinics
    .filter(c => c.slug)
    .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
    .slice(0, 150)
    .map(c => ({ slug: c.slug! }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const legacy = /^\d+$/.test(slug) ? resolveLegacyClinicId(slug) : null
  const clinic = legacy
    ? typeof legacy === "object" ? getClinicBySlug(legacy.slug) : undefined
    : getClinicBySlug(slug)

  if (!clinic) {
    // This route keeps dynamicParams enabled (only the top 150 clinics are
    // prerendered), so an unknown slug still renders and Next answers HTTP 200
    // rather than 404. noindex is what keeps Google from treating that soft 404
    // as a real page worth indexing.
    return { title: "Clinic Not Found", robots: { index: false, follow: false } }
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

  // Most searches that reach a clinic page are the clinic's own name, often
  // with "reviews", "phone", or "sleep study" added. The title names what the
  // page actually has for that searcher, and only claims reviews when there
  // are some. The site-name suffix is dropped: it adds nothing to a
  // navigational search and pushes the useful words past the cut-off.
  const hasReviews = (clinic.reviewCount ?? 0) > 0
  const doesTesting = offersSleepStudy(clinic)
  const extras = doesTesting
    ? hasReviews ? "Sleep Study, Reviews & Phone" : "Sleep Study, Hours & Phone"
    : hasReviews ? "Reviews, Hours & Phone" : "Hours & Phone"
  const title = `${clinic.name}${locationSuffix}, ${clinic.city}, ${clinic.state}: ${extras}`

  // Lead the snippet with the facts a searcher compares on (rating, phone),
  // then the clinic description, cut at a word boundary.
  const firstPhone = clinic.phone?.split(";")[0].trim()
  const lead = [
    hasReviews && clinic.rating && `Rated ${clinic.rating}/5 from ${clinic.reviewCount} ${clinic.reviewCount === 1 ? "review" : "reviews"}.`,
    firstPhone && `Call ${firstPhone}.`,
  ].filter(Boolean).join(" ")
  const body = clinic.description
    || `${clinic.name} is a sleep clinic in ${clinic.city}, ${clinic.state} offering ${clinic.services?.slice(0, 3).join(", ") || "sleep medicine care"}.`
  const description = truncateAtWord((lead ? `${lead} ${body}` : body).replace(/\s+/g, " ").trim(), 160)

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `https://www.ussleepclinics.com/clinic/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.ussleepclinics.com/clinic/${slug}`,
      images: OG_IMAGE,
    },
  }
}

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 3)
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.]+$/, "")}...`
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
  // These overlap with DISORDER_TO_TREATMENT, deduplication handles it
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

  // Legacy numeric ID URLs are normally rewritten to /api/clinic-redirect
  // (next.config.mjs) before reaching this page; this is only a fallback.
  if (/^\d+$/.test(slug)) {
    const resolved = resolveLegacyClinicId(slug)
    if (typeof resolved === "object") permanentRedirect(`/clinic/${resolved.slug}`)
    notFound()
  }

  const listed = getClinicBySlug(slug)

  if (!listed) {
    notFound()
  }

  const badges = await getListingBadges()
  const isConfirmed = badges.confirmed.has(slug)
  const confirmedOn = formatConfirmedDate(badges.confirmed.get(slug))
  const isFeatured = badges.featured.has(slug)
  // Any live paid plan promises no third-party ads on the clinic's own page.
  const isAdFree = badges.paid.has(slug)

  // Enhanced Profile content renders only while a paid plan is live; the row
  // stays in Supabase after a plan ends and must stop showing then.
  const enhanced = badges.paid.has(slug) ? await getEnhancedProfile(slug, listed.name) : null
  // Its description and first photo replace the directory's, everywhere on the
  // page including the structured data.
  const clinic = enhanced
    ? {
        ...listed,
        ...(enhanced.description && { description: enhanced.description }),
        ...(enhanced.photos[0] && { image: enhanced.photos[0].url }),
      }
    : listed
  const callPhone = enhanced ? enhanced.callPhone ?? (clinic.phone?.split(";")[0].trim() || null) : null
  const websiteUrl = enhanced ? enhanced.websiteUrl ?? clinic.website ?? null : null

  return (
    <div className="min-h-screen bg-[image:var(--bg-primary)]">
      {isAdFree && <AdFreePage />}
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
          ...(enhanced && enhanced.photos.length > 1
            ? { image: enhanced.photos.map((photo) => photo.url) }
            : clinic.image && { image: clinic.image }),
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
          <BackLink
            fallbackHref="/"
            label="Back to Directory"
            className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-2 transition-colors cursor-pointer"
          />
          <h1 className="font-[var(--font-display)] text-4xl font-bold bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] bg-clip-text text-transparent mt-4">
            {clinic.name}
            <span className="block text-2xl font-normal text-white/70 mt-1">
              Sleep Clinic in {clinic.city}, {clinic.state}
            </span>
          </h1>

          {(isConfirmed || isFeatured) && (
            <div className="flex flex-wrap items-center gap-3 mt-5">
              {isConfirmed && (
                <span
                  title="The clinic checked these details with us. This is free and is never sold."
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--healing-teal)] text-white text-sm font-semibold"
                >
                  <BadgeCheck className="w-4 h-4" />
                  {confirmedOn
                    ? `Details confirmed by the clinic on ${confirmedOn}`
                    : "Details confirmed by the clinic"}
                </span>
              )}
              {isFeatured && (
                <span
                  title="Featured listings are paid advertising placements"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-sm font-semibold"
                >
                  <Star className="w-4 h-4" fill="currentColor" />
                  {FEATURED_LABEL}
                </span>
              )}
            </div>
          )}

          {enhanced && <EnhancedActionBar clinicSlug={slug} phone={callPhone} website={websiteUrl} />}
        </div>
      </section>

      {/* Content Section with new card */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClinicDetailCard clinic={clinic} hideServices={(enhanced?.services.length ?? 0) > 0} />

          {enhanced && (
            <EnhancedProfileDetails
              photos={enhanced.photos}
              services={enhanced.services}
              equipment={enhanced.equipment}
              insurance={enhanced.insurance}
              insuranceNote={enhanced.insuranceNote}
            />
          )}

          {/* Renders only for an active lead partner (docs/LEAD-REQUESTS.md). */}
          <LeadRequestForm clinicSlug={slug} clinicName={clinic.name} clinicPhone={clinic.phone} />

          {/* Owner entry point. Clinic staff usually arrive here by searching
              their own name, so this is where a claim gets started. Hidden once
              the clinic has confirmed its details, since it has already claimed. */}
          {!isConfirmed && (
            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  Is this your clinic?
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Claim this listing free to correct your details. Claiming and correcting your
                  listing is always free.
                </p>
              </div>
              <Link
                href={`/claim?clinic=${slug}`}
                className="shrink-0 px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold transition-all text-sm shadow-md shadow-indigo-500/20"
              >
                Claim this listing free
              </Link>
            </div>
          )}

          {isFeatured && (
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              This clinic holds a featured placement, which is paid advertising. Paying does not
              change its information, its rating, or whether it appears in this directory.
            </p>
          )}
        </div>
      </section>

      <ClinicRelatedLinks clinic={clinic} />
    </div>
  )
}
