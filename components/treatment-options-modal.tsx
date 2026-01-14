"use client"

import { X } from "lucide-react"
import { useEffect } from "react"
import { treatmentOptionsData } from "@/lib/treatment-options"

interface TreatmentOptionsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TreatmentOptionsModal({ isOpen, onClose }: TreatmentOptionsModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl shadow-2xl w-[95vw] max-w-6xl max-h-[90vh] overflow-hidden border border-slate-700/50">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#1a365d] via-[#1e4976] to-[#1a365d] px-6 py-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Treatment Options Guide</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-slate-300 text-sm mt-1">
            Comprehensive guide to sleep treatment options and therapies
          </p>
        </div>

        {/* Content */}
        <div className="p-6 pb-20 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {treatmentOptionsData.map((category) => (
              <div key={category.category} className="space-y-3">
                <h3 className="text-[#7C9070] font-semibold text-sm uppercase tracking-wide border-b border-slate-700/50 pb-2">
                  {category.category}
                </h3>
                <ul className="space-y-1.5">
                  {category.treatments.map((treatment) => (
                    <li key={treatment.name}>
                      <button
                        className="text-slate-300 hover:text-[#A8C99B] text-sm text-left transition-colors duration-200 hover:underline underline-offset-2"
                        onClick={() => {
                          // Navigate to home with search query
                          window.location.href = `/?q=${encodeURIComponent(treatment.name)}`
                        }}
                      >
                        {treatment.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-sm px-6 py-3 border-t border-slate-700/50">
          <p className="text-slate-400 text-xs text-center">
            Click on any treatment to search for clinics offering that service
          </p>
        </div>
      </div>
    </div>
  )
}
