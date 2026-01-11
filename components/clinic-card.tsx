"use client"

import { useState } from "react"
import { ArrowRight, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import type { Clinic } from "@/lib/data"

interface ClinicCardProps {
  clinic: Clinic
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

export function ClinicCard({ clinic }: ClinicCardProps) {
  const [imgSrc, setImgSrc] = useState(getImageUrl(clinic.image))
  const fullAddress = `${clinic.address}, ${clinic.city}, ${clinic.state} ${clinic.zip}`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
  // Show only the first phone number on the card
  const firstPhone = clinic.phone.split(';')[0].trim()

  return (
    <div className="group bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col relative">
      {/* Image Section */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={imgSrc}
          alt={clinic.name}
          onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

        {/* Rating badge */}
        {clinic.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-amber-400 rounded text-xs font-bold text-slate-900 shadow-lg">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {clinic.rating}
          </div>
        )}

      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Clinic Name */}
        <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-base mb-3 leading-snug line-clamp-2">
          {clinic.name}
        </h3>

        {/* Address with icon */}
        <div className="flex items-start gap-2 mb-3">
          <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{clinic.address}</p>
        </div>

        {/* Phone Number with icon */}
        <div className="flex items-center gap-2 mb-5">
          <Phone size={14} className="text-slate-400 shrink-0" />
          <a
            href={`tel:${firstPhone.replace(/\D/g, "")}`}
            className="text-slate-700 dark:text-slate-300 font-medium text-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            {firstPhone}
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/clinic/${clinic.id}`}
            className="flex-1 bg-[#7C9070] hover:bg-[#6B7F60] text-white py-2.5 px-4 rounded-lg transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 shadow-sm shadow-[#7C9070]/20"
          >
            View Details
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200 flex items-center justify-center"
            aria-label="Get directions"
          >
            <MapPin size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
