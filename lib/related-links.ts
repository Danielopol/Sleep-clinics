import { Clinic } from "./data"
import { getStatesIndex, getStateData, slugify } from "./locations"
import { generateSlug as disorderSlug, getAllDisorderSlugs } from "./sleep-disorders-content"
import {
  generateSlug as treatmentSlug,
  getAllTreatmentSlugs,
} from "./treatment-options-content"

export interface RelatedLink {
  href: string
  label: string
  sublabel?: string
}

export interface ClinicRelatedLinks {
  stateName: string | null
  siblings: RelatedLink[]
  siblingTotal: number
  cityLink: RelatedLink | null
  stateLink: RelatedLink | null
  nearbyCities: RelatedLink[]
  disorders: RelatedLink[]
  treatments: RelatedLink[]
}

const MAX_SIBLINGS = 6
const MAX_NEARBY_CITIES = 6
const MAX_TOPICS = 6

/** Resolves a state abbreviation (the form stored on clinics) to its slug. */
function stateSlugFromAbbr(abbr: string): { slug: string; name: string } | null {
  const match = getStatesIndex().find(
    (s) => s.abbr.toLowerCase() === abbr.toLowerCase(),
  )
  return match ? { slug: match.slug, name: match.name } : null
}

/**
 * Maps free-text names from clinic data onto real content pages.
 *
 * Every candidate slug is checked against the published slug list, so a
 * specialty we have no page for is dropped rather than linked. Emitting a link
 * to a slug that does not exist would now produce a hard 404, which is worse
 * than showing nothing.
 */
function matchTopics(
  names: string[],
  toSlug: (name: string) => string,
  validSlugs: Set<string>,
  basePath: string,
): RelatedLink[] {
  const seen = new Set<string>()
  const links: RelatedLink[] = []

  for (const name of names) {
    const slug = toSlug(name)

    if (!slug || seen.has(slug) || !validSlugs.has(slug)) {
      continue
    }

    seen.add(slug)
    links.push({ href: `${basePath}/${slug}`, label: name })

    if (links.length >= MAX_TOPICS) {
      break
    }
  }

  return links
}

/**
 * Builds the internal links shown on a clinic page.
 *
 * Clinic pages were dead ends: they received links from their city page but
 * emitted none of their own beyond site navigation. With roughly 5,700 of them
 * that is most of the site passing no internal signal, which both caps pages
 * per visit and starves the pages Google has crawled but declined to index.
 */
export function getClinicRelatedLinks(clinic: Clinic): ClinicRelatedLinks {
  const empty: ClinicRelatedLinks = {
    stateName: null,
    siblings: [],
    siblingTotal: 0,
    cityLink: null,
    stateLink: null,
    nearbyCities: [],
    disorders: [],
    treatments: [],
  }

  const state = stateSlugFromAbbr(clinic.state)

  if (!state) {
    return empty
  }

  const stateData = getStateData(state.slug)

  if (!stateData) {
    return empty
  }

  const citySlug = slugify(clinic.city)
  const city = stateData.cities.find((c) => c.slug === citySlug)

  const siblingClinics = stateData.clinics
    .filter((c) => slugify(c.city) === citySlug && c.id !== clinic.id && c.slug)
    // Show the clinics a reader is most likely to click, not an arbitrary slice.
    .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))

  const siblings: RelatedLink[] = siblingClinics
    .slice(0, MAX_SIBLINGS)
    .map((c) => ({
      href: `/clinic/${c.slug}`,
      label: c.name,
      sublabel: c.rating
        ? `${c.rating.toFixed(1)} stars (${c.reviewCount ?? 0} reviews)`
        : undefined,
    }))

  const nearbyCities: RelatedLink[] = stateData.cities
    .filter((c) => c.slug !== citySlug)
    .slice(0, MAX_NEARBY_CITIES)
    .map((c) => ({
      href: `/locations/${state.slug}/${c.slug}`,
      label: `${c.name}, ${clinic.state}`,
      sublabel: `${c.clinicCount} ${c.clinicCount === 1 ? "clinic" : "clinics"}`,
    }))

  return {
    stateName: state.name,
    siblings,
    siblingTotal: siblingClinics.length,
    nearbyCities,
    cityLink: city
      ? {
          href: `/locations/${state.slug}/${city.slug}`,
          label: `All sleep clinics in ${clinic.city}, ${clinic.state}`,
          sublabel: `${city.clinicCount} ${city.clinicCount === 1 ? "clinic" : "clinics"}`,
        }
      : null,
    stateLink: {
      href: `/locations/${state.slug}`,
      label: `Sleep clinics in ${state.name}`,
      sublabel: `${stateData.clinicCount} clinics across ${stateData.cityCount} cities`,
    },
    disorders: matchTopics(
      clinic.specialty ?? [],
      disorderSlug,
      new Set(getAllDisorderSlugs()),
      "/sleep-disorders",
    ),
    treatments: matchTopics(
      clinic.services ?? [],
      treatmentSlug,
      new Set(getAllTreatmentSlugs()),
      "/treatment-options",
    ),
  }
}
