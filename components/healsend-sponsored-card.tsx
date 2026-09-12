import { AffiliateLink } from "@/components/affiliate-link"
import { AffiliateDisclosure } from "@/components/affiliate-disclosure"
import { AFFILIATE_PROGRAMS } from "@/lib/affiliates"

/**
 * Sponsored HealSend placement shown on clinic pages.
 *
 * Deliberately rendered as its own bordered, labeled card, in its own
 * section below the hero, never inside the hero next to the clinic's name.
 * Putting a third-party ad inside a specific clinic's own branded header
 * would read as that clinic endorsing HealSend, which is not true and not
 * something the clinic agreed to.
 *
 * The copy states the sleep apnea and weight connection as an established
 * risk factor, never as a claim that weight loss treats or cures sleep
 * apnea, and defers to the reader's own doctor.
 */
export function HealSendSponsoredCard({ page }: { page: string }) {
  const program = AFFILIATE_PROGRAMS.healsend

  return (
    <section className="py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--pearl)] p-6 dark:bg-[var(--twilight)]">
          <span className="mb-3 inline-block rounded-full bg-[var(--border-subtle)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
            Sponsored
          </span>
          <h2 className="mb-2 font-[var(--font-display)] text-xl font-semibold text-[var(--text-primary)]">
            Is your weight affecting your sleep?
          </h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            Excess weight is one of the most common risk factors for sleep
            apnea. HealSend offers doctor-prescribed GLP-1 weight loss
            treatment, with clinician-led care delivered to your door. Talk to
            your sleep doctor about whether weight loss could be part of your
            treatment plan.
          </p>
          <AffiliateLink
            href={program.trackingUrl}
            partner={program.partner}
            placement="clinic-page-card"
            page={page}
            className="inline-block rounded-lg bg-[var(--healing-teal)] px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
          >
            See if you qualify
          </AffiliateLink>
          <AffiliateDisclosure className="mt-3 text-xs text-[var(--text-secondary)]" />
        </div>
      </div>
    </section>
  )
}
