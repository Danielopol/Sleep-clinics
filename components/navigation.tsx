"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")

    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[var(--midnight)] via-[var(--deep-navy)] to-[var(--midnight)] border-b border-white/10 backdrop-blur-lg shadow-[var(--shadow-lg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/Logo.png"
              alt="Sleep Clinics Directory Logo"
              width={40}
              height={40}
              className="rounded-full group-hover:scale-105 transition-transform"
            />
            <span className="text-white font-[var(--font-display)] font-semibold text-lg hidden sm:inline">Sleep Clinics Directory</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white/90 hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-white/90 hover:text-white transition-colors font-medium">
              About Us
            </Link>
            <Link href="/blog" className="text-white/90 hover:text-white transition-colors font-medium">
              Blog
            </Link>
            <Link
              href="/submit"
              className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-2 rounded-lg transition-all font-semibold hover:from-indigo-400 hover:to-violet-400 shadow-md shadow-indigo-500/20"
            >
              For Sleep Centers
            </Link>

            {/* Theme Toggle - Desktop */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-white/90 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white/90 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/blog"
                className="text-white/90 hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/submit"
                className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-2 rounded-lg transition-all font-semibold text-center hover:from-indigo-400 hover:to-violet-400 shadow-md shadow-indigo-500/20"
                onClick={() => setIsMenuOpen(false)}
              >
                For Sleep Centers
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
