import { Moon, BookOpen } from "lucide-react"

interface BlogHeaderProps {
  title?: string
  subtitle?: string
}

export function BlogHeader({
  title = "Sleep Health Blog",
  subtitle = "Expert insights, tips, and resources to help you achieve better sleep and improve your quality of life."
}: BlogHeaderProps) {
  return (
    <section className="relative bg-gradient-to-br from-[var(--deep-navy)] via-[var(--twilight)] to-[var(--midnight)] py-20 lg:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[var(--dream-blue)] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[var(--healing-teal)] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--calm-indigo)] rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-[var(--dream-blue-light)] text-sm font-medium mb-6">
          <BookOpen className="h-4 w-4" />
          Sleep Health Resources
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Decorative moon icon */}
        <div className="mt-10 flex justify-center">
          <div className="p-4 rounded-full bg-gradient-to-br from-[var(--dream-blue)]/20 to-[var(--healing-teal)]/20 backdrop-blur-sm">
            <Moon className="h-8 w-8 text-[var(--dream-blue-light)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
