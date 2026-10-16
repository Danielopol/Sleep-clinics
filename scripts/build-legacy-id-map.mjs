// Rebuilds scripts/legacy-id-map.json: the frozen /clinic/<numeric-id> -> slug
// map that app/api/clinic-redirect/[id]/route.ts serves 301s from.
//
// Clinic URLs were /clinic/<id> from launch until 10cc2cd (2026-05-09), and
// that id was the clinic's row position in Prototype_with_descriptions.xlsx
// (generate-clinic-data.mjs still assigns `id: index + 1`). Rows are added,
// removed and merged all the time, so today's ids no longer point at the
// clinics Google indexed under those URLs. This script replays every Excel
// version that was live while numeric URLs were in use, straight from git
// history, and records which clinic each id meant.
//
// The map is append-only: ids already in it are never reassigned. Run it only
// if the map file is lost: `node scripts/build-legacy-id-map.mjs`.
import XLSX from 'xlsx';
import { execFileSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const mapPath = join(__dirname, 'legacy-id-map.json');

// The last commit whose site still served clinic pages at /clinic/<id>.
const LAST_NUMERIC_COMMIT = '10cc2cd^';
// The commit that introduced generate-clinic-data.mjs and its row-index ids.
const FIRST_NUMERIC_COMMIT = '92257d5';

const git = (...args) =>
  execFileSync('git', args, { cwd: rootDir, maxBuffer: 1 << 30 });

// Same as generateSlug() in generate-clinic-data.mjs.
function generateSlug(name, city, state) {
  return `${name} ${city} ${state}`
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// id -> slug for one Excel version, replicating the generator at that time:
// ids are 1-based row positions (blank-name rows still consume an id), and
// colliding slugs get -2, -3 suffixes in row order.
function idsToSlugs(commit) {
  const workbook = XLSX.read(git('show', `${commit}:Prototype_with_descriptions.xlsx`));
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
  const clinics = rows
    .map((row, index) => ({
      id: index + 1,
      base: generateSlug(row.clinic_name || '', row.city || '', row.state || ''),
      name: row.clinic_name,
    }))
    .filter(c => c.name);
  const counts = {};
  for (const c of clinics) counts[c.base] = (counts[c.base] || 0) + 1;
  const seen = {};
  const map = new Map();
  for (const c of clinics) {
    if (counts[c.base] > 1) {
      seen[c.base] = (seen[c.base] || 0) + 1;
      map.set(c.id, seen[c.base] === 1 ? c.base : `${c.base}-${seen[c.base]}`);
    } else {
      map.set(c.id, c.base);
    }
  }
  return map;
}

// The first generated version, then every numeric-era commit that changed the
// Excel file, oldest first.
const commits = [
  FIRST_NUMERIC_COMMIT,
  ...git(
    'log', '--reverse', '--format=%h', `${FIRST_NUMERIC_COMMIT}..${LAST_NUMERIC_COMMIT}`,
    '--', 'Prototype_with_descriptions.xlsx'
  ).toString().trim().split('\n'),
];

// Later versions win: they are what Google saw most recently under each id.
const assigned = new Map();
let conflicts = 0;
for (const commit of commits) {
  const versionMap = idsToSlugs(commit);
  for (const [id, slug] of versionMap) {
    if (assigned.has(id) && assigned.get(id) !== slug) conflicts++;
    assigned.set(id, slug);
  }
  console.log(`  ${commit}: ${versionMap.size} clinics`);
}

const existing = existsSync(mapPath) ? JSON.parse(readFileSync(mapPath, 'utf-8')).ids : {};
const ids = { ...Object.fromEntries([...assigned].sort((a, b) => a[0] - b[0])), ...existing };

writeFileSync(
  mapPath,
  JSON.stringify(
    {
      _comment:
        'Frozen /clinic/<numeric-id> -> slug map from the numeric-URL era (until 2026-05-09). ' +
        'Append-only: never reassign an id. Built by scripts/build-legacy-id-map.mjs.',
      ids,
    },
    null,
    1
  ) + '\n'
);
console.log(
  `✅ ${Object.keys(ids).length} legacy ids from ${commits.length} Excel versions ` +
  `(${conflicts} ids changed clinic between versions; latest kept)`
);
