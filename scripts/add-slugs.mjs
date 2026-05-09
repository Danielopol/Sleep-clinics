import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

function generateSlug(name, city, state) {
  return `${name} ${city} ${state}`
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const clinicsPath = join(rootDir, 'data', 'clinics.json');
const clinics = JSON.parse(readFileSync(clinicsPath, 'utf-8'));

// Generate slugs, tracking duplicates
const slugCounts = {};
for (const clinic of clinics) {
  const base = generateSlug(clinic.name, clinic.city, clinic.state);
  slugCounts[base] = (slugCounts[base] || 0) + 1;
}

const slugSeen = {};
for (const clinic of clinics) {
  const base = generateSlug(clinic.name, clinic.city, clinic.state);
  if (slugCounts[base] > 1) {
    slugSeen[base] = (slugSeen[base] || 0) + 1;
    clinic.slug = slugSeen[base] === 1 ? base : `${base}-${slugSeen[base]}`;
  } else {
    clinic.slug = base;
  }
}

writeFileSync(clinicsPath, JSON.stringify(clinics));
console.log(`✅ Added slugs to ${clinics.length} clinics`);

// Spot-check
const sample = clinics.slice(0, 3).map(c => `  ${c.id}: ${c.slug}`).join('\n');
console.log('Sample slugs:\n' + sample);
