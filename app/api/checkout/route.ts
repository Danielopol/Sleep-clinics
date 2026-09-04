import { NextResponse } from "next/server"
import { z } from "zod"
import { getStripeClient, getBaseUrl } from "@/lib/stripe"
import { getPlan, getPlanPrice, formatPrice, FEATURED_SLOTS_PER_CITY } from "@/lib/pricing"
import {
  saveSubmission,
  submissionRef,
  reserveFeaturedSlot,
  getCitySlotAvailability,
  getFeaturedForClinic,
} from "@/lib/listings"
import { getClinicById } from "@/lib/clinics"
import { getClinicLocationSlugs } from "@/lib/locations"
import { notifyPriorityAddStarted } from "@/lib/notifications"

// Creates the Stripe Checkout Session for a paid listing. Nothing is granted
// here: the entitlement is written only by the webhook, after Stripe confirms
// the money moved. This route just reserves the slot and opens the session.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const priorityAddSchema = z.object({
  kind: z.literal("priority-add"),
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
})

const featuredSchema = z.object({
  kind: z.literal("featured-city"),
  clinicId: z.number().int().positive(),
  interval: z.enum(["month", "year"]),
  contactEmail: z.string().trim().email().max(200).optional().or(z.literal("")),
})

const bodySchema = z.discriminatedUnion("kind", [priorityAddSchema, featuredSchema])

export async function POST(request: Request) {
  let parsed: z.infer<typeof bodySchema>
  try {
    parsed = bodySchema.parse(await request.json())
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const stripe = getStripeClient()
  if (!stripe) {
    console.error("STRIPE_SECRET_KEY is not set, cannot start checkout")
    return NextResponse.json(
      { error: "Payments are not configured yet. Please contact us and we will take it from here." },
      { status: 503 }
    )
  }

  const baseUrl = getBaseUrl()

  try {
    if (parsed.kind === "priority-add") {
      const plan = getPlan("priority-add")
      const price = getPlanPrice("priority-add", "one-time")
      const priceId = process.env[price.priceIdEnv]

      const submission = await saveSubmission({
        clinicName: parsed.clinicName,
        address: parsed.address,
        city: parsed.city,
        state: parsed.state,
        zip: parsed.zip,
        phone: parsed.phone,
        specialty: parsed.specialty,
        website: parsed.website || undefined,
        description: parsed.description || undefined,
        contactEmail: parsed.contactEmail,
      })

      // When Supabase is not configured the email is the only record of what
      // was submitted, so send it now rather than after payment.
      if (!submission.stored) {
        await notifyPriorityAddStarted({
          reference: submissionRef(submission.id),
          submission: parsed,
        })
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          priceId
            ? { price: priceId, quantity: 1 }
            : {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: price.amountCents,
                  product_data: {
                    name: plan.name,
                    description: `Priority review and publication of ${parsed.clinicName} on US Sleep Clinics.`,
                  },
                },
              },
        ],
        customer_email: parsed.contactEmail,
        client_reference_id: submission.id,
        allow_promotion_codes: true,
        billing_address_collection: "required",
        metadata: {
          kind: "priority-add",
          submissionId: submission.id,
          reference: submissionRef(submission.id),
          clinicName: parsed.clinicName,
          city: parsed.city,
          state: parsed.state,
        },
        success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/submit?canceled=1`,
      })

      return NextResponse.json({ url: session.url })
    }

    // --- featured-city ---
    const clinic = getClinicById(parsed.clinicId)
    if (!clinic) {
      return NextResponse.json({ error: "We could not find that clinic." }, { status: 404 })
    }

    const location = getClinicLocationSlugs(clinic)
    if (!location) {
      return NextResponse.json(
        { error: "This listing has no city page yet, so it cannot be featured. Please contact us." },
        { status: 409 }
      )
    }

    const existing = await getFeaturedForClinic(clinic.id)
    if (existing && (existing.status === "active" || existing.status === "past_due")) {
      return NextResponse.json(
        { error: "This clinic already has a featured placement." },
        { status: 409 }
      )
    }

    const availability = await getCitySlotAvailability(location.stateSlug, location.citySlug)
    if (availability.soldOut) {
      return NextResponse.json(
        {
          error: `All ${FEATURED_SLOTS_PER_CITY} featured slots in ${clinic.city} are taken. Contact us to join the waitlist for the next opening.`,
        },
        { status: 409 }
      )
    }

    const plan = getPlan("featured-city")
    const price = getPlanPrice("featured-city", parsed.interval)
    const priceId = process.env[price.priceIdEnv]

    const metadata: Record<string, string> = {
      kind: "featured-city",
      clinicId: String(clinic.id),
      clinicSlug: clinic.slug ?? "",
      clinicName: clinic.name.slice(0, 200),
      citySlug: location.citySlug,
      stateSlug: location.stateSlug,
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        priceId
          ? { price: priceId, quantity: 1 }
          : {
              quantity: 1,
              price_data: {
                currency: "usd",
                unit_amount: price.amountCents,
                recurring: { interval: parsed.interval },
                product_data: {
                  name: `${plan.name}: ${clinic.city}, ${location.stateAbbr}`,
                  description: `Featured placement for ${clinic.name} on US Sleep Clinics, ${formatPrice(price.amountCents)} ${price.label}.`,
                },
              },
            },
      ],
      customer_email: parsed.contactEmail || undefined,
      client_reference_id: String(clinic.id),
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata,
      // Repeated on the subscription so renewal and cancellation events can be
      // traced back to a clinic without a database lookup.
      subscription_data: { metadata },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/claim?clinic=${clinic.id}&canceled=1`,
    })

    await reserveFeaturedSlot({
      clinicId: clinic.id,
      clinicSlug: clinic.slug,
      clinicName: clinic.name,
      citySlug: location.citySlug,
      stateSlug: location.stateSlug,
      sessionId: session.id,
      contactEmail: parsed.contactEmail || null,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 })
  }
}
