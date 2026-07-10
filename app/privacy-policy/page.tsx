import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | US Sleep Clinics",
  description: "Privacy Policy for US Sleep Clinics. Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
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
              <Shield className="h-4 w-4" />
              Your Privacy Matters
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              Privacy Policy
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
                US Sleep Clinics ("we," "us," or "our") operates the website <strong className="text-white">www.ussleepclinics.com</strong> (the "Site").
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site.
                By using the Site, you consent to the practices described in this policy.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>

              <h3 className="text-lg font-semibold text-slate-200 mb-2">Personal Information You Provide</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>Submit a sleep clinic for inclusion in our directory</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our website</li>
                <li>Leave a review or comment</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-4">
                This information may include your name, email address, phone number, and any other details you choose to provide.
              </p>

              <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">Information Collected Automatically</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                When you visit our Site, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>IP address and general location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited, time spent on pages, and navigation paths</li>
                <li>Referring website or search terms</li>
                <li>Device type (desktop, mobile, tablet)</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>Operate, maintain, and improve our sleep clinic directory</li>
                <li>Process clinic submissions and directory updates</li>
                <li>Send newsletters and updates you have opted into</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Prevent fraudulent or unauthorized activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">3. Cookies and Tracking Technologies</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our Site. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong className="text-white">Essential cookies:</strong> Required for the Site to function properly (e.g., navigation, access to secure areas).</li>
                <li><strong className="text-white">Analytics cookies:</strong> Help us understand how visitors use the Site so we can improve content and functionality.</li>
                <li><strong className="text-white">Preference cookies:</strong> Remember your settings and preferences for a better browsing experience.</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-4">
                You can control cookies through your browser settings. Disabling certain cookies may affect Site functionality.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">4. How We Share Your Information</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong className="text-white">Service providers:</strong> Third-party vendors who assist us in operating the Site (hosting, analytics, email delivery) and are bound by confidentiality obligations.</li>
                <li><strong className="text-white">Legal requirements:</strong> When required by law, court order, or governmental regulation.</li>
                <li><strong className="text-white">Protection of rights:</strong> To protect the rights, property, or safety of US Sleep Clinics, our users, or the public.</li>
                <li><strong className="text-white">Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, with notice provided to affected users.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">5. Health Information Disclaimer</h2>
              <p className="text-slate-300 leading-relaxed">
                US Sleep Clinics is an informational directory service. We do not collect, store, or process
                protected health information (PHI) as defined by HIPAA. Our Site provides general information about sleep
                disorders and treatments for educational purposes only. We do not provide medical advice, diagnosis, or
                treatment. Any interaction between you and a sleep clinic listed in our directory is subject to that
                clinic's own privacy policies and practices.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">6. Data Security</h2>
              <p className="text-slate-300 leading-relaxed">
                We implement commercially reasonable technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. These measures include
                encrypted data transmission (SSL/TLS), secure server infrastructure, and restricted access controls.
                However, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">7. Third-Party Links</h2>
              <p className="text-slate-300 leading-relaxed">
                Our Site contains links to third-party websites, including sleep clinic websites, medical organizations,
                and educational resources. We are not responsible for the privacy practices or content of these external
                sites. We encourage you to review the privacy policies of any third-party websites you visit.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">8. Your Rights and Choices</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Depending on your jurisdiction, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong className="text-white">Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong className="text-white">Correction:</strong> Request that we correct inaccurate or incomplete information.</li>
                <li><strong className="text-white">Deletion:</strong> Request that we delete your personal information, subject to legal obligations.</li>
                <li><strong className="text-white">Opt-out:</strong> Unsubscribe from marketing emails at any time using the link provided in each email.</li>
                <li><strong className="text-white">Do Not Track:</strong> We honor Do Not Track signals sent by your browser.</li>
              </ul>
              <p className="text-slate-300 leading-relaxed mt-4">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p className="text-slate-300 leading-relaxed">
                Our Site is not directed to children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you believe we have inadvertently collected such information,
                please contact us immediately and we will take steps to delete it.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-slate-300 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable
                laws. We will post the revised policy on this page with an updated "Last updated" date. Your continued
                use of the Site after any changes constitutes your acceptance of the updated policy.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">11. Contact Us</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-white font-semibold">US Sleep Clinics</p>
                <p className="text-slate-300 mt-1">Email: contact@ussleepclinics.com</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
