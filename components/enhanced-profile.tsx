"use client"

import { useCallback, useEffect, useState } from "react"
import { Check, ChevronLeft, ChevronRight, ExternalLink, Phone, X } from "lucide-react"
import { trackClinicOutboundClick } from "@/lib/analytics"
import type { EnhancedPhoto } from "@/lib/enhanced-profile"

/**
 * The parts of an Enhanced Profile that render on the clinic page. Shown only
 * while the clinic holds a live paid plan: the page decides, these just draw.
 */

/** The prominent Call and Visit website buttons, under the clinic's name. */
export function EnhancedActionBar({
  clinicSlug,
  phone,
  website,
}: {
  clinicSlug: string
  phone: string | null
  website: string | null
}) {
  if (!phone && !website) return null
  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-3">
      {phone && (
        <a
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          onClick={() => trackClinicOutboundClick({ clinicSlug, target: "phone", placement: "clinic_page" })}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--healing-teal)] hover:brightness-110 text-white text-lg font-semibold shadow-lg transition-all"
        >
          <Phone className="w-5 h-5" />
          Call {phone}
        </a>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener"
          onClick={() => trackClinicOutboundClick({ clinicSlug, target: "website", placement: "clinic_page" })}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/95 hover:bg-white text-[var(--midnight)] text-lg font-semibold shadow-lg transition-all"
        >
          <ExternalLink className="w-5 h-5" />
          Visit website
        </a>
      )}
    </div>
  )
}

function PhotoGallery({ photos }: { photos: EnhancedPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null)

  const step = useCallback(
    (delta: number) => setOpen((i) => (i == null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length]
  )

  useEffect(() => {
    if (open == null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, step])

  if (photos.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Photos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo.url}
            type="button"
            onClick={() => setOpen(i)}
            className={`relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--healing-teal)] ${
              i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-[4/3]"
            }`}
            aria-label={`Open photo ${i + 1} of ${photos.length}: ${photo.alt}`}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              loading={i < 3 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open != null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].alt}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <img
            src={photos[open].url}
            alt={photos[open].alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
              <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/70">
                {open + 1} / {photos.length}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function Checklist({ title, items, children }: { title: string; items: string[]; children?: React.ReactNode }) {
  if (items.length === 0 && !children) return null
  return (
    <div className="bg-white dark:bg-[var(--bg-card)] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-[var(--healing-teal)] mt-0.5 shrink-0" />
            <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}

/** Photos, then services, equipment, and insurance, below the clinic's main card. */
export function EnhancedProfileDetails({
  photos,
  services,
  equipment,
  insurance,
  insuranceNote,
}: {
  photos: EnhancedPhoto[]
  services: string[]
  equipment: string[]
  insurance: string[]
  insuranceNote: string | null
}) {
  const hasInsurance = insurance.length > 0 || Boolean(insuranceNote)
  const hasLists = services.length > 0 || equipment.length > 0 || hasInsurance
  if (photos.length === 0 && !hasLists) return null

  return (
    <section className="mt-10 space-y-10">
      <PhotoGallery photos={photos} />

      {hasLists && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <Checklist title="Services" items={services} />
          <Checklist title="Equipment and therapies" items={equipment} />
          {hasInsurance && (
            <Checklist title="Insurance accepted" items={insurance}>
              {insuranceNote && (
                <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">{insuranceNote}</p>
              )}
              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                Coverage depends on your plan. Confirm with the clinic before your visit.
              </p>
            </Checklist>
          )}
        </div>
      )}
    </section>
  )
}
