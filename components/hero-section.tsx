"use client"

import type React from "react"

import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function HeroSection() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "")

  // Keep the input in sync with the URL query (e.g. back/forward navigation)
  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "")
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/")
  }

  const handleClear = () => {
    setSearchQuery("")
    router.push("/")
  }

  const handleChange = (value: string) => {
    setSearchQuery(value)
    // Removing the term should bring back all clinics
    if (value === "" && searchParams.get("q")) {
      router.push("/")
    }
  }

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden bg-gradient-to-br from-[var(--midnight)] via-[var(--deep-navy)] to-[var(--twilight)]">
      {/* Background image - full width cover */}
      <img
        src="/images/Hero section_4.png"
        alt="Peaceful bedroom with moon and starry night sky"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight)]/80 via-transparent to-[var(--midnight)]/40" />

      {/* Content overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Main Headline */}
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            Can't Sleep?
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            Discover the nation's largest network of verified sleep specialists and AASM-accredited clinics.
            Expert diagnosis and treatment for every sleep disorder, from chronic insomnia to sleep apnea, all within reach.
          </p>

          {/* Search Bar with aurora glow */}
          <form onSubmit={handleSearch} className="pt-4">
            <div className="relative group max-w-2xl mx-auto">
              {/* Aurora outer glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] rounded-full blur-xl opacity-40"></div>
              {/* Aurora inner glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] rounded-full blur-md opacity-60"></div>
              <div className="relative flex items-center bg-white/95 dark:bg-white/95 rounded-full shadow-[var(--shadow-xl)] border border-[var(--dream-blue)]/20 backdrop-blur-sm">
                <input
                  type="text"
                  placeholder="Search clinic, city, state, or service..."
                  value={searchQuery}
                  onChange={(e) => handleChange(e.target.value)}
                  className="flex-1 min-w-0 pl-4 pr-2 sm:pl-8 sm:pr-4 py-4 bg-transparent text-[#1e293b] placeholder-[#64748b] focus:outline-none text-sm sm:text-lg font-medium dark:text-[#1e293b] dark:placeholder-[#64748b]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear search"
                    className="flex-shrink-0 p-1.5 mr-1 text-[#64748b] hover:text-[#1e293b] hover:bg-slate-200/60 rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
                <button type="submit" aria-label="Search" className="flex-shrink-0 px-3 sm:px-6 py-4 text-[var(--dream-blue)] hover:text-[var(--dream-blue-dark)] transition-colors">
                  <Search size={22} />
                </button>
              </div>
            </div>
          </form>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--healing-teal)]" />
              <span>4,000+ Verified Clinics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--dream-blue)]" />
              <span>AASM Accredited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--calm-indigo)]" />
              <span>All 50 States</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
