import { NextResponse } from "next/server"
import { z } from "zod"
import { addToClaimWaitlist } from "@/lib/listings"
import { notifyClaimWaitlist } from "@/lib/notifications"
import { getClinicById } from "@/lib/clinics"

// Waitlist for the Claimed and Verified tier, which is not self-serve yet.
// Nothing is granted and nothing is charged here: this records the request so
// the clinic's ownership can be verified by hand.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const schema = z.object({
  clinicId: z.number().int().positive().optional().nullable(),
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

  const clinic = input.clinicId ? getClinicById(input.clinicId) : undefined

  const stored = await addToClaimWaitlist({
    clinicId: clinic?.id ?? null,
    clinicSlug: clinic?.slug ?? null,
    clinicName: clinic?.name ?? null,
    contactName: input.contactName || null,
    contactEmail: input.contactEmail,
    phone: input.phone || null,
    notes: input.notes || null,
  })

  await notifyClaimWaitlist({
    clinicId: clinic?.id ?? null,
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
