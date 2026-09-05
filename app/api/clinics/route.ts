import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { getListingBadges } from '@/lib/listings'

// Force Node.js runtime for file system access
export const runtime = 'nodejs'

// Cache data in memory after first read
let cachedClinics: any[] | null = null
let cachedMetadata: any | null = null

function loadData() {
  if (cachedClinics && cachedMetadata) {
    return { clinics: cachedClinics, metadata: cachedMetadata }
  }

  const clinicsPath = join(process.cwd(), 'data', 'clinics.json')
  const metadataPath = join(process.cwd(), 'data', 'metadata.json')

  if (!existsSync(clinicsPath) || !existsSync(metadataPath)) {
    throw new Error('Data files not found. Run "npm run generate-data" first.')
  }

  cachedClinics = JSON.parse(readFileSync(clinicsPath, 'utf-8'))
  cachedMetadata = JSON.parse(readFileSync(metadataPath, 'utf-8'))

  return { clinics: cachedClinics!, metadata: cachedMetadata }
}

// Great-circle distance between two lat/lng points, in kilometers.
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371 // Earth radius in km
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

function filterClinics(clinics: any[], params: {
  q?: string | null
  state?: string | null
  city?: string | null
  specialty?: string | null
  services?: string[] | null
  accreditation?: string | null
  lat?: number | null
  lng?: number | null
  radius?: number | null
}) {
  let filtered = clinics

  // Search query filter
  if (params.q) {
    const query = params.q.toLowerCase()
    filtered = filtered.filter(
      (clinic) =>
        String(clinic.name || '').toLowerCase().includes(query) ||
        (clinic.specialty || []).some((s: string) => String(s || '').toLowerCase().includes(query)) ||
        String(clinic.city || '').toLowerCase().includes(query) ||
        String(clinic.state || '').toLowerCase().includes(query)
    )
  }

  // State filter
  if (params.state) {
    filtered = filtered.filter((clinic) => clinic.state === params.state)
  }

  // City filter
  if (params.city) {
    filtered = filtered.filter((clinic) => clinic.city === params.city)
  }

  // Specialty filter
  if (params.specialty) {
    filtered = filtered.filter((clinic) => clinic.services?.includes(params.specialty))
  }

  // Multiple services filter
  if (params.services && params.services.length > 0) {
    filtered = filtered.filter((clinic) =>
      params.services!.some((service) => clinic.services?.includes(service))
    )
  }

  // Accreditation filter (e.g., AASM)
  if (params.accreditation) {
    const accredQuery = params.accreditation.toLowerCase()
    filtered = filtered.filter((clinic) =>
      (clinic.accreditation || []).some((acc: string) =>
        String(acc || '').toLowerCase().includes(accredQuery)
      )
    )
  }

  // "Near me" distance filter: keep clinics with coordinates within `radius` km of
  // the user's location, attach the distance, and sort nearest first.
  if (
    params.lat != null && params.lng != null && params.radius != null &&
    Number.isFinite(params.lat) && Number.isFinite(params.lng) && params.radius > 0
  ) {
    filtered = filtered
      .filter((clinic) => clinic.coordinates?.lat != null && clinic.coordinates?.lng != null)
      .map((clinic) => ({
        ...clinic,
        distance: haversineKm(params.lat!, params.lng!, clinic.coordinates.lat, clinic.coordinates.lng),
      }))
      .filter((clinic) => clinic.distance <= params.radius!)
      .sort((a, b) => a.distance - b.distance)
  }

  return filtered
}

export async function GET(request: Request) {
  try {
    const { clinics, metadata } = loadData()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    // Return metadata only
    if (type === 'metadata') {
      return NextResponse.json(metadata)
    }

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)

    // Filter parameters
    const q = searchParams.get('q')
    const state = searchParams.get('state')
    const city = searchParams.get('city')
    const specialty = searchParams.get('specialty')
    const servicesParam = searchParams.get('services')
    const services = servicesParam ? servicesParam.split(',').filter(Boolean) : null
    const accreditation = searchParams.get('accreditation')
    const latParam = searchParams.get('lat')
    const lngParam = searchParams.get('lng')
    const radiusParam = searchParams.get('radius')
    const lat = latParam != null ? parseFloat(latParam) : null
    const lng = lngParam != null ? parseFloat(lngParam) : null
    const radius = radiusParam != null ? parseFloat(radiusParam) : null

    // Apply filters
    let filteredClinics = filterClinics(clinics, { q, state, city, specialty, services, accreditation, lat, lng, radius })

    // Paid featured placement. Only applied to a local result set (a city or
    // state filter is active), where "top of the results" means something to a
    // patient. It is deliberately not applied to the unfiltered national list,
    // and it never overrides the "near me" distance sort, which answers a
    // different question.
    if (city || state) {
      const badges = await getListingBadges()
      if (badges.featured.size > 0 || badges.verified.size > 0) {
        filteredClinics = filteredClinics.map((clinic) => {
          const featured = badges.featured.has(clinic.id)
          const verified = badges.verified.has(clinic.id)
          return featured || verified
            ? { ...clinic, ...(featured && { featured }), ...(verified && { verified }) }
            : clinic
        })
        const distanceSorted = lat != null && lng != null && radius != null
        if (!distanceSorted) {
          filteredClinics = [...filteredClinics].sort(
            (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
          )
        }
      }
    }

    // Calculate pagination
    const total = filteredClinics.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedClinics = filteredClinics.slice(startIndex, endIndex)

    // Return paginated response
    return NextResponse.json({
      clinics: paginatedClinics,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages
      }
    })
  } catch (error) {
    console.error('Error reading clinics data:', error)
    return NextResponse.json(
      { error: 'Failed to load clinics data. Run "npm run generate-data" first.' },
      { status: 500 }
    )
  }
}
