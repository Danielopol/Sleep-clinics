import legacyIdMap from '@/scripts/legacy-id-map.json'
import duplicateClinics from '@/scripts/duplicate-clinics.json'
import { getClinicBySlug } from './clinics'

const legacyIds: Record<string, string> = legacyIdMap.ids
const duplicateSlugs: Record<string, string> = duplicateClinics.redirects

/**
 * Resolves a legacy /clinic/<numeric-id> URL to the clinic's current slug.
 *
 * The id is NOT today's `clinic.id`. That one is a row position in the Excel
 * file and shifts whenever rows are added or removed, so it stopped matching
 * the old URLs long ago. scripts/legacy-id-map.json freezes what each id meant
 * while the site still used numeric URLs (until 2026-05-09).
 *
 * - `{ slug }`: the clinic still exists, possibly merged into another row.
 * - `'gone'`: the id was real, but its clinic has since been removed.
 * - `'unknown'`: the id never existed as a clinic URL.
 */
export function resolveLegacyClinicId(id: string): { slug: string } | 'gone' | 'unknown' {
  const legacySlug = legacyIds[id]
  if (!legacySlug) return 'unknown'

  const slug = duplicateSlugs[legacySlug] ?? legacySlug
  return getClinicBySlug(slug) ? { slug } : 'gone'
}
