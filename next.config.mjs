/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ussleepclinics.com' }],
        destination: 'https://www.ussleepclinics.com/:path*',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      // Legacy /clinic/<numeric-id> URLs. Sent to a force-dynamic route
      // handler that answers with a real 301 to the slug URL. Clinic slugs are
      // never all digits, so this cannot shadow a live page. This runs in the
      // afterFiles phase, which is evaluated before dynamic routes, so it
      // takes effect before /clinic/[slug] renders.
      {
        source: '/clinic/:id(\\d+)',
        destination: '/api/clinic-redirect/:id',
      },
    ]
  },
}

export default nextConfig
