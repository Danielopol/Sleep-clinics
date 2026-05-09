import { readFileSync } from 'fs'
import { join } from 'path'
import { Clinic } from './data'

// Cache for server-side usage
let cachedClinics: Clinic[] | null = null
let cachedMetadata: { states: string[], cities: string[], specialties: string[], services: string[] } | null = null

export function getClinicsData(): Clinic[] {
  if (cachedClinics) {
    return cachedClinics
  }

  const clinicsPath = join(process.cwd(), 'data', 'clinics.json')
  cachedClinics = JSON.parse(readFileSync(clinicsPath, 'utf-8'))
  return cachedClinics!
}

export function getMetadata() {
  if (cachedMetadata) {
    return cachedMetadata
  }

  const metadataPath = join(process.cwd(), 'data', 'metadata.json')
  cachedMetadata = JSON.parse(readFileSync(metadataPath, 'utf-8'))
  return cachedMetadata!
}

export function getClinicById(id: number): Clinic | undefined {
  const clinics = getClinicsData()
  return clinics.find(c => c.id === id)
}

export function getClinicBySlug(slug: string): Clinic | undefined {
  const clinics = getClinicsData()
  return clinics.find(c => c.slug === slug)
}

const DAY_ABBR: Record<string, string> = {
  monday: 'Mo', tuesday: 'Tu', wednesday: 'We', thursday: 'Th',
  friday: 'Fr', saturday: 'Sa', sunday: 'Su',
}
const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

function parseTime(t: string): string | null {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!m) return null
  let h = parseInt(m[1])
  const min = m[2]
  const period = m[3].toUpperCase()
  if (period === 'PM' && h !== 12) h += 12
  if (period === 'AM' && h === 12) h = 0
  return `${h.toString().padStart(2, '0')}:${min}`
}

// Converts clinic hours object → schema.org openingHours array
// e.g. ["Mo-Fr 08:00-17:00", "Sa 09:00-12:00"]
export function formatOpeningHours(hours: Clinic['hours']): string[] {
  if (!hours) return []

  const entries: { abbr: string; range: string }[] = []
  for (const day of DAY_ORDER) {
    const raw = hours[day as keyof typeof hours]
    if (!raw || /closed/i.test(raw)) continue
    const parts = raw.split(/\s*[–\-]\s*/)
    if (parts.length !== 2) continue
    const open = parseTime(parts[0])
    const close = parseTime(parts[1])
    if (!open || !close) continue
    entries.push({ abbr: DAY_ABBR[day], range: `${open}-${close}` })
  }

  // Group consecutive days sharing the same hours into "Mo-Fr HH:MM-HH:MM"
  const groups: string[] = []
  let i = 0
  while (i < entries.length) {
    let j = i
    while (j + 1 < entries.length && entries[j + 1].range === entries[i].range) j++
    const days = j > i ? `${entries[i].abbr}-${entries[j].abbr}` : entries[i].abbr
    groups.push(`${days} ${entries[i].range}`)
    i = j + 1
  }
  return groups
}
