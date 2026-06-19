/**
 * Geocode clinic addresses using the free US Census Geocoder (no API key required).
 *
 * Reads addresses from the Excel source, geocodes any that are not already in the
 * cache, and writes results to scripts/geocode-cache.json (keyed by normalized
 * address). The cache is checked into git so deploys do not need to re-geocode.
 *
 * Run:  node scripts/geocode-clinics.mjs
 *
 * The Census batch endpoint accepts up to 10,000 records per request; we send
 * smaller chunks for reliability and write the cache after each chunk so the job
 * is resumable if interrupted.
 */
import XLSX from 'xlsx';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const cachePath = join(__dirname, 'geocode-cache.json');

const BENCHMARK = 'Public_AR_Current';
const BATCH_URL = 'https://geocoding.geo.census.gov/geocoder/locations/addressbatch';
const CHUNK_SIZE = 1000; // Census allows up to 10,000; smaller chunks are more reliable

// Normalized key shared with generate-clinic-data.mjs so coordinates can be matched back.
export function addrKey(address, city, state, zip) {
  return [address, city, state, zip]
    .map((v) => String(v ?? '').trim().toLowerCase().replace(/\s+/g, ' '))
    .join('|');
}

// Minimal CSV line parser that handles quoted fields (Census returns the lon,lat as one field).
function parseCsvLine(line) {
  const fields = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = false;
      } else cur += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      fields.push(cur); cur = '';
    } else cur += ch;
  }
  fields.push(cur);
  return fields;
}

function csvField(v) {
  return `"${String(v ?? '').replace(/"/g, '""')}"`;
}

async function geocodeChunk(rows) {
  // CSV columns required by Census: Unique ID, Street, City, State, ZIP (no header row)
  const csv = rows
    .map((r) => [r.id, r.street, r.city, r.state, r.zip].map(csvField).join(','))
    .join('\n');

  const form = new FormData();
  form.append('benchmark', BENCHMARK);
  form.append('addressFile', new Blob([csv], { type: 'text/csv' }), 'addresses.csv');

  const res = await fetch(BATCH_URL, { method: 'POST', body: form });
  if (!res.ok) throw new Error(`Census API returned ${res.status}`);
  const text = await res.text();

  const results = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const f = parseCsvLine(line);
    const id = f[0];
    const status = f[2];
    if (status === 'Match' && f[5]) {
      const [lon, lat] = f[5].split(',').map(Number);
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        results[id] = { lat, lng: lon };
      }
    }
  }
  return results;
}

async function main() {
  console.log('📊 Reading Excel file...');
  const workbook = XLSX.readFile(join(rootDir, 'Prototype_with_descriptions.xlsx'));
  const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

  const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, 'utf-8')) : {};

  // Build the unique set of addresses that still need geocoding.
  const pending = new Map(); // key -> { street, city, state, zip }
  for (const row of rawData) {
    const street = String(row.location_address || '').trim();
    if (!street) continue; // can't geocode without a street address
    const city = String(row.city || '').trim();
    const state = String(row.state || '').trim();
    const zip = row.zip_code ? String(row.zip_code).trim() : '';
    const key = addrKey(street, city, state, zip);
    if (key in cache) continue; // already geocoded (including prior no-matches)
    if (!pending.has(key)) pending.set(key, { street, city, state, zip });
  }

  const items = [...pending.entries()].map(([key, v], i) => ({ id: String(i), key, ...v }));
  console.log(`📋 ${rawData.length} rows, ${items.length} unique addresses to geocode (rest cached).`);
  if (items.length === 0) {
    console.log('✅ Nothing to do.');
    return;
  }

  let matched = 0;
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    const chunk = items.slice(i, i + CHUNK_SIZE);
    const chunkNum = Math.floor(i / CHUNK_SIZE) + 1;
    const totalChunks = Math.ceil(items.length / CHUNK_SIZE);
    process.stdout.write(`  Geocoding chunk ${chunkNum}/${totalChunks} (${chunk.length} addresses)... `);
    try {
      const results = await geocodeChunk(chunk);
      for (const item of chunk) {
        // Mark every attempted address in the cache (null = no match) so we don't retry endlessly.
        const r = results[item.id];
        cache[item.key] = r || null;
        if (r) matched++;
      }
      console.log(`${Object.keys(results).length} matched`);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
    writeFileSync(cachePath, JSON.stringify(cache, null, 0));
  }

  const total = Object.values(cache).filter(Boolean).length;
  console.log(`✅ Done. ${matched} new matches this run, ${total} total cached coordinates.`);
  console.log(`   Wrote ${cachePath}`);
}

// Only run when executed directly (not when imported by generate-clinic-data.mjs).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
