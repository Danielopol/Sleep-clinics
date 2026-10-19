"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { trackClinicOutboundClick, type ClinicClickPlacement } from "@/lib/analytics"

interface FaxCopyButtonProps {
  fax: string
  clinicSlug: string | undefined
  placement: ClinicClickPlacement
  className?: string
}

function copyWithTextarea(text: string): boolean {
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand("copy")
  } catch {
    return false
  } finally {
    textarea.remove()
  }
}

/**
 * Shows a clinic's fax number as a button that copies it to the clipboard.
 * A tel: link would be wrong here: nobody dials a fax from a browser, they
 * paste the number into a fax service or an EHR referral form.
 */
export function FaxCopyButton({ fax, clinicSlug, placement, className = "" }: FaxCopyButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function handleClick() {
    trackClinicOutboundClick({ clinicSlug, target: "fax", placement })
    try {
      await navigator.clipboard.writeText(fax)
      setCopied(true)
    } catch {
      // The Clipboard API needs a secure context and permission, which some
      // in-app browsers refuse. If the fallback fails too, the number is still
      // on screen to select by hand.
      setCopied(copyWithTextarea(fax))
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        title="Copy fax number"
        aria-label={`Copy fax number ${fax}`}
        className={`inline-flex items-center gap-1.5 cursor-pointer ${className}`}
      >
        {fax}
        {copied ? (
          <span className="inline-flex items-center gap-0.5 text-xs text-[var(--success)]">
            <Check className="w-3.5 h-3.5" />
            Copied
          </span>
        ) : (
          <Copy className="w-3.5 h-3.5 opacity-60" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Fax number copied" : ""}
      </span>
    </>
  )
}
