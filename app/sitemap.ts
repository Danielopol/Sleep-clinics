import { MetadataRoute } from 'next'
import { getClinicsData } from '@/lib/clinics'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ussleepclinics.com'

  // Get all clinics for dynamic pages
  const clinics = getClinicsData()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Clinic detail pages
  const clinicPages: MetadataRoute.Sitemap = clinics.map((clinic) => ({
    url: `${baseUrl}/clinic/${clinic.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...clinicPages]
}
