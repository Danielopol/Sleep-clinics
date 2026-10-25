import { NextResponse } from "next/server"
import { z } from "zod"
import { saveSubmission, submissionRef } from "@/lib/listings"
import { notifyFreeSubmission } from "@/lib/notifications"
import { clientIp, looksAutomated, overBurstLimit } from "@/lib/form-guard"

// Free submission for a clinic that is not in the directory yet. Nothing goes
// live from here: the operator checks the clinic against public records and
// adds it by hand (docs/PAID-LISTINGS.md). A clinic that wants it faster buys
// any paid plan on /claim, which includes adding it.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const schema = z.object({
  clinicName: z.string().trim().min(2).max(200),
  address: z.string().trim().min(3).max(300),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().min(2).max(100),
  zip: z.string().trim().min(3).max(15),
  phone: z.string().trim().min(7).max(40),
  specialty: z.string().trim().min(1).max(100),
  contactEmail: z.string().trim().email().max(200),
  website: z.string().trim().max(300).optional().or(z.literal("")),
  description: z.string().trim().max(3000).optional().or(z.literal("")),
  nickname: z.string().max(200).optional(),
  elapsedMs: z.number().optional(),
})

export async function POST(request: Request) {
  let input: z.infer<typeof schema>
  try {
    input = schema.parse(await request.json())
  } catch (error) {
    const field = error instanceof z.ZodError ? error.issues[0]?.path[0] : undefined
    return NextResponse.json(
      {
        error:
          field === "contactEmail"
            ? "Please check your email address."
            : "Please fill in every required field and try again.",
      },
      { status: 400 }
    )
  }

  if (looksAutomated(input)) {
    return NextResponse.json({ success: true, reference: submissionRef(crypto.randomUUID()) })
  }

  if (overBurstLimit("submit-clinic", clientIp(request))) {
    return NextResponse.json(
      { error: "We have several submissions from you already. Please email us to add more." },
      { status: 429 }
    )
  }

  const details = {
    clinicName: input.clinicName,
    address: input.address,
    city: input.city,
    state: input.state,
    zip: input.zip,
    phone: input.phone,
    specialty: input.specialty,
    contactEmail: input.contactEmail,
    website: input.website || undefined,
    description: input.description || undefined,
  }

  const saved = await saveSubmission(details)
  const reference = submissionRef(saved.id)

  await notifyFreeSubmission({ reference, submission: details, storedInDatabase: saved.stored })

  return NextResponse.json({ success: true, reference })
}
