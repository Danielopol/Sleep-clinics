import { AffiliateLink } from "@/components/affiliate-link"
import { AffiliateDisclosure } from "@/components/affiliate-disclosure"
import { AFFILIATE_PROGRAMS } from "@/lib/affiliates"

/**
 * Sponsored HealSend placement for the sleep-and-weight-gain blog post.
 *
 * Styled for the blog's own dark theme, unlike the clinic-page card, but the
 * same non-diagnostic copy and disclosure requirements apply: this states
 * weight as an established risk factor, never that weight loss treats or
 * cures sleep apnea, and defers to the reader's own doctor.
 */
export function HealSendSponsoredPostCard({
  page,
  compounded = false,
}: {
  page: string
  /**
   * True on the tirzepatide / GLP-1 posts (see usesHealSendCompoundedCopy in
   * lib/affiliates.ts). Those pages describe the FDA-approved product, so the
   * card has to say that HealSend's is compounded and is not that product.
   */
  compounded?: boolean
}) {
  const program = AFFILIATE_PROGRAMS.healsend

  return (
    <div className="mt-12 rounded-xl border border-[#8b9dc3]/20 bg-[#1a2744]/40 p-6">
      <span className="mb-3 inline-block rounded-full bg-[#8b9dc3]/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#8b9dc3]">
        Sponsored
      </span>
      <h2 className="mb-2 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#f5f0e8]">
        {compounded
          ? "Telehealth GLP-1 care, if a clinician agrees it fits"
          : "Is your weight affecting your sleep?"}
      </h2>
      {compounded ? (
        <p className="mb-4 text-[#e8edf5] opacity-85">
          HealSend is an online telehealth service that connects patients with
          licensed clinicians and pharmacies. The tirzepatide it offers is
          compounded, which means it is not Zepbound, it is not FDA-approved,
          and it is not the product tested in the sleep apnea trials. A
          clinician decides whether it is appropriate for you. Keep your sleep
          doctor informed, and do not stop CPAP or any sleep apnea treatment
          without their advice.
        </p>
      ) : (
        <p className="mb-4 text-[#e8edf5] opacity-85">
          As this article covers, the relationship between weight and sleep
          runs in both directions, and excess weight is one of the most common
          risk factors for sleep apnea specifically. HealSend offers
          doctor-prescribed GLP-1 weight loss treatment, with clinician-led care
          delivered to your door. Talk to your sleep doctor about whether
          weight loss could be part of your treatment plan.
        </p>
      )}
      <AffiliateLink
        href={program.trackingUrl}
        partner={program.partner}
        placement="blog-post-card"
        page={page}
        className="inline-block rounded-lg bg-[#d4a574] px-5 py-2.5 font-medium text-[#0f1729] transition-opacity hover:opacity-90"
      >
        {compounded ? "Learn about HealSend" : "See if you qualify"}
      </AffiliateLink>
      <AffiliateDisclosure className="mt-3 text-xs text-[#e8edf5] opacity-70" />
    </div>
  )
}
