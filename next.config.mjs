import { readFileSync } from 'fs'
import { join } from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    try {
      const clinics = JSON.parse(
        readFileSync(join(process.cwd(), 'data', 'clinics.json'), 'utf-8')
      )
      return clinics
        .filter(c => c.slug)
        .map(c => ({
          source: `/clinic/${c.id}`,
          destination: `/clinic/${c.slug}`,
          permanent: true,
        }))
    } catch {
      return []
    }
  },
}

export default nextConfig
