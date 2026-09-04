import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckCircle2, Clock, Mail } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"
import { getStripeClient } from "@/lib/stripe"
import { formatPrice } from "@/lib/pricing"

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
}

// Always rendered fresh: it reads a Stripe session id from the query string.
export const dynamic = "force-dynamic"

interface SessionSummary {
  kind: string
  clinicName: string
  amountCents: number | null
  email: string | null
  paid: boolean
}

async function loadSession(sessionId: string | undefined): Promise<SessionSummary | null> {
  if (!sessionId) return null
  const stripe = getStripeClient()
  if (!stripe) return null

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return {
      kind: session.metadata?.kind ?? "",
      clinicName: session.metadata?.clinicName ?? "your clinic",
      amountCents: session.amount_total,
      email: session.customer_details?.email ?? session.customer_email ?? null,
      // This page is confirmation only. The listing itself is granted by the
      // Stripe webhook, never by anything the browser reports here.
      paid: session.payment_status === "paid" || session.payment_status === "no_payment_required",
    }
  } catch (error) {
    console.error("Could not load the checkout session:", error)
    return null
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  const summary = await loadSession(session_id)
  const isFeatured = summary?.kind === "featured-city"

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="bg-gradient-to-br from-[var(--midnight)] via-[var(--deep-navy)] to-[var(--twilight)] py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle2 className="w-14 h-14 text-[var(--healing-teal)] mx-auto mb-5" />
          <h1 className="font-[var(--font-display)] text-4xl font-bold text-white">
            Thank you
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed mt-4">
            {summary
              ? `We have your payment for ${summary.clinicName}.`
              : "We have your payment. Your receipt is on its way by email."}
          </p>
        </div>
      </section>

      <section className="bg-[image:var(--bg-primary)] py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-7">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-5">
              What happens next
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[var(--healing-teal)] mt-0.5 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  Stripe emails your receipt
                  {summary?.email ? ` to ${summary.email}` : ""}. Keep it: the billing portal link in
                  that email is how you manage or cancel the plan.
                </span>
              </li>
              {isFeatured ? (
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--healing-teal)] mt-0.5 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    Your featured placement goes live within a few minutes. Your clinic then appears
                    at the top of its city results with a "Featured" label.
                  </span>
                </li>
              ) : (
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--healing-teal)] mt-0.5 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    A person reviews your submission and publishes your page within 48 hours on
                    business days. We email you the link when it is live. If we cannot verify and
                    publish your clinic, we refund you in full.
                  </span>
                </li>
              )}
            </ul>

            {summary?.amountCents != null && (
              <p className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
                Amount paid: {formatPrice(summary.amountCents)}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold transition-all text-sm"
            >
              Back to the directory
            </Link>
            <Link
              href="/badge"
              className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 transition-all text-sm font-medium"
            >
              Get your website badge
            </Link>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-8 text-center">
            Something not right?{" "}
            <Link href="/contact" className="text-[var(--healing-teal)] hover:underline">
              Contact us
            </Link>{" "}
            and we will sort it out.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
