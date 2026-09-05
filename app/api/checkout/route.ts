import { NextResponse } from "next/server"
import { z } from "zod"
import { getStripeClient, getBaseUrl } from "@/lib/stripe"
import { getPlan, getPlanPrice, formatPrice, FEATURED_SLOTS_PER_CITY } from "@/lib/pricing"
import {
  saveSubmission,
  submissionRef,
  reserveSubscriptionSlot,
  getCitySlotAvailability,
  getSubscriptionForClinic,
  type PendingClinic,
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

/** A clinic that is not in the directory yet, bought alongside a subscription. */
const newClinicSchema = z.object({
  clinicName: z.string().trim().min(2).max(200),
  address: z.string().trim().min(3).max(300),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().min(2).max(100),
  zip: z.string().trim().min(3).max(15),
  phone: z.string().trim().min(7).max(40),
  specialty: z.string().trim().min(1).max(100),
  website: z.string().trim().max(300).optional().or(z.literal("")),
  description: z.string().trim().max(3000).optional().or(z.literal("")),
})

// Both recurring plans take the same shape: an existing clinic id, or the
// details of a clinic we have not listed yet. Exactly one is required, checked
// after parsing since a discriminated union cannot carry a refinement.
const subscriptionFields = {
  interval: z.enum(["month", "year"]),
  clinicId: z.number().int().positive().optional().nullable(),
  newClinic: newClinicSchema.optional().nullable(),
  contactEmail: z.string().trim().email().max(200).optional().or(z.literal("")),
}

const claimSchema = z.object({ kind: z.literal("claim-verified"), ...subscriptionFields })
const featuredSchema = z.object({ kind: z.literal("featured-city"), ...subscriptionFields })

const bodySchema = z.discriminatedUnion("kind", [
  priorityAddSchema,
  claimSchema,
  featuredSchema,
])

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

    // --- recurring plans: claim-verified and featured-city ---
    const planId = parsed.kind
    const plan = getPlan(planId)

    // Claimed and Verified is annual only; ignore a monthly interval sent for it
    // rather than throwing on a price that does not exist.
    const interval = plan.prices.some((p) => p.interval === parsed.interval)
      ? parsed.interval
      : plan.prices[0].interval

    if (!parsed.clinicId && !parsed.newClinic) {
      return NextResponse.json(
        { error: "Select your clinic, or send us its details if it is not listed yet." },
        { status: 400 }
      )
    }

    // Resolve the clinic, whether it already exists or is being added with this
    // purchase. Both paths must end up with a city so the cap can be enforced.
    let clinicId: number | null = null
    let clinicSlug: string | null = null
    let clinicName: string
    let cityName: string
    let stateAbbr: string
    let citySlug: string | null = null
    let stateSlug: string | null = null
    let pendingClinic: PendingClinic | null = null

    if (parsed.clinicId) {
      const clinic = getClinicById(parsed.clinicId)
      if (!clinic) {
        return NextResponse.json({ error: "We could not find that clinic." }, { status: 404 })
      }

      const location = getClinicLocationSlugs(clinic)
      if (!location) {
        return NextResponse.json(
          { error: "This listing has no city page yet. Please contact us and we will sort it out." },
          { status: 409 }
        )
      }

      const existing = await getSubscriptionForClinic(clinic.id)
      if (existing && (existing.status === "active" || existing.status === "past_due")) {
        return NextResponse.json(
          { error: "This clinic already has an active plan. Contact us to change it." },
          { status: 409 }
        )
      }

      clinicId = clinic.id
      clinicSlug = clinic.slug ?? null
      clinicName = clinic.name
      cityName = clinic.city
      stateAbbr = location.stateAbbr
      citySlug = location.citySlug
      stateSlug = location.stateSlug
    } else {
      const details = parsed.newClinic!
      const location = getClinicLocationSlugs({ city: details.city, state: details.state })
      if (!location) {
        return NextResponse.json(
          { error: "That does not look like a US city and state. Please check and try again." },
          { status: 400 }
        )
      }

      clinicName = details.clinicName
      cityName = details.city
      stateAbbr = location.stateAbbr
      citySlug = location.citySlug
      stateSlug = location.stateSlug
      pendingClinic = {
        clinicName: details.clinicName,
        address: details.address,
        city: details.city,
        state: details.state,
        zip: details.zip,
        phone: details.phone,
        specialty: details.specialty,
        website: details.website || undefined,
        description: details.description || undefined,
      }
    }

    // Only the featured plan consumes one of a city's limited slots.
    if (plan.grantsFeaturedPlacement) {
      const availability = await getCitySlotAvailability(stateSlug!, citySlug!)
      if (availability.soldOut) {
        return NextResponse.json(
          {
            error: `All ${FEATURED_SLOTS_PER_CITY} featured slots in ${cityName} are taken. Join the waitlist and we will contact you when one opens.`,
            soldOut: true,
          },
          { status: 409 }
        )
      }
    }

    const price = getPlanPrice(planId, interval)
    const priceId = process.env[price.priceIdEnv]

    const metadata: Record<string, string> = {
      kind: planId,
      clinicId: clinicId != null ? String(clinicId) : "",
      clinicSlug: clinicSlug ?? "",
      clinicName: clinicName.slice(0, 200),
      citySlug: citySlug ?? "",
      stateSlug: stateSlug ?? "",
      newClinic: pendingClinic ? "yes" : "no",
    }

    const productDescription = plan.grantsFeaturedPlacement
      ? `Featured placement for ${clinicName} on US Sleep Clinics, ${formatPrice(price.amountCents)} ${price.label}.`
      : `Claimed and verified listing for ${clinicName} on US Sleep Clinics, ${formatPrice(price.amountCents)} ${price.label}.`

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
                recurring: { interval: interval as "month" | "year" },
                product_data: {
                  name: plan.grantsFeaturedPlacement
                    ? `${plan.name}: ${cityName}, ${stateAbbr}`
                    : plan.name,
                  description: productDescription,
                },
              },
            },
      ],
      customer_email: parsed.contactEmail || undefined,
      client_reference_id: clinicId != null ? String(clinicId) : undefined,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata,
      // Repeated on the subscription so renewal and cancellation events can be
      // traced back to a clinic without a database lookup.
      subscription_data: { metadata },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/claim?${clinicId != null ? `clinic=${clinicId}&` : ""}canceled=1`,
    })

    await reserveSubscriptionSlot({
      plan: planId,
      clinicId,
      clinicSlug,
      clinicName,
      citySlug,
      stateSlug,
      pendingClinic,
      sessionId: session.id,
      contactEmail: parsed.contactEmail || null,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 })
  }
}
