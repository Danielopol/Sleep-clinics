import Link from "next/link"
import { BookOpen } from "lucide-react"
import { getPostBySlug } from "@/lib/blog"

/**
 * Links to existing blog guides by slug. A slug with no post behind it is
 * skipped, so renaming or removing a post can never leave a broken link here.
 *
 * The guides get almost no search impressions on their own, and the location
 * and topic pages are where searchers with the matching question land, so
 * these links are both a reader aid and the guides' main crawl path.
 */
export function GuideLinks({
  slugs,
  title = "Guides before your appointment",
}: {
  slugs: string[]
  title?: string
}) {
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => post !== null)

  if (posts.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-[var(--healing-teal)]" />
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl border border-[var(--border-subtle)] p-5 transition-colors hover:border-[var(--healing-teal)]"
          >
            <span className="block font-semibold text-[var(--text-primary)]">{post.title}</span>
            {post.excerpt && (
              <span className="mt-1 block text-sm text-[var(--text-secondary)] line-clamp-2">{post.excerpt}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
