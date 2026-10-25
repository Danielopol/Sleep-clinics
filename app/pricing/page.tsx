import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Building2, Check, ClipboardCheck, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"
import { OG_IMAGE } from "@/lib/og-image"
import {
  PLANS,
  CLINIC_GROUP,
  CLINIC_GROUP_MAILTO,
  FEATURED_LABEL,
  formatPrice,
  type PlanId,
} from "@/lib/pricing"

export const metadata: Metadata = {
  title: "Pricing for Sleep Clinics: Free Listing, Enhanced Profile, Featured",
  description:
    "Your sleep clinic's listing on US Sleep Clinics is free, and so is claiming it to correct your details. Paid plans add a fuller profile or featured placement in your city.",
  alternates: { canonical: "https://www.ussleepclinics.com/pricing" },
  openGraph: {
    title: "Pricing for Sleep Clinics: Free Listing, Enhanced Profile, Featured",
    description:
      "Free listing and free claiming for every sleep clinic. Optional Enhanced Profile and Featured placement on US Sleep Clinics.",
    url: "https://www.ussleepclinics.com/pricing",
    images: OG_IMAGE,
  },
}

const PLAN_ICONS: Record<PlanId, typeof Star> = {
  "free-listing": ClipboardCheck,
  "claim-verified": Sparkles,
  "featured-city": Star,
}

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero: the free tier leads */}
      <section className="bg-gradient-to-br from-[var(--midnight)] via-[var(--deep-navy)] to-[var(--twilight)] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] bg-clip-text text-transparent">
            Your clinic&apos;s page is free
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed mt-5 max-w-2xl mx-auto">
            Claim it to correct your details, at no cost. If you want more, an Enhanced Profile
            gives patients a fuller page, and Featured puts your clinic at the top of your city.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link
              href="/claim"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold transition-all shadow-md shadow-indigo-500/20"
            >
              Claim my listing free
            </Link>
            <Link
              href="/submit"
              className="px-6 py-3 rounded-lg border border-white/30 text-white hover:border-white/60 font-semibold transition-all"
            >
              My clinic is not listed yet
            </Link>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-[image:var(--bg-primary)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan) => {
              const Icon = PLAN_ICONS[plan.id]
              return (
                <div
                  key={plan.id}
                  className={`relative bg-slate-50 dark:bg-slate-900 rounded-2xl border p-7 flex flex-col h-full ${
                    plan.highlight
                      ? "border-amber-400/70 ring-1 ring-amber-400/30 shadow-lg"
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold uppercase tracking-wide">
                      Most visible
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <span className="p-2 rounded-lg bg-[var(--healing-teal)]/10 text-[var(--healing-teal)]">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{plan.name}</h2>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">{plan.tagline}</p>

                  <div className="mb-6 space-y-1">
                    {plan.prices.map((price, index) => (
                      <div key={price.interval}>
                        {index > 0 && (
                          <p className="text-xs text-slate-400 uppercase tracking-wide my-2">or</p>
                        )}
                        <p className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            {formatPrice(price.amountCents)}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-sm">{price.label}</span>
                        </p>
                        {price.note && (
                          <p className="text-xs text-slate-400 mt-1">{price.note}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-3 mb-7 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[var(--healing-teal)] mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className={`block text-center py-3 px-4 rounded-lg font-semibold transition-all ${
                      plan.highlight
                        ? "bg-amber-500 hover:bg-amber-400 text-white shadow-md shadow-amber-500/20"
                        : plan.subscription
                          ? "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white shadow-md shadow-indigo-500/20"
                          : "border border-[var(--healing-teal)] text-[var(--healing-teal)] hover:bg-[var(--healing-teal)]/10"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  {plan.footnote && (
                    <p className="text-xs text-slate-400 mt-3 text-center leading-relaxed">{plan.footnote}</p>
                  )}
                </div>
              )
            })}
          </div>

          {/* Clinic Group */}
          <div className="mt-8 max-w-3xl mx-auto p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="p-2 rounded-lg bg-[var(--healing-teal)]/10 text-[var(--healing-teal)] shrink-0">
              <Building2 className="w-5 h-5" />
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
              <strong className="text-slate-900 dark:text-slate-100">Clinic Group:</strong>{" "}
              {CLINIC_GROUP.percentOff}% off each location for {CLINIC_GROUP.minLocations} to{" "}
              {CLINIC_GROUP.maxLocations} locations, on Enhanced Profile or Featured. For{" "}
              {CLINIC_GROUP.maxLocations + 1} or more locations, ask us for a quote.
            </p>
            <a
              href={CLINIC_GROUP_MAILTO}
              className="shrink-0 text-sm font-semibold text-[var(--healing-teal)] hover:underline"
            >
              Contact us for group pricing
            </a>
          </div>

          {/* Disclosure and honesty about what money does and does not buy */}
          <div className="mt-12 max-w-3xl mx-auto text-sm text-slate-500 dark:text-slate-400 space-y-3 leading-relaxed">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              What paying does not change
            </h3>
            <p>
              <strong className="text-slate-700 dark:text-slate-300">
                Claiming and correcting your listing is always free.
              </strong>{" "}
              So is being listed: most of the clinics in this directory were researched and added by
              us, at no cost to them, and they stay listed with the same information whether they
              ever pay or not. No listing is removed, downgraded, or altered for not paying.
            </p>
            <p>
              "Details confirmed by the clinic" means a clinic checked its own details with us,
              after we confirmed who they are. It is free and is never sold.
            </p>
            <p>
              An Enhanced Profile does not change a clinic&apos;s ranking. Featured placements are
              paid advertising and are labeled "{FEATURED_LABEL}" everywhere they appear. Ratings
              and reviews come from public sources and are never edited for payment.
            </p>
            <p>
              We do not promise more patients, a ranking, or a return on what you spend. Your monthly
              report shows what your listing actually received.
            </p>
            <p>
              Prices are in US dollars. Paid plans renew automatically and can be canceled at any
              time from the billing portal link in your Stripe receipt. A paid plan bought for a
              clinic we cannot verify is refunded in full. Questions?{" "}
              <Link href="/contact" className="text-[var(--healing-teal)] hover:underline">
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
