import XLSX from 'xlsx';
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

console.log('📊 Reading Excel file...');
const workbook = XLSX.readFile(join(rootDir, 'Prototype_with_descriptions.xlsx'));
const sheetName = workbook.SheetNames[0];
const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

console.log(`📋 Processing ${rawData.length} clinics...`);

// Function to parse office hours into structured format
function parseOfficeHours(hoursString) {
  if (!hoursString) return undefined;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const hours = {};

  const lines = String(hoursString).split(/[\r\n]+/);
  lines.forEach(line => {
    const match = line.match(/(\w+):\s*(.+)/);
    if (match) {
      const day = match[1].toLowerCase();
      if (days.includes(day)) {
        hours[day] = match[2].trim();
      }
    }
  });

  return Object.keys(hours).length > 0 ? hours : undefined;
}

// Function to parse services/disorders into array
function parseArrayField(field) {
  if (!field) return [];
  return String(field).split(';').map(item => item.trim()).filter(item => item.length > 0);
}

// Function to parse Google reviews from Excel columns
function parseGoogleReviews(row) {
  const reviews = [];

  for (let i = 1; i <= 5; i++) {
    const author = row[`review_${i}_author`];
    const date = row[`review_${i}_date`];
    const stars = row[`review_${i}_stars`];
    const text = row[`review_${i}`];

    if (author && text) {
      reviews.push({
        author: String(author).trim(),
        rating: stars ? Number(stars) : 5,
        date: date ? String(date).trim() : '',
        text: String(text).trim()
      });
    }
  }

  return reviews;
}

// Transform data to match frontend Clinic interface
const clinics = rawData.map((row, index) => {
  const services = parseArrayField(row.sleep_services);
  const disorders = parseArrayField(row.sleep_disorders);
  const specialty = [...services, ...disorders].filter((item, i, arr) => arr.indexOf(item) === i);
  const googleReviews = parseGoogleReviews(row);

  return {
    id: index + 1,
    name: row.clinic_name || '',
    address: row.location_address || '',
    city: row.city || '',
    state: row.state || '',
    zip: row.zip_code ? String(row.zip_code) : '',
    phone: row.location_phone || '',
    specialty: specialty.length > 0 ? specialty : ['Sleep Medicine'],
    image: row.photo_url || '/modern-medical-clinic-reception-area.jpg',
    clinicType: row.new_name || 'Sleep Medicine Center',
    rating: row.Total_rating ? Number(row.Total_rating) : undefined,
    reviewCount: row.total_reviews ? Number(row.total_reviews) : undefined,
    website: row.website_url || '',
    email: '',
    fax: row.location_fax || '',
    hours: parseOfficeHours(row.office_hours),
    hoursNote: row.office_hours && !parseOfficeHours(row.office_hours) ? row.office_hours : undefined,
    services: services,
    description: row.Description || '',
    isOpen: true,
    accreditation: row['AASM Certified'] === 'Yes' ? ['AASM Accredited'] : [],
    reviews: googleReviews.length > 0 ? googleReviews : undefined
  };
}).filter(clinic => clinic.name);

// Generate metadata
const states = [...new Set(clinics.map(c => c.state).filter(Boolean))].sort();
const cities = [...new Set(clinics.map(c => c.city).filter(Boolean))].sort();

const servicesSet = new Set();
clinics.forEach(clinic => {
  if (clinic.services) {
    clinic.services.forEach(s => servicesSet.add(s));
  }
});
const services = [...servicesSet].sort();

const specialtiesSet = new Set();
clinics.forEach(clinic => {
  clinic.specialty.forEach(s => specialtiesSet.add(s));
});
const specialties = [...specialtiesSet].sort();

const metadata = { states, cities, specialties, services };

// Ensure data directory exists
const dataDir = join(rootDir, 'data');
try {
  mkdirSync(dataDir, { recursive: true });
} catch (e) {}

// Write files (minified for smaller size)
writeFileSync(join(dataDir, 'clinics.json'), JSON.stringify(clinics));
writeFileSync(join(dataDir, 'metadata.json'), JSON.stringify(metadata));

console.log(`✅ Generated data/clinics.json (${clinics.length} clinics)`);
console.log(`✅ Generated data/metadata.json`);
console.log(`   - ${states.length} states`);
console.log(`   - ${cities.length} cities`);
console.log(`   - ${specialties.length} specialties`);
console.log(`   - ${services.length} services`);
