"use client"

import type { Clinic } from "@/lib/data"
import { Star, MapPin, Phone, Mail, Globe, Navigation, Clock, ChevronDown, CheckCircle, FileText } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { GoogleReviews } from "@/components/google-reviews"

interface ClinicDetailCardProps {
  clinic: Clinic
}

// Helper function to check if clinic is currently open
function isClinicOpen(hours: Record<string, string> | undefined): boolean {
  if (!hours) return false

  const now = new Date()
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  const todayHours = hours[currentDay]

  // If closed or no hours for today
  if (!todayHours || todayHours.toLowerCase() === 'closed') {
    return false
  }

  // Handle "Open 24 hours" case
  if (todayHours.toLowerCase().includes('24 hour') || todayHours.toLowerCase().includes('24-hour')) {
    return true
  }

  // Try to parse the hours string (e.g., "7:30 a.m. - 4:30 p.m." or "7:00 AM – 6:00 PM")
  const timeRegex = /(\d{1,2}):?(\d{2})?\s*(a\.?m\.?|p\.?m\.?)/gi
  const times = todayHours.match(timeRegex)

  if (!times || times.length < 2) {
    // Can't parse hours, assume open during business hours
    return false
  }

  const parseTime = (timeStr: string): number => {
    const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(a\.?m\.?|p\.?m\.?)/i)
    if (!match) return 0

    let hour = parseInt(match[1], 10)
    const minutes = match[2] ? parseInt(match[2], 10) : 0
    const isPM = match[3].toLowerCase().includes('p')

    if (isPM && hour !== 12) hour += 12
    if (!isPM && hour === 12) hour = 0

    return hour * 60 + minutes
  }

  const openTime = parseTime(times[0])
  const closeTime = parseTime(times[1])
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  return currentMinutes >= openTime && currentMinutes < closeTime
}

const PLACEHOLDER_IMAGE = "/images/clinic-placeholder.svg"

function getImageUrl(url: string | undefined): string {
  if (!url) return PLACEHOLDER_IMAGE
  // Proxy Google images to avoid referrer blocking
  if (url.includes('googleusercontent.com') || url.includes('googleapis.com')) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`
  }
  return url
}

export function ClinicDetailCard({ clinic }: ClinicDetailCardProps) {
  const [hoursExpanded, setHoursExpanded] = useState(false)
  const [imgSrc, setImgSrc] = useState(getImageUrl(clinic.image))
  const fullAddress = `${clinic.address}, ${clinic.city}, ${clinic.state} ${clinic.zip}`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`

  // Get today's day of week
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()

  // Calculate if clinic is actually open based on hours
  const isOpen = clinic.hours ? isClinicOpen(clinic.hours) : false

  return (
    <article className="bg-white dark:bg-[var(--bg-card)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] transition-all duration-[var(--transition-slow)] relative w-full max-w-none">
      {/* Aurora gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] z-10"></div>

      {/* Top Section - Hero + Contact Side by Side */}
      <div className="grid md:grid-cols-2 gap-0">
        {/* Hero Image Section */}
        <div className="relative min-h-80 overflow-hidden">
          <img
            src={imgSrc}
            alt={clinic.name}
            onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
            className="w-full h-full object-cover transition-transform duration-[var(--transition-slow)] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.7)] via-[rgba(15,23,42,0.1)] to-transparent"></div>

          {/* Rating Badge */}
          {clinic.rating && (
            <a
              href="#reviews"
              className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1.5 bg-white/95 dark:bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-[var(--warning)] shadow-[var(--shadow-md)] hover:scale-110 transition-transform"
            >
              <Star className="w-3 h-3 fill-current" />
              {clinic.rating}
            </a>
          )}

          {/* Clinic Name on Hero */}
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-white drop-shadow-md mb-1">
              {clinic.name}
            </h2>
            {clinic.clinicType && (
              <p className="text-sm text-white/85 font-medium tracking-wide">
                {clinic.clinicType}
              </p>
            )}
          </div>
        </div>

        {/* Contact Panel - Right Side */}
        <div className="p-6 bg-gradient-to-br from-[var(--pearl)] to-[var(--cloud)] dark:from-[var(--twilight)] dark:to-[var(--deep-navy)]">
          <div className="space-y-4">
            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-[var(--bg-card)] rounded-lg text-[var(--dream-blue)] shadow-sm flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-semibold block mb-0.5">Address</span>
                <span className="text-sm text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                  {clinic.address}
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-[var(--bg-card)] rounded-lg text-[var(--dream-blue)] shadow-sm flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-semibold block mb-0.5">Phone</span>
                <a
                  href={`tel:${clinic.phone.replace(/\D/g, "")}`}
                  className="text-sm text-[var(--dream-blue)] hover:text-[var(--dream-blue-dark)] font-medium transition-colors"
                >
                  {clinic.phone}
                </a>
              </div>
            </div>

            {/* Fax */}
            {clinic.fax && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-[var(--bg-card)] rounded-lg text-[var(--dream-blue)] shadow-sm flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-semibold block mb-0.5">Fax</span>
                  <span className="text-sm text-[var(--text-primary)] dark:text-[var(--text-primary)] font-medium">{clinic.fax}</span>
                </div>
              </div>
            )}

            {/* Email */}
            {clinic.email && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 flex items-center justify-center bg-white dark:bg-[var(--bg-card)] rounded-lg text-[var(--dream-blue)] shadow-sm flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-semibold block mb-0.5">Email</span>
                  <a
                    href={`mailto:${clinic.email}`}
                    className="text-sm text-[var(--dream-blue)] hover:text-[var(--dream-blue-dark)] font-medium transition-colors break-all"
                  >
                    {clinic.email}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Hours Section */}
          {clinic.hours && (
            <div className="mt-6">
              <button
                onClick={() => setHoursExpanded(!hoursExpanded)}
                className="w-full flex items-center justify-between py-2 cursor-pointer group"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                  <Clock className="w-4 h-4 text-[var(--healing-teal)]" />
                  Hours of Operation
                </span>
                {clinic.hours && (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    isOpen
                      ? 'bg-[var(--success)]/10 text-[var(--success)]'
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {isOpen ? 'Open Now' : 'Closed'}
                  </span>
                )}
                <ChevronDown
                  className={`w-3 h-3 text-[var(--text-secondary)] transition-transform ${
                    hoursExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                hoursExpanded ? 'max-h-96 pt-2' : 'max-h-0'
              }`}>
                <div className="space-y-1.5">
                  {Object.entries(clinic.hours).map(([day, time]) => (
                    <div
                      key={day}
                      className={`flex justify-between text-sm py-1 px-2 rounded-lg ${
                        today === day ? 'bg-[var(--dream-blue)]/8' : ''
                      }`}
                    >
                      <span className={`capitalize ${
                        today === day
                          ? 'text-[var(--dream-blue)] font-semibold'
                          : 'text-[var(--text-secondary)]'
                      }`}>
                        {day}
                      </span>
                      <span className="text-[var(--text-primary)] dark:text-[var(--text-primary)] font-medium">
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Hours Note (when no structured hours available) */}
          {!clinic.hours && clinic.hoursNote && (
            <div className="mt-6">
              <div className="flex items-center gap-2 py-2">
                <Clock className="w-4 h-4 text-[var(--healing-teal)]" />
                <span className="text-sm font-semibold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                  Hours
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] italic pl-6">
                {clinic.hoursNote}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Quick Info Pills */}
        {clinic.accreditation && clinic.accreditation.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {clinic.accreditation.map((acc) => (
              <span
                key={acc}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-[var(--dream-blue)]/10 via-[var(--healing-teal)]/10 to-[var(--calm-indigo)]/10 rounded-full text-sm text-[var(--text-primary)] dark:text-[var(--text-primary)] font-medium"
              >
                <CheckCircle className="w-3.5 h-3.5 text-[var(--dream-blue)]" />
                {acc}
              </span>
            ))}
            {clinic.accreditation.some(acc => acc.toLowerCase().includes('aasm')) && (
              <Image
                src="/images/AASM Logo.png"
                alt="AASM Accredited Sleep Center"
                width={100}
                height={50}
                className="object-contain"
              />
            )}
          </div>
        )}

        {/* Services Section */}
        {clinic.services && clinic.services.length > 0 && (
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-semibold block mb-2">
              Services
            </span>
            <div className="flex flex-wrap gap-1.5">
              {clinic.services.map((service) => (
                <span
                  key={service}
                  className="px-3 py-1 bg-white dark:bg-[var(--bg-card)] border border-[var(--border-color)] rounded-full text-xs text-[var(--text-secondary)] font-medium hover:border-[var(--dream-blue)] hover:text-[var(--dream-blue)] hover:bg-[var(--dream-blue)]/5 transition-all cursor-default"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {clinic.description && (
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            {clinic.description}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {clinic.website && (
            <a
              href={clinic.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] text-white rounded-xl text-sm font-semibold shadow-[0_4px_14px_rgba(14,165,233,0.35)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.45)] hover:-translate-y-0.5 transition-all"
            >
              <Globe className="w-4 h-4" />
              Visit Website
            </a>
          )}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-[var(--bg-card)] text-[var(--text-primary)] dark:text-[var(--text-primary)] border-2 border-[var(--border-color)] rounded-xl text-sm font-semibold hover:border-[var(--dream-blue)] hover:text-[var(--dream-blue)] hover:bg-[var(--dream-blue)]/5 transition-all"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </a>
        </div>

        {/* Mini Map */}
        <div className="mt-4 rounded-xl overflow-hidden h-32 relative bg-gradient-to-br from-[var(--dream-blue)]/10 to-[var(--healing-teal)]/10">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0 saturate-90 contrast-105"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-[var(--bg-card)]/80 to-transparent pointer-events-none"></div>
        </div>

        {/* Google Reviews Section */}
        {clinic.reviews && clinic.reviews.length > 0 && (
          <GoogleReviews
            reviews={clinic.reviews}
            overallRating={clinic.rating}
            totalReviews={clinic.reviewCount}
            clinicName={clinic.name}
            mapsUrl={mapsUrl}
          />
        )}
      </div>
    </article>
  )
}
