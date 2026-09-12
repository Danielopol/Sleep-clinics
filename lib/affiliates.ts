import { Clinic } from "./data"

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
} as const satisfies Record<string, AffiliateProgram>

/**
 * Whether a clinic is a fair place to show the HealSend placement.
 *
 * HealSend is a GLP-1 weight-loss telehealth program, relevant here because
 * excess weight is one of the most common risk factors for sleep apnea. It is
 * not relevant to a clinic that only treats something unrelated, such as a
 * pure circadian-rhythm or pediatric-behavioral practice, so eligibility is
 * gated on the clinic's own listed specialties rather than shown site-wide.
 * In the current data this matches about 98% of clinics, so scoping it this
 * way costs almost no reach while keeping every placement honestly relevant.
 */
export function isEligibleForHealSend(clinic: Clinic): boolean {
  return (clinic.specialty ?? []).some((s) => s.toLowerCase().includes("apnea"))
}
