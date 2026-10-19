import { getResendClient } from "./resend"
import { escapeHtml, escapeHtmlMultiline, singleLineSubject } from "./html-email"
import { isLeadEmailConfigured } from "./lead-requests"
import {
  CONTACT_TIME_OPTIONS,
  INSURANCE_OPTIONS,
  REASON_OPTIONS,
  labelFor,
  type ContactTime,
  type InsuranceType,
  type VisitReason,
} from "./lead-request-options"

/**
 * The email that delivers an appointment request to a partner clinic.
 *
 * Kept apart from lib/notifications.ts because its result matters: a request
 * counts as delivered (and so can be invoiced) only when the provider accepted
 * the email. Every value comes from a public form, so all of it is escaped.
 *
 * Never throws. Without RESEND_API_KEY and EMAIL_FROM (development only, see
 * isLeadFormConfigured) the email is logged without patient details and
 * reported as not delivered.
 */

export interface LeadEmailInput {
  reference: string
  clinicName: string
  clinicSlug: string
  to: string[]
  patientName: string
  phone: string
  email: string | null
  insuranceType: InsuranceType
  reason: VisitReason
  note: string | null
  contactTime: ContactTime
  billable: boolean
}

export type LeadEmailResult =
  | { delivered: true; sentTo: string[] }
  | { delivered: false; sentTo: string[]; error: string | null }

export function formatPhone(digits: string): string {
  return digits.length === 10
    ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    : digits
}

export async function sendLeadRequestEmail(input: LeadEmailInput): Promise<LeadEmailResult> {
  const subject = singleLineSubject(
    `New appointment request from US Sleep Clinics (${input.reference})`
  )

  const resend = getResendClient()
  if (!resend || !isLeadEmailConfigured()) {
    console.warn(
      `[lead-request] Email not configured (RESEND_API_KEY and EMAIL_FROM), not sent. ` +
        `Would have sent "${subject}" for ${input.clinicSlug} to ${input.to.join(", ")}.`
    )
    return { delivered: false, sentTo: input.to, error: null }
  }

  const phone = formatPhone(input.phone)
  const listingUrl = `https://www.ussleepclinics.com/clinic/${input.clinicSlug}`
  const billingLine = input.billable
    ? "This request counts toward your partner agreement."
    : "This patient reported government coverage (Medicare, Medicaid, Tricare or VA). It is not billed."

  const html = `
    <h2>New appointment request</h2>
    <p>A patient asked to be contacted by <strong>${escapeHtml(input.clinicName)}</strong>
    through your listing on <a href="${escapeHtml(listingUrl)}">US Sleep Clinics</a>.
    Please reach out to them directly to schedule.</p>
    <p><strong>Name:</strong> ${escapeHtml(input.patientName)}</p>
    <p><strong>Phone:</strong> <a href="tel:+1${escapeHtml(input.phone)}">${escapeHtml(phone)}</a></p>
    <p><strong>Email:</strong> ${input.email ? escapeHtml(input.email) : "not provided"}</p>
    <p><strong>Best time to reach them:</strong> ${escapeHtml(labelFor(CONTACT_TIME_OPTIONS, input.contactTime))}</p>
    <p><strong>Insurance:</strong> ${escapeHtml(labelFor(INSURANCE_OPTIONS, input.insuranceType))}</p>
    <p><strong>Reason for visit:</strong> ${escapeHtml(labelFor(REASON_OPTIONS, input.reason))}</p>
    ${input.note ? `<p><strong>Note from the patient:</strong><br>${escapeHtmlMultiline(input.note)}</p>` : ""}
    <p>Reference: <strong>${escapeHtml(input.reference)}</strong>. ${escapeHtml(billingLine)}</p>
    <p style="color:#64748b;font-size:13px">The patient agreed to have this request shared with
    ${escapeHtml(input.clinicName)}. It is a request to be contacted, not a booked appointment.
    Please do not forward it outside your scheduling team. If this reached the wrong clinic,
    reply to this email and we will correct it.</p>
  `

  try {
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to: input.to,
      subject,
      html,
      ...(input.email ? { replyTo: input.email } : {}),
    })
    if (error) {
      console.error("[lead-request] Resend error:", error)
      return { delivered: false, sentTo: input.to, error: error.message ?? "Resend error" }
    }
    return { delivered: true, sentTo: input.to }
  } catch (error) {
    console.error("[lead-request] Email send failed:", error)
    return {
      delivered: false,
      sentTo: input.to,
      error: error instanceof Error ? error.message : "Email send failed",
    }
  }
}

/**
 * Tells the operator a request did not reach its clinic, so the patient is not
 * left waiting. Carries the reference only: the details are in lead_requests.
 */
export async function notifyLeadDeliveryFailed(params: {
  reference: string
  clinicSlug: string
  error: string
}): Promise<void> {
  const resend = getResendClient()
  if (!resend) return

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "US Sleep Clinics <onboarding@resend.dev>",
      to: [process.env.NOTIFY_EMAIL || "valentin.marin83@gmail.com"],
      subject: singleLineSubject(`Appointment request NOT delivered: ${params.reference}`),
      html: `
        <h2>An appointment request did not reach its clinic</h2>
        <p><strong>Reference:</strong> ${escapeHtml(params.reference)}</p>
        <p><strong>Clinic:</strong> ${escapeHtml(params.clinicSlug)}</p>
        <p><strong>Error:</strong> ${escapeHtml(params.error)}</p>
        <p>The patient was told the clinic will contact them. Forward the request by hand
        (the row is in lead_requests with status delivery_failed), then check the clinic's
        destination_emails in lead_partners.</p>
      `,
    })
  } catch (error) {
    console.error("[lead-request] Operator alert failed:", error)
  }
}
