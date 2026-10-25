import { Metadata } from "next"
import { OG_IMAGE } from "@/lib/og-image"

export const metadata: Metadata = {
  title: "Featured Provider Badge",
  description:
    "Add the free US Sleep Clinics badge to your website and show patients you are listed in our directory of 4,000+ sleep clinics.",
  openGraph: {
    title: "Get Your US Sleep Clinics Featured Badge",
    description:
      "Show patients where to find your clinic's listing. Add our free badge to your website.",
    images: OG_IMAGE,
  },
}

export default function BadgeLayout({ children }: { children: React.ReactNode }) {
  return children
}
