import { Navigation } from "@/components/navigation"
import { ClinicDetailCard } from "@/components/clinic-detail-card"
import { getClinicBySlug, getClinicById, getClinicsData } from "@/lib/clinics"
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

  const title = `${clinic.name} - Sleep Clinic in ${clinic.city}, ${clinic.state}`
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
          ...(clinic.website && { sameAs: clinic.website }),
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
