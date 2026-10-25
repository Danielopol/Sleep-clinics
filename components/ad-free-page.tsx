"use client"

import { useEffect } from "react"

type AdsQueue = unknown[] & { pauseAdRequests?: number }

/**
 * Keeps AdSense from requesting ads while this page is open. Rendered on the
 * clinic page of a clinic with a live paid plan, which promises "no third-party
 * ads on your clinic's page".
 *
 * Covers a client-side navigation onto the page, and resumes ads when the
 * visitor leaves. A full page load is covered by AdFreeGuard in the root
 * layout's <head>, which has to run before the AdSense script does.
 */
export function AdFreePage() {
  useEffect(() => {
    const w = window as unknown as { adsbygoogle?: AdsQueue }
    w.adsbygoogle = w.adsbygoogle || []
    w.adsbygoogle.pauseAdRequests = 1
    return () => {
      if (w.adsbygoogle) w.adsbygoogle.pauseAdRequests = 0
    }
  }, [])

  return null
}
