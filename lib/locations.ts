import { Clinic } from './data'
import { getClinicsData } from './clinics'

// US states + DC. Used to normalize the (somewhat dirty) state values in the data
// and to render full state names in titles/URLs for SEO.
const US_STATES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon',
  PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia',
  WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
}

const NAME_TO_ABBR: Record<string, string> = Object.fromEntries(
  Object.entries(US_STATES).map(([abbr, name]) => [name.toLowerCase(), abbr])
)

// Map a raw clinic.state value to a canonical 2-letter US abbreviation, or null
// if it isn't a US state (filters out blanks, Canadian provinces, etc.).
function normalizeStateAbbr(raw: string | undefined): string | null {
  const v = String(raw ?? '').trim()
  if (!v) return null
  const upper = v.toUpperCase()
  if (US_STATES[upper]) return upper
  const fromName = NAME_TO_ABBR[v.toLowerCase()]
  return fromName ?? null
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Title-case a city name, but only when it is all-caps (e.g. "TUSCALOOSA"); leave
// already-mixed-case names like "McAllen" untouched.
function tidyCityName(name: string): string {
  if (name === name.toUpperCase()) {
    return name
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }
  return name
}

export interface CitySummary {
  name: string
  slug: string
  clinicCount: number
}

export interface StateSummary {
  abbr: string
  name: string
  slug: string
  clinicCount: number
  cityCount: number
}

interface CityNode {
  name: string
  slug: string
  nameCounts: Map<string, number>
  clinics: Clinic[]
}

interface StateNode {
  abbr: string
  name: string
  slug: string
  clinics: Clinic[]
  cities: Map<string, CityNode> // keyed by city slug
}

let cachedIndex: Map<string, StateNode> | null = null // keyed by state slug

function buildIndex(): Map<string, StateNode> {
  if (cachedIndex) return cachedIndex

  const states = new Map<string, StateNode>()

  for (const clinic of getClinicsData()) {
    const abbr = normalizeStateAbbr(clinic.state)
    if (!abbr) continue
    const cityRaw = String(clinic.city ?? '').trim()
    if (!cityRaw) continue

    const stateName = US_STATES[abbr]
    const stateSlug = slugify(stateName)

    let stateNode = states.get(stateSlug)
    if (!stateNode) {
      stateNode = { abbr, name: stateName, slug: stateSlug, clinics: [], cities: new Map() }
      states.set(stateSlug, stateNode)
    }
    stateNode.clinics.push(clinic)

    const citySlug = slugify(cityRaw)
    if (!citySlug) continue
    let cityNode = stateNode.cities.get(citySlug)
    if (!cityNode) {
      cityNode = { name: cityRaw, slug: citySlug, nameCounts: new Map(), clinics: [] }
      stateNode.cities.set(citySlug, cityNode)
    }
    cityNode.clinics.push(clinic)
    cityNode.nameCounts.set(cityRaw, (cityNode.nameCounts.get(cityRaw) ?? 0) + 1)
  }

  // Resolve each city's display name to the most common original spelling (tidied).
  for (const state of states.values()) {
    for (const city of state.cities.values()) {
      let best = city.name
      let bestCount = -1
      for (const [name, count] of city.nameCounts) {
        if (count > bestCount) {
          best = name
          bestCount = count
        }
      }
      city.name = tidyCityName(best)
    }
  }

  cachedIndex = states
  return states
}

export function getStatesIndex(): StateSummary[] {
  const index = buildIndex()
  return [...index.values()]
    .map((s) => ({
      abbr: s.abbr,
      name: s.name,
      slug: s.slug,
      clinicCount: s.clinics.length,
      cityCount: s.cities.size,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export interface StateData extends StateSummary {
  clinics: Clinic[]
  cities: CitySummary[]
  topServices: string[]
  aasmCount: number
}

export function getStateData(stateSlug: string): StateData | null {
  const node = buildIndex().get(stateSlug)
  if (!node) return null
  return {
    abbr: node.abbr,
    name: node.name,
    slug: node.slug,
    clinicCount: node.clinics.length,
    cityCount: node.cities.size,
    clinics: node.clinics,
    cities: [...node.cities.values()]
      .map((c) => ({ name: c.name, slug: c.slug, clinicCount: c.clinics.length }))
      .sort((a, b) => b.clinicCount - a.clinicCount || a.name.localeCompare(b.name)),
    topServices: topServices(node.clinics),
    aasmCount: countAasm(node.clinics),
  }
}

export interface CityData {
  stateName: string
  stateAbbr: string
  stateSlug: string
  cityName: string
  citySlug: string
  clinics: Clinic[]
  topServices: string[]
  aasmCount: number
}

export function getCityData(stateSlug: string, citySlug: string): CityData | null {
  const state = buildIndex().get(stateSlug)
  if (!state) return null
  const city = state.cities.get(citySlug)
  if (!city) return null
  return {
    stateName: state.name,
    stateAbbr: state.abbr,
    stateSlug: state.slug,
    cityName: city.name,
    citySlug: city.slug,
    clinics: city.clinics,
    topServices: topServices(city.clinics),
    aasmCount: countAasm(city.clinics),
  }
}

// Params for generateStaticParams / sitemap.
export function getAllStateSlugs(): string[] {
  return [...buildIndex().keys()]
}

export function getAllCityParams(): { state: string; city: string }[] {
  const params: { state: string; city: string }[] = []
  for (const state of buildIndex().values()) {
    for (const citySlug of state.cities.keys()) {
      params.push({ state: state.slug, city: citySlug })
    }
  }
  return params
}

// The busiest cities (by clinic count). Used to pre-render only the highest-value
// city pages at build time; the long tail renders on-demand (ISR) to keep build CPU low.
export function getTopCityParams(limit: number): { state: string; city: string }[] {
  const ranked: { state: string; city: string; count: number }[] = []
  for (const state of buildIndex().values()) {
    for (const [citySlug, city] of state.cities) {
      ranked.push({ state: state.slug, city: citySlug, count: city.clinics.length })
    }
  }
  return ranked
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map(({ state, city }) => ({ state, city }))
}

// --- aggregate helpers ---

function countAasm(clinics: Clinic[]): number {
  return clinics.filter((c) =>
    (c.accreditation ?? []).some((a) => /aasm/i.test(a))
  ).length
}

// Most common, reasonably concise services across a set of clinics.
function topServices(clinics: Clinic[], limit = 6): string[] {
  const counts = new Map<string, number>()
  for (const c of clinics) {
    for (const s of c.services ?? []) {
      const name = s.trim()
      if (!name || name.length > 45) continue // skip blank / overly long free-text entries
      counts.set(name, (counts.get(name) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name]) => name)
}

// Join a list into readable prose: "a, b, and c".
export function humanList(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}
