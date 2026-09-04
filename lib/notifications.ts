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

export async function notifyFeaturedActivated(params: {
  clinicId: number
  clinicName: string
  clinicSlug: string | null
  citySlug: string
  stateSlug: string
  amountCents: number | null
  interval: string | null
  contactEmail: string | null
  subscriptionId: string | null
}) {
  const listingUrl = params.clinicSlug
    ? `https://www.ussleepclinics.com/clinic/${params.clinicSlug}`
    : null
  const cityUrl = `https://www.ussleepclinics.com/locations/${params.stateSlug}/${params.citySlug}`

  await send({
    to: operatorAddress(),
    subject: `FEATURED activated: ${params.clinicName}`,
    ...(params.contactEmail ? { replyTo: params.contactEmail } : {}),
    html: `
      <h2>Featured placement activated</h2>
      <p><strong>Clinic:</strong> ${escapeHtml(params.clinicName)} (id ${escapeHtml(String(params.clinicId))})</p>
      <p><strong>City page:</strong> <a href="${escapeHtml(cityUrl)}">${escapeHtml(cityUrl)}</a></p>
      ${listingUrl ? `<p><strong>Listing:</strong> <a href="${escapeHtml(listingUrl)}">${escapeHtml(listingUrl)}</a></p>` : ""}
      <p><strong>Plan:</strong> ${params.amountCents != null ? escapeHtml(formatPrice(params.amountCents)) : "see Stripe"} ${escapeHtml(params.interval ?? "")}</p>
      <p><strong>Contact:</strong> ${escapeHtml(params.contactEmail ?? "not provided")}</p>
      <p><strong>Subscription:</strong> ${escapeHtml(params.subscriptionId ?? "n/a")}</p>
    `,
  })

  if (params.contactEmail && canEmailCustomers()) {
    await send({
      to: params.contactEmail,
      subject: `${params.clinicName} is now featured in ${params.citySlug.replace(/-/g, " ")}`,
      html: `
        <h2>Your featured placement is live</h2>
        <p><strong>${escapeHtml(params.clinicName)}</strong> now appears at the top of its
        city and state results, labeled as featured.</p>
        <p>See it here: <a href="${escapeHtml(cityUrl)}">${escapeHtml(cityUrl)}</a></p>
        <p>Manage or cancel your plan any time from the billing portal link in your
        Stripe receipt, or reply to this email and we will handle it.</p>
      `,
    })
  }
}

export async function notifyFeaturedEnded(params: {
  clinicName: string | null
  clinicId: number | null
  reason: "canceled" | "past_due"
  contactEmail: string | null
  subscriptionId: string
}) {
  await send({
    to: operatorAddress(),
    subject: `Featured ${params.reason}: ${params.clinicName ?? params.subscriptionId}`,
    html: `
      <h2>Featured placement ${escapeHtml(params.reason)}</h2>
      <p><strong>Clinic:</strong> ${escapeHtml(params.clinicName ?? "unknown")} (id ${escapeHtml(String(params.clinicId ?? "unknown"))})</p>
      <p><strong>Contact:</strong> ${escapeHtml(params.contactEmail ?? "not provided")}</p>
      <p><strong>Subscription:</strong> ${escapeHtml(params.subscriptionId)}</p>
      <p>${params.reason === "past_due"
        ? "Payment failed. The placement stays live through Stripe's retry window."
        : "The placement has been removed and the city slot is free again."}</p>
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
