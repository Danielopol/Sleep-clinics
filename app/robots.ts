import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.ussleepclinics.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Order confirmation pages are per-transaction and carry a Stripe session
      // id in the query string. Nothing for a crawler to index.
      disallow: ['/checkout/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
