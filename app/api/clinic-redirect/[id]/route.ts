import { NextResponse } from "next/server"
import { resolveLegacyClinicId } from "@/lib/legacy-ids"

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
 *
 * Ids are looked up in the frozen scripts/legacy-id-map.json, never in the
 * current data: today's row ids no longer match the old URLs. An id whose
 * clinic was removed answers 410 so Google drops it; an id that never existed
 * answers 404.
 */
export const dynamic = "force-dynamic"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const resolved = resolveLegacyClinicId(id)

  if (resolved === "unknown") {
    return new NextResponse("Not Found", { status: 404 })
  }
  if (resolved === "gone") {
    return new NextResponse("Gone", { status: 410 })
  }

  return NextResponse.redirect(
    new URL(`/clinic/${resolved.slug}`, request.url),
    301,
  )
}
