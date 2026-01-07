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
import { ChevronDown } from "lucide-react"

const CLINICS_PER_PAGE = 20

export default function HomePage() {
  const searchParams = useSearchParams()
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([])
  const [visibleCount, setVisibleCount] = useState(CLINICS_PER_PAGE)
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
      setVisibleCount(CLINICS_PER_PAGE) // Reset pagination on search
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
    setVisibleCount(CLINICS_PER_PAGE) // Reset pagination on filter change
  }

  const handleShowMore = () => {
    setVisibleCount(prev => prev + CLINICS_PER_PAGE)
  }

  const visibleClinics = filteredClinics.slice(0, visibleCount)
  const hasMoreClinics = visibleCount < filteredClinics.length

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
                  {/* Results count */}
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    Showing {visibleClinics.length} of {filteredClinics.length} clinics
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {visibleClinics.map((clinic, index) => (
                      <div
                        key={clinic.id}
                        className="animate-[fadeInUp_0.4s_ease_backwards]"
                        style={{ animationDelay: `${Math.min(index, 5) * 0.05}s` }}
                      >
                        <ClinicCard clinic={clinic} />
                      </div>
                    ))}
                  </div>

                  {/* Show More Button */}
                  {hasMoreClinics && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={handleShowMore}
                        className="group flex items-center gap-2 px-6 py-3 bg-[#7C9070] hover:bg-[#6B7F60] text-white rounded-xl font-semibold transition-all duration-200 shadow-md shadow-[#7C9070]/20"
                      >
                        Show More
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                      </button>
                    </div>
                  )}

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
