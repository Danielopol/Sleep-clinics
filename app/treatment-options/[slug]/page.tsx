import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getTreatmentBySlug, getAllTreatmentSlugs } from "@/lib/treatment-options-content"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import {
  Stethoscope,
  Heart,
  AlertTriangle,
  Layers,
  Lightbulb,
  ChevronRight,
  ExternalLink,
  Calendar,
  User,
  CheckCircle2
} from "lucide-react"

// Generate static params for all treatments
export async function generateStaticParams() {
  const slugs = getAllTreatmentSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const treatment = getTreatmentBySlug(slug)

  if (!treatment) {
    return { title: "Treatment Not Found" }
  }

  return {
    title: `${treatment.name} - Benefits, Side Effects & Tips | Sleep Care Directory`,
    description: treatment.description,
  }
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const treatment = getTreatmentBySlug(slug)

  if (!treatment) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full min-h-[350px] md:min-h-[400px] overflow-hidden">
        <img
          src="/images/Hero section_4.png"
          alt="Peaceful night sky"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight)]/95 via-[var(--midnight)]/70 to-[var(--midnight)]/50" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[350px] md:min-h-[400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full text-center space-y-4">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm text-slate-300">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/treatment-options" className="hover:text-white transition-colors">Treatment Options</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-[#A8C99B]">{treatment.name}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-[#A8C99B] text-sm font-medium">
              <Stethoscope className="h-4 w-4" />
              {treatment.category}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              {treatment.name}
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {treatment.description}
            </p>

            {/* Review info */}
            <div className="flex items-center justify-center gap-4 text-sm text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {treatment.lastReviewed}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Reviewed by: {treatment.reviewedBy}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 py-3 overflow-x-auto">
            <a href="#overview" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap">
              Overview
            </a>
            <a href="#benefits" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap">
              Benefits
            </a>
            <a href="#side-effects" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap">
              Side Effects
            </a>
            {treatment.variations && treatment.variations.length > 0 && (
              <a href="#variations" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap">
                Variations
              </a>
            )}
            <a href="#tips" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap">
              Tips
            </a>
            <div className="flex-1" />
            <Link
              href={`/?q=${encodeURIComponent(treatment.name)}`}
              className="px-4 py-2 text-sm font-medium bg-[#7C9070] text-white rounded-lg hover:bg-[#6B7F60] transition-colors whitespace-nowrap"
            >
              Find Providers
            </Link>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">

              {/* Overview Section */}
              <div id="overview" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#7C9070]/20 rounded-lg">
                    <Stethoscope className="h-6 w-6 text-[#A8C99B]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">What is {treatment.name}?</h2>
                </div>

                <div className="prose prose-invert prose-slate max-w-none">
                  <p className="text-slate-300 leading-relaxed text-lg">{treatment.overview}</p>

                  <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h4 className="text-white font-semibold mb-2">How It Works</h4>
                    <p className="text-slate-300 text-sm">{treatment.howItWorks}</p>
                  </div>

                  <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h4 className="text-white font-semibold mb-2">Who Is It For?</h4>
                    <p className="text-slate-300 text-sm">{treatment.candidatesFor}</p>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div id="benefits" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Heart className="h-6 w-6 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Benefits</h2>
                </div>

                <div className="space-y-4">
                  {treatment.benefits.map((benefit, index) => (
                    <div key={index} className="p-5 bg-gradient-to-r from-green-900/20 to-slate-800/40 rounded-xl border border-green-800/30 hover:border-green-700/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{benefit.name}</h3>
                          <p className="text-slate-300">{benefit.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side Effects Section */}
              <div id="side-effects" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Side Effects & Considerations</h2>
                </div>

                <p className="text-slate-400 mb-6">Most side effects are minor and can often be resolved with simple adjustments.</p>

                <div className="space-y-4">
                  {treatment.sideEffects.map((effect, index) => (
                    <div key={index} className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                      <h3 className="text-lg font-semibold text-white mb-2">{effect.name}</h3>
                      <p className="text-slate-300">{effect.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Variations Section */}
              {treatment.variations && treatment.variations.length > 0 && (
                <div id="variations" className="scroll-mt-20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Layers className="h-6 w-6 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Variations & Types</h2>
                  </div>

                  <div className="space-y-4">
                    {treatment.variations.map((variation, index) => (
                      <div key={index} className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/50">
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">{variation.name}</h3>
                        <p className="text-slate-300">{variation.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips Section */}
              <div id="tips" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Lightbulb className="h-6 w-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Tips for Success</h2>
                </div>

                <div className="space-y-4">
                  {treatment.tips.map((tip, index) => (
                    <div key={index} className="p-5 bg-gradient-to-r from-blue-900/20 to-slate-800/40 rounded-xl border border-blue-800/30">
                      <h3 className="text-lg font-semibold text-white mb-2">{tip.title}</h3>
                      <p className="text-slate-300">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Resources */}
              {treatment.additionalResources && treatment.additionalResources.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Additional Resources</h3>
                  <div className="flex flex-wrap gap-3">
                    {treatment.additionalResources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-[#A8C99B] transition-colors"
                      >
                        {resource.name}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Find Providers Card */}
                <div className="p-6 bg-gradient-to-br from-[var(--deep-navy)] to-slate-800 rounded-xl border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Find Providers</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Search our directory for sleep clinics that offer {treatment.name.toLowerCase()}.
                  </p>
                  <Link
                    href={`/?q=${encodeURIComponent(treatment.name)}`}
                    className="block w-full py-3 px-4 bg-[#7C9070] hover:bg-[#6B7F60] text-white font-medium rounded-lg text-center transition-colors"
                  >
                    Search Clinics
                  </Link>
                </div>

                {/* Treated Conditions */}
                {treatment.treatedConditions && treatment.treatedConditions.length > 0 && (
                  <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Conditions Treated</h3>
                    <ul className="space-y-2">
                      {treatment.treatedConditions.map((condition, index) => (
                        <li key={index}>
                          <Link
                            href={`/sleep-disorders/${condition.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                            className="text-[#A8C99B] hover:text-[#C8E9BB] text-sm transition-colors"
                          >
                            {condition}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Treatments */}
                {treatment.relatedTreatments && treatment.relatedTreatments.length > 0 && (
                  <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Related Treatments</h3>
                    <ul className="space-y-2">
                      {treatment.relatedTreatments.map((related, index) => (
                        <li key={index}>
                          <Link
                            href={`/treatment-options/${related.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                            className="text-[#A8C99B] hover:text-[#C8E9BB] text-sm transition-colors"
                          >
                            {related}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Back to Guide */}
                <Link
                  href="/treatment-options"
                  className="block p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 text-center text-slate-300 hover:text-white transition-colors"
                >
                  ← Back to Treatment Options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
