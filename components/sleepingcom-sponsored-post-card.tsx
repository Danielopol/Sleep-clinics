import { AffiliateLink } from "@/components/affiliate-link"
import { AffiliateDisclosure } from "@/components/affiliate-disclosure"
import { AFFILIATE_PROGRAMS } from "@/lib/affiliates"

/**
 * Sponsored Sleeping.com placement, currently scoped to a single post (see
 * SLEEPINGCOM_ELIGIBLE_BLOG_SLUGS in lib/affiliates.ts): the oral-appliance
 * vs. CPAP comparison, matched to the myTAP oral appliance in Sleeping.com's
 * own catalog. Copy is written for that specific post rather than kept
 * generic, since there is only one placement to serve today.
 */
export function SleepingComSponsoredPostCard({ page }: { page: string }) {
  const program = AFFILIATE_PROGRAMS.sleepingcom

  return (
    <div className="mt-12 rounded-xl border border-[#8b9dc3]/20 bg-[#1a2744]/40 p-6">
      <span className="mb-3 inline-block rounded-full bg-[#8b9dc3]/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#8b9dc3]">
        Sponsored
      </span>
      <h2 className="mb-2 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#f5f0e8]">
        Considering an oral appliance over CPAP?
      </h2>
      <p className="mb-4 text-[#e8edf5] opacity-85">
        Sleeping.com carries oral appliance options, including the myTAP
        device covered by some of the same considerations discussed above, as
        well as CPAP machines and supplies if you decide that route is the
        better fit.
      </p>
      <AffiliateLink
        href={program.trackingUrl}
        partner={program.partner}
        placement="blog-post-card"
        page={page}
        className="inline-block rounded-lg bg-[#d4a574] px-5 py-2.5 font-medium text-[#0f1729] transition-opacity hover:opacity-90"
      >
        Shop Sleeping.com
      </AffiliateLink>
      <AffiliateDisclosure className="mt-3 text-xs text-[#e8edf5] opacity-70" />
    </div>
  )
}
