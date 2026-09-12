/**
 * FTC-required disclosure for a paid/affiliate placement (16 CFR Part 255).
 *
 * Must sit visibly next to the offer it discloses, not in a footer far away,
 * so this is meant to be rendered inside the card containing the link, not
 * once globally.
 */
export function AffiliateDisclosure({ className }: { className?: string }) {
  return (
    <p className={className}>
      Advertising disclosure: this is a paid partnership. We may earn a
      commission if you sign up through this link, at no extra cost to you.
    </p>
  )
}
