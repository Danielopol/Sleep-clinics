import { NextResponse } from "next/server"
import { getResendClient } from "@/lib/resend"
import {
  escapeHtml,
  escapeHtmlMultiline,
  safeHttpUrl,
  singleLineSubject,
} from "@/lib/html-email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clinicName, address, city, state, zip, phone, specialty, website, description } = body

    // Validate required fields
    if (!clinicName || !address || !city || !state || !zip || !phone || !specialty) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const resend = getResendClient()

    if (!resend) {
      console.error("RESEND_API_KEY is not set, cannot send clinic submission email")
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 })
    }

    // Every value below comes from a public form, so it is escaped before it
    // reaches the email body. See lib/html-email.ts.
    const websiteUrl = safeHttpUrl(website)
    const websiteRow = websiteUrl
      ? `<p><strong>Website:</strong> <a href="${escapeHtml(websiteUrl)}">${escapeHtml(websiteUrl)}</a></p>`
      : website
        ? `<p><strong>Website:</strong> ${escapeHtml(website)} (not a valid http or https URL, not linked)</p>`
        : ""

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "US Sleep Clinics <onboarding@resend.dev>",
      to: ["valentin.marin83@gmail.com"],
      subject: `New Clinic Submission: ${singleLineSubject(clinicName)}`,
      html: `
        <h2>New Sleep Clinic Submission</h2>
        <p><strong>Clinic Name:</strong> ${escapeHtml(clinicName)}</p>
        <p><strong>Address:</strong> ${escapeHtml(address)}</p>
        <p><strong>City:</strong> ${escapeHtml(city)}</p>
        <p><strong>State:</strong> ${escapeHtml(state)}</p>
        <p><strong>ZIP Code:</strong> ${escapeHtml(zip)}</p>
        <p><strong>Phone Number:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Specialty:</strong> ${escapeHtml(specialty)}</p>
        ${websiteRow}
        ${description ? `<p><strong>Description:</strong><br>${escapeHtmlMultiline(description)}</p>` : ""}
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
