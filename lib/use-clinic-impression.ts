"use client"

import { useEffect, type RefObject } from "react"
import { trackClinicImpression } from "./analytics"

/** Share of the card that has to be on screen, and for how long. */
const VISIBLE_RATIO = 0.5
const VISIBLE_MS = 1_000

/**
 * Records one impression for a paid clinic's card: the card was at least half
 * visible for a full second. Scrolling past quickly does not count, and a card
 * counts once per mount, so it is not re-counted every time it scrolls back
 * into view. A new result set (a new page, filter, or search) remounts the
 * cards and counts again, which is what an impression means.
 *
 * Does nothing for an unpaid clinic (`enabled` false), for a clinic without a
 * slug, or where IntersectionObserver is missing.
 */
export function useClinicImpression(
  ref: RefObject<Element | null>,
  details: { clinicSlug: string | undefined; featured: boolean; enabled: boolean }
): void {
  const { clinicSlug, featured, enabled } = details

  useEffect(() => {
    const element = ref.current
    if (!enabled || !clinicSlug || !element || typeof IntersectionObserver === "undefined") return

    let timer: ReturnType<typeof setTimeout> | null = null
    let counted = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (counted) return
        if (entry.isIntersecting && entry.intersectionRatio >= VISIBLE_RATIO) {
          timer ??= setTimeout(() => {
            counted = true
            trackClinicImpression({ clinicSlug, featured })
            observer.disconnect()
          }, VISIBLE_MS)
        } else if (timer) {
          clearTimeout(timer)
          timer = null
        }
      },
      { threshold: [0, VISIBLE_RATIO] }
    )

    observer.observe(element)
    return () => {
      if (timer) clearTimeout(timer)
      observer.disconnect()
    }
  }, [ref, clinicSlug, featured, enabled])
}
