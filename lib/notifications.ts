import { getResendClient } from "./resend"
import { escapeHtml, escapeHtmlMultiline, safeHttpUrl, singleLineSubject } from "./html-email"
import { formatPrice } from "./pricing"

/**
 * Notification emails for the paid listing flows.
 *
 * Two audiences: the operator (every order, so fulfillment can start) and the
 * customer (what they just bought and what happens next). Everything
 * interpolated here originates in a public form or in Stripe metadata that was
 * seeded from one, so it all goes through the escapers in lib/html-email.ts.
 *
 * Nothing in here is allowed to throw. An email failure must never roll back a
 * payment that Stripe has already taken: failures are logged and swallowed so
 * the webhook still answers 200 and Stripe stops retrying.
 */

const DEFAULT_FROM = "US Sleep Clinics <onboarding@resend.dev>"

function fromAddress(): string {
  return process.env.EMAIL_FROM || DEFAULT_FROM
}

function operatorAddress(): string {
  return process.env.NOTIFY_EMAIL || "valentin.marin83@gmail.com"
}

/**
 * The Resend sandbox sender (onboarding@resend.dev) can only deliver to the
 * account owner, so customer-facing mail is skipped until EMAIL_FROM points at
 * a verified domain. Operator mail works either way.
 */
function canEmailCustomers(): boolean {
  return Boolean(process.env.EMAIL_FROM)
}

async function send(params: { to: string; subject: string; html: string; replyTo?: string }) {
  const resend = getResendClient()
  if (!resend) {
    console.error("RESEND_API_KEY is not set, skipping email:", params.subject)
    return
  }

  try {
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: [params.to],
      subject: singleLineSubject(params.subject),
      html: params.html,
      ...(params.replyTo ? { replyTo: params.replyTo } : {}),
    })
    if (error) console.error("Resend error:", error)
  } catch (error) {
    console.error("Email send failed:", error)
  }
}

interface SubmissionFields {
  clinicName: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  specialty: string
  contactEmail: string
  website?: string
  description?: string
}

function submissionTable(s: SubmissionFields): string {
  const websiteUrl = safeHttpUrl(s.website)
  const websiteRow = websiteUrl
    ? `<p><strong>Website:</strong> <a href="${escapeHtml(websiteUrl)}">${escapeHtml(websiteUrl)}</a></p>`
    : s.website
      ? `<p><strong>Website:</strong> ${escapeHtml(s.website)} (not a valid http or https URL, not linked)</p>`
      : ""

  return `
    <p><strong>Clinic Name:</strong> ${escapeHtml(s.clinicName)}</p>
    <p><strong>Address:</strong> ${escapeHtml(s.address)}</p>
    <p><strong>City:</strong> ${escapeHtml(s.city)}</p>
    <p><strong>State:</strong> ${escapeHtml(s.state)}</p>
    <p><strong>ZIP Code:</strong> ${escapeHtml(s.zip)}</p>
    <p><strong>Phone Number:</strong> ${escapeHtml(s.phone)}</p>
    <p><strong>Specialty:</strong> ${escapeHtml(s.specialty)}</p>
    <p><strong>Contact Email:</strong> ${escapeHtml(s.contactEmail)}</p>
    ${websiteRow}
    ${s.description ? `<p><strong>Description:</strong><br>${escapeHtmlMultiline(s.description)}</p>` : ""}
  `
}

/** Fired when checkout opens, only when there is no database to hold the payload. */
export async function notifyPriorityAddStarted(params: {
  reference: string
  submission: SubmissionFields
}) {
  await send({
    to: operatorAddress(),
    subject: `Priority add started (unpaid): ${params.submission.clinicName}`,
    replyTo: params.submission.contactEmail,
    html: `
      <h2>Priority listing add, payment pending</h2>
      <p>Reference: <strong>${escapeHtml(params.reference)}</strong></p>
      <p>This clinic opened Stripe Checkout. Wait for the paid confirmation with
      the same reference before publishing.</p>
      ${submissionTable(params.submission)}
    `,
  })
}

export async function notifyPriorityAddPaid(params: {
  reference: string
  clinicName: string
  city: string
  state: string
  amountCents: number
  contactEmail: string | null
  sessionId: string
  storedInDatabase: boolean
}) {
  await send({
    to: operatorAddress(),
    subject: `PAID priority add: ${params.clinicName} (${params.city}, ${params.state})`,
    ...(params.contactEmail ? { replyTo: params.contactEmail } : {}),
    html: `
      <h2>Priority listing add paid</h2>
      <p>Reference: <strong>${escapeHtml(params.reference)}</strong></p>
      <p><strong>Clinic:</strong> ${escapeHtml(params.clinicName)}</p>
      <p><strong>Location:</strong> ${escapeHtml(params.city)}, ${escapeHtml(params.state)}</p>
      <p><strong>Amount:</strong> ${escapeHtml(formatPrice(params.amountCents))}</p>
      <p><strong>Contact:</strong> ${escapeHtml(params.contactEmail ?? "not provided")}</p>
      <p><strong>Stripe session:</strong> ${escapeHtml(params.sessionId)}</p>
      <p>${params.storedInDatabase
        ? "The full submission is in the clinic_submissions table, marked paid."
        : "The full submission was emailed separately under the same reference."}</p>
      <p><strong>48 hour review clock starts now.</strong></p>
    `,
  })

  if (params.contactEmail && canEmailCustomers()) {
    await send({
      to: params.contactEmail,
      subject: `We received your listing for ${params.clinicName}`,
      html: `
        <h2>Thank you, your listing is in review</h2>
        <p>We have your submission for <strong>${escapeHtml(params.clinicName)}</strong>
        (${escapeHtml(params.city)}, ${escapeHtml(params.state)}).</p>
        <p>Your reference is <strong>${escapeHtml(params.reference)}</strong>.</p>
        <p>A person reviews every listing. We will verify the details and publish
        your page within 48 hours on business days, then email you the link.</p>
        <p>If we cannot verify and publish your clinic, we refund you in full.</p>
        <p>Reply to this email if anything needs correcting.</p>
      `,
    })
  }
}

export async function notifySubscriptionActivated(params: {
  plan: "claim-verified" | "featured-city"
  planName: string
  clinicId: number | null
  clinicName: string
  clinicSlug: string | null
  citySlug: string
  stateSlug: string
  amountCents: number | null
  contactEmail: string | null
  subscriptionId: string | null
  isNewClinic: boolean
  pendingClinic: {
    clinicName: string
    address: string
    city: string
    state: string
    zip: string
    phone: string
    specialty: string
    website?: string
    description?: string
  } | null
  storedInDatabase: boolean
}) {
  const listingUrl = params.clinicSlug
    ? `https://www.ussleepclinics.com/clinic/${params.clinicSlug}`
    : null
  const cityUrl = `https://www.ussleepclinics.com/locations/${params.stateSlug}/${params.citySlug}`

  // Everything this order still needs a human to do, spelled out at the top so
  // it cannot be missed. A paid order that silently does nothing is the worst
  // failure mode here.
  const todo: string[] = []
  if (!params.storedInDatabase) {
    todo.push(
      `No database is configured, so nothing was flagged. Add ${escapeHtml(
        String(params.clinicId ?? "the clinic id")
      )} to FEATURED_CLINIC_IDS and redeploy, then finish the Supabase setup in docs/PAID-LISTINGS.md.`
    )
  }
  if (params.isNewClinic) {
    todo.push(
      "This clinic is NOT in the directory yet. Add it to the Excel file, run the geocode and generate-data scripts, deploy, then link the new clinic id onto this subscription row (see docs/PAID-LISTINGS.md)."
    )
  }
  todo.push(
    "Confirm this buyer actually represents the clinic, then grant the Verified badge. Paying does not grant it."
  )

  const todoBlock = `<div style="padding:12px;border:2px solid #b91c1c;color:#b91c1c">
      <strong>Before this order is finished:</strong>
      <ol>${todo.map((t) => `<li>${t}</li>`).join("")}</ol>
    </div>`

  const pending = params.pendingClinic
  const pendingBlock = pending
    ? `<h3>Clinic details to add</h3>
       <p><strong>Name:</strong> ${escapeHtml(pending.clinicName)}</p>
       <p><strong>Address:</strong> ${escapeHtml(pending.address)}</p>
       <p><strong>City:</strong> ${escapeHtml(pending.city)}</p>
       <p><strong>State:</strong> ${escapeHtml(pending.state)}</p>
       <p><strong>ZIP:</strong> ${escapeHtml(pending.zip)}</p>
       <p><strong>Phone:</strong> ${escapeHtml(pending.phone)}</p>
       <p><strong>Specialty:</strong> ${escapeHtml(pending.specialty)}</p>
       ${pending.website ? `<p><strong>Website:</strong> ${escapeHtml(pending.website)}</p>` : ""}
       ${pending.description ? `<p><strong>Description:</strong><br>${escapeHtmlMultiline(pending.description)}</p>` : ""}`
    : ""

  const label = params.isNewClinic ? "NEW CLINIC" : "PAID"

  await send({
    to: operatorAddress(),
    subject: `${label} ${params.planName}: ${params.clinicName}`,
    ...(params.contactEmail ? { replyTo: params.contactEmail } : {}),
    html: `
      ${todoBlock}
      <h2>${escapeHtml(params.planName)} activated</h2>
      <p><strong>Clinic:</strong> ${escapeHtml(params.clinicName)} (id ${escapeHtml(String(params.clinicId ?? "not listed yet"))})</p>
      ${params.citySlug ? `<p><strong>City page:</strong> <a href="${escapeHtml(cityUrl)}">${escapeHtml(cityUrl)}</a></p>` : ""}
      ${listingUrl ? `<p><strong>Listing:</strong> <a href="${escapeHtml(listingUrl)}">${escapeHtml(listingUrl)}</a></p>` : ""}
      <p><strong>Amount:</strong> ${params.amountCents != null ? escapeHtml(formatPrice(params.amountCents)) : "see Stripe"}</p>
      <p><strong>Contact:</strong> ${escapeHtml(params.contactEmail ?? "not provided")}</p>
      <p><strong>Subscription:</strong> ${escapeHtml(params.subscriptionId ?? "n/a")}</p>
      ${pendingBlock}
    `,
  })

  if (params.contactEmail && canEmailCustomers() && params.storedInDatabase) {
    const featuredLive = params.plan === "featured-city" && !params.isNewClinic
    await send({
      to: params.contactEmail,
      subject: `We have your ${params.planName} plan for ${params.clinicName}`,
      html: `
        <h2>Thank you, your plan is active</h2>
        ${featuredLive
          ? `<p><strong>${escapeHtml(params.clinicName)}</strong> now appears at the top of its
             city and state results, labeled as featured.
             <a href="${escapeHtml(cityUrl)}">See it here</a>.</p>`
          : params.isNewClinic
            ? `<p>We are adding <strong>${escapeHtml(params.clinicName)}</strong> to the directory
               now. Your page goes live within 48 hours on business days and we will email
               you the link.</p>`
            : `<p>Your plan for <strong>${escapeHtml(params.clinicName)}</strong> is active.</p>`}
        <p>Next, we confirm you represent the clinic so we can add the Verified badge.
        We may reply to this email to check. That usually takes under 48 hours on
        business days, and we refund you in full if we cannot verify it.</p>
        <p>Send us any changes to your hours, services, description, or photos and we
        apply them within one business day.</p>
        <p>Manage or cancel your plan any time from the billing portal link in your
        Stripe receipt, or reply to this email and we will handle it.</p>
      `,
    })
  }
}

export async function notifySubscriptionEnded(params: {
  planName: string
  clinicName: string | null
  clinicId: number | null
  reason: "canceled" | "past_due"
  contactEmail: string | null
  subscriptionId: string
}) {
  await send({
    to: operatorAddress(),
    subject: `${params.planName} ${params.reason}: ${params.clinicName ?? params.subscriptionId}`,
    html: `
      <h2>${escapeHtml(params.planName)} ${escapeHtml(params.reason)}</h2>
      <p><strong>Clinic:</strong> ${escapeHtml(params.clinicName ?? "unknown")} (id ${escapeHtml(String(params.clinicId ?? "unknown"))})</p>
      <p><strong>Contact:</strong> ${escapeHtml(params.contactEmail ?? "not provided")}</p>
      <p><strong>Subscription:</strong> ${escapeHtml(params.subscriptionId)}</p>
      <p>${params.reason === "past_due"
        ? "Payment failed. The plan stays live through Stripe's retry window."
        : "The plan has ended. Any featured placement is removed and the city slot is free again."}</p>
    `,
  })
}

export async function notifyClaimWaitlist(params: {
  clinicName: string | null
  clinicId: number | null
  clinicSlug: string | null
  contactName: string | null
  contactEmail: string
  phone: string | null
  notes: string | null
  storedInDatabase: boolean
}) {
  const listingUrl = params.clinicSlug
    ? `https://www.ussleepclinics.com/clinic/${params.clinicSlug}`
    : null

  await send({
    to: operatorAddress(),
    subject: `Claim request: ${params.clinicName ?? params.contactEmail}`,
    replyTo: params.contactEmail,
    html: `
      <h2>Listing claim request</h2>
      <p><strong>Clinic:</strong> ${escapeHtml(params.clinicName ?? "not specified")} (id ${escapeHtml(String(params.clinicId ?? "n/a"))})</p>
      ${listingUrl ? `<p><strong>Listing:</strong> <a href="${escapeHtml(listingUrl)}">${escapeHtml(listingUrl)}</a></p>` : ""}
      <p><strong>Name:</strong> ${escapeHtml(params.contactName ?? "not provided")}</p>
      <p><strong>Email:</strong> ${escapeHtml(params.contactEmail)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(params.phone ?? "not provided")}</p>
      ${params.notes ? `<p><strong>Notes:</strong><br>${escapeHtmlMultiline(params.notes)}</p>` : ""}
      <p>${params.storedInDatabase ? "Saved to claim_waitlist." : "Not saved: no database configured."}</p>
      <p>Verify that the sender controls the clinic's domain before granting anything.</p>
    `,
  })
}
