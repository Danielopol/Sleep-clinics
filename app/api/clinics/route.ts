import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

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

  return { clinics: cachedClinics, metadata: cachedMetadata }
}

export async function GET(request: Request) {
  try {
    const { clinics, metadata } = loadData()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type === 'metadata') {
      return NextResponse.json(metadata)
    }

    return NextResponse.json(clinics)
  } catch (error) {
    console.error('Error reading clinics data:', error)
    return NextResponse.json(
      { error: 'Failed to load clinics data. Run "npm run generate-data" first.' },
      { status: 500 }
    )
  }
}
