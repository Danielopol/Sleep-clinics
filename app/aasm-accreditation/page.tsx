import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Award,
  CheckCircle2,
  Shield,
  Users,
  FileCheck,
  Building2,
  Stethoscope,
  ClipboardCheck,
  GraduationCap,
  HeartPulse,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

export default function AASMAccreditationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navigation />

      {/* Hero Section with background image */}
      <section className="relative w-full min-h-[400px] md:min-h-[450px] overflow-hidden">
        {/* Background image */}
        <img
          src="/images/Hero section_4.png"
          alt="Peaceful night sky"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight)]/90 via-[var(--midnight)]/60 to-[var(--midnight)]/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] md:min-h-[450px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-[#F6C066] text-sm font-medium">
              <Award className="h-4 w-4" />
              Quality Standards in Sleep Medicine
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              AASM Accreditation
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              Understanding the gold standard for sleep disorder centers and why accreditation matters for your care
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* What is AASM Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#F6C066]/20 rounded-lg">
                <Shield className="h-6 w-6 text-[#F6C066]" />
              </div>
              <h2 className="text-2xl font-bold text-white">What is AASM Accreditation?</h2>
            </div>
            <div className="prose prose-invert prose-slate max-w-none">
              <p className="text-slate-300 leading-relaxed text-lg">
                The American Academy of Sleep Medicine (AASM) is the leading professional society dedicated to sleep medicine.
                AASM accreditation is a voluntary process that certifies sleep disorder centers meet the highest standards of
                care, demonstrating a commitment to quality, patient safety, and evidence-based practice.
              </p>
              <p className="text-slate-300 leading-relaxed mt-4">
                Accredited facilities undergo rigorous review of their personnel qualifications, equipment, policies,
                procedures, and patient care processes. This accreditation is widely recognized by physicians, patients,
                and insurance companies as the gold standard in sleep medicine.
              </p>
            </div>
          </div>

          {/* Why It Matters Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Why AASM Accreditation Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle2,
                  title: "Quality Assurance",
                  description: "Accredited centers meet strict standards for personnel, equipment, and procedures, ensuring you receive high-quality care.",
                  color: "text-green-400",
                  bgColor: "bg-green-500/20"
                },
                {
                  icon: Users,
                  title: "Qualified Staff",
                  description: "Board-certified sleep medicine physicians and registered polysomnographic technologists provide your care.",
                  color: "text-blue-400",
                  bgColor: "bg-blue-500/20"
                },
                {
                  icon: FileCheck,
                  title: "Evidence-Based Care",
                  description: "Treatment follows current clinical guidelines and best practices established by sleep medicine research.",
                  color: "text-purple-400",
                  bgColor: "bg-purple-500/20"
                },
                {
                  icon: HeartPulse,
                  title: "Patient Safety",
                  description: "Rigorous safety protocols and emergency procedures protect patients during overnight studies.",
                  color: "text-red-400",
                  bgColor: "bg-red-500/20"
                },
                {
                  icon: ClipboardCheck,
                  title: "Insurance Recognition",
                  description: "Many insurance companies prefer or require AASM accreditation for coverage of sleep studies and treatments.",
                  color: "text-amber-400",
                  bgColor: "bg-amber-500/20"
                },
                {
                  icon: GraduationCap,
                  title: "Continuous Improvement",
                  description: "Accredited centers commit to ongoing education, quality improvement, and staying current with advances in sleep medicine.",
                  color: "text-cyan-400",
                  bgColor: "bg-cyan-500/20"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors"
                >
                  <div className={`p-2 ${item.bgColor} rounded-lg w-fit mb-4`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Accreditation Standards */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Accreditation Standards</h2>
            </div>

            <p className="text-slate-400 mb-8">
              To achieve AASM accreditation, sleep centers must meet comprehensive standards across multiple domains:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Medical Director Requirements",
                  items: [
                    "Board-certified in sleep medicine by ABMS or AOA",
                    "Active medical license in the state of practice",
                    "Responsible for clinical policies and quality oversight",
                    "Available for consultation and emergency situations"
                  ]
                },
                {
                  title: "Personnel Qualifications",
                  items: [
                    "Registered Polysomnographic Technologists (RPSGT) or equivalent",
                    "Adequate staffing ratios for patient safety",
                    "Ongoing continuing education requirements",
                    "Competency assessments and performance reviews"
                  ]
                },
                {
                  title: "Facility Requirements",
                  items: [
                    "Dedicated sleep testing rooms with appropriate amenities",
                    "Emergency equipment and protocols readily available",
                    "Proper infection control procedures",
                    "Patient privacy and comfort considerations"
                  ]
                },
                {
                  title: "Equipment Standards",
                  items: [
                    "FDA-approved polysomnography equipment",
                    "Regular calibration and maintenance schedules",
                    "Backup systems for critical equipment",
                    "Appropriate monitoring capabilities for all study types"
                  ]
                },
                {
                  title: "Quality Assurance",
                  items: [
                    "Inter-scorer reliability testing",
                    "Regular quality review of sleep studies",
                    "Patient satisfaction monitoring",
                    "Continuous quality improvement programs"
                  ]
                },
                {
                  title: "Policies and Procedures",
                  items: [
                    "Comprehensive policy manual covering all operations",
                    "Standardized protocols for sleep study performance",
                    "Clear procedures for scoring and interpretation",
                    "Documentation and record-keeping standards"
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Types of Accreditation */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Stethoscope className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Types of AASM Accreditation</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-900/30 to-slate-800/40 rounded-xl border border-blue-800/30">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Sleep Disorders Center</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Full-service facilities that provide comprehensive evaluation and treatment of all sleep disorders,
                  including in-lab polysomnography, MSLT/MWT testing, and ongoing patient management.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-400 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    Complete diagnostic capabilities
                  </li>
                  <li className="flex items-center gap-2 text-slate-400 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    Treatment initiation and follow-up
                  </li>
                  <li className="flex items-center gap-2 text-slate-400 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    Board-certified sleep specialist oversight
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-900/30 to-slate-800/40 rounded-xl border border-green-800/30">
                <h3 className="text-xl font-semibold text-green-300 mb-3">Out of Center Sleep Testing (OCST)</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Accreditation for home sleep apnea testing programs, ensuring portable monitoring devices are
                  properly administered and results accurately interpreted.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-400 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Home sleep apnea testing
                  </li>
                  <li className="flex items-center gap-2 text-slate-400 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Patient education and device instruction
                  </li>
                  <li className="flex items-center gap-2 text-slate-400 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Physician interpretation and follow-up
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Verify */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <FileCheck className="h-6 w-6 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">How to Verify Accreditation</h2>
            </div>

            <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50">
              <p className="text-slate-300 mb-6">
                You can verify a sleep center's AASM accreditation status through the official AASM website.
                Accredited facilities are listed in the AASM's searchable database.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/?accreditation=AASM"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F6C066] hover:bg-[#E5AF55] text-slate-900 font-medium rounded-lg transition-colors"
                >
                  Find AASM Accredited Facilities
                </Link>
                <a
                  href="https://aasm.org/accreditation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                >
                  Learn More About Accreditation
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Questions to Ask */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Users className="h-6 w-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Questions to Ask Your Sleep Center</h2>
            </div>

            <p className="text-slate-400 mb-6">
              When choosing a sleep center, consider asking these questions to ensure you receive quality care:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Is your facility accredited by the AASM?",
                "Is the medical director board-certified in sleep medicine?",
                "Are your technologists registered (RPSGT)?",
                "What types of sleep studies do you perform?",
                "How quickly will I receive my results?",
                "Who will interpret my sleep study?",
                "Do you offer follow-up care and treatment?",
                "Does my insurance cover services at your center?"
              ].map((question, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-slate-300 text-sm">{question}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-gradient-to-br from-[var(--deep-navy)] to-slate-800 rounded-xl border border-slate-700/50 text-center">
              <Award className="h-12 w-12 text-[#F6C066] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">Find Accredited Sleep Centers</h2>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                Search our directory to find AASM-accredited sleep centers and qualified sleep medicine providers near you.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#7C9070] hover:bg-[#6B7F60] text-white font-medium rounded-lg transition-colors"
              >
                Search Sleep Clinics
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
