import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Submit Your Sleep Clinic - Join Our Directory",
  description:
    "Add your sleep clinic to the Sleep Care Directory. Reach patients seeking quality sleep care by listing your practice in our database of 4,000+ verified clinics.",
  alternates: {
    canonical: "https://www.ussleepclinics.com/submit",
  },
  openGraph: {
    title: "Submit Your Sleep Clinic - Join Our Directory",
    description:
      "Add your sleep clinic to the Sleep Care Directory and connect with patients seeking quality sleep care.",
    url: "https://www.ussleepclinics.com/submit",
  },
}

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
