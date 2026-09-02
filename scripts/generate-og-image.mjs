// Renders the social share card used for Open Graph / Twitter previews and
// writes it to public/images/og-default.jpg. Pages reference it through
// OG_IMAGE in lib/og-image.ts.
//
// Run with: npm run generate-og-image
//
// The card is generated rather than hand-designed so it stays in sync with the
// site: it reuses the real hero photo, the real logo, and the palette from
// app/globals.css. Playwright is already a dependency (the clinic scrapers use
// it), and it renders through the installed Chrome channel, so no extra browser
// download is needed.
//
// The dimensions must stay 1200x630: that is the 1.91:1 ratio X, Facebook, and
// LinkedIn crop to, and it is hard-coded in OG_IMAGE.

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const OUTPUT = path.join(ROOT, "public", "images", "og-default.jpg")

const WIDTH = 1200
const HEIGHT = 630

// Inlined as data URIs so the page never depends on a running dev server.
const dataUri = (relativePath, mime) =>
  `data:${mime};base64,${fs.readFileSync(path.join(ROOT, "public", relativePath)).toString("base64")}`

const hero = dataUri("images/Hero section_4.png", "image/png")
const logo = dataUri("images/Logo.png", "image/png")

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --midnight: #0f172a;
    --dream-blue: #0ea5e9;
    --healing-teal: #14b8a6;
    --calm-indigo: #6366f1;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
    background: var(--midnight);
    font-family: Inter, 'Segoe UI', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .card { position: relative; width: 100%; height: 100%; }

  .card img.bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
  }

  /* Darkens the photo enough for white text to stay readable at the small
     sizes timelines render these cards at. */
  .scrim {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(100deg, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.78) 45%, rgba(15, 23, 42, 0.30) 100%),
      linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0) 45%);
  }

  .content {
    position: absolute;
    inset: 0;
    padding: 68px 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 26px;
  }

  .brand { display: flex; align-items: center; gap: 18px; }

  .brand img {
    width: 76px;
    height: 76px;
    border-radius: 999px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45);
  }

  .brand span {
    color: #ffffff;
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -0.01em;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }

  h1 {
    color: #ffffff;
    font-size: 72px;
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    max-width: 15ch;
    text-shadow: 0 4px 16px rgba(0, 0, 0, 0.55);
  }

  p {
    color: #e2e8f0;
    font-size: 30px;
    font-weight: 500;
    line-height: 1.4;
    /* Wide enough that "AASM-accredited" is never split across lines. */
    max-width: 660px;
    text-wrap: balance;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }

  .domain {
    margin-top: 6px;
    color: #7dd3fc;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  /* The aurora bar mirrors the glow behind the homepage search field. */
  .aurora {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 10px;
    background: linear-gradient(to right, var(--dream-blue), var(--healing-teal), var(--calm-indigo));
  }
</style>
</head>
<body>
  <div class="card">
    <img class="bg" src="${hero}">
    <div class="scrim"></div>
    <div class="content">
      <div class="brand">
        <img src="${logo}">
        <span>US Sleep Clinics</span>
      </div>
      <h1>Find Expert Sleep Care Near You</h1>
      <p>4,000+ verified clinics and AASM-accredited sleep centers.</p>
      <div class="domain">ussleepclinics.com</div>
    </div>
    <div class="aurora"></div>
  </div>
</body>
</html>`

const browser = await chromium.launch({ channel: "chrome" })
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
})

await page.setContent(html, { waitUntil: "networkidle" })
// Give the webfont a moment; the fallback stack renders fine without it.
await page.evaluate(() => document.fonts.ready).catch(() => {})
await page.screenshot({ path: OUTPUT, type: "jpeg", quality: 92 })
await browser.close()

const kb = Math.round(fs.statSync(OUTPUT).size / 1024)
console.log(`Wrote ${path.relative(ROOT, OUTPUT)} (${WIDTH}x${HEIGHT}, ${kb} KB)`)
