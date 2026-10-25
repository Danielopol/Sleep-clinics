import { getResendClient } from "./resend"
import { escapeHtml, escapeHtmlMultiline, safeHttpUrl, singleLineSubject } from "./html-email"
import { formatPrice, TURNAROUND } from "./pricing"

/**
 * Notification emails for the listing flows, free and paid.
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

/** A free submission for a clinic we have not listed yet. */
export async function notifyFreeSubmission(params: {
  reference: string
  submission: SubmissionFields
  storedInDatabase: boolean
}) {
  const s = params.submission
  await send({
    to: operatorAddress(),
    subject: `Free submission: ${s.clinicName} (${s.city}, ${s.state})`,
    replyTo: s.contactEmail,
    html: `
      <h2>Free clinic submission</h2>
      <p>Reference: <strong>${escapeHtml(params.reference)}</strong></p>
      <p>Check it against public records (website, phone, address, NPI) before
      adding it. Promised within ${TURNAROUND.freeSubmissionDays} business days.
      Reject anything that is not a sleep clinic or cannot be confirmed.</p>
      <p>${params.storedInDatabase
        ? "Saved to clinic_submissions with status pending."
        : "Not saved: no database is configured. This email is the only record."}</p>
      ${submissionTable(s)}
    `,
  })

  if (canEmailCustomers()) {
    await send({
      to: s.contactEmail,
      subject: `We received ${s.clinicName}`,
      html: `
        <h2>Thank you, your clinic is in review</h2>
        <p>We have your submission for <strong>${escapeHtml(s.clinicName)}</strong>
        (${escapeHtml(s.city)}, ${escapeHtml(s.state)}). Your reference is
        <strong>${escapeHtml(params.reference)}</strong>.</p>
        <p>A person checks every submission against public records. Free
        submissions are reviewed within ${TURNAROUND.freeSubmissionDays} business
        days, and we email you the link when your page is live. Listing is free
        and stays free.</p>
        <p>Reply to this email if anything needs correcting.</p>
      `,
    })
  }
}

/** A free claim: someone at a listed clinic asking to correct its details. */
export async function notifyFreeClaim(params: {
  reference: string
  clinicName: string
  clinicSlug: string
  clinicPhone: string | null
  clinicWebsite: string | null
  contactName: string
  contactRole: string | null
  contactEmail: string
  phone: string | null
  corrections: string | null
  emailDomainMatches: boolean
  storedInDatabase: boolean
}) {
  const listingUrl = `https://www.ussleepclinics.com/clinic/${params.clinicSlug}`
  const websiteUrl = safeHttpUrl(params.clinicWebsite ?? undefined)

  const identityStep = params.emailDomainMatches
    ? "The email address is at the clinic's website domain. Confirm by replying to it and getting an answer: the address can be typed by anyone, so the reply is the check."
    : `The email address is NOT at the clinic's website domain. Confirm by calling the clinic's listed number${
        params.clinicPhone ? ` (${escapeHtml(params.clinicPhone)})` : ""
      } and asking for the person named here.`

  await send({
    to: operatorAddress(),
    subject: `Free claim: ${params.clinicName}`,
    replyTo: params.contactEmail,
    html: `
      <div style="padding:12px;border:2px solid #b91c1c;color:#b91c1c">
        <strong>Before applying anything:</strong>
        <ol>
          <li>${identityStep}</li>
          <li>Apply the corrections to the Excel source, regenerate, deploy. Promised within ${TURNAROUND.freeCorrectionDays} business days of the check.</li>
          <li>Set confirmed_at on the clinic_claims row (docs/PAID-LISTINGS.md). That shows "Details confirmed by the clinic" on the page.</li>
        </ol>
      </div>
      <h2>Free listing claim</h2>
      <p>Reference: <strong>${escapeHtml(params.reference)}</strong></p>
      <p><strong>Clinic:</strong> ${escapeHtml(params.clinicName)} (${escapeHtml(params.clinicSlug)})</p>
      <p><strong>Listing:</strong> <a href="${escapeHtml(listingUrl)}">${escapeHtml(listingUrl)}</a></p>
      ${websiteUrl ? `<p><strong>Clinic website:</strong> ${escapeHtml(websiteUrl)}</p>` : ""}
      <p><strong>Name:</strong> ${escapeHtml(params.contactName)}</p>
      <p><strong>Role:</strong> ${escapeHtml(params.contactRole ?? "not provided")}</p>
      <p><strong>Email:</strong> ${escapeHtml(params.contactEmail)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(params.phone ?? "not provided")}</p>
      ${params.corrections ? `<p><strong>Corrections:</strong><br>${escapeHtmlMultiline(params.corrections)}</p>` : "<p>No corrections sent.</p>"}
      <p>${params.storedInDatabase ? "Saved to clinic_claims." : "Not saved: no database configured, or migration 005 has not run."}</p>
    `,
  })

  if (canEmailCustomers()) {
    await send({
      to: params.contactEmail,
      subject: `We received your claim for ${params.clinicName}`,
      html: `
        <h2>Thank you, your claim is in</h2>
        <p>Your reference is <strong>${escapeHtml(params.reference)}</strong>.</p>
        <p>Before we change a listing we check that the request comes from the
        clinic. We may reply to this email, or call the number listed for
        <strong>${escapeHtml(params.clinicName)}</strong>. Once that check passes,
        your corrections go live within ${TURNAROUND.freeCorrectionDays} business days,
        and your page shows that its details were confirmed by the clinic.</p>
        <p>Claiming and correcting your listing is always free.</p>
      `,
    })
  }
}

/**
 * Legacy: the $99 priority add was retired on 2026-10-24. Kept so a checkout
 * opened before the change is still recorded and fulfilled if it completes.
 */
export async function notifyPriorityAddPaid(params: {
  reference: string
  clinicName: string
  city: string
  state: string
  amountCents: number
  contactEmail: string | null
  sessionId: string
  storedInDatabase: boolean
  /** The stored row, when there is one. Null without a database. */
  submission: Partial<SubmissionFields> | null
}) {
  const s = params.submission
  const detailsBlock = s
    ? `<h3>Submitted details</h3>
       ${submissionTable({
         clinicName: s.clinicName ?? params.clinicName,
         address: s.address ?? "",
         city: s.city ?? params.city,
         state: s.state ?? params.state,
         zip: s.zip ?? "",
         phone: s.phone ?? "",
         specialty: s.specialty ?? "",
         contactEmail: s.contactEmail ?? params.contactEmail ?? "",
         website: s.website,
         description: s.description,
       })}`
    : ""

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
      <p>${s
        ? "The full submission is below, and in the clinic_submissions table, marked paid."
        : params.storedInDatabase
          ? "The submission row could not be read back. Check the clinic_submissions table, or the earlier email with the same reference."
          : "The full submission was emailed separately under the same reference."}</p>
      <p><strong>48 hour review clock starts now.</strong></p>
      ${detailsBlock}
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
        params.clinicSlug ?? "the clinic slug"
      )} to FEATURED_CLINIC_SLUGS and redeploy, then finish the Supabase setup in docs/PAID-LISTINGS.md.`
    )
  }
  if (params.isNewClinic) {
    todo.push(
      `This clinic is NOT in the directory yet. Check it against public records, add it to the Excel file, run the geocode and generate-data scripts, deploy, then link the new clinic slug onto this subscription row (see docs/PAID-LISTINGS.md). Promised within ${TURNAROUND.paidSubmissionDays} business days. If it cannot be verified, refund in full and cancel.`
    )
  }
  todo.push(
    "Confirm this buyer represents the clinic before applying any profile change (an email at the clinic's domain, or a call to its listed number). Paying grants no trust marker: set confirmed_at on a clinic_claims row only after that check."
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
      <p><strong>Clinic:</strong> ${escapeHtml(params.clinicName)} (${escapeHtml(params.clinicSlug ?? "not listed yet")})</p>
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
             city page, labeled "Featured · Ad", and takes turns in its state's results.
             <a href="${escapeHtml(cityUrl)}">See it here</a>.</p>`
          : params.isNewClinic
            ? `<p>We are adding <strong>${escapeHtml(params.clinicName)}</strong> to the directory
               now. We check it against public records and publish your page within
               ${TURNAROUND.paidSubmissionDays} business days, then email you the link. If we
               cannot verify your clinic, we refund you in full.</p>`
            : `<p>Your plan for <strong>${escapeHtml(params.clinicName)}</strong> is active, and
               your clinic's page no longer shows third-party ads.</p>`}
        <p>Before we change your page we confirm you represent the clinic. We may reply
        to this email, or call the number listed for the clinic.</p>
        <p>Send us your photos (up to 10), full description, services, equipment, and
        insurance, and any other changes. We apply them within
        ${TURNAROUND.paidChangeDays} business day once that check passes.</p>
        <p>Each month we email you a report of your profile views, website clicks, and
        call clicks.</p>
        <p>Manage or cancel your plan any time from the billing portal link in your
        Stripe receipt, or reply to this email and we will handle it.</p>
      `,
    })
  }
}

export async function notifySubscriptionEnded(params: {
  planName: string
  clinicName: string | null
  clinicSlug: string | null
  reason: "canceled" | "past_due"
  contactEmail: string | null
  subscriptionId: string
}) {
  await send({
    to: operatorAddress(),
    subject: `${params.planName} ${params.reason}: ${params.clinicName ?? params.subscriptionId}`,
    html: `
      <h2>${escapeHtml(params.planName)} ${escapeHtml(params.reason)}</h2>
      <p><strong>Clinic:</strong> ${escapeHtml(params.clinicName ?? "unknown")} (${escapeHtml(params.clinicSlug ?? "slug unknown")})</p>
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
    subject: `Featured waitlist: ${params.clinicName ?? params.contactEmail}`,
    replyTo: params.contactEmail,
    html: `
      <h2>Waitlist for a featured slot</h2>
      <p>This clinic's city has no featured slot open. Email them when one frees up.</p>
      <p><strong>Clinic:</strong> ${escapeHtml(params.clinicName ?? "not specified")} (${escapeHtml(params.clinicSlug ?? "n/a")})</p>
      ${listingUrl ? `<p><strong>Listing:</strong> <a href="${escapeHtml(listingUrl)}">${escapeHtml(listingUrl)}</a></p>` : ""}
      <p><strong>Name:</strong> ${escapeHtml(params.contactName ?? "not provided")}</p>
      <p><strong>Email:</strong> ${escapeHtml(params.contactEmail)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(params.phone ?? "not provided")}</p>
      ${params.notes ? `<p><strong>Notes:</strong><br>${escapeHtmlMultiline(params.notes)}</p>` : ""}
      <p>${params.storedInDatabase ? "Saved to claim_waitlist." : "Not saved: no database configured."}</p>
    `,
  })
}
