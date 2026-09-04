import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import type Stripe from "stripe"
import { getStripeClient } from "@/lib/stripe"
import {
  markSubmissionPaid,
  submissionRef,
  activateFeatured,
  setFeaturedStatusBySubscription,
  getFeaturedBySubscription,
  claimStripeEvent,
  releaseStripeEvent,
  invalidateFeaturedCache,
} from "@/lib/listings"
import {
  notifyPriorityAddPaid,
  notifyFeaturedActivated,
  notifyFeaturedEnded,
} from "@/lib/notifications"
import { isStoreConfigured } from "@/lib/supabase"

/**
 * Stripe webhook: the only place a paid entitlement is granted.
 *
 * The browser never gets to tell this app that a payment succeeded. The
 * success page is cosmetic; this handler, running on a signed payload from
 * Stripe, is what marks a submission paid and puts a clinic on the featured
 * list.
 *
 * Must read the raw request body: the signature is computed over the exact
 * bytes Stripe sent, so any JSON round trip would invalidate it.
 */
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * The renewal date, which moved from the subscription to its items in the 2025
 * API versions. Reads whichever one this account's version provides.
 */
function periodEnd(subscription: Stripe.Subscription): number | null {
  const legacy = (subscription as unknown as { current_period_end?: number }).current_period_end
  if (typeof legacy === "number") return legacy
  const item = subscription.items?.data?.[0] as unknown as { current_period_end?: number } | undefined
  return typeof item?.current_period_end === "number" ? item.current_period_end : null
}

function revalidateFeaturedPages(stateSlug?: string | null, citySlug?: string | null) {
  invalidateFeaturedCache()
  try {
    if (stateSlug && citySlug) revalidatePath(`/locations/${stateSlug}/${citySlug}`)
    if (stateSlug) revalidatePath(`/locations/${stateSlug}`)
  } catch (error) {
    // revalidatePath throws if the path was never rendered. Not a failure:
    // an unrendered page will pick up the new order on its first request.
    console.error("revalidatePath failed:", error)
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session, stripe: Stripe) {
  const kind = session.metadata?.kind

  if (kind === "priority-add") {
    const submissionId = session.metadata?.submissionId ?? session.client_reference_id
    if (!submissionId) {
      console.error("priority-add session without a submission id:", session.id)
      return
    }

    await markSubmissionPaid({
      submissionId,
      sessionId: session.id,
      paymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
      amountCents: session.amount_total,
    })

    await notifyPriorityAddPaid({
      reference: session.metadata?.reference ?? submissionRef(submissionId),
      clinicName: session.metadata?.clinicName ?? "unknown clinic",
      city: session.metadata?.city ?? "",
      state: session.metadata?.state ?? "",
      amountCents: session.amount_total ?? 0,
      contactEmail: session.customer_details?.email ?? session.customer_email ?? null,
      sessionId: session.id,
      storedInDatabase: isStoreConfigured(),
    })
    return
  }

  if (kind === "featured-city") {
    const clinicId = Number(session.metadata?.clinicId)
    if (!Number.isFinite(clinicId)) {
      console.error("featured-city session without a clinic id:", session.id)
      return
    }

    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription?.id ?? null

    let renewsAt: number | null = null
    if (subscriptionId) {
      try {
        renewsAt = periodEnd(await stripe.subscriptions.retrieve(subscriptionId))
      } catch (error) {
        console.error("Could not read the subscription period:", error)
      }
    }

    const contactEmail = session.customer_details?.email ?? session.customer_email ?? null

    await activateFeatured({
      clinicId,
      clinicSlug: session.metadata?.clinicSlug || null,
      clinicName: session.metadata?.clinicName || null,
      citySlug: session.metadata?.citySlug ?? "",
      stateSlug: session.metadata?.stateSlug ?? "",
      sessionId: session.id,
      customerId: typeof session.customer === "string" ? session.customer : session.customer?.id ?? null,
      subscriptionId,
      contactEmail,
      currentPeriodEnd: renewsAt,
    })

    revalidateFeaturedPages(session.metadata?.stateSlug, session.metadata?.citySlug)

    await notifyFeaturedActivated({
      clinicId,
      clinicName: session.metadata?.clinicName ?? `clinic ${clinicId}`,
      clinicSlug: session.metadata?.clinicSlug || null,
      citySlug: session.metadata?.citySlug ?? "",
      stateSlug: session.metadata?.stateSlug ?? "",
      amountCents: session.amount_total,
      interval: null,
      contactEmail,
      subscriptionId,
    })
    return
  }

  console.warn("Ignoring checkout session with no known kind:", session.id, kind)
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  if (subscription.metadata?.kind !== "featured-city") return

  // `incomplete` and `paused` are transitional: a card that needs a second
  // step is not a cancellation, and treating it as one would email the
  // customer that their placement ended seconds after they bought it.
  const status = subscription.status
  const mapped =
    status === "active" || status === "trialing"
      ? "active"
      : status === "past_due"
        ? "past_due"
        : status === "canceled" || status === "unpaid" || status === "incomplete_expired"
          ? "canceled"
          : null

  if (mapped === null) return

  await setFeaturedStatusBySubscription(subscription.id, mapped, periodEnd(subscription))
  revalidateFeaturedPages(subscription.metadata?.stateSlug, subscription.metadata?.citySlug)

  if (mapped !== "active") {
    const record = await getFeaturedBySubscription(subscription.id)
    await notifyFeaturedEnded({
      clinicName: record?.clinic_name ?? subscription.metadata?.clinicName ?? null,
      clinicId: record?.clinic_id ?? Number(subscription.metadata?.clinicId) ?? null,
      reason: mapped === "past_due" ? "past_due" : "canceled",
      contactEmail: record?.contact_email ?? null,
      subscriptionId: subscription.id,
    })
  }
}

export async function POST(request: Request) {
  const stripe = getStripeClient()
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripe || !secret) {
    console.error("Stripe webhook received but STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET is missing")
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 })
  }

  const signature = request.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(await request.text(), signature, secret)
  } catch (error) {
    // An unverified payload is either a misconfiguration or someone trying to
    // grant themselves a listing. Never process it.
    console.error("Stripe signature verification failed:", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (!(await claimStripeEvent(event.id, event.type))) {
    return NextResponse.json({ received: true, duplicate: true })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session, stripe)
        break
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionChange(event.data.object as Stripe.Subscription)
        break
      default:
        break
    }
  } catch (error) {
    // Hand the event id back before answering 500, otherwise Stripe's retry
    // would be dropped as a duplicate and the order would never be fulfilled.
    // Every handler is safe to run twice.
    console.error(`Error handling ${event.type}:`, error)
    await releaseStripeEvent(event.id)
    return NextResponse.json({ error: "Handler failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
