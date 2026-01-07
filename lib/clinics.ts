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
