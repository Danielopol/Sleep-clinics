import { AffiliateLink } from "@/components/affiliate-link"
import { AffiliateDisclosure } from "@/components/affiliate-disclosure"
import { AFFILIATE_PROGRAMS } from "@/lib/affiliates"

/**
 * Sponsored CPAP.com placement for blog posts substantively about CPAP
 * therapy (see CPAPCOM_ELIGIBLE_BLOG_SLUGS in lib/affiliates.ts).
 *
 * Lower compliance sensitivity than the HealSend card: this promotes
 * equipment and supplies, not a prescription program, so there is no
 * "treats/cures" claim to avoid. Styled to match the blog's dark theme.
 */
export function CpapComSponsoredPostCard({ page }: { page: string }) {
  const program = AFFILIATE_PROGRAMS.cpapcom

  return (
    <div className="mt-12 rounded-xl border border-[#8b9dc3]/20 bg-[#1a2744]/40 p-6">
      <span className="mb-3 inline-block rounded-full bg-[#8b9dc3]/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#8b9dc3]">
        Sponsored
      </span>
      <h2 className="mb-2 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#f5f0e8]">
        Shop CPAP masks, machines, and supplies
      </h2>
      <p className="mb-4 text-[#e8edf5] opacity-85">
        CPAP.com carries a wide range of machines, masks, cushions, filters,
        and cleaning supplies, with guidance to help you find the right fit
        for your therapy.
      </p>
      <AffiliateLink
        href={program.trackingUrl}
        partner={program.partner}
        placement="blog-post-card"
        page={page}
        className="inline-block rounded-lg bg-[#d4a574] px-5 py-2.5 font-medium text-[#0f1729] transition-opacity hover:opacity-90"
      >
        Shop CPAP.com
      </AffiliateLink>
      <AffiliateDisclosure className="mt-3 text-xs text-[#e8edf5] opacity-70" />
    </div>
  )
}
