import { Navigation } from "@/components/navigation"
import { ClinicDetailCard } from "@/components/clinic-detail-card"
import { getClinicById } from "@/lib/clinics"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function ClinicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const clinic = getClinicById(Number.parseInt(id))

  if (!clinic) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[image:var(--bg-primary)]">
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
