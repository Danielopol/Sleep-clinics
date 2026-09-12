"use client"

import { trackAffiliateClick } from "@/lib/analytics"

/**
 * The only place on the site that should render an outbound affiliate href.
 *
 * rel="sponsored" is Google's required annotation for paid/affiliate links;
 * without it a health site risks being read as passing normal editorial
 * authority to a commercial destination. nofollow is included for search
 * engines that do not yet recognise sponsored. noopener protects the new tab
 * from getting a handle back to this page.
 */
export function AffiliateLink({
  href,
  partner,
  placement,
  page,
  product,
  className,
  children,
}: {
  href: string
  partner: string
  placement: string
  page: string
  product?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={className}
      onClick={() => trackAffiliateClick({ partner, placement, page, product })}
    >
      {children}
    </a>
  )
}
