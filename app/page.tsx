"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ClinicCard } from "@/components/clinic-card"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { Clinic } from "@/lib/data"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function HomePage() {
  const searchParams = useSearchParams()
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(true)
  const [metadata, setMetadata] = useState<{ states: string[], cities: string[], specialties: string[], services: string[] }>({
    states: [],
    cities: [],
    specialties: [],
    services: []
  })

  // Fetch clinics and metadata from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch clinics and metadata in parallel
        const [clinicsResponse, metadataResponse] = await Promise.all([
          fetch('/api/clinics'),
          fetch('/api/clinics?type=metadata')
        ])

        if (!clinicsResponse.ok || !metadataResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const clinicsData = await clinicsResponse.json()
        const metadataData = await metadataResponse.json()

        setClinics(clinicsData)
        setFilteredClinics(clinicsData)
        setMetadata(metadataData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle search query changes
  useEffect(() => {
    const query = searchParams.get("q")
    if (query && clinics.length > 0) {
      const filtered = clinics.filter(
        (clinic) =>
          clinic.name.toLowerCase().includes(query.toLowerCase()) ||
          clinic.specialty.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
          clinic.city.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredClinics(filtered)
    } else {
      setFilteredClinics(clinics)
    }
  }, [searchParams, clinics])

  const handleFilterChange = (filters: {
    specialty: string
    state: string
    city: string
    selectedFilters: string[]
  }) => {
    let filtered = [...clinics]

    if (filters.specialty) {
      filtered = filtered.filter((clinic) => clinic.services?.includes(filters.specialty))
    }

    if (filters.state) {
      filtered = filtered.filter((clinic) => clinic.state === filters.state)
    }

    if (filters.city) {
      filtered = filtered.filter((clinic) => clinic.city === filters.city)
    }

    if (filters.selectedFilters.length > 0) {
      filtered = filtered.filter((clinic) =>
        filters.selectedFilters.some((filter) => clinic.services?.includes(filter)),
      )
    }

    setFilteredClinics(filtered)
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />

      {/* Main Content Section with new gradient background */}
      <section className="bg-[image:var(--bg-primary)] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <FilterSidebar
                onFilterChange={handleFilterChange}
                states={metadata.states}
                cities={metadata.cities}
                specialties={metadata.specialties}
                services={metadata.services}
              />
            </aside>

            {/* Clinic Cards Grid */}
            <main className="flex-1">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                  <p className="text-[var(--text-secondary)] text-lg mt-4">Loading clinics...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-[fadeInUp_0.6s_ease_backwards]">
                    {filteredClinics.map((clinic, index) => (
                      <div
                        key={clinic.id}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        className="animate-[fadeInUp_0.6s_ease_backwards]"
                      >
                        <ClinicCard clinic={clinic} />
                      </div>
                    ))}
                  </div>

                  {filteredClinics.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-[var(--text-secondary)] text-lg">
                        No clinics found matching your criteria. Please adjust your filters.
                      </p>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
