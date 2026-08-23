import { NextResponse } from "next/server"
import { getClinicById } from "@/lib/clinics"

/**
 * Redirects legacy /clinic/<numeric-id> URLs to their current slug URL.
 *
 * next.config.mjs rewrites /clinic/:id(\d+) here before the /clinic/[slug]
 * page is reached. The page cannot do this itself: it is statically
 * prerendered (ISR), and calling permanentRedirect() from a prerendered page
 * makes Next fall back to a meta refresh served with HTTP 200. Google reads
 * that as a duplicate of the slug page rather than a redirect, which is why
 * roughly 400 legacy IDs sat in "Crawled - currently not indexed".
 *
 * A route handler marked force-dynamic runs per request, so it can answer
 * with a real 301 and Location header.
 */
export const dynamic = "force-dynamic"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const numericId = Number(id)

  if (!Number.isInteger(numericId)) {
    return new NextResponse("Not Found", { status: 404 })
  }

  const clinic = getClinicById(numericId)

  if (!clinic?.slug) {
    return new NextResponse("Not Found", { status: 404 })
  }

  return NextResponse.redirect(
    new URL(`/clinic/${clinic.slug}`, request.url),
    301,
  )
}
