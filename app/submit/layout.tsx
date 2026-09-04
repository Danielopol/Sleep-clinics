import { Metadata } from "next"
import { OG_IMAGE } from "@/lib/og-image"

export const metadata: Metadata = {
  title: "Add Your Sleep Clinic - Priority Listing in 48 Hours",
  description:
    "Add your sleep clinic to US Sleep Clinics with a manual review within 48 hours. Reach patients searching for sleep care in your city, refunded if we cannot publish you.",
  alternates: {
    canonical: "https://www.ussleepclinics.com/submit",
  },
  openGraph: {
    title: "Submit Your Sleep Clinic - Join Our Directory",
    description:
      "Add your sleep clinic to the US Sleep Clinics and connect with patients seeking quality sleep care.",
    url: "https://www.ussleepclinics.com/submit",
    images: OG_IMAGE,
  },
}

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
