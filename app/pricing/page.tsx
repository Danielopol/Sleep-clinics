import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Check, ShieldCheck, Star, Zap } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"
import { OG_IMAGE } from "@/lib/og-image"
import { PLANS, formatPrice, type PlanId } from "@/lib/pricing"

export const metadata: Metadata = {
  title: "Claim Your Listing - Plans for Sleep Clinics",
  description:
    "Get your sleep clinic listed, claimed, and verified on US Sleep Clinics. Priority review in 48 hours, a verified badge, and featured placement in your city.",
  alternates: { canonical: "https://www.ussleepclinics.com/pricing" },
  openGraph: {
    title: "Claim Your Listing - Plans for Sleep Clinics",
    description:
      "Priority listing review, a verified badge, and featured placement in your city on US Sleep Clinics.",
    url: "https://www.ussleepclinics.com/pricing",
    images: OG_IMAGE,
  },
}

const PLAN_ICONS: Record<PlanId, typeof Zap> = {
  "priority-add": Zap,
  "claim-verified": ShieldCheck,
  "featured-city": Star,
}

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--midnight)] via-[var(--deep-navy)] to-[var(--twilight)] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[var(--dream-blue)] via-[var(--healing-teal)] to-[var(--calm-indigo)] bg-clip-text text-transparent">
            Claim Your Listing
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed mt-5 max-w-2xl mx-auto">
            Thousands of patients use US Sleep Clinics to find sleep care near them. Take control
            of how your clinic appears to them.
          </p>
          <p className="text-slate-300 mt-5">
            Not in the directory yet? Every plan below includes adding your clinic, at no extra
            charge.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Already listed and just want the free website badge?{" "}
            <Link href="/badge" className="text-[var(--healing-teal)] hover:underline">
              Get your badge here
            </Link>
            .
          </p>
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
                        : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white shadow-md shadow-indigo-500/20"
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

          {/* Disclosure and honesty about what money does and does not buy */}
          <div className="mt-12 max-w-3xl mx-auto text-sm text-slate-500 dark:text-slate-400 space-y-3 leading-relaxed">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              What paying does not change
            </h3>
            <p>
              Most of the clinics in this directory were researched and added by us, at no cost to
              them, and they stay listed with the same information whether they ever pay or not. No
              listing is removed, downgraded, or altered for not paying.
            </p>
            <p>
              Featured placements are paid advertising and are labeled "Featured" everywhere they
              appear. Ratings and reviews come from public sources and are never edited for payment.
            </p>
            <p>
              Prices are in US dollars. Annual plans renew automatically and can be canceled at any
              time from the billing portal link in your Stripe receipt. Questions?{" "}
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
