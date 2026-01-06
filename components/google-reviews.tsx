"use client"

import { Star } from "lucide-react"

interface Review {
  author: string
  rating: number
  date: string
  text: string
}

interface GoogleReviewsProps {
  reviews: Review[]
  overallRating?: number
  totalReviews?: number
  clinicName: string
  mapsUrl: string
}

// Google's official brand colors
const GoogleLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

// Generate avatar colors based on name
const getAvatarGradient = (name: string) => {
  const gradients = [
    "from-[#4285F4] to-[#34A853]",
    "from-[#EA4335] to-[#FBBC05]",
    "from-[#34A853] to-[#4285F4]",
    "from-[#FBBC05] to-[#EA4335]",
    "from-[#4285F4] to-[#EA4335]",
  ]
  const index = name.charCodeAt(0) % gradients.length
  return gradients[index]
}

// Get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Star rating component
const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating
              ? 'text-[#FBBC05] fill-current'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  )
}

export function GoogleReviews({
  reviews,
  overallRating,
  totalReviews,
  clinicName,
  mapsUrl
}: GoogleReviewsProps) {
  if (!reviews || reviews.length === 0) return null

  return (
    <section
      id="reviews"
      className="mt-8 pt-8 border-t border-[var(--border-color)]"
    >
      {/* Header with Google branding */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-md border border-gray-100 dark:border-slate-700">
            <GoogleLogo />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-[var(--text-primary)]">
              Google Reviews
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Verified patient experiences
            </p>
          </div>
        </div>

        {/* Overall Rating Display */}
        {overallRating && (
          <div className="flex items-center gap-4 px-5 py-3 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--text-primary)] leading-none">
                {overallRating.toFixed(1)}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-medium mt-0.5">
                out of 5
              </div>
            </div>
            <div className="h-10 w-px bg-gray-200 dark:bg-slate-700" />
            <div className="flex flex-col items-start gap-1">
              <StarRating rating={Math.round(overallRating)} size="md" />
              {totalReviews && (
                <span className="text-xs text-[var(--text-secondary)]">
                  Based on {totalReviews.toLocaleString()} reviews
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-4">
        {reviews.map((review, index) => (
          <article
            key={index}
            className="group relative p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700/50 hover:border-[var(--dream-blue)]/30 hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Subtle gradient accent on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--dream-blue)]/5 via-transparent to-[var(--healing-teal)]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              {/* Review Header */}
              <div className="flex items-start gap-3 mb-3">
                {/* Avatar */}
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${getAvatarGradient(review.author)} flex items-center justify-center text-white font-semibold text-sm shadow-md flex-shrink-0`}>
                  {getInitials(review.author)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[var(--text-primary)] truncate">
                      {review.author}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded-full text-[10px] text-[var(--text-secondary)] font-medium">
                      <GoogleLogo />
                      <span className="hidden sm:inline">Google Review</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating} size="sm" />
                    {review.date && (
                      <span className="text-xs text-[var(--text-secondary)]">
                        {review.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed pl-14">
                {review.text}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* View All on Google Link */}
      <div className="mt-6 text-center">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium text-[var(--text-primary)] hover:border-[var(--dream-blue)] hover:text-[var(--dream-blue)] hover:shadow-md transition-all duration-200 group"
        >
          <GoogleLogo />
          <span>View all reviews on Google</span>
          <svg
            className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </section>
  )
}
