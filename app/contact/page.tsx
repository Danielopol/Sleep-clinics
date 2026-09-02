import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Building2, AlertTriangle, Clock } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"
import { OG_IMAGE } from "@/lib/og-image"

const CONTACT_EMAIL = "contact@ussleepclinics.com"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with US Sleep Clinics about clinic listings, corrections, partnerships, or general questions about the directory.",
  alternates: {
    canonical: "https://www.ussleepclinics.com/contact",
  },
  openGraph: {
    title: "Contact Us",
    description:
      "Get in touch with US Sleep Clinics about clinic listings, corrections, partnerships, or general questions about the directory.",
    url: "https://www.ussleepclinics.com/contact",
    images: OG_IMAGE,
  },
}

const REASONS = [
  {
    icon: Building2,
    title: "Clinic listings and corrections",
    body: "If you represent a sleep clinic and the details we show are out of date, incomplete, or wrong, email us with the clinic name and city and we will correct it.",
  },
  {
    icon: Mail,
    title: "General questions and feedback",
    body: "Questions about how the directory works, suggestions for what we should cover, or problems you ran into while using the site.",
  },
  {
    icon: Clock,
    title: "Press and partnerships",
    body: "Media enquiries and partnership proposals reach the same address. Please include enough detail for us to route it properly.",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[image:var(--bg-primary)]">
      <Navigation />

      <section className="bg-gradient-to-br from-[var(--deep-navy)] via-[var(--twilight)] to-[var(--midnight)] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Contact us
          </h1>
          <p className="max-w-2xl text-lg text-white/80">
            We maintain a directory of more than 5,000 sleep clinics and sleep
            centers across the United States. If something looks wrong, or you
            need to reach a person, this is the place.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="mb-10 border-[var(--border-subtle)]">
            <CardContent className="p-8 text-center">
              <Mail className="mx-auto mb-4 h-8 w-8 text-[var(--healing-teal)]" />
              <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                Email us
              </h2>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-lg font-medium text-[var(--healing-teal)] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-4 text-sm text-[var(--text-secondary)]">
                We read every message and usually reply within a few business
                days.
              </p>
            </CardContent>
          </Card>

          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
            What we can help with
          </h2>

          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            {REASONS.map((reason) => (
              <Card key={reason.title} className="border-[var(--border-subtle)]">
                <CardContent className="p-6">
                  <reason.icon className="mb-3 h-6 w-6 text-[var(--healing-teal)]" />
                  <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {reason.body}
                  </p>
                </CardContent>
              </Card>
            ))}

            <Card className="border-[var(--border-subtle)]">
              <CardContent className="p-6">
                <Building2 className="mb-3 h-6 w-6 text-[var(--healing-teal)]" />
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                  Adding a clinic
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  To add a sleep clinic that is not listed yet, use the{" "}
                  <Link
                    href="/submit"
                    className="font-medium text-[var(--healing-teal)] hover:underline"
                  >
                    clinic submission form
                  </Link>
                  , which collects everything we need in one step.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="flex gap-4 p-6">
              <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-500" />
              <div>
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                  We cannot give medical advice
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  US Sleep Clinics is a directory, not a medical provider. We
                  cannot diagnose conditions, interpret sleep study results,
                  recommend treatment, or book appointments on your behalf.
                  Please do not send us personal health information. For medical
                  questions, contact a clinic directly or speak to your doctor.
                  If this is an emergency, call 911.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
