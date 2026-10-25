# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Content Style Rules

- **Never use em dashes (—)** anywhere in site content: page copy, components, blog posts, and the disorder/treatment data files in `lib/`. Use a comma, parenthesis, colon, or separate sentence instead. (En dashes for numeric ranges should use a regular hyphen, e.g. `8-10 hours`.)

## Development Commands

```bash
npm run dev      # Start development server (Next.js 16)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture Overview

This is a **US Sleep Clinics** website built with Next.js 16 (App Router), React 19, and Tailwind CSS 4. The site displays sleep clinics from an Excel data source with filtering/search capabilities.

### Data Flow

1. **Data Source**: `Prototype_with_descriptions.xlsx` in root - the Excel file containing clinic data
2. **Build Step**: `npm run generate-data` (`scripts/generate-clinic-data.mjs`) reads the Excel file with the `xlsx` library, attaches coordinates from `scripts/geocode-cache.json` (street-level) with `scripts/zip-centroids.json` as a fallback, and writes `data/clinics.json` and `data/metadata.json`. This runs automatically via the `prebuild` script before `next build`.
3. **API Layer**: `/app/api/clinics/route.ts` reads and caches `data/clinics.json` / `data/metadata.json` in memory (the cache is populated on first request and not invalidated, so a running dev server must be restarted to pick up regenerated data)
4. **Frontend**: Client components fetch from `/api/clinics` on mount

**Clinic ids are not stable.** `clinic.id` is the row position in the Excel
file, so it shifts whenever rows are added, removed, or merged. Never use it in
a URL or anything persisted. Legacy `/clinic/<numeric-id>` URLs (the site's
URLs until 2026-05-09) resolve through `scripts/legacy-id-map.json`, a frozen,
append-only id -> slug map rebuilt from git history by
`scripts/build-legacy-id-map.mjs` (`lib/legacy-ids.ts` reads it, following
`scripts/duplicate-clinics.json` merges). Never edit or regenerate existing
entries; a clinic removed from the Excel file just makes its id answer 410.

After editing the Excel file, run `npm run geocode` (only needed when addresses change, geocodes new ones into the cache) and then `npm run generate-data` to refresh the site data.

The API supports two modes:
- `GET /api/clinics` - Returns all clinics (paginated; also supports `q`, `state`, `city`, `specialty`, `services`, `accreditation`, and `lat`/`lng`/`radius` filters)
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
- `/clinic/[slug]` - Individual clinic detail page (server component). Legacy
  `/clinic/<numeric-id>` URLs are rewritten by `next.config.mjs` to
  `/api/clinic-redirect/[id]`, which answers with a 301 to the slug URL. The
  page itself cannot do this: it is prerendered, and `permanentRedirect()` from
  a prerendered page degrades to a meta refresh served with HTTP 200.
- `/about` - About page
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog post
- `/submit` - Free submission for a clinic not listed yet (`POST /api/submit-clinic`)
- `/pricing` - Free Listing, Enhanced Profile, and Featured, free tier first
- `/claim` - Find your clinic, then claim it free (`POST /api/claim-listing`) or buy a paid plan
- `/checkout/success` - Post-payment confirmation (dynamic, noindex)

### Listing Plans

Three plans defined in `lib/pricing.ts` (Free Listing, Enhanced Profile at
$149/yr, Featured at $349/yr or $39/mo), which is the single source of truth
for prices and promises: the pricing page, the claim page, the buttons, and the
amount Stripe charges all read from it. See `docs/PAID-LISTINGS.md` for the
setup runbook and the fulfillment process. Listing, claiming, and correcting a
listing are free; money buys presentation and placement only.

Key rules:

- **Entitlements are granted only by `app/api/stripe/webhook/route.ts`**, on a
  signature-verified payload. `app/api/checkout/route.ts` only reserves a slot
  and opens the Stripe session; the browser never grants anything.
- **The only trust marker is free and never sold.** "Details confirmed by the
  clinic" shows once a human sets `clinic_claims.confirmed_at` after an
  identity check. Never sell, or call anything a clinic buys, "Verified".
  Featured placement, which is labeled advertising and claims nothing about
  anyone, does activate on payment.
- **The Enhanced Profile's plan id is `claim-verified`.** It predates the
  rename and is stored in the database and in live Stripe subscriptions, so
  never rename it.
- **Every paid plan can be bought by a clinic that is not listed yet.** Those
  rows carry `pending_clinic` and a null `clinic_slug`, and render nothing until
  the listing is created by hand and linked.
- **Paid rows are keyed by `clinic_slug`, never `clinic.id`.** The id is a
  row position and shifts on every data update, which would move a paid badge
  onto another clinic. Lookups, upserts, badge sets, `/claim?clinic=` and the
  `FEATURED_CLINIC_SLUGS`/`CONFIRMED_CLINIC_SLUGS` overrides all use the slug.
- **Listing state lives in Supabase, never in the Excel file.**
  `data/clinics.json` is regenerated on every deploy, so anything written there
  would be lost. Flags are attached at request time by `withListingBadges` in
  `lib/listings.ts`.
- **Every paid feature degrades gracefully.** Missing Stripe keys, Supabase
  vars, or Resend key must never break a page render or a build; each client
  builder returns null and callers handle it.
- **Paid placement must stay labeled.** The "Featured · Ad" label
  (`FEATURED_LABEL`) and the disclosures under the city grid and the state
  page's featured strip are FTC-facing, not decoration.
- **Paid clinic pages carry no third-party ads.** `AdFreeGuard` must stay in
  the root layout's `<head>`, before `<AdSense />`.
- **Enhanced Profile content lives in `enhanced_profiles` (Supabase).** Photos,
  description, and structured services/equipment/insurance
  (`lib/enhanced-profile.ts`) render on the clinic page only while
  `ListingFlags.paid` has the slug. Clinic pages use `revalidate = 300` so
  edits show without a deploy.

### Appointment Requests (lead partners)

Clinics in `lead_partners` (Supabase, keyed by `clinic_slug`) with
`active = true` get a "Request an appointment" form on their clinic page
(`components/lead-request-form.tsx`, `app/api/lead-request/route.ts`). See
`docs/LEAD-REQUESTS.md` for turning a clinic on or off and for invoicing.

- **Invisible everywhere else.** No teaser and no fallback collection. Missing
  Supabase, Resend, or `EMAIL_FROM` hides the form (development logs the email
  instead).
- **Government-insured requests are never billable** (Medicare, Medicaid,
  Tricare/VA), enforced in `lib/lead-request-options.ts` and by a database
  constraint.
- **No form contents in analytics or ad tags.** The only event is
  `lead_request_submitted` with `clinic_slug`.

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

See `.env.example` for the full list. `NEXT_PUBLIC_BASE_URL` is the base URL for
API calls in server components and for Stripe redirect URLs (defaults to
`http://localhost:3000`). The Stripe, Supabase, and email keys are documented in
`docs/PAID-LISTINGS.md`.
