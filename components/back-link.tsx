"use client"

import type React from "react"
import { useRouter } from "next/navigation"

/**
 * "Back" control that returns to the previous page (e.g. the city/state directory
 * the user came from) instead of always going to the homepage. Falls back to
 * `fallbackHref` when there is no in-tab history (direct landing, opened in new tab).
 */
export function BackLink({
  fallbackHref = "/",
  label = "Back to Directory",
  className,
}: {
  fallbackHref?: string
  label?: string
  className?: string
}) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let modifier / non-left clicks open the fallback href normally (new tab, etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackHref)
    }
  }

  return (
    <a href={fallbackHref} onClick={handleClick} className={className}>
      ← {label}
    </a>
  )
}
