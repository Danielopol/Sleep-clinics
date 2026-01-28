import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getDisorderBySlug, getAllDisorderSlugs } from "@/lib/sleep-disorders-content"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import {
  Moon,
  Stethoscope,
  ClipboardList,
  HeartPulse,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Calendar,
  User
} from "lucide-react"

// Generate static params for all disorders
export async function generateStaticParams() {
  const slugs = getAllDisorderSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const disorder = getDisorderBySlug(slug)

  if (!disorder) {
    return { title: "Disorder Not Found" }
  }

  return {
    title: `${disorder.name} - Symptoms, Causes & Treatment | Sleep Care Directory`,
    description: disorder.description,
  }
}

export default async function SleepDisorderPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const disorder = getDisorderBySlug(slug)

  if (!disorder) {
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
              <Link href="/sleep-disorders" className="hover:text-white transition-colors">Sleep Disorders</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-[var(--dream-blue-light)]">{disorder.name}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-[var(--dream-blue-light)] text-sm font-medium">
              <Moon className="h-4 w-4" />
              {disorder.category}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              {disorder.name}
            </h1>

            <p className="text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {disorder.description}
            </p>

            {/* Review info */}
            <div className="flex items-center justify-center gap-4 text-sm text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {disorder.lastReviewed}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Reviewed by: {disorder.reviewedBy}
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
            <a href="#symptoms" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap">
              Symptoms
            </a>
            <a href="#diagnosis" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap">
              Diagnosis
            </a>
            <a href="#treatment" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap">
              Treatment
            </a>
            <div className="flex-1" />
            <Link
              href={`/?q=${encodeURIComponent(disorder.name)}`}
              className="px-4 py-2 text-sm font-medium bg-[var(--healing-teal)] text-white rounded-lg hover:bg-[var(--healing-teal)]/90 transition-colors whitespace-nowrap"
            >
              Find Specialists
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
                  <div className="p-2 bg-[var(--dream-blue)]/20 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-[var(--dream-blue)]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">What is {disorder.name}?</h2>
                </div>

                <div className="prose prose-invert prose-slate max-w-none">
                  <p className="text-slate-300 leading-relaxed text-lg">{disorder.overview}</p>

                  <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h4 className="text-white font-semibold mb-2">Prevalence</h4>
                    <p className="text-slate-300 text-sm">{disorder.prevalence}</p>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-white font-semibold mb-2">Causes</h4>
                    <p className="text-slate-300">{disorder.causes}</p>
                  </div>

                  {disorder.types && disorder.types.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-white font-semibold mb-3">Types</h4>
                      <div className="space-y-3">
                        {disorder.types.map((type, index) => (
                          <div key={index} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                            <h5 className="text-[var(--dream-blue)] font-medium">{type.name}</h5>
                            <p className="text-slate-400 text-sm mt-1">{type.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Symptoms Section */}
              <div id="symptoms" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[var(--healing-teal)]/20 rounded-lg">
                    <ClipboardList className="h-6 w-6 text-[var(--healing-teal)]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Symptoms</h2>
                </div>

                <div className="space-y-4">
                  {disorder.symptoms.map((symptom, index) => (
                    <div key={index} className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                      <h3 className="text-lg font-semibold text-white mb-2">{symptom.name}</h3>
                      <p className="text-slate-300">{symptom.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnosis Section */}
              <div id="diagnosis" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Stethoscope className="h-6 w-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Diagnosis</h2>
                </div>

                {/* Self-Test */}
                <div className="mb-8 p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 rounded-xl border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Self-Assessment Questions</h3>
                  <p className="text-slate-400 text-sm mb-4">If you answer yes to any of these questions, consider consulting a sleep specialist:</p>
                  <ul className="space-y-3">
                    {disorder.selfTestQuestions.map((question, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-slate-300">{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-slate-300 mb-6">{disorder.diagnosisOverview}</p>

                <div className="space-y-4">
                  {disorder.diagnosticTests.map((test, index) => (
                    <div key={index} className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/50">
                      <h3 className="text-lg font-semibold text-white mb-2">{test.name}</h3>
                      <p className="text-slate-300">{test.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Section */}
              <div id="treatment" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <HeartPulse className="h-6 w-6 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Treatment</h2>
                </div>

                <p className="text-slate-300 mb-6">{disorder.treatmentOverview}</p>

                <div className="space-y-4 mb-8">
                  {disorder.treatments.map((treatment, index) => (
                    <div key={index} className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/50">
                      <h3 className="text-lg font-semibold text-white mb-2">{treatment.name}</h3>
                      <p className="text-slate-300">{treatment.description}</p>
                    </div>
                  ))}
                </div>

                {/* Lifestyle Changes */}
                <div className="p-6 bg-gradient-to-br from-green-900/20 to-slate-800/30 rounded-xl border border-green-800/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Lifestyle Adjustments</h3>
                  <ul className="space-y-2">
                    {disorder.lifestyleChanges.map((change, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-300">
                        <span className="text-green-400 mt-1">•</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support Resources */}
                {disorder.supportResources && disorder.supportResources.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Patient Support Resources</h3>
                    <div className="flex flex-wrap gap-3">
                      {disorder.supportResources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-[var(--dream-blue)] transition-colors"
                        >
                          {resource.name}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Find Specialists Card */}
                <div className="p-6 bg-gradient-to-br from-[var(--deep-navy)] to-slate-800 rounded-xl border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">Find a Specialist</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Search our directory for sleep clinics that specialize in treating {disorder.name.toLowerCase()}.
                  </p>
                  <Link
                    href={`/?q=${encodeURIComponent(disorder.name)}`}
                    className="block w-full py-3 px-4 bg-[var(--healing-teal)] hover:bg-[var(--healing-teal)]/90 text-white font-medium rounded-lg text-center transition-colors"
                  >
                    Search Clinics
                  </Link>
                </div>

                {/* Related Disorders */}
                {disorder.relatedDisorders && disorder.relatedDisorders.length > 0 && (
                  <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Related Disorders</h3>
                    <ul className="space-y-2">
                      {disorder.relatedDisorders.map((related, index) => (
                        <li key={index}>
                          <Link
                            href={`/sleep-disorders/${related.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                            className="text-[var(--dream-blue)] hover:text-[var(--dream-blue-light)] text-sm transition-colors"
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
                  href="/sleep-disorders"
                  className="block p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-700/50 text-center text-slate-300 hover:text-white transition-colors"
                >
                  ← Back to Sleep Disorders Guide
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
