const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_CSV = path.join(__dirname, 'public', 'clinics.csv');
const OUTPUT_CSV = path.join(__dirname, 'public', 'clinics_enriched_full.csv');
const PROGRESS_FILE = path.join(__dirname, 'public', 'extraction_progress.json');
const DELAY_MIN = 3000;
const DELAY_MAX = 6000;
const SAVE_EVERY = 25;

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
      else current += char;
    }
    values.push(current.trim());
    if (values.length >= 3) {
      rows.push({ clinic_id: values[0], clinic_name: values[1], location_address: values[2] });
    }
  }
  return rows;
}

function escapeCSV(val) {
  if (!val) return '';
  const s = String(val);
  return (s.includes(',') || s.includes('"') || s.includes('\n')) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function saveResults(results) {
  const header = 'clinic_id,clinic_name,location_address,rating,phone,website,error\n';
  const rows = results.map(r => [
    escapeCSV(r.clinic_id), escapeCSV(r.clinic_name), escapeCSV(r.location_address),
    escapeCSV(r.rating), escapeCSV(r.phone), escapeCSV(r.website), escapeCSV(r.error)
  ].join(',')).join('\n');
  fs.writeFileSync(OUTPUT_CSV, header + rows + '\n');
}

function saveProgress(idx) { fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ lastIndex: idx })); }
function loadProgress() {
  try { return fs.existsSync(PROGRESS_FILE) ? JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')) : null; }
  catch { return null; }
}

function randomDelay() { return Math.floor(Math.random() * (DELAY_MAX - DELAY_MIN)) + DELAY_MIN; }

async function extractData(page, name, address) {
  const query = `${name} ${address}`;
  const result = { rating: 'N/A', phone: 'N/A', website: 'N/A', error: '' };

  try {
    await page.goto('https://www.google.com/maps', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    const searchBox = page.locator('#searchboxinput');
    await searchBox.fill(query);
    await searchBox.press('Enter');
    await page.waitForTimeout(3500);

    // Check CAPTCHA
    const content = await page.content();
    if (content.includes('unusual traffic') || content.includes('captcha')) {
      result.error = 'CAPTCHA_DETECTED';
      return result;
    }

    // Extract rating
    try {
      const ratingEl = await page.locator('[aria-label*="stele"], [aria-label*="stars"]').first();
      if (await ratingEl.count() > 0) {
        const label = await ratingEl.getAttribute('aria-label');
        const match = label?.match(/([\d,\.]+)\s*(stele|stars)/i);
        if (match) result.rating = match[1].replace(',', '.');
      }
    } catch {}

    // Extract phone
    try {
      const phoneBtn = await page.locator('button[aria-label*="Telefon"], button[aria-label*="Phone"]').first();
      if (await phoneBtn.count() > 0) {
        const label = await phoneBtn.getAttribute('aria-label');
        const match = label?.match(/\+1[\s\-]?\d{3}[\s\-]?\d{3}[\s\-]?\d{4}/);
        if (match) result.phone = match[0];
      }
    } catch {}

    // Try phone from tel: link
    if (result.phone === 'N/A') {
      try {
        const telLink = await page.locator('a[href^="tel:"]').first();
        if (await telLink.count() > 0) {
          const href = await telLink.getAttribute('href');
          if (href) result.phone = href.replace('tel:', '');
        }
      } catch {}
    }

    // Extract website
    try {
      const siteLink = await page.locator('a[aria-label*="Site"], a[aria-label*="website"]').first();
      if (await siteLink.count() > 0) {
        const href = await siteLink.getAttribute('href');
        if (href && !href.includes('google.com')) result.website = href;
      }
    } catch {}

    // Try website from link with /url
    if (result.website === 'N/A') {
      try {
        const links = await page.locator('a[href*="http"]:not([href*="google"])').all();
        for (const link of links.slice(0, 5)) {
          const label = await link.getAttribute('aria-label') || '';
          if (label.toLowerCase().includes('site') || label.toLowerCase().includes('website')) {
            const href = await link.getAttribute('href');
            if (href) { result.website = href; break; }
          }
        }
      } catch {}
    }

  } catch (err) {
    result.error = err.message?.substring(0, 50) || 'Unknown error';
  }

  return result;
}

async function main() {
  console.log('='.repeat(60));
  console.log('CLINIC DATA EXTRACTION');
  console.log('='.repeat(60));

  // Load clinics
  const csvContent = fs.readFileSync(INPUT_CSV, 'utf8');
  const clinics = parseCSV(csvContent);
  console.log(`Loaded ${clinics.length} clinics\n`);

  // Check progress
  const progress = loadProgress();
  let startIdx = 0;
  let results = [];

  if (progress && fs.existsSync(OUTPUT_CSV)) {
    startIdx = progress.lastIndex + 1;
    const existing = fs.readFileSync(OUTPUT_CSV, 'utf8').trim().split('\n');
    for (let i = 1; i < existing.length; i++) {
      const vals = [];
      let cur = '', inQ = false;
      for (const c of existing[i]) {
        if (c === '"') inQ = !inQ;
        else if (c === ',' && !inQ) { vals.push(cur); cur = ''; }
        else cur += c;
      }
      vals.push(cur);
      results.push({
        clinic_id: vals[0], clinic_name: vals[1], location_address: vals[2],
        rating: vals[3], phone: vals[4], website: vals[5], error: vals[6] || ''
      });
    }
    console.log(`Resuming from index ${startIdx} (${results.length} already done)\n`);
  }

  // Launch browser
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  let captchaCount = 0;

  try {
    for (let i = startIdx; i < clinics.length; i++) {
      const clinic = clinics[i];
      const pct = ((i + 1) / clinics.length * 100).toFixed(1);
      process.stdout.write(`[${i + 1}/${clinics.length}] (${pct}%) ${clinic.clinic_name.substring(0, 40)}... `);

      const data = await extractData(page, clinic.clinic_name, clinic.location_address);

      if (data.error === 'CAPTCHA_DETECTED') {
        captchaCount++;
        console.log('CAPTCHA!');
        if (captchaCount >= 3) {
          console.log('\n*** TOO MANY CAPTCHAs - Please solve manually in browser, then press Enter ***');
          await new Promise(r => process.stdin.once('data', r));
          captchaCount = 0;
        } else {
          console.log('Waiting 60s...');
          await page.waitForTimeout(60000);
        }
        i--; // Retry
        continue;
      }

      captchaCount = 0;
      results.push({
        clinic_id: clinic.clinic_id,
        clinic_name: clinic.clinic_name,
        location_address: clinic.location_address,
        rating: data.rating,
        phone: data.phone,
        website: data.website,
        error: data.error
      });

      console.log(`R:${data.rating} P:${data.phone ? 'Y' : 'N'} W:${data.website !== 'N/A' ? 'Y' : 'N'}`);

      if ((i + 1) % SAVE_EVERY === 0) {
        saveResults(results);
        saveProgress(i);
        console.log(`    [Saved progress at ${i + 1}]`);
      }

      const delay = randomDelay();
      await page.waitForTimeout(delay);
    }
  } catch (err) {
    console.error('\nFatal error:', err.message);
  } finally {
    saveResults(results);
    saveProgress(results.length - 1);
    console.log('\n' + '='.repeat(60));
    console.log(`DONE! Processed ${results.length} clinics`);
    console.log(`Results saved to: ${OUTPUT_CSV}`);
    console.log('='.repeat(60));
    await browser.close();
  }
}

main().catch(console.error);
