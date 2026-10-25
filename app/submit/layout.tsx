import { Metadata } from "next"
import { OG_IMAGE } from "@/lib/og-image"

export const metadata: Metadata = {
  title: "Add Your Sleep Clinic Free",
  description:
    "Add your sleep clinic to US Sleep Clinics at no cost. A person checks every submission against public records, and listing stays free.",
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
