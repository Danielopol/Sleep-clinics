import { NextResponse } from "next/server"
import { getClinicById } from "@/lib/clinics"
import { getClinicLocationSlugs } from "@/lib/locations"
import { getCitySlotAvailability, getFeaturedForClinic } from "@/lib/listings"
import { FEATURED_SLOTS_PER_CITY } from "@/lib/pricing"

// How many featured slots are left in a clinic's city. Read only: the checkout
// route re-checks this before opening a session, so a stale answer here cannot
// oversell a city.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const clinicId = Number(searchParams.get("clinicId"))

  if (!Number.isFinite(clinicId) || clinicId <= 0) {
    return NextResponse.json({ error: "Invalid clinic id" }, { status: 400 })
  }

  const clinic = getClinicById(clinicId)
  if (!clinic) {
    return NextResponse.json({ error: "Clinic not found" }, { status: 404 })
  }

  const location = getClinicLocationSlugs(clinic)
  if (!location) {
    return NextResponse.json({
      clinicId,
      city: clinic.city,
      state: clinic.state,
      eligible: false,
      reason: "This listing is not on a city page yet.",
      total: FEATURED_SLOTS_PER_CITY,
    })
  }

  const [availability, existing] = await Promise.all([
    getCitySlotAvailability(location.stateSlug, location.citySlug),
    getFeaturedForClinic(clinicId),
  ])

  const alreadyFeatured =
    existing?.status === "active" || existing?.status === "past_due"

  return NextResponse.json({
    clinicId,
    clinicName: clinic.name,
    city: clinic.city,
    state: location.stateAbbr,
    cityUrl: `/locations/${location.stateSlug}/${location.citySlug}`,
    eligible: !availability.soldOut && !alreadyFeatured,
    alreadyFeatured,
    taken: availability.taken,
    total: availability.total,
    soldOut: availability.soldOut,
  })
}
