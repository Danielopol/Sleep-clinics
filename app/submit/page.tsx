"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Check, Loader2, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getPlan, getPlanPrice, formatPrice } from "@/lib/pricing"

const PLAN = getPlan("priority-add")
const PRICE = getPlanPrice("priority-add", "one-time")

const EMPTY_FORM = {
  clinicName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  specialty: "",
  website: "",
  description: "",
  contactEmail: "",
}

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] text-gray-900"

function SubmitForm() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(
    searchParams.get("canceled")
      ? "Checkout was canceled, so you have not been charged. Your details are still here."
      : null
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // The server creates the Stripe Checkout Session and we hand the browser
      // over to Stripe. No card data ever touches this site.
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "priority-add", ...formData }),
      })
      const data = await response.json()

      if (!response.ok || !data.url) {
        setError(data.error || "We could not start checkout. Please try again.")
        return
      }

      window.location.href = data.url
    } catch (err) {
      console.error("Submission error:", err)
      setError("We could not start checkout. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a2744] to-[#2d3a52] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Add Your Clinic</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Get a verified page in front of patients searching for sleep care in your city. Already
            listed?{" "}
            <Link href="/claim" className="text-[#f5a623] hover:underline">
              Claim your listing instead
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* What you are buying */}
          <div className="p-6 rounded-2xl border-2 border-[#f5a623] bg-amber-50 mb-10">
            <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4">
              <h2 className="text-xl font-bold text-gray-900">{PLAN.name}</h2>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(PRICE.amountCents)}{" "}
                <span className="text-sm font-normal text-gray-600">{PRICE.label}</span>
              </p>
            </div>
            <ul className="space-y-2">
              {PLAN.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#7C9070] mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-8 p-4 rounded-lg text-sm bg-red-50 text-red-800 border border-red-200"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name *</label>
              <input
                type="text"
                name="clinicName"
                required
                value={formData.clinicName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                <input
                  type="text"
                  name="zip"
                  required
                  value={formData.zip}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
              <input
                type="email"
                name="contactEmail"
                required
                value={formData.contactEmail}
                onChange={handleChange}
                className={inputClass}
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Where we send your receipt and the link to your published page. Not shown on the site.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialty *</label>
              <select
                name="specialty"
                required
                value={formData.specialty}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select a specialty</option>
                <option value="Sleep Medicine">Sleep Medicine</option>
                <option value="Pulmonology">Pulmonology</option>
                <option value="Neurology">Neurology</option>
                <option value="Psychiatry">Psychiatry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#f5a623] hover:bg-[#e8941f] text-white py-4 rounded-lg transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSubmitting
                ? "Opening secure checkout..."
                : `Continue to payment, ${formatPrice(PRICE.amountCents)}`}
            </button>

            <p className="text-xs text-gray-500 text-center leading-relaxed flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              Payment is handled by Stripe. We never see or store your card details.
            </p>
          </form>

          {/* Badge callout */}
          <div className="mt-12 p-6 bg-gradient-to-br from-slate-50 to-indigo-50 border border-indigo-200 rounded-2xl text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Already listed?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Add a free "Featured on US Sleep Clinics" badge to your website and show patients you're a verified provider.
            </p>
            <a
              href="/badge"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold rounded-lg transition-all text-sm shadow-md shadow-indigo-500/20"
            >
              Get Your Badge
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function SubmitPage() {
  // useSearchParams needs a Suspense boundary so the rest of the page can still
  // be prerendered.
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SubmitForm />
    </Suspense>
  )
}
