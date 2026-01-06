import { Navigation } from "@/components/navigation"
import { BlogHeader } from "@/components/blog-header"
import { BlogCard } from "@/components/blog-card"
import { getAllPosts } from "@/lib/blog"
import { Moon } from "lucide-react"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <BlogHeader />

      {/* Blog Grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              {/* Posts count */}
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-center">
                {posts.length} article{posts.length !== 1 ? "s" : ""} to help you sleep better
              </p>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--dream-blue)]/10 to-[var(--healing-teal)]/10 mb-6">
                <Moon className="h-10 w-10 text-[var(--dream-blue)]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                No articles yet
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                We're working on creating helpful content about sleep health. Check back soon for expert insights and tips.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[var(--dream-blue)]/5 to-[var(--healing-teal)]/5 dark:from-[var(--dream-blue)]/10 dark:to-[var(--healing-teal)]/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Stay Updated on Sleep Health
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Get the latest articles, tips, and resources delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--dream-blue)] focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
