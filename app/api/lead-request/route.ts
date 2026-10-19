import { NextResponse } from "next/server"
import { createHash } from "node:crypto"
import { z } from "zod"
import { getClinicBySlug } from "@/lib/clinics"
import {
  countRecentRequestsFromIp,
  findRecentDuplicate,
  getActiveLeadPartner,
  recordLeadDelivery,
  saveLeadRequest,
} from "@/lib/lead-requests"
import { notifyLeadDeliveryFailed, sendLeadRequestEmail } from "@/lib/lead-request-email"
import {
  CONTACT_TIME_OPTIONS,
  INSURANCE_OPTIONS,
  NON_BILLABLE_INSURANCE,
  REASON_OPTIONS,
  consentText,
  leadRequestRef,
} from "@/lib/lead-request-options"

// Appointment requests for lead partner clinics. See docs/LEAD-REQUESTS.md.
//
// GET  ?clinic=<slug>  tells the form whether to render for this clinic.
// POST                 validates, records, and emails one request.
//
// Nothing here is reachable for a clinic that is not an active partner: GET
// answers enabled: false and POST refuses, so a patient can never send a
// request that goes nowhere.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const SLUG_PATTERN = /^[a-z0-9-]{1,300}$/

const values = <T extends string>(options: ReadonlyArray<{ value: T }>) =>
  options.map((o) => o.value) as [T, ...T[]]

const schema = z.object({
  clinicSlug: z.string().trim().regex(SLUG_PATTERN),
  patientName: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  insuranceType: z.enum(values(INSURANCE_OPTIONS)),
  reason: z.enum(values(REASON_OPTIONS)),
  note: z.string().trim().max(500).optional().or(z.literal("")),
  contactTime: z.enum(values(CONTACT_TIME_OPTIONS)),
  consent: z.literal(true),
  // Spam signals. "website" is a field people never see; "elapsedMs" is how
  // long the form was on screen before it was sent.
  website: z.string().max(500).optional(),
  elapsedMs: z.number().optional(),
})

const MIN_FILL_MS = 3_000
const DAY_MS = 24 * 60 * 60 * 1000
const MAX_PER_IP_PER_DAY = 5

// Burst limit per server instance. The daily limit below is enforced against
// the database, so it holds across instances.
const BURST_WINDOW_MS = 10 * 60 * 1000
const BURST_MAX = 3
const burst = new Map<string, number[]>()

function overBurstLimit(key: string): boolean {
  const now = Date.now()
  const recent = (burst.get(key) ?? []).filter((t) => now - t < BURST_WINDOW_MS)
  recent.push(now)
  burst.set(key, recent)
  if (burst.size > 5_000) {
    for (const [k, times] of burst) {
      if (times.every((t) => now - t >= BURST_WINDOW_MS)) burst.delete(k)
    }
  }
  return recent.length > BURST_MAX
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  )
}

/** Salted so the stored value cannot be reversed into an IP by brute force. */
function hashIp(ip: string): string {
  const salt = process.env.LEAD_IP_SALT || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32)
}

/** US numbers only: ten digits, with or without a leading 1. */
function normalizePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "")
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1)
  return /^[2-9]\d{9}$/.test(digits) ? digits : null
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("clinic") ?? ""
  const enabled =
    SLUG_PATTERN.test(slug) && Boolean(getClinicBySlug(slug)) && Boolean(await getActiveLeadPartner(slug))

  // Cached at Vercel's edge only. A browser cache with stale-while-revalidate
  // would keep showing a visitor the old answer on their next page view, so a
  // clinic switched on would look switched off to anyone who saw it before.
  return NextResponse.json(
    { enabled },
    {
      headers: {
        "Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  )
}

export async function POST(request: Request) {
  let input: z.infer<typeof schema>
  try {
    input = schema.parse(await request.json())
  } catch (error) {
    const field = error instanceof z.ZodError ? error.issues[0]?.path[0] : undefined
    const message =
      field === "consent"
        ? "Please tick the box so we can share your request with the clinic."
        : field === "email"
          ? "Please check your email address, or leave it blank."
          : field === "patientName"
            ? "Please enter your name."
            : "Please check the form and try again."
    return NextResponse.json({ error: message }, { status: 400 })
  }

  // A bot that filled the hidden field, or a form sent faster than a person can
  // type, gets a normal looking answer and nothing else happens.
  if (input.website || input.elapsedMs == null || input.elapsedMs < MIN_FILL_MS) {
    return NextResponse.json({ success: true })
  }

  const phone = normalizePhone(input.phone)
  if (!phone) {
    return NextResponse.json(
      { error: "Please enter a 10 digit US phone number so the clinic can reach you." },
      { status: 400 }
    )
  }

  const clinic = getClinicBySlug(input.clinicSlug)
  const partner = clinic ? await getActiveLeadPartner(input.clinicSlug) : null
  if (!clinic || !partner) {
    return NextResponse.json(
      { error: "This clinic is not taking requests through our site. Please call them directly." },
      { status: 404 }
    )
  }

  const tooMany = NextResponse.json(
    {
      error: `We have received several requests from you already. Please call ${clinic.name} directly${
        clinic.phone ? ` at ${clinic.phone.split(";")[0].trim()}` : ""
      }.`,
    },
    { status: 429 }
  )

  const ipHash = hashIp(clientIp(request))
  if (overBurstLimit(ipHash)) return tooMany

  const recent = await countRecentRequestsFromIp(ipHash, DAY_MS)
  if (recent != null && recent >= MAX_PER_IP_PER_DAY) return tooMany

  // The same patient sending twice is one request: no second email, no second
  // row to invoice. They still see the confirmation.
  const duplicate = await findRecentDuplicate(input.clinicSlug, phone, DAY_MS)
  if (duplicate) {
    return NextResponse.json({ success: true, reference: leadRequestRef(duplicate) })
  }

  const billable = !NON_BILLABLE_INSURANCE.has(input.insuranceType)
  const clinicName = clinic.name

  const id = await saveLeadRequest({
    clinicSlug: input.clinicSlug,
    clinicName,
    patientName: input.patientName,
    phone,
    email: input.email || null,
    insuranceType: input.insuranceType,
    reason: input.reason,
    note: input.note || null,
    contactTime: input.contactTime,
    consentText: consentText(clinicName),
    billable,
    feeCents: billable ? partner.feeCents : null,
    ipHash,
  })

  if (!id) {
    return NextResponse.json(
      {
        error: `Something went wrong on our side and your request was not sent. Please call ${clinicName} directly${
          clinic.phone ? ` at ${clinic.phone.split(";")[0].trim()}` : ""
        }.`,
      },
      { status: 500 }
    )
  }

  const reference = leadRequestRef(id)
  const result = await sendLeadRequestEmail({
    reference,
    clinicName,
    clinicSlug: input.clinicSlug,
    to: partner.destinationEmails,
    patientName: input.patientName,
    phone,
    email: input.email || null,
    insuranceType: input.insuranceType,
    reason: input.reason,
    note: input.note || null,
    contactTime: input.contactTime,
    billable,
  })

  await recordLeadDelivery(id, result)
  if (!result.delivered && result.error) {
    await notifyLeadDeliveryFailed({ reference, clinicSlug: input.clinicSlug, error: result.error })
  }

  return NextResponse.json({ success: true, reference })
}
