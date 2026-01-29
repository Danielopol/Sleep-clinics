import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollText } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Sleep Care Directory",
  description: "Terms of Service for Sleep Care Directory. Please read these terms carefully before using our website.",
}

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
            <p className="text-slate-300 text-sm">Last updated: January 2025</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-slate max-w-none space-y-10">

            {/* Introduction */}
            <div>
              <p className="text-slate-300 leading-relaxed">
                Welcome to Sleep Care Directory. These Terms of Service ("Terms") govern your access to and use of the
                website <strong className="text-white">www.ussleepclinics.com</strong> (the "Site"), operated by
                Sleep Care Directory ("we," "us," or "our"). By accessing or using the Site, you agree to be bound by
                these Terms. If you do not agree, please do not use the Site.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">1. Description of Service</h2>
              <p className="text-slate-300 leading-relaxed">
                Sleep Care Directory is an online directory that provides information about sleep clinics, sleep
                disorder centers, and sleep medicine providers across the United States. Our Site also offers
                educational content about sleep disorders, treatment options, and related topics. The directory is
                provided as a resource to help users find sleep care providers in their area.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">2. Medical Disclaimer</h2>
              <div className="p-5 bg-amber-900/20 rounded-xl border border-amber-800/30 mb-4">
                <p className="text-amber-200 leading-relaxed font-medium">
                  Important: The content on this Site is provided for informational and educational purposes only and
                  does not constitute medical advice, diagnosis, or treatment.
                </p>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Sleep Care Directory is not a healthcare provider. The information on our Site, including but not limited
                to descriptions of sleep disorders, treatment options, and AASM accreditation, is intended for general
                educational purposes only. This information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>Should not be used as a substitute for professional medical advice, diagnosis, or treatment</li>
                <li>Does not create a doctor-patient relationship between you and Sleep Care Directory</li>
                <li>Should not be relied upon to make healthcare decisions without consulting a qualified physician</li>
                <li>May not reflect the most current medical research or guidelines at any given time</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-4">
                Always seek the advice of your physician or other qualified health provider with any questions you may
                have regarding a medical condition. Never disregard professional medical advice or delay seeking it
                because of something you have read on this Site. If you think you may have a medical emergency, call
                your doctor or 911 immediately.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">3. Directory Listings</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Regarding the sleep clinic listings on our Site:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>
                  <strong className="text-white">No endorsement:</strong> Inclusion of a clinic in our directory does
                  not constitute an endorsement, recommendation, or guarantee of the quality of care provided by that clinic.
                </li>
                <li>
                  <strong className="text-white">Accuracy of information:</strong> While we make reasonable efforts to
                  ensure the accuracy of directory listings, we cannot guarantee that all information (addresses, phone
                  numbers, services, accreditation status) is current or complete. Clinics are responsible for the
                  accuracy of their own information.
                </li>
                <li>
                  <strong className="text-white">Accreditation status:</strong> AASM accreditation status and other
                  credentials listed are based on publicly available information and may change. We recommend verifying
                  accreditation directly with the relevant accrediting body.
                </li>
                <li>
                  <strong className="text-white">Your responsibility:</strong> You are responsible for evaluating the
                  suitability of any clinic or provider and for all decisions regarding your healthcare.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">4. User Conduct</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                When using our Site, you agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
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
              <h2 className="text-xl font-bold text-white mb-4">5. Clinic Submissions</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                If you submit a sleep clinic for inclusion in our directory:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>You represent that the information you provide is accurate and complete</li>
                <li>You have the authority to submit the clinic's information</li>
                <li>We reserve the right to review, edit, or reject any submission at our discretion</li>
                <li>We may verify submitted information through publicly available sources</li>
                <li>Listing is not guaranteed and inclusion/removal is at our sole discretion</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">6. Intellectual Property</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                All content on this Site, including but not limited to text, graphics, logos, icons, images, data
                compilations, and software, is the property of Sleep Care Directory or its content suppliers and is
                protected by United States and international intellectual property laws.
              </p>
              <p className="text-slate-300 leading-relaxed">
                You may access and use the Site for personal, non-commercial purposes. You may not reproduce, distribute,
                modify, create derivative works from, publicly display, or exploit any content from the Site without our
                prior written consent. The Sleep Care Directory name, logo, and all related marks are trademarks of
                Sleep Care Directory.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">7. Third-Party Links and Services</h2>
              <p className="text-slate-300 leading-relaxed">
                Our Site contains links to third-party websites, including sleep clinic websites, medical organizations,
                and other resources. These links are provided for your convenience only. We do not control, endorse, or
                assume responsibility for the content, privacy policies, or practices of any third-party websites. Your
                use of third-party sites is at your own risk and subject to those sites' terms and conditions.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                THE SITE AND ALL CONTENT, INFORMATION, AND SERVICES PROVIDED THROUGH THE SITE ARE PROVIDED ON AN "AS
                IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p className="text-slate-300 leading-relaxed">
                To the fullest extent permitted by law, we disclaim all warranties, including but not limited to implied
                warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant
                that the Site will be uninterrupted, error-free, secure, or free of viruses or other harmful components.
                We do not warrant the accuracy, completeness, or reliability of any content, including clinic listings,
                accreditation information, or educational materials.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">9. Limitation of Liability</h2>
              <p className="text-slate-300 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SLEEP CARE DIRECTORY, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND
                AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF OR
                INABILITY TO USE THE SITE, ANY CONTENT ON THE SITE, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE,
                WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF WE
                HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED ONE
                HUNDRED DOLLARS ($100).
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">10. Indemnification</h2>
              <p className="text-slate-300 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Sleep Care Directory and its officers, directors,
                employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and
                expenses (including reasonable attorneys' fees) arising out of or related to your use of the Site,
                violation of these Terms, or violation of any rights of another party.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">11. Governing Law and Dispute Resolution</h2>
              <p className="text-slate-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the United States and the
                State in which Sleep Care Directory is headquartered, without regard to conflict of law principles. Any
                dispute arising under these Terms shall first be resolved through good-faith negotiation. If negotiation
                fails, disputes shall be resolved through binding arbitration in accordance with the rules of the
                American Arbitration Association, except that either party may seek injunctive relief in a court of
                competent jurisdiction.
              </p>
            </div>

            {/* Section 12 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">12. Modifications to Terms</h2>
              <p className="text-slate-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective when posted on this
                page with an updated "Last updated" date. Your continued use of the Site after any modification
                constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.
              </p>
            </div>

            {/* Section 13 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">13. Termination</h2>
              <p className="text-slate-300 leading-relaxed">
                We reserve the right to terminate or suspend your access to the Site at any time, without prior notice
                or liability, for any reason, including if you breach these Terms. All provisions of these Terms that by
                their nature should survive termination shall survive, including ownership provisions, warranty
                disclaimers, indemnity, and limitations of liability.
              </p>
            </div>

            {/* Section 14 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">14. Severability</h2>
              <p className="text-slate-300 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited
                or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force
                and effect.
              </p>
            </div>

            {/* Section 15 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">15. Contact Us</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-white font-semibold">Sleep Care Directory</p>
                <p className="text-slate-300 mt-1">Email: valentin.marin83@gmail.com</p>
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
