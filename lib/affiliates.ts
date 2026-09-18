export interface AffiliateProgram {
  id: string
  partner: string
  trackingUrl: string
}

// Central place for every affiliate tracking link on the site. Adding a
// second program should mean adding an entry here, not hardcoding a URL
// somewhere in a page.
export const AFFILIATE_PROGRAMS = {
  healsend: {
    id: "healsend",
    partner: "HealSend",
    trackingUrl: "https://tidd.ly/46YuqKM",
  },
  cpapcom: {
    id: "cpapcom",
    partner: "CPAP.com",
    trackingUrl: "https://prf.hn/l/ngkLeWe/",
  },
} as const satisfies Record<string, AffiliateProgram>

/**
 * Blog posts where the HealSend placement (a GLP-1 weight-loss telehealth
 * program) is a genuine topical fit: substantively about sleep apnea, or
 * about the sleep/weight relationship directly.
 *
 * This was previously shown on ~98% of clinic pages, gated only on the
 * clinic's specialty list mentioning apnea. Pulled back to this explicit,
 * hand-picked list of posts instead, so every placement is somewhere the
 * content itself established the connection, rather than a blanket
 * assumption that any apnea-adjacent page is a fair place for it.
 *
 * Deliberately not tag-driven: several posts carry a generic "Sleep Apnea"
 * tag (insurance coverage, test-type comparisons, choosing a clinic,
 * telemedicine logistics) without the post actually being about the
 * condition, and those are excluded here even though the tag matches.
 *
 * cpap-alternatives-sleep-apnea-treatments-2026 and
 * oral-appliance-therapy-vs-cpap-comparison were originally in this set too,
 * but moved to CPAPCOM_ELIGIBLE_BLOG_SLUGS below: a post specifically
 * comparing CPAP treatment options is a more precise match for CPAP
 * equipment than for a weight-loss program, and showing one clearly relevant
 * offer per page beats stacking two on the same post.
 */
const HEALSEND_ELIGIBLE_BLOG_SLUGS = new Set([
  "sleep-and-weight-gain-appetite-hormones",
  "can-sleep-apnea-cause-anxiety-depression",
  "central-vs-obstructive-sleep-apnea",
  "insomnia-vs-sleep-apnea-difference",
  "is-snoring-hereditary-genetics-family-risk",
  "morning-headaches-sleep-apnea",
  "sleep-apnea-car-accidents-drowsy-driving",
  "sleep-apnea-commercial-driving-dot-requirements",
  "sleep-apnea-heart-disease-connection",
  "sleep-apnea-high-blood-pressure",
  "sleep-apnea-in-women-misdiagnosis",
  "sleep-apnea-symptoms-warning-signs",
  "sleep-apnea-type-2-diabetes",
  "snoring-vs-sleep-apnea-warning-sign",
  "untreated-sleep-apnea-effects-brain-heart-metabolism",
])

export function isBlogPostEligibleForHealSend(slug: string): boolean {
  return HEALSEND_ELIGIBLE_BLOG_SLUGS.has(slug)
}

/**
 * Blog posts where the CPAP.com placement is a genuine topical fit.
 *
 * Chosen by how much of the post is actually about CPAP therapy, not by
 * keyword presence: many posts mention CPAP once as "the standard
 * treatment" while covering an unrelated core topic (a disease-connection
 * article, a DOT screening explainer, a clinic-choosing checklist), and
 * those are excluded even though they technically reference it.
 */
const CPAPCOM_ELIGIBLE_BLOG_SLUGS = new Set([
  "cpap-alternatives-sleep-apnea-treatments-2026",
  "oral-appliance-therapy-vs-cpap-comparison",
  "complex-treatment-emergent-sleep-apnea",
])

export function isBlogPostEligibleForCpapCom(slug: string): boolean {
  return CPAPCOM_ELIGIBLE_BLOG_SLUGS.has(slug)
}
