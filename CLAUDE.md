# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server (Next.js 16)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture Overview

This is a **Sleep Clinic Directory** website built with Next.js 16 (App Router), React 19, and Tailwind CSS 4. The site displays sleep clinics from an Excel data source with filtering/search capabilities.

### Data Flow

1. **Data Source**: `Prototype_with_descriptions.xlsx` in root - the Excel file containing clinic data
2. **API Layer**: `/app/api/clinics/route.ts` reads/caches the Excel file using `xlsx` library and transforms it to the `Clinic` interface
3. **Frontend**: Client components fetch from `/api/clinics` on mount

The API supports two modes:
- `GET /api/clinics` - Returns all clinics
- `GET /api/clinics?type=metadata` - Returns unique states, cities, specialties, and services for filters

### Key Directories

- `app/` - Next.js App Router pages and API routes
- `components/` - React components (shadcn/ui primitives in `ui/`, custom components at root)
- `lib/` - Utilities and data interfaces (`data.ts` has `Clinic` interface, `blog.ts` handles markdown posts)
- `content/blog/` - Markdown blog posts (parsed with gray-matter and remark)

### Component Patterns

- **shadcn/ui**: Uses "new-york" style with Radix primitives. Install components via `npx shadcn@latest add <component>`
- **Path aliases**: Use `@/` prefix (e.g., `@/components/ui/button`, `@/lib/utils`)
- **Styling**: Tailwind with CSS custom properties defined in `app/globals.css`. The design uses a sleep-focused color palette with CSS variables like `--midnight`, `--deep-navy`, `--dream-blue`, `--healing-teal`

### Pages Structure

- `/` - Homepage with clinic grid and filter sidebar (client component)
- `/clinic/[id]` - Individual clinic detail page (server component)
- `/about` - About page
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog post
- `/submit` - Clinic submission form

### Blog System

#### Adding Blog Posts

Blog posts are stored in `content/blog/` as Markdown files with frontmatter. The system supports automatic image detection.

**Creating a new blog post:**

1. Create a Markdown file: `content/blog/your-post-slug.md`
2. Add frontmatter with metadata:
   ```md
   ---
   title: "Your Post Title"
   date: "2024-01-17"
   excerpt: "Brief description of your post"
   author: "Daniel Marin"  # Optional, defaults to "Daniel Marin" if omitted
   tags: ["Tag1", "Tag2"]
   ---

   Your content here...
   ```

**Adding Images:**

You have two options for adding images to blog posts:

1. **Auto-detection (Recommended)**: Place an image with the same filename as your markdown file in the same directory
   - Example: `understanding-sleep-apnea.md` + `understanding-sleep-apnea.png`
   - Supported formats: `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`
   - The system automatically detects and uses the image
   - No need to specify `image:` in frontmatter

2. **Manual specification**: Add the `image:` field in frontmatter
   ```md
   ---
   image: "/content/blog/your-image.png"
   ---
   ```

**Image paths:**
- Blog images in `content/blog/` should use path: `/content/blog/filename.ext`
- Falls back to `/modern-medical-clinic-reception-area.jpg` if no image found

### Environment Variables

- `NEXT_PUBLIC_BASE_URL` - Base URL for API calls in server components (defaults to `http://localhost:3000`)
