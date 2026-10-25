import { NextResponse } from "next/server"
import { z } from "zod"
import { addToClaimWaitlist } from "@/lib/listings"
import { notifyClaimWaitlist } from "@/lib/notifications"
import { getClinicBySlug } from "@/lib/clinics"

// Waitlist for a featured slot, shown once a city's slots are all taken.
// Nothing is granted and nothing is charged here. (Claiming a listing is free
// and goes through /api/claim-listing.)
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const schema = z.object({
  clinicSlug: z.string().trim().max(300).optional().nullable(),
  contactName: z.string().trim().max(150).optional().or(z.literal("")),
  contactEmail: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
})

export async function POST(request: Request) {
  let input: z.infer<typeof schema>
  try {
    input = schema.parse(await request.json())
  } catch {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  const clinic = input.clinicSlug ? getClinicBySlug(input.clinicSlug) : undefined

  const stored = await addToClaimWaitlist({
    clinicSlug: clinic?.slug ?? null,
    clinicName: clinic?.name ?? null,
    contactName: input.contactName || null,
    contactEmail: input.contactEmail,
    phone: input.phone || null,
    notes: input.notes || null,
  })

  await notifyClaimWaitlist({
    clinicSlug: clinic?.slug ?? null,
    clinicName: clinic?.name ?? null,
    contactName: input.contactName || null,
    contactEmail: input.contactEmail,
    phone: input.phone || null,
    notes: input.notes || null,
    storedInDatabase: stored,
  })

  return NextResponse.json({ success: true })
}
