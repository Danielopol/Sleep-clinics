import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { readFileSync, statSync, existsSync } from 'fs'
import { join } from 'path'

// Force Node.js runtime (not Edge runtime) to allow file system access
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Cache for clinic data
let cachedClinics: any[] = []
let lastModified = 0

// Function to parse office hours into structured format
function parseOfficeHours(hoursString: string | undefined) {
  if (!hoursString) return undefined

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const hours: any = {}

  const lines = hoursString.split(/[\r\n]+/)
  lines.forEach(line => {
    const match = line.match(/(\w+):\s*(.+)/)
    if (match) {
      const day = match[1].toLowerCase()
      if (days.includes(day)) {
        hours[day] = match[2].trim()
      }
    }
  })

  return Object.keys(hours).length > 0 ? hours : undefined
}

// Function to parse services/disorders into array
function parseArrayField(field: string | undefined): string[] {
  if (!field) return []
  return field.split(';').map(item => item.trim()).filter(item => item.length > 0)
}

// Function to generate coordinates based on address (placeholder - you can integrate geocoding API later)
function generateCoordinates(city: string, state: string) {
  // Placeholder coordinates - in production, you'd use a geocoding service
  const baseCoords: any = {
    'Tuscaloosa': { lat: 33.2098, lng: -87.5692 },
    'Birmingham': { lat: 33.5186, lng: -86.8104 },
    'Mobile': { lat: 30.6954, lng: -88.0399 },
    'Montgomery': { lat: 32.3668, lng: -86.3000 },
    'Huntsville': { lat: 34.7304, lng: -86.5861 },
  }

  return baseCoords[city] || { lat: 0, lng: 0 }
}

// Function to parse Google reviews from Excel columns
function parseGoogleReviews(row: any): { author: string; rating: number; date: string; text: string }[] {
  const reviews: { author: string; rating: number; date: string; text: string }[] = []

  for (let i = 1; i <= 5; i++) {
    const author = row[`review_${i}_author`]
    const date = row[`review_${i}_date`]
    const stars = row[`review_${i}_stars`]
    const text = row[`review_${i}`]

    // Only add review if it has at least author and text
    if (author && text) {
      reviews.push({
        author: String(author).trim(),
        rating: stars ? Number(stars) : 5,
        date: date ? String(date).trim() : '',
        text: String(text).trim()
      })
    }
  }

  return reviews
}

// Function to read and parse Excel file
function readClinicsFromExcel(): any[] {
  const filePath = join(process.cwd(), 'Prototype_with_descriptions.xlsx')

  // Check if file exists
  if (!existsSync(filePath)) {
    throw new Error(`Excel file not found at: ${filePath}`)
  }

  // Check if file has been modified
  const stats = statSync(filePath)
  const fileModified = stats.mtimeMs

  // Return cached data if file hasn't changed
  if (cachedClinics.length > 0 && fileModified === lastModified) {
    return cachedClinics
  }

  // Read Excel file
  const fileBuffer = readFileSync(filePath)
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  const rawData = XLSX.utils.sheet_to_json(worksheet)

  // Transform data to match frontend Clinic interface
  const clinics = rawData.map((row: any, index: number) => {
    const services = parseArrayField(row.sleep_services)
    const disorders = parseArrayField(row.sleep_disorders)
    const specialty = [...services, ...disorders].filter((item, i, arr) => arr.indexOf(item) === i)

    // Parse Google reviews from Excel
    const googleReviews = parseGoogleReviews(row)

    return {
      id: index + 1,
      name: row.clinic_name || '',
      address: row.location_address || '',
      city: row.city || '',
      state: row.state || '',
      zip: row.zip_code ? String(row.zip_code) : '',
      phone: row.location_phone || '',
      specialty: specialty.length > 0 ? specialty : ['Sleep Medicine'],
      image: row.photo_url || '/modern-medical-clinic-reception-area.jpg',
      coordinates: generateCoordinates(row.city, row.state),
      clinicType: row.new_name || 'Sleep Medicine Center',
      rating: row.Total_rating ? Number(row.Total_rating) : undefined,
      reviewCount: row.total_reviews ? Number(row.total_reviews) : undefined,
      website: row.website_url || '',
      email: '', // Not in Excel, placeholder
      fax: row.location_fax || '',
      hours: parseOfficeHours(row.office_hours),
      hoursNote: row.office_hours && !parseOfficeHours(row.office_hours) ? row.office_hours : undefined,
      services: services,
      description: row.Description || '',
      isOpen: true, // Placeholder
      accreditation: row['AASM Certified'] === 'Yes' ? ['AASM Accredited'] : [],
      reviews: googleReviews.length > 0 ? googleReviews : undefined
    }
  })

  // Update cache
  cachedClinics = clinics
  lastModified = fileModified

  return clinics
}

export async function GET(request: Request) {
  try {
    const clinics = readClinicsFromExcel()

    // Check if requesting metadata (states, cities, specialties)
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type === 'metadata') {
      // Extract unique values from clinics data
      const states = [...new Set(clinics.map(c => c.state))].sort()
      const cities = [...new Set(clinics.map(c => c.city))].sort()

      // Extract unique services (from sleep_services column N only)
      const servicesSet = new Set<string>()
      clinics.forEach(clinic => {
        if (clinic.services) {
          clinic.services.forEach((s: string) => servicesSet.add(s))
        }
      })
      const services = [...servicesSet].sort()

      // Extract all unique specialties (services + disorders) for specialty dropdown
      const specialtiesSet = new Set<string>()
      clinics.forEach(clinic => {
        clinic.specialty.forEach((s: string) => specialtiesSet.add(s))
      })
      const specialties = [...specialtiesSet].sort()

      return NextResponse.json({ states, cities, specialties, services })
    }

    // Return clinics data by default
    return NextResponse.json(clinics)
  } catch (error) {
    console.error('Error reading clinics data:', error)
    return NextResponse.json(
      { error: 'Failed to load clinics data' },
      { status: 500 }
    )
  }
}
