import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollText } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"
import {
  CLINIC_GROUP,
  CONTACT_EMAIL,
  FEATURED_LABEL,
  FEATURED_PER_STATE_PAGE,
  FEATURED_SLOTS_PER_CITY,
  TURNAROUND,
} from "@/lib/pricing"

export const metadata: Metadata = {
  // The root layout's title template appends "| US Sleep Clinics".
  title: "Terms of Service",
  description:
    "Terms of Service for US Sleep Clinics, including the terms for free listings, claims, and paid listing plans. Please read these terms carefully before using our website.",
}

// The paid-plan terms quote numbers from lib/pricing.ts (slots, turnaround,
// group discount) so they cannot drift from what the pricing page promises.
// Changing anything in section 6 is a change to a customer contract: update
// LAST_UPDATED, and email active subscribers 30 days ahead (section 13).
const LAST_UPDATED = "October 26, 2026"

const h2 = "text-xl font-bold text-white mb-4"
const h3 = "text-base font-semibold text-white mt-6 mb-2"
const p = "text-slate-300 leading-relaxed"
const ul = "list-disc list-inside space-y-2 text-slate-300"
const strong = "text-white"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full min-h-[300px] md:min-h-[350px] overflow-hidden">
        <img
          src="/images/Hero section_4.png"
          alt="Peaceful night sky"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight)]/95 via-[var(--midnight)]/70 to-[var(--midnight)]/50" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px] md:min-h-[350px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-[var(--dream-blue-light)] text-sm font-medium">
              <ScrollText className="h-4 w-4" />
              Legal Agreement
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              Terms of Service
            </h1>
            <p className="text-slate-300 text-sm">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-slate max-w-none space-y-10">

            {/* Introduction */}
            <div>
              <p className={p}>
                Welcome to US Sleep Clinics. These Terms of Service ("Terms") govern your access to and use of the
                website <strong className={strong}>www.ussleepclinics.com</strong> (the "Site"), operated by
                US Sleep Clinics ("we," "us," or "our"). By accessing or using the Site, you agree to be bound by
                these Terms. If you do not agree, please do not use the Site.
              </p>
              <p className={`${p} mt-4`}>
                If you represent a clinic, sections 5 and 6 also apply to you. Section 6 governs the optional paid
                listing plans and applies when you buy one.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className={h2}>1. Description of Service</h2>
              <p className={p}>
                US Sleep Clinics is an online directory that provides information about sleep clinics, sleep
                disorder centers, and sleep medicine providers across the United States. Our Site also offers
                educational content about sleep disorders, treatment options, and related topics. The directory is
                provided as a resource to help users find sleep care providers in their area.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className={h2}>2. Medical Disclaimer</h2>
              <div className="p-5 bg-amber-900/20 rounded-xl border border-amber-800/30 mb-4">
                <p className="text-amber-200 leading-relaxed font-medium">
                  Important: The content on this Site is provided for informational and educational purposes only and
                  does not constitute medical advice, diagnosis, or treatment.
                </p>
              </div>
              <p className={`${p} mb-4`}>
                US Sleep Clinics is not a healthcare provider. The information on our Site, including but not limited
                to descriptions of sleep disorders, treatment options, and AASM accreditation, is intended for general
                educational purposes only. This information:
              </p>
              <ul className={ul}>
                <li>Should not be used as a substitute for professional medical advice, diagnosis, or treatment</li>
                <li>Does not create a doctor-patient relationship between you and US Sleep Clinics</li>
                <li>Should not be relied upon to make healthcare decisions without consulting a qualified physician</li>
                <li>May not reflect the most current medical research or guidelines at any given time</li>
              </ul>
              <p className={`${p} mt-4`}>
                Always seek the advice of your physician or other qualified health provider with any questions you may
                have regarding a medical condition. Never disregard professional medical advice or delay seeking it
                because of something you have read on this Site. If you think you may have a medical emergency, call
                your doctor or 911 immediately.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className={h2}>3. Directory Listings</h2>
              <p className={`${p} mb-4`}>Regarding the sleep clinic listings on our Site:</p>
              <ul className={ul}>
                <li>
                  <strong className={strong}>No endorsement:</strong> Inclusion of a clinic in our directory does
                  not constitute an endorsement, recommendation, or guarantee of the quality of care provided by that clinic.
                </li>
                <li>
                  <strong className={strong}>Accuracy of information:</strong> Listings are researched from public
                  sources, such as clinic websites and map listings, and from information clinics send us. While we make
                  reasonable efforts to keep them accurate, we cannot guarantee that all information (addresses, phone
                  numbers, services, accreditation status) is current or complete. Clinics are responsible for the
                  accuracy of the information they provide to us.
                </li>
                <li>
                  <strong className={strong}>Accreditation status:</strong> AASM accreditation status and other
                  credentials listed are based on publicly available information and may change. We recommend verifying
                  accreditation directly with the relevant accrediting body.
                </li>
                <li>
                  <strong className={strong}>Listing is free:</strong> Being listed, claiming a listing, and correcting
                  it never require payment. No listing is removed, downgraded, or altered because a clinic has not paid.
                </li>
                <li>
                  <strong className={strong}>"Details confirmed by the clinic":</strong> This note means a person
                  representing the clinic reviewed its details with us on the date shown, after we confirmed who they
                  are. It is free and is never sold. It is not an endorsement, and details can change after that date.
                </li>
                <li>
                  <strong className={strong}>Advertising:</strong> Some clinics pay for a featured placement. Featured
                  placements are advertising and are labeled "{FEATURED_LABEL}" wherever they appear. Ratings and
                  reviews come from public sources and are never edited, added, or removed in exchange for payment.
                </li>
                <li>
                  <strong className={strong}>Your responsibility:</strong> You are responsible for evaluating the
                  suitability of any clinic or provider and for all decisions regarding your healthcare.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className={h2}>4. User Conduct</h2>
              <p className={`${p} mb-4`}>When using our Site, you agree not to:</p>
              <ul className={ul}>
                <li>Submit false, misleading, or inaccurate information about sleep clinics</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Use the Site for any unlawful purpose or in violation of any applicable laws</li>
                <li>Attempt to gain unauthorized access to any part of the Site or its systems</li>
                <li>Use automated tools (bots, scrapers) to collect data from the Site without written permission</li>
                <li>Interfere with or disrupt the Site's functionality or servers</li>
                <li>Post or transmit harmful code, viruses, or malicious content</li>
                <li>Use the Site to send unsolicited communications or advertisements</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className={h2}>5. Clinic Submissions and Claims</h2>
              <p className={`${p} mb-4`}>
                Submitting a clinic that is not listed yet, and claiming a listed clinic to correct its details, are
                free. If you do either:
              </p>
              <ul className={ul}>
                <li>You represent that the information you provide is accurate and complete</li>
                <li>You have the authority to act for the clinic and to submit its information</li>
                <li>
                  Before we change a listing, we confirm that you represent the clinic, for example by email at the
                  clinic's own domain or by calling its listed phone number. We may decline a claim we cannot confirm
                </li>
                <li>
                  We aim to review free submissions within {TURNAROUND.freeSubmissionDays} business days, and to apply
                  confirmed corrections within {TURNAROUND.freeCorrectionDays} business days. These are targets, not
                  guarantees
                </li>
                <li>We may verify submitted information through publicly available sources</li>
                <li>
                  We reserve the right to review, edit, or reject any submission or correction at our discretion,
                  including keeping information we have good reason to believe is accurate
                </li>
                <li>Listing is not guaranteed and inclusion/removal is at our sole discretion</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className={h2}>6. Paid Listing Plans</h2>
              <p className={p}>
                We offer optional paid plans for clinics (each a "Paid Plan"): the Enhanced Profile and Featured in
                Your City. What each includes and its current price are shown on our{" "}
                <Link href="/pricing" className="text-[#A8C99B] hover:text-[#C8E9BB] transition-colors">
                  Pricing page
                </Link>
                . This section applies when you buy a Paid Plan for a clinic. "You" includes the clinic you buy it
                for.
              </p>

              <h3 className={h3}>6.1 Authority and identity</h3>
              <p className={p}>
                By buying a Paid Plan you confirm that you are authorized to act for the clinic. Payment alone does not
                authorize changes to a listing: before we change a clinic's page under a Paid Plan, we confirm that you
                represent the clinic, as described in section 5.
              </p>

              <h3 className={h3}>6.2 Billing and automatic renewal</h3>
              <ul className={ul}>
                <li>
                  Payments are processed by Stripe. We do not receive or store your card details.
                </li>
                <li>
                  The Enhanced Profile is billed yearly. Featured in Your City is billed monthly or yearly, as you
                  choose at checkout.
                </li>
                <li>
                  <strong className={strong}>
                    Paid Plans renew automatically at the end of each billing period, and your payment method is
                    charged for the next period unless you cancel before the renewal date.
                  </strong>
                </li>
                <li>
                  If we change the price of a Paid Plan, we will email you at least 30 days before the new price
                  applies. It applies from your next renewal, and you can cancel before then.
                </li>
                <li>Prices are in US dollars. Applicable sales taxes may be added at checkout.</li>
              </ul>

              <h3 className={h3}>6.3 Cancellation</h3>
              <p className={p}>
                You can cancel at any time from the billing portal link in your Stripe receipt, or by emailing{" "}
                {CONTACT_EMAIL}. Cancellation stops the next renewal. Your plan stays active until the end of the
                period you have already paid for, and then the listing returns to a free listing.
              </p>

              <h3 className={h3}>6.4 Refunds</h3>
              <p className={`${p} mb-4`}>We refund a Paid Plan in full if:</p>
              <ul className={ul}>
                <li>
                  You bought it for a clinic that was not listed yet, and we cannot verify the clinic and publish its
                  listing; or
                </li>
                <li>We cannot confirm that you represent the clinic within 30 days of your purchase.</li>
              </ul>
              <p className={`${p} mt-4`}>
                Otherwise, fees for the current billing period are not refundable, and we do not refund partial
                periods, except as described in section 6.10 or where the law requires it.
              </p>

              <h3 className={h3}>6.5 What payment does not change</h3>
              <ul className={ul}>
                <li>
                  An Enhanced Profile changes how a clinic's own page looks, not where the clinic appears in search
                  results or on city and state pages.
                </li>
                <li>
                  Featured placement changes position only as described in section 6.6, and is always labeled
                  "{FEATURED_LABEL}".
                </li>
                <li>
                  Payment never buys ratings or reviews, and never buys the "Details confirmed by the clinic" note,
                  which is free.
                </li>
              </ul>

              <h3 className={h3}>6.6 Featured placement</h3>
              <ul className={ul}>
                <li>
                  Featured clinics appear at the top of their city's page. We sell at most{" "}
                  {FEATURED_SLOTS_PER_CITY} featured placements per city, first come, first served. When a city is
                  full, you can join a waitlist.
                </li>
                <li>
                  Featured clinics also appear in their state's results. A state shows at most{" "}
                  {FEATURED_PER_STATE_PAGE} at a time, and when more hold a placement they take turns daily, so a
                  clinic will not appear there every day.
                </li>
                <li>
                  Featured placement is not applied to "near me" results or to the unfiltered national list.
                </li>
                <li>
                  We may change the design and layout of the Site, provided featured placement stays materially as
                  described here.
                </li>
              </ul>

              <h3 className={h3}>6.7 No guaranteed results</h3>
              <p className={p}>
                We do not guarantee any number of impressions, page views, clicks, calls, appointment requests,
                patients, or revenue, or any position in search engines. The monthly report comes from our own
                analytics. It is approximate and may undercount, for example when visitors use ad blockers or privacy
                settings.
              </p>

              <h3 className={h3}>6.8 Content you provide</h3>
              <ul className={ul}>
                <li>
                  You grant us a non-exclusive, worldwide, royalty-free license to host, display, reproduce, and adapt
                  (for example resize or reformat) the photos, text, logos, and other content you send us, to show
                  them on the Site while your Paid Plan is active.
                </li>
                <li>
                  You confirm you have the rights to that content, including any people shown in photos, and that it
                  is accurate.
                </li>
                <li>
                  Content must not include false or misleading statements, claims of guaranteed treatment outcomes,
                  claims that cannot be substantiated, or any patient's health information.
                </li>
                <li>
                  We may edit content for format and length, and may decline content that does not meet these terms.
                </li>
                <li>
                  When a Paid Plan ends, we remove the content added under it, and the listing returns to a free
                  listing.
                </li>
              </ul>

              <h3 className={h3}>6.9 Ad-free clinic page</h3>
              <p className={p}>
                While a Paid Plan is active, we use reasonable efforts to keep third-party ads off the clinic's own
                page on the Site. This does not cover other pages, such as city, state, or blog pages. Occasional
                technical lapses are not a breach of these Terms, but tell us and we will fix them.
              </p>

              <h3 className={h3}>6.10 Our right to end a Paid Plan</h3>
              <p className={p}>
                We may suspend or cancel a Paid Plan if the clinic closes, if payment fails and is not resolved, if the
                content or information provided is false or misleading, or if you breach these Terms. If we cancel a
                Paid Plan for any reason other than your breach or non-payment, or if we stop offering a Paid Plan, we
                refund the unused part of the period you paid for.
              </p>

              <h3 className={h3}>6.11 Clinic Group pricing</h3>
              <p className={p}>
                Practices with {CLINIC_GROUP.minLocations} to {CLINIC_GROUP.maxLocations} locations under common
                ownership or management can receive {CLINIC_GROUP.percentOff}% off each location's Paid Plan, and
                practices with more locations can ask for a quote. Group pricing is arranged by email, applies only to
                the locations we agree in writing, and otherwise follows these Terms.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className={h2}>7. Intellectual Property</h2>
              <p className={`${p} mb-4`}>
                All content on this Site, including but not limited to text, graphics, logos, icons, images, data
                compilations, and software, is the property of US Sleep Clinics or its content suppliers and is
                protected by United States and international intellectual property laws.
              </p>
              <p className={p}>
                You may access and use the Site for personal, non-commercial purposes. You may not reproduce, distribute,
                modify, create derivative works from, publicly display, or exploit any content from the Site without our
                prior written consent. The US Sleep Clinics name, logo, and all related marks are trademarks of
                US Sleep Clinics. Listed clinics may display our free website badge as provided on our{" "}
                <Link href="/badge" className="text-[#A8C99B] hover:text-[#C8E9BB] transition-colors">
                  badge page
                </Link>
                .
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className={h2}>8. Third-Party Links and Services</h2>
              <p className={p}>
                Our Site contains links to third-party websites, including sleep clinic websites, medical organizations,
                and other resources. These links are provided for your convenience only. We do not control, endorse, or
                assume responsibility for the content, privacy policies, or practices of any third-party websites. Your
                use of third-party sites is at your own risk and subject to those sites' terms and conditions.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className={h2}>9. Disclaimer of Warranties</h2>
              <p className={`${p} mb-4`}>
                THE SITE AND ALL CONTENT, INFORMATION, AND SERVICES PROVIDED THROUGH THE SITE ARE PROVIDED ON AN "AS
                IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, EXCEPT AS
                EXPRESSLY STATED IN SECTION 6 FOR PAID PLANS.
              </p>
              <p className={p}>
                To the fullest extent permitted by law, we disclaim all warranties, including but not limited to implied
                warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant
                that the Site will be uninterrupted, error-free, secure, or free of viruses or other harmful components.
                We do not warrant the accuracy, completeness, or reliability of any content, including clinic listings,
                accreditation information, or educational materials.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className={h2}>10. Limitation of Liability</h2>
              <p className={p}>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, US SLEEP CLINICS, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND
                AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF OR
                INABILITY TO USE THE SITE, ANY CONTENT ON THE SITE, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE,
                WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF WE
                HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE
                GREATER OF ONE HUNDRED DOLLARS ($100) OR THE AMOUNT YOU PAID US FOR PAID PLANS IN THE TWELVE (12)
                MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className={h2}>11. Indemnification</h2>
              <p className={p}>
                You agree to indemnify, defend, and hold harmless US Sleep Clinics and its officers, directors,
                employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and
                expenses (including reasonable attorneys' fees) arising out of or related to your use of the Site,
                any information or content you provide for a listing, your violation of these Terms, or your violation
                of any rights of another party.
              </p>
            </div>

            {/* Section 12 */}
            <div>
              <h2 className={h2}>12. Governing Law and Dispute Resolution</h2>
              <p className={p}>
                These Terms shall be governed by and construed in accordance with the laws of the United States and the
                State in which US Sleep Clinics is headquartered, without regard to conflict of law principles. Any
                dispute arising under these Terms shall first be resolved through good-faith negotiation. If negotiation
                fails, disputes shall be resolved through binding arbitration in accordance with the rules of the
                American Arbitration Association, except that either party may seek injunctive relief in a court of
                competent jurisdiction.
              </p>
            </div>

            {/* Section 13 */}
            <div>
              <h2 className={h2}>13. Modifications to Terms</h2>
              <p className={p}>
                We reserve the right to modify these Terms at any time. Changes will be effective when posted on this
                page with an updated "Last updated" date. Your continued use of the Site after any modification
                constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.
                If a change materially affects an active Paid Plan, we will email the subscriber at least 30 days
                before it applies to that plan, and the subscriber may cancel before then and receive a refund of the
                unused part of the period already paid for.
              </p>
            </div>

            {/* Section 14 */}
            <div>
              <h2 className={h2}>14. Termination</h2>
              <p className={p}>
                We reserve the right to terminate or suspend your access to the Site at any time, without prior notice
                or liability, for any reason, including if you breach these Terms. Paid Plans are ended as described in
                section 6.10. All provisions of these Terms that by their nature should survive termination shall
                survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </div>

            {/* Section 15 */}
            <div>
              <h2 className={h2}>15. Severability</h2>
              <p className={p}>
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited
                or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force
                and effect.
              </p>
            </div>

            {/* Section 16 */}
            <div>
              <h2 className={h2}>16. Contact Us</h2>
              <p className={p}>
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-white font-semibold">US Sleep Clinics</p>
                <p className="text-slate-300 mt-1">Email: {CONTACT_EMAIL}</p>
              </div>
            </div>

            {/* Related link */}
            <div className="pt-4 border-t border-slate-700/50">
              <p className="text-slate-400 text-sm">
                Please also review our{" "}
                <Link href="/privacy-policy" className="text-[#A8C99B] hover:text-[#C8E9BB] transition-colors">
                  Privacy Policy
                </Link>
                , which describes how we collect and use your personal information.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
