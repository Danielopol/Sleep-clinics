import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { getAllPostSlugs, getPostWithContent, formatDate, getAllPosts } from "@/lib/blog"
import { Calendar, User, ArrowLeft, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BlogCard } from "@/components/blog-card"
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant'
})

const dmSans = DM_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-sans'
})

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
      <div className={`${dmSans.variable} ${cormorant.variable} min-h-screen bg-gradient-to-b from-[#0f1729] via-[#1a2744] to-[#2d3a5c] font-[family-name:var(--font-dm-sans)]`}>
        <Navigation />

        {/* Hero Header */}
        <header className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-6 py-16 overflow-hidden">
          {/* Decorative moon */}
          <div className="absolute top-[10%] right-[15%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#f5f0e8] via-[#e8d5d5] to-[#8b9dc3] opacity-80 blur-sm animate-pulse" />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#8b9dc3] hover:text-[#f5f0e8] transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-wider text-[#d4a574] border border-[#d4a574]/30 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#f5f0e8] mb-6 leading-[1.1] tracking-tight">
              {post.title}
            </h1>

            {/* Subtitle/Excerpt */}
            <p className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl text-[#8b9dc3] leading-relaxed mb-8 font-normal italic max-w-2xl mx-auto">
              {post.excerpt}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#8b9dc3]">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              )}
              <span>·</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <span>·</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 bg-gradient-to-b from-[#2d3a5c] to-[#1a2744]">
          <div className="max-w-[720px] mx-auto px-6 py-16">
            {/* Featured Image */}
            <div className="relative w-full aspect-[16/9] mb-12 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Intro paragraph with drop cap */}
            <div className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e8] leading-[1.9] mb-16 pb-16 border-b border-[#8b9dc3]/20">
              <div className="first-letter:float-left first-letter:text-[5rem] first-letter:leading-[0.8] first-letter:pr-3 first-letter:text-[#d4a574] first-letter:font-medium">
                {post.excerpt}
              </div>
            </div>

            {/* Article content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                [&_h2]:font-[family-name:var(--font-cormorant)] [&_h2]:text-3xl [&_h2]:font-medium [&_h2]:text-[#f5f0e8] [&_h2]:mb-6 [&_h2]:mt-12 [&_h2]:pl-6 [&_h2]:relative
                [&_h2]:before:content-[''] [&_h2]:before:absolute [&_h2]:before:left-0 [&_h2]:before:top-1/2 [&_h2]:before:-translate-y-1/2
                [&_h2]:before:w-1 [&_h2]:before:h-[80%] [&_h2]:before:bg-gradient-to-b [&_h2]:before:from-[#d4a574] [&_h2]:before:to-[#8b9dc3] [&_h2]:before:rounded
                [&_h3]:font-[family-name:var(--font-cormorant)] [&_h3]:text-2xl [&_h3]:font-medium [&_h3]:text-[#f5f0e8] [&_h3]:mb-4 [&_h3]:mt-10
                [&_p]:text-[#e8edf5] [&_p]:text-lg [&_p]:leading-[1.8] [&_p]:mb-6 [&_p]:opacity-90
                [&_a]:text-[#d4a574] [&_a]:no-underline [&_a]:font-medium hover:[&_a]:underline
                [&_strong]:text-[#f5f0e8] [&_strong]:font-semibold
                [&_ul]:my-6 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:ml-6
                [&_li]:text-[#e8edf5] [&_li]:text-lg [&_li]:leading-[1.8] [&_li]:opacity-85 [&_li]:marker:text-[#8b9dc3]
                [&_ol]:my-6 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:ml-6
                [&_blockquote]:font-[family-name:var(--font-cormorant)] [&_blockquote]:text-3xl [&_blockquote]:italic [&_blockquote]:text-[#f5f0e8]
                [&_blockquote]:text-center [&_blockquote]:py-16 [&_blockquote]:px-8 [&_blockquote]:my-16 [&_blockquote]:mx-0
                [&_blockquote]:bg-gradient-to-br [&_blockquote]:from-[#2d3a5c]/40 [&_blockquote]:to-[#1a2744]/40
                [&_blockquote]:border-0 [&_blockquote]:relative
                [&_code]:bg-[#1a2744] [&_code]:text-[#d4a574] [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-base
                [&_code]:before:content-none [&_code]:after:content-none
                [&_pre]:bg-[#0f1729] [&_pre]:text-[#e8edf5] [&_pre]:rounded-lg [&_pre]:my-8 [&_pre]:p-6
                [&_img]:rounded-lg [&_img]:shadow-2xl [&_img]:my-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author card at bottom */}
            {post.author && (
              <div className="mt-16 pt-8 border-t border-[#8b9dc3]/20">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4a574] to-[#8b9dc3] flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8b9dc3] mb-1">Written by</p>
                    <p className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#f5f0e8] mb-2">{post.author}</p>
                    <p className="text-[#e8edf5] opacity-75">
                      Sharing insights on sleep health and wellness to help you achieve better rest and improved quality of life.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-[#1a2744] border-t border-[#8b9dc3]/20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-medium text-[#f5f0e8] mb-8">
                More Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#0f1729] via-[#1a2744] to-[#0f1729]">
          <div className="max-w-[720px] mx-auto px-6 text-center">
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-medium text-[#f5f0e8] mb-4">
              Ready to Find a Sleep Specialist?
            </h2>
            <p className="font-[family-name:var(--font-cormorant)] text-xl text-[#8b9dc3] mb-8 italic">
              Browse our directory of over 4,000 verified sleep clinics and find the care you need.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#d4a574] to-[#8b9dc3] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Find a Clinic Near You
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0f1729] py-12 text-center">
          <p className="text-[#8b9dc3] text-sm opacity-60">Rest well. Live well.</p>
        </footer>
      </div>
  )
}
