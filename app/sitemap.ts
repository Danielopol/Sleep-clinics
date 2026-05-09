import { MetadataRoute } from 'next'
import { getClinicsData } from '@/lib/clinics'
import { getAllPostSlugs } from '@/lib/blog'
import { getAllDisorderSlugs } from '@/lib/sleep-disorders-content'
import { getAllTreatmentSlugs } from '@/lib/treatment-options-content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ussleepclinics.com'

  // Get all dynamic data
  const clinics = getClinicsData()
  const blogSlugs = getAllPostSlugs()
  const disorderSlugs = getAllDisorderSlugs()
  const treatmentSlugs = getAllTreatmentSlugs()

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
      url: `${baseUrl}/sleep-disorders`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/treatment-options`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aasm-accreditation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Sleep disorder pages
  const disorderPages: MetadataRoute.Sitemap = disorderSlugs.map((slug) => ({
    url: `${baseUrl}/sleep-disorders/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Treatment option pages
  const treatmentPages: MetadataRoute.Sitemap = treatmentSlugs.map((slug) => ({
    url: `${baseUrl}/treatment-options/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Clinic detail pages
  const clinicPages: MetadataRoute.Sitemap = clinics.map((clinic) => ({
    url: `${baseUrl}/clinic/${clinic.slug ?? clinic.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...blogPages,
    ...disorderPages,
    ...treatmentPages,
    ...clinicPages,
  ]
}
