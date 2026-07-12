"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Copy, Check, Users, TrendingUp, Award } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const BADGE_BASE_URL = "https://www.ussleepclinics.com"

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white rounded-lg transition-all text-sm font-medium shadow-md shadow-indigo-500/20"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  )
}

export default function BadgePage() {
  const lightEmbed = `<a href="${BADGE_BASE_URL}" target="_blank" rel="noopener" title="Featured on US Sleep Clinics - Verified Provider"><img src="${BADGE_BASE_URL}/images/featured-badge-light.svg" alt="Featured on US Sleep Clinics - Verified Provider" width="240" height="80" style="border:0" /></a>`

  const darkEmbed = `<a href="${BADGE_BASE_URL}" target="_blank" rel="noopener" title="Featured on US Sleep Clinics - Verified Provider"><img src="${BADGE_BASE_URL}/images/featured-badge-dark.svg" alt="Featured on US Sleep Clinics - Verified Provider" width="240" height="80" style="border:0" /></a>`

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-[var(--dream-blue-light)] text-sm font-medium">
              <Shield className="h-4 w-4" />
              For Listed Clinics
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              Show Patients You're{" "}
              <span className="bg-gradient-to-r from-[#7C9070] to-[#8BA17E] bg-clip-text text-transparent">
                Verified
              </span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Add the US Sleep Clinics badge to your website. It takes 30 seconds
              and helps patients find a provider they can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Users,
                title: "Reach More Patients",
                description:
                  "Our directory connects thousands of patients with sleep clinics every month. The badge links directly back to your listing.",
              },
              {
                icon: Award,
                title: "Build Trust",
                description:
                  "Being featured in a verified directory signals credibility to patients researching sleep care options online.",
              },
              {
                icon: TrendingUp,
                title: "Boost Your SEO",
                description:
                  "A link from your site to our directory (and your listing within it) strengthens your online presence for sleep-related searches.",
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Badge Previews + Embed Code */}
          <div className="space-y-12">
            <h2 className="text-2xl font-bold text-white text-center">
              Choose Your Badge Style
            </h2>

            {/* Dark badge (for light websites) */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <p className="text-sm text-slate-400 mb-3 text-center lg:text-left">
                    For light-colored websites
                  </p>
                  <div className="bg-white rounded-xl p-6 inline-block">
                    <Image
                      src="/images/featured-badge-dark.svg"
                      alt="Featured badge - dark variant"
                      width={240}
                      height={80}
                      unoptimized
                    />
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-slate-300">Embed code</p>
                    <CopyButton text={darkEmbed} label="Copy Code" />
                  </div>
                  <pre className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap break-all font-mono">
                    {darkEmbed}
                  </pre>
                </div>
              </div>
            </div>

            {/* Light badge (for dark websites) */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <p className="text-sm text-slate-400 mb-3 text-center lg:text-left">
                    For dark-colored websites
                  </p>
                  <div className="bg-slate-800 rounded-xl p-6 inline-block">
                    <Image
                      src="/images/featured-badge-light.svg"
                      alt="Featured badge - light variant"
                      width={240}
                      height={80}
                      unoptimized
                    />
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-slate-300">Embed code</p>
                    <CopyButton text={lightEmbed} label="Copy Code" />
                  </div>
                  <pre className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap break-all font-mono">
                    {lightEmbed}
                  </pre>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#7C9070]/10 to-[#7C9070]/5 border border-[#7C9070]/20">
              <h3 className="text-white font-semibold text-lg mb-4">How to Add the Badge</h3>
              <ol className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7C9070]/20 text-[#7C9070] flex items-center justify-center text-xs font-bold">1</span>
                  <span>Click "Copy Code" for the badge style that matches your website.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7C9070]/20 text-[#7C9070] flex items-center justify-center text-xs font-bold">2</span>
                  <span>Paste the code into your website's HTML, typically in your footer, sidebar, or "About" page.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7C9070]/20 text-[#7C9070] flex items-center justify-center text-xs font-bold">3</span>
                  <span>If you use WordPress, Wix, Squarespace, or a similar platform, use an HTML/embed block or widget to paste the code.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7C9070]/20 text-[#7C9070] flex items-center justify-center text-xs font-bold">4</span>
                  <span>That's it. The badge will appear on your site with a link to the US Sleep Clinics directory.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Not listed yet?
          </h2>
          <p className="text-slate-400 mb-8">
            Submit your clinic to join our directory of 4,000+ verified sleep care providers.
          </p>
          <a
            href="/submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
          >
            Submit Your Clinic
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
