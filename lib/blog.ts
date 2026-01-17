import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// Directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  image: string
  author?: string
  tags?: string[]
  content?: string
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading blog posts directory:', error)
    return []
  }
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  try {
    const slugs = getAllPostSlugs()
    const posts = slugs
      .map((slug) => getPostBySlug(slug))
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

    return posts
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

/**
 * Get a single blog post by slug (without content)
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    // Auto-detect image with same filename as blog post
    let imagePath = data.image
    if (!imagePath) {
      const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp']
      const publicDir = path.join(process.cwd(), 'public', 'content', 'blog')
      for (const ext of imageExtensions) {
        const potentialImagePath = path.join(publicDir, `${slug}${ext}`)
        if (fs.existsSync(potentialImagePath)) {
          imagePath = `/content/blog/${slug}${ext}`
          break
        }
      }
      // Fallback to default image if no matching image found
      if (!imagePath) {
        imagePath = '/modern-medical-clinic-reception-area.jpg'
      }
    }

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toLocaleDateString('en-CA'),
      excerpt: data.excerpt || '',
      image: imagePath,
      author: data.author || 'Daniel Marin',
      tags: data.tags,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

/**
 * Get a single blog post with full content by slug
 */
export async function getPostWithContent(slug: string): Promise<BlogPostWithContent | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Process markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()

    // Auto-detect image with same filename as blog post
    let imagePath = data.image
    if (!imagePath) {
      const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp']
      const publicDir = path.join(process.cwd(), 'public', 'content', 'blog')
      for (const ext of imageExtensions) {
        const potentialImagePath = path.join(publicDir, `${slug}${ext}`)
        if (fs.existsSync(potentialImagePath)) {
          imagePath = `/content/blog/${slug}${ext}`
          break
        }
      }
      // Fallback to default image if no matching image found
      if (!imagePath) {
        imagePath = '/modern-medical-clinic-reception-area.jpg'
      }
    }

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toLocaleDateString('en-CA'),
      excerpt: data.excerpt || '',
      image: imagePath,
      author: data.author || 'Daniel Marin',
      tags: data.tags,
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error reading post with content ${slug}:`, error)
    return null
  }
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
