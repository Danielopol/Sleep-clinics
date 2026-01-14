import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clinicName, address, city, state, zip, phone, specialty, website, description } = body

    // Validate required fields
    if (!clinicName || !address || !city || !state || !zip || !phone || !specialty) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Sleep Clinic Directory <onboarding@resend.dev>",
      to: ["valentin.marin83@gmail.com"],
      subject: `New Clinic Submission: ${clinicName}`,
      html: `
        <h2>New Sleep Clinic Submission</h2>
        <p><strong>Clinic Name:</strong> ${clinicName}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>State:</strong> ${state}</p>
        <p><strong>ZIP Code:</strong> ${zip}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Specialty:</strong> ${specialty}</p>
        ${website ? `<p><strong>Website:</strong> <a href="${website}">${website}</a></p>` : ""}
        ${description ? `<p><strong>Description:</strong><br>${description}</p>` : ""}
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
