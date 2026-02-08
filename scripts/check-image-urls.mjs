import { readFileSync, writeFileSync } from 'fs';
import https from 'https';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const excelPath = resolve(__dirname, '..', 'Prototype_with_descriptions.xlsx');
const outputPath = resolve(__dirname, '..', 'broken_image_urls.csv');

// Read directly from Excel source of truth
console.log('📊 Reading Excel file...');
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Map Excel rows to clinic objects with original clinic_id
const clinics = rawData.map(row => ({
  clinic_id: String(row.clinic_id || ''),
  name: String(row.clinic_name || ''),
  city: String(row.city || ''),
  state: String(row.state || ''),
  photo_url: row.photo_url ? String(row.photo_url) : ''
})).filter(c => c.name);

// Filter clinics with Google image URLs
const googleClinics = clinics.filter(c => {
  if (!c.photo_url) return false;
  return c.photo_url.includes('googleusercontent.com') || c.photo_url.includes('googleapis.com');
});

console.log(`Total clinics in Excel: ${clinics.length}`);
console.log(`Clinics with Google image URLs: ${googleClinics.length}`);
console.log(`Testing all Google image URLs...\n`);

const CONCURRENCY = 15;
let completed = 0;
const broken = [];

function checkUrl(clinic) {
  return new Promise((resolvePromise) => {
    const url = clinic.photo_url;
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 15000
    }, (res) => {
      // Consume response body to free up socket
      res.resume();
      completed++;
      const status = res.statusCode;
      if (status !== 200) {
        broken.push({
          clinic_id: clinic.clinic_id,
          name: clinic.name,
          city: clinic.city,
          state: clinic.state,
          status_code: status,
          photo_url: url
        });
      }
      if (completed % 200 === 0 || completed === googleClinics.length) {
        console.log(`Progress: ${completed}/${googleClinics.length} checked, ${broken.length} broken so far`);
      }
      resolvePromise();
    });

    req.on('error', (err) => {
      completed++;
      broken.push({
        clinic_id: clinic.clinic_id,
        name: clinic.name,
        city: clinic.city,
        state: clinic.state,
        status_code: `ERROR: ${err.message}`,
        photo_url: url
      });
      if (completed % 200 === 0 || completed === googleClinics.length) {
        console.log(`Progress: ${completed}/${googleClinics.length} checked, ${broken.length} broken so far`);
      }
      resolvePromise();
    });

    req.on('timeout', () => {
      req.destroy();
      completed++;
      broken.push({
        clinic_id: clinic.clinic_id,
        name: clinic.name,
        city: clinic.city,
        state: clinic.state,
        status_code: 'TIMEOUT',
        photo_url: url
      });
      resolvePromise();
    });
  });
}

// Process in batches
async function run() {
  const startTime = Date.now();

  for (let i = 0; i < googleClinics.length; i += CONCURRENCY) {
    const batch = googleClinics.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(c => checkUrl(c)));
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nDone in ${elapsed}s`);
  console.log(`Total checked: ${completed}`);
  console.log(`Total broken: ${broken.length}`);

  // Categorize broken URLs
  const streetView = broken.filter(b => b.photo_url.includes('streetviewpixels'));
  const gpsCs = broken.filter(b => b.photo_url.includes('gps-cs-s'));
  const afUrls = broken.filter(b => b.photo_url.includes('/p/AF1Qip'));
  const other = broken.filter(b =>
    !b.photo_url.includes('streetviewpixels') &&
    !b.photo_url.includes('gps-cs-s') &&
    !b.photo_url.includes('/p/AF1Qip')
  );

  console.log(`\nBreakdown:`);
  console.log(`  Street View URLs: ${streetView.length}`);
  console.log(`  gps-cs-s URLs: ${gpsCs.length}`);
  console.log(`  AF1Qip URLs: ${afUrls.length}`);
  console.log(`  Other: ${other.length}`);

  // Write CSV
  const csvHeader = 'clinic_id,name,city,state,status_code,photo_url';
  const csvRows = broken.map(b => {
    const escapeCsv = (s) => `"${String(s).replace(/"/g, '""')}"`;
    return `${escapeCsv(b.clinic_id)},${escapeCsv(b.name)},${escapeCsv(b.city)},${escapeCsv(b.state)},${escapeCsv(b.status_code)},${escapeCsv(b.photo_url)}`;
  });

  writeFileSync(outputPath, csvHeader + '\n' + csvRows.join('\n'), 'utf-8');
  console.log(`\nSaved to: ${outputPath}`);
}

run().catch(console.error);
