import { NextResponse } from "next/server"
import { z } from "zod"
import { getClinicBySlug } from "@/lib/clinics"
import { claimRef, saveClaim } from "@/lib/listings"
import { notifyFreeClaim } from "@/lib/notifications"
import { clientIp, emailMatchesWebsite, looksAutomated, overBurstLimit } from "@/lib/form-guard"

// Free claim of a listed clinic. Nothing is granted or changed here: this
// records who is asking and what they want corrected. A human checks the
// claimant's identity (an email at the clinic's own domain, or a call to its
// listed number), applies the corrections, and only then sets confirmed_at.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const schema = z.object({
  clinicSlug: z.string().trim().max(300).regex(/^[a-z0-9-]+$/),
  contactName: z.string().trim().min(2).max(150),
  contactRole: z.string().trim().max(100).optional().or(z.literal("")),
  contactEmail: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  corrections: z.string().trim().max(4000).optional().or(z.literal("")),
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
            : field === "contactName"
              ? "Please enter your name."
              : "Please check the form and try again.",
      },
      { status: 400 }
    )
  }

  if (looksAutomated(input)) {
    return NextResponse.json({ success: true, reference: claimRef(crypto.randomUUID()) })
  }

  const clinic = getClinicBySlug(input.clinicSlug)
  if (!clinic?.slug) {
    return NextResponse.json({ error: "We could not find that clinic." }, { status: 404 })
  }

  if (overBurstLimit("claim-listing", clientIp(request))) {
    return NextResponse.json(
      { error: "We have several claims from you already. Please email us to add more." },
      { status: 429 }
    )
  }

  const emailDomainMatches = emailMatchesWebsite(input.contactEmail, clinic.website)

  const saved = await saveClaim({
    clinicSlug: clinic.slug,
    clinicName: clinic.name,
    contactName: input.contactName,
    contactRole: input.contactRole || null,
    contactEmail: input.contactEmail,
    phone: input.phone || null,
    corrections: input.corrections || null,
    emailDomainMatches,
  })
  const reference = claimRef(saved.id)

  await notifyFreeClaim({
    reference,
    clinicName: clinic.name,
    clinicSlug: clinic.slug,
    clinicPhone: clinic.phone?.split(";")[0].trim() || null,
    clinicWebsite: clinic.website ?? null,
    contactName: input.contactName,
    contactRole: input.contactRole || null,
    contactEmail: input.contactEmail,
    phone: input.phone || null,
    corrections: input.corrections || null,
    emailDomainMatches,
    storedInDatabase: saved.stored,
  })

  return NextResponse.json({ success: true, reference })
}
