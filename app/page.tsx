"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ClinicCard } from "@/components/clinic-card"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { Clinic } from "@/lib/data"
import { useState, useEffect, useCallback, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { ChevronDown, Loader2 } from "lucide-react"

const CLINICS_PER_PAGE = 20

interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}

interface Filters {
  specialty: string
  state: string
  city: string
  selectedFilters: string[]
  accreditation?: string
}

export default function HomePage() {
  const searchParams = useSearchParams()
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [metadata, setMetadata] = useState<{ states: string[], cities: string[], specialties: string[], services: string[] }>({
    states: [],
    cities: [],
    specialties: [],
    services: []
  })
  const [currentFilters, setCurrentFilters] = useState<Filters>({
    specialty: '',
    state: '',
    city: '',
    selectedFilters: []
  })

  // Build API URL with filters
  const buildApiUrl = useCallback((page: number, filters: Filters, searchQuery?: string | null) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    params.set('limit', CLINICS_PER_PAGE.toString())

    if (searchQuery) {
      params.set('q', searchQuery)
    }
    if (filters.state) {
      params.set('state', filters.state)
    }
    if (filters.city) {
      params.set('city', filters.city)
    }
    if (filters.specialty) {
      params.set('specialty', filters.specialty)
    }
    if (filters.selectedFilters.length > 0) {
      params.set('services', filters.selectedFilters.join(','))
    }
    if (filters.accreditation) {
      params.set('accreditation', filters.accreditation)
    }

    return `/api/clinics?${params.toString()}`
  }, [])

  // Fetch clinics with pagination
  const fetchClinics = useCallback(async (page: number, filters: Filters, searchQuery?: string | null, append = false) => {
    try {
      if (page === 1) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const url = buildApiUrl(page, filters, searchQuery)
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch clinics')
      }

      const data = await response.json()

      if (append) {
        setClinics(prev => [...prev, ...data.clinics])
      } else {
        setClinics(data.clinics)
      }
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching clinics:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [buildApiUrl])

  // Fetch metadata on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch('/api/clinics?type=metadata')
        if (response.ok) {
          const data = await response.json()
          setMetadata(data)
        }
      } catch (error) {
        console.error('Error fetching metadata:', error)
      }
    }
    fetchMetadata()
  }, [])

  // Initial fetch and search query changes
  useEffect(() => {
    const query = searchParams.get("q")
    const accreditation = searchParams.get("accreditation")

    // Update filters with URL params
    const filtersWithAccreditation = {
      ...currentFilters,
      accreditation: accreditation || undefined
    }

    fetchClinics(1, filtersWithAccreditation, query)
  }, [searchParams, fetchClinics, currentFilters])

  const handleFilterChange = (filters: Filters) => {
    setCurrentFilters(filters)
    // fetchClinics will be triggered by the useEffect above due to currentFilters change
  }

  const handleShowMore = () => {
    if (pagination && pagination.hasMore && !loadingMore) {
      const query = searchParams.get("q")
      fetchClinics(pagination.page + 1, currentFilters, query, true)
    }
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
                  {/* Results count */}
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    Showing {clinics.length} of {pagination?.total || 0} clinics
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {clinics.map((clinic, index) => (
                      <div
                        key={clinic.id}
                        className="animate-[fadeInUp_0.4s_ease_backwards]"
                        style={{ animationDelay: `${Math.min(index % CLINICS_PER_PAGE, 5) * 0.05}s` }}
                      >
                        <ClinicCard clinic={clinic} />
                      </div>
                    ))}
                  </div>

                  {/* Show More Button */}
                  {pagination?.hasMore && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={handleShowMore}
                        disabled={loadingMore}
                        className="group flex items-center gap-2 px-6 py-3 bg-[#7C9070] hover:bg-[#6B7F60] disabled:bg-[#7C9070]/70 text-white rounded-xl font-semibold transition-all duration-200 shadow-md shadow-[#7C9070]/20"
                      >
                        {loadingMore ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            Show More
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {clinics.length === 0 && (
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
