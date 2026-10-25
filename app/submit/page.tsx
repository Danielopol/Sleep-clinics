"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { TURNAROUND } from "@/lib/pricing"

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
  // Never shown to people. A bot that fills it is ignored (lib/form-guard.ts).
  nickname: "",
}

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] text-gray-900"

export default function SubmitPage() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)
  const openedAt = useRef(Date.now())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/submit-clinic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, elapsedMs: Date.now() - openedAt.current }),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.error || "We could not send your submission. Please try again.")
        return
      }

      setReference(data.reference ?? null)
      setFormData(EMPTY_FORM)
    } catch (err) {
      console.error("Submission error:", err)
      setError("We could not send your submission. Please try again.")
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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Add Your Clinic, Free</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Not in the directory yet? Send us your clinic&apos;s details. Listing is free and stays
            free. Already listed?{" "}
            <Link href="/claim" className="text-[#f5a623] hover:underline">
              Claim your listing instead
            </Link>
            , also free.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* What happens */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50 mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">How it works</h2>
            <ul className="space-y-2">
              {[
                "A person checks every submission against public records: website, phone, and address.",
                `Free submissions are reviewed within ${TURNAROUND.freeSubmissionDays} business days, and we email you the link when your page is live.`,
                "Your page lists your name, address, phone, hours, website, services, and accreditation.",
                "Once it is live, you can claim it free and correct your details any time.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#7C9070] mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Need it sooner? Any paid plan includes adding your clinic within{" "}
              {TURNAROUND.paidSubmissionDays} business days.{" "}
              <Link href="/pricing" className="text-[#c47f0e] hover:underline">
                See plans
              </Link>
              .
            </p>
          </div>

          {reference ? (
            <div
              role="status"
              className="p-6 rounded-2xl bg-green-50 text-green-900 border border-green-200"
            >
              <h2 className="text-lg font-bold mb-2">Thank you, we have your clinic</h2>
              <p className="text-sm leading-relaxed">
                Your reference is <strong>{reference}</strong>. We review it within{" "}
                {TURNAROUND.freeSubmissionDays} business days and email you when your page is live.
              </p>
              <button
                type="button"
                onClick={() => {
                  setReference(null)
                  openedAt.current = Date.now()
                }}
                className="mt-4 text-sm font-semibold text-green-800 hover:underline"
              >
                Add another clinic
              </button>
            </div>
          ) : (
            <>
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
                    Where we send the link to your published page. Not shown on the site. An address
                    at your clinic&apos;s own domain helps us check it faster.
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

                {/* Spam trap, hidden from people and from assistive technology. */}
                <div aria-hidden="true" className="hidden">
                  <label>
                    Nickname
                    <input
                      type="text"
                      name="nickname"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.nickname}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#f5a623] hover:bg-[#e8941f] text-white py-4 rounded-lg transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isSubmitting ? "Sending..." : "Submit my clinic, free"}
                </button>
              </form>
            </>
          )}

          {/* Badge callout */}
          <div className="mt-12 p-6 bg-gradient-to-br from-slate-50 to-indigo-50 border border-indigo-200 rounded-2xl text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Already listed?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Add our free US Sleep Clinics badge to your website.
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
