import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { sleepDisordersData } from "@/lib/sleep-disorders"
import { Moon, ChevronRight } from "lucide-react"
import Link from "next/link"

// Helper function to generate slug from disorder name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // Remove parentheses and content
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .trim()
}

export default function SleepDisordersPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-[var(--dream-blue-light)] text-sm font-medium">
              <Moon className="h-4 w-4" />
              Understanding Sleep Conditions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              Sleep Disorders Guide
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              Comprehensive information about sleep disorders, symptoms, diagnosis, and treatment options
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info text */}
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Click on any disorder to learn about symptoms, causes, diagnosis, and treatment options
          </p>

          {/* Disorders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sleepDisordersData.map((category) => (
              <div key={category.category} className="space-y-4">
                <h3 className="text-[#64b5f6] font-semibold text-sm uppercase tracking-wide border-b border-slate-700/50 pb-3">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.disorders.map((disorder) => (
                    <li key={disorder.name}>
                      <Link
                        href={`/sleep-disorders/${generateSlug(disorder.name)}`}
                        className="group flex items-center gap-1 text-slate-300 hover:text-[#90caf9] text-sm transition-colors duration-200 py-1"
                      >
                        <span className="group-hover:underline underline-offset-2">{disorder.name}</span>
                        <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
