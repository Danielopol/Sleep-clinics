"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Send, Moon, ArrowRight } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubscribed(true)
        setEmail("")
        // Reset after 3 seconds
        setTimeout(() => setSubscribed(false), 3000)
      } else {
        alert("There was an error subscribing. Please try again.")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      alert("There was an error subscribing. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-[var(--midnight)] via-[#0c1222] to-[#080d18] overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="absolute top-20 left-[5%] w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-[5%] w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-[20%] w-64 h-64 bg-[#7C9070]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Newsletter Section */}
      <div className="relative border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left side - Text */}
            <div className="text-center lg:text-left max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">Newsletter</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Stay{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Updated
                </span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Get the latest sleep health tips, clinic updates, and wellness insights delivered to your inbox.
              </p>
            </div>

            {/* Right side - Form */}
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full sm:w-80 pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={subscribed || isSubmitting}
                  className="group px-6 py-3.5 bg-gradient-to-r from-[#7C9070] to-[#6B7F60] hover:from-[#8BA17E] hover:to-[#7C9070] text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#7C9070]/20 disabled:opacity-70"
                >
                  {subscribed ? (
                    <>
                      <span>Subscribed!</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <Image
                src="/images/Logo.png"
                alt="Sleep Clinics Directory"
                width={40}
                height={40}
                className="rounded-full group-hover:scale-105 transition-transform"
              />
              <span className="text-white font-semibold text-lg">Sleep Clinics Directory</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your trusted resource for finding quality sleep care providers across the United States.
            </p>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#7C9070]/10 border border-[#7C9070]/20">
              <svg className="w-5 h-5 text-[#7C9070]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[#7C9070] text-xs font-medium">4,000+ Verified Clinics</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "For Sleep Centers", href: "/submit" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-indigo-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/sleep-disorders"
                  className="group text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-violet-400" />
                  <span>Sleep Disorders Guide</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/treatment-options"
                  className="group text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-violet-400" />
                  <span>Treatment Options</span>
                </Link>
              </li>
              {[
                { label: "AASM Accreditation", href: "/aasm-accreditation" },
                { label: "Find a Clinic", href: "/" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-violet-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7C9070]" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+40728083312"
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Phone className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Phone</span>
                    <span className="text-sm font-medium">+40 72808 33 12</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:valentin.marin83@gmail.com"
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Email</span>
                    <span className="text-sm font-medium">valentin.marin83@gmail.com</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/DanielGPT2022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#7C9070]/10 border border-[#7C9070]/20 flex items-center justify-center group-hover:bg-[#7C9070]/20 transition-colors">
                    <svg className="w-4 h-4 text-[#7C9070]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">X (Twitter)</span>
                    <span className="text-sm font-medium">@DanielGPT2022</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} Sleep Clinics Directory. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/about" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      </footer>
  )
}
