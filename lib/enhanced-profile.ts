/**
 * The Enhanced Profile's content: what a paying clinic adds to its page on
 * top of the directory data (see "Enhanced Profile" in lib/pricing.ts).
 *
 * Stored in Supabase (enhanced_profiles, migration 006), not in the Excel
 * file, so it survives every data regeneration and can be switched off when
 * the plan ends. It renders only while the clinic holds a live paid plan.
 *
 * Services, equipment, and insurance are fixed lists rather than free text, so
 * every Enhanced page reads the same way and the values can be filtered on
 * later. The database stores the keys; unknown keys are dropped on read.
 * Plain module, no server imports: the clinic page and its client components
 * both use it.
 */

export const MAX_PHOTOS = 10

export const SERVICE_OPTIONS = {
  "in-lab-sleep-study": "In-lab sleep study (polysomnography)",
  "home-sleep-test": "Home sleep test",
  titration: "CPAP titration study",
  "cpap-clinic": "CPAP clinic and follow-up",
  "cbt-i": "CBT-I for insomnia",
  pediatric: "Pediatric sleep medicine",
  telehealth: "Telehealth visits",
  "mslt-mwt": "MSLT and MWT daytime testing",
} as const

export const EQUIPMENT_OPTIONS = {
  "pap-devices": "CPAP, APAP, and BiPAP setup",
  asv: "ASV (adaptive servo-ventilation)",
  "oral-appliance": "Oral appliance therapy",
  inspire: "Inspire upper airway stimulation",
  actigraphy: "Actigraphy",
  "dme-on-site": "CPAP supplies on site",
  "private-suites": "Private sleep suites",
} as const

export const INSURANCE_OPTIONS = {
  medicare: "Medicare",
  medicaid: "Medicaid",
  tricare: "TRICARE",
  "va-community-care": "VA Community Care",
  aetna: "Aetna",
  "blue-cross-blue-shield": "Blue Cross Blue Shield",
  cigna: "Cigna",
  humana: "Humana",
  unitedhealthcare: "UnitedHealthcare",
  "self-pay": "Self-pay pricing available",
} as const

export interface EnhancedPhoto {
  url: string
  alt: string
}

export interface EnhancedProfile {
  clinicSlug: string
  description: string | null
  photos: EnhancedPhoto[]
  /** Labels, in the order of the option lists above. */
  services: string[]
  equipment: string[]
  insurance: string[]
  /** Free text for plans not in the list, e.g. "Most Oscar and Ambetter plans". */
  insuranceNote: string | null
  /** Overrides for the Call and Visit website buttons; null uses the listing's. */
  callPhone: string | null
  websiteUrl: string | null
  updatedAt: string | null
}

/** A raw enhanced_profiles row, as Supabase returns it. */
export interface EnhancedProfileRow {
  clinic_slug: string
  description?: string | null
  photos?: unknown
  services?: string[] | null
  equipment?: string[] | null
  insurance?: string[] | null
  insurance_note?: string | null
  call_phone?: string | null
  website_url?: string | null
  updated_at?: string | null
}

/** Photos must be https (they load inside our https page); a website link may be http. */
function webUrl(value: unknown, protocols: string[]): string | null {
  if (typeof value !== "string") return null
  try {
    const url = new URL(value.trim())
    return protocols.includes(url.protocol) ? url.toString() : null
  } catch {
    return null
  }
}

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed ? trimmed.slice(0, max) : null
}

/** Keys to labels in the option list's own order, dropping anything unknown. */
function labels(keys: string[] | null | undefined, options: Record<string, string>): string[] {
  const chosen = new Set((keys ?? []).map((k) => k.trim()))
  for (const key of chosen) {
    if (!(key in options)) console.warn(`enhanced_profiles: unknown option "${key}" ignored`)
  }
  return Object.entries(options)
    .filter(([key]) => chosen.has(key))
    .map(([, label]) => label)
}

/**
 * Turns a row into what the page renders. Hand-edited rows are expected, so
 * this is forgiving: non-https photo URLs, photos past the tenth, unknown
 * option keys, and empty strings are all dropped rather than breaking a page.
 */
export function parseEnhancedProfile(row: EnhancedProfileRow, clinicName: string): EnhancedProfile {
  const photos: EnhancedPhoto[] = []
  if (Array.isArray(row.photos)) {
    for (const item of row.photos) {
      const raw = typeof item === "string" ? { url: item } : (item as { url?: unknown; alt?: unknown })
      const url = webUrl(raw?.url, ["https:"])
      if (!url) continue
      photos.push({ url, alt: text(raw.alt, 200) ?? `${clinicName} photo ${photos.length + 1}` })
      if (photos.length === MAX_PHOTOS) break
    }
  }

  return {
    clinicSlug: row.clinic_slug,
    description: text(row.description, 5000),
    photos,
    services: labels(row.services, SERVICE_OPTIONS),
    equipment: labels(row.equipment, EQUIPMENT_OPTIONS),
    insurance: labels(row.insurance, INSURANCE_OPTIONS),
    insuranceNote: text(row.insurance_note, 300),
    callPhone: text(row.call_phone, 40),
    websiteUrl: webUrl(row.website_url, ["https:", "http:"]),
    updatedAt: row.updated_at ?? null,
  }
}
