import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getAllPostSlugs, getPostWithContent, formatDate, getAllPosts } from "@/lib/blog"
import { Calendar, User, ArrowLeft, Clock, Moon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BlogCard } from "@/components/blog-card"

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostWithContent(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Sleep Health Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostWithContent(slug)

  if (!post) {
    notFound()
  }

  // Get related posts (excluding current post)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  // Estimate reading time (average 200 words per minute)
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navigation />

      {/* Hero Section with Featured Image */}
      <section className="relative">
        {/* Featured Image */}
        <div className="relative h-[400px] lg:h-[500px] w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-navy)] via-[var(--deep-navy)]/60 to-transparent" />
        </div>

        {/* Title and Meta */}
        <div className="absolute bottom-0 left-0 right-0 pb-12 pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-[var(--dream-blue)]/20 text-[var(--dream-blue-light)] hover:bg-[var(--dream-blue)]/30 border-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl bg-white dark:bg-slate-800 -mt-8 relative z-10">
            <CardContent className="p-8 lg:p-12">
              {/* Excerpt as intro */}
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-medium">
                {post.excerpt}
              </p>

              <Separator className="mb-8" />

              {/* Article content */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:text-slate-900 dark:prose-headings:text-white
                  prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-slate-600 dark:prose-p:text-slate-300
                  prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-[var(--dream-blue)] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-900 dark:prose-strong:text-white
                  prose-ul:my-6 prose-li:text-slate-600 dark:prose-li:text-slate-300
                  prose-ol:my-6
                  prose-blockquote:border-l-[var(--dream-blue)] prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-700/50
                  prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                  prose-blockquote:not-italic prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-300
                  prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-code:text-[var(--dream-blue)] prose-code:before:content-none prose-code:after:content-none
                  prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>

          {/* Author card (if author exists) */}
          {post.author && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-[var(--dream-blue)]/5 to-[var(--healing-teal)]/5 dark:from-[var(--dream-blue)]/10 dark:to-[var(--healing-teal)]/10 mt-8">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--dream-blue)] to-[var(--healing-teal)] flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Written by</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{post.author}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                More Articles to Read
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[var(--deep-navy)] via-[var(--twilight)] to-[var(--midnight)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Moon className="h-12 w-12 text-[var(--dream-blue-light)] mx-auto mb-6" />
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Find a Sleep Specialist?
          </h2>
          <p className="text-slate-300 mb-8">
            Browse our directory of over 4,000 verified sleep clinics and find the care you need.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Find a Clinic Near You
          </Link>
        </div>
      </section>
    </div>
  )
}
