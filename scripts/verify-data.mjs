import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const clinics = JSON.parse(readFileSync(resolve(__dirname, '..', 'data', 'clinics.json'), 'utf-8'));

const other = clinics.filter(c => {
  return !c.image.includes('google') && c.image !== '/modern-medical-clinic-reception-area.jpg';
});

console.log('Non-Google, non-placeholder URLs:', other.length);
other.slice(0, 5).forEach(c => {
  console.log(`  ${c.name} => ${c.image.substring(0, 120)}`);
});
