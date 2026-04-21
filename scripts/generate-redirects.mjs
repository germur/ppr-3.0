/**
 * generate-redirects.mjs
 * 
 * Genera public/_redirects desde:
 *  1. Datos GSC (opcional: pasar CSV de pages como argumento)
 *  2. El mapeo ciudad×servicio definido aquí
 * 
 * Uso: node scripts/generate-redirects.mjs [path/to/Pages.csv]
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Service mapping: old sub-service slug → new service slug ──────────────
const RESTORATION_MAP = {
  // Water
  'flood-damage': 'water-damage-restoration',
  'emergency-water-removal': 'water-damage-restoration',
  'leak-repair': 'water-damage-restoration',
  'ceiling-water-damage': 'water-damage-restoration',
  'basement-flooding': 'water-damage-restoration',
  'sewage-cleanup': 'water-damage-restoration',
  'burst-pipe': 'water-damage-restoration',
  'structural-drying': 'water-damage-restoration',
  // Fire
  'smoke-damage': 'fire-damage-restoration',
  'soot-cleanup': 'fire-damage-restoration',
  'fire-damage-repair': 'fire-damage-restoration',
  'emergency-fire-response': 'fire-damage-restoration',
  'contents-cleaning': 'fire-damage-restoration',
  'repair': 'fire-damage-restoration',
  // Mold
  'mold-inspection': 'mold-remediation',
  'black-mold-removal': 'mold-remediation',
  'mold-prevention': 'mold-remediation',
  'mold-testing': 'mold-remediation',
  'mold-damage-restoration': 'mold-remediation',
  'attic-removal': 'mold-remediation',
  // Storm
  'hurricane-damage': 'storm-damage-repair',
  'wind-damage': 'storm-damage-repair',
  'storm-debris-removal': 'storm-damage-repair',
  'emergency-storm-repair': 'storm-damage-repair',
  'hurricane-recovery': 'storm-damage-repair',
  'debris-removal': 'storm-damage-repair',
  // Mitigation (legacy PPR 2.x pattern)
  'water-mitigation': 'water-damage-restoration',
  'fire-mitigation': 'fire-damage-restoration',
  'mold-mitigation': 'mold-remediation',
  'storm-mitigation': 'storm-damage-repair',
};

// ── Cities WITH data files in src/content/cities/ (generate city-level pages) ──
// These get redirected to /service-areas/{city}/{service}/
// All other cities fall back to /restoration/{service-category}/
const CITIES_WITH_PAGES = new Set([
  'boca-raton', 'bonita-springs', 'bradenton', 'cape-coral', 'clearwater',
  'coral-gables', 'delray-beach', 'estero', 'fort-lauderdale', 'fort-myers',
  'kissimmee', 'miami', 'naples', 'orlando', 'sanford', 'sarasota',
  'tampa', 'west-palm-beach', 'winter-park',
]);

// ── Service → restoration category fallback (for cities without pages) ───
const SERVICE_CATEGORY_FALLBACK = {
  'water-damage-restoration': '/restoration/water-damage/',
  'fire-damage-restoration':  '/restoration/fire-damage/',
  'mold-remediation':         '/restoration/mold-remediation/',
  'storm-damage-repair':      '/restoration/storm-damage/',
  'kitchen-remodeling':       '/remodeling/kitchen/',
  'bathroom-remodeling':      '/remodeling/bathroom/',
};

// ── City → region mapping ─────────────────────────────────────────────────
const CITY_REGION = {
  // Central Florida
  'orlando': 'central-florida', 'kissimmee': 'central-florida', 'lakeland': 'central-florida',
  'winter-garden': 'central-florida', 'clermont': 'central-florida', 'leesburg': 'central-florida',
  'ocala': 'central-florida', 'deltona': 'central-florida', 'winter-haven': 'central-florida',
  'sanford': 'central-florida', 'apopka': 'central-florida', 'winter-park': 'central-florida',
  'lake-mary': 'central-florida', 'oviedo': 'central-florida', 'ocoee': 'central-florida',
  'st-cloud': 'central-florida', 'altamonte-springs': 'central-florida',
  'jacksonville': 'central-florida', 'st-augustine': 'central-florida',
  'gainesville': 'central-florida', 'tallahassee': 'central-florida',
  'pensacola': 'central-florida', 'panama-city': 'central-florida',
  // Tampa Bay
  'tampa': 'tampa-bay', 'st-petersburg': 'tampa-bay', 'clearwater': 'tampa-bay',
  'brandon': 'tampa-bay', 'largo': 'tampa-bay', 'pinellas-park': 'tampa-bay',
  'temple-terrace': 'tampa-bay', 'safety-harbor': 'tampa-bay', 'riverview': 'tampa-bay',
  'westchase': 'tampa-bay', 'odessa': 'tampa-bay', 'land-o-lakes': 'tampa-bay',
  'trinity': 'tampa-bay', 'palm-harbor': 'tampa-bay', 'dunedin': 'tampa-bay',
  'tarpon-springs': 'tampa-bay', 'zephyrhills': 'tampa-bay', 'new-port-richey': 'tampa-bay',
  'plant-city': 'tampa-bay', 'hyde-park': 'tampa-bay', 'wesley-chapel': 'tampa-bay',
  // Southwest Florida
  'fort-myers': 'southwest-florida', 'cape-coral': 'southwest-florida', 'naples': 'southwest-florida',
  'bonita-springs': 'southwest-florida', 'estero': 'southwest-florida', 'sarasota': 'southwest-florida',
  'bradenton': 'southwest-florida', 'venice': 'southwest-florida', 'port-charlotte': 'southwest-florida',
  'north-port': 'southwest-florida', 'marco-island': 'southwest-florida',
  'lehigh-acres': 'southwest-florida', 'punta-gorda': 'southwest-florida',
  // South Florida & Treasure Coast
  'miami': 'south-florida', 'fort-lauderdale': 'south-florida', 'hollywood': 'south-florida',
  'coral-gables': 'south-florida', 'hialeah': 'south-florida', 'plantation': 'south-florida',
  'davie': 'south-florida', 'sunrise': 'south-florida', 'pompano-beach': 'south-florida',
  'deerfield-beach': 'south-florida', 'boca-raton': 'south-florida', 'west-palm-beach': 'south-florida',
  'miramar': 'south-florida', 'pembroke-pines': 'south-florida', 'homestead': 'south-florida',
  'coral-springs': 'south-florida', 'boynton-beach': 'south-florida', 'delray-beach': 'south-florida',
  'jupiter': 'south-florida', 'miami-beach': 'south-florida', 'doral': 'south-florida',
  'port-st-lucie': 'south-florida', 'fort-pierce': 'south-florida', 'stuart': 'south-florida',
  'jensen-beach': 'south-florida', 'vero-beach': 'south-florida', 'palm-city': 'south-florida',
  'hobe-sound': 'south-florida', 'palm-coast': 'south-florida',
};

// ── Static rules (always included) ───────────────────────────────────────
const STATIC_RULES = `
# Tools & legacy landings
/tools/mold-testing-cost-calculator  /landing/mold-testing/  301
/tools/mold-testing-cost-calculator/ /landing/mold-testing/  301
/book-mold-inspection                /landing/mold-testing/  301
/book-mold-inspection/               /landing/mold-testing/  301
/landing/mold-remediation            /landing/mold-testing/  301
/landing/mold-remediation/           /landing/mold-testing/  301

# Legacy service category pages
/services/bathroom-remodeling        /remodeling/bathroom/       301
/services/bathroom-remodeling/       /remodeling/bathroom/       301
/services/bedroom-remodeling         /remodeling/bathroom/       301
/services/bedroom-remodeling/        /remodeling/bathroom/       301
/services/living-dining-remodeling   /remodeling/                301
/services/living-dining-remodeling/  /remodeling/                301
/services/kitchen-remodeling         /remodeling/kitchen/        301
/services/kitchen-remodeling/        /remodeling/kitchen/        301
/services/home-additions-remodeling  /remodeling/home-additions/ 301
/services/home-additions-remodeling/ /remodeling/home-additions/ 301

# Legacy restoration category pages (generic, no city)
/restoration/mitigation-services                         /restoration/                          301
/restoration/mitigation-services/                        /restoration/                          301
/restoration/water-damage/flood-damage                   /restoration/water-damage/             301
/restoration/water-damage/flood-damage/                  /restoration/water-damage/             301
/restoration/water-damage/emergency-water-removal        /restoration/water-damage/emergency-water-removal/ 301
/restoration/water-damage/emergency-water-removal/       /restoration/water-damage/emergency-water-removal/ 301
/restoration/water-damage/leak-repair                    /restoration/water-damage/leak-repair/ 301
/restoration/water-damage/leak-repair/                   /restoration/water-damage/leak-repair/ 301
/restoration/water-damage/ceiling-water-damage           /restoration/water-damage/ceiling-water-damage/ 301
/restoration/water-damage/ceiling-water-damage/          /restoration/water-damage/ceiling-water-damage/ 301
/restoration/water-damage/basement-flooding              /restoration/water-damage/basement-flooding/ 301
/restoration/water-damage/basement-flooding/             /restoration/water-damage/basement-flooding/ 301
/restoration/fire-damage/fire-damage-repair              /restoration/fire-damage/repair/       301
/restoration/fire-damage/fire-damage-repair/             /restoration/fire-damage/repair/       301
/restoration/fire-damage/emergency-fire-response         /restoration/fire-damage/              301
/restoration/fire-damage/emergency-fire-response/        /restoration/fire-damage/              301
/restoration/fire-damage/smoke-damage                    /restoration/fire-damage/smoke-damage/ 301
/restoration/fire-damage/soot-cleanup                    /restoration/fire-damage/soot-cleanup/ 301
/restoration/mold-remediation/mold-inspection            /restoration/mold-remediation/inspection/ 301
/restoration/mold-remediation/mold-inspection/           /restoration/mold-remediation/inspection/ 301
/restoration/mold-remediation/mold-prevention            /restoration/mold-remediation/prevention/ 301
/restoration/mold-remediation/mold-prevention/           /restoration/mold-remediation/prevention/ 301
/restoration/mold-remediation/mold-testing               /restoration/mold-remediation/testing/ 301
/restoration/mold-remediation/mold-testing/              /restoration/mold-remediation/testing/ 301
/restoration/mold-remediation/mold-damage-restoration    /restoration/mold-remediation/         301
/restoration/mold-remediation/mold-damage-restoration/   /restoration/mold-remediation/         301
/restoration/mold-remediation/black-mold-removal         /restoration/mold-remediation/black-mold-removal/ 301
/restoration/storm-damage/hurricane-damage               /restoration/storm-damage/hurricane-recovery/ 301
/restoration/storm-damage/hurricane-damage/              /restoration/storm-damage/hurricane-recovery/ 301
/restoration/storm-damage/storm-debris-removal           /restoration/storm-damage/debris-removal/ 301
/restoration/storm-damage/storm-debris-removal/          /restoration/storm-damage/debris-removal/ 301
/restoration/storm-damage/emergency-storm-repair         /restoration/storm-damage/             301
/restoration/storm-damage/emergency-storm-repair/        /restoration/storm-damage/             301
/restoration/storm-damage/wind-damage                    /restoration/storm-damage/wind-damage/ 301

# General catch-all legacy
/home/*                  /           301
/aboutUs                 /contact/   301
/portfolio               /remodeling/ 301
/blog/blog/*             /resources/ 301
/remodeling-services     /remodeling/ 301
/remodeling-services/*   /remodeling/ 301

# Blog posts legacy → /resources/
/blog/diy-mold-test-kits-guide                    /resources/  301
/blog/diy-mold-test-kits-guide/                   /resources/  301
/blog/florida-mold-challenge-sb2a-guide           /resources/  301
/blog/florida-mold-challenge-sb2a-guide/          /resources/  301
/blog/homeowner-mold-prevention-guide             /resources/  301
/blog/homeowner-mold-prevention-guide/            /resources/  301
/blog/mold-exposure-symptoms-medical-testing      /resources/  301
/blog/mold-exposure-symptoms-medical-testing/     /resources/  301
/blog/professional-mold-testing-cost-guide-2025   /resources/  301
/blog/professional-mold-testing-cost-guide-2025/  /resources/  301
/blog/real-estate-risk-mold-testing-florida       /resources/  301
/blog/real-estate-risk-mold-testing-florida/      /resources/  301
/blog/valor-renovacion-florida-2025               /resources/  301
/blog/valor-renovacion-florida-2025/              /resources/  301
/blog/guia-reparacion-banos                       /resources/  301
/blog/guia-reparacion-banos/                      /resources/  301

# Legacy pages
/commercial/construction                          /restoration/           301
/restoration/mitigation-services/water-mitigation /restoration/water-damage/ 301
/restoration/mitigation-services/water-mitigation/ /restoration/water-damage/ 301
/restoration/mitigation/mold-mitigation           /restoration/mold-remediation/ 301
/restoration/storm/emergency-storm-repair         /restoration/storm-damage/ 301
/restoration/water-damage/leak-detection          /restoration/water-damage/ 301
/restoration/water-damage/leak-detection/         /restoration/water-damage/ 301
/restoration/water-damage/winter-haven            /restoration/water-damage/ 301
/terms                                            /privacy-policy/ 301
/terms/                                           /privacy-policy/ 301
/services/mold-remediation/removal                /restoration/mold-remediation/ 301
/services/mold-remediation/removal/               /restoration/mold-remediation/ 301
/services/bathroom-remodeling/null/largo          /remodeling/bathroom/ 301
/services/bathroom-remodeling/null/largo/         /remodeling/bathroom/ 301
/services/bedroom-remodeling/null/ocala           /remodeling/bathroom/ 301
/services/bedroom-remodeling/null/ocala/          /remodeling/bathroom/ 301
/services/kitchen-remodeling/null/estero          /remodeling/kitchen/ 301
/services/kitchen-remodeling/null/estero/         /remodeling/kitchen/ 301
`.trim();

// ── Main ─────────────────────────────────────────────────────────────────
async function generateRedirects(gscCsvPath = null) {
  const seen = new Set();
  const dynamic = [];

  function add(old, dest) {
    const clean = old.replace(/\/$/, '');
    if (!clean || seen.has(clean)) return;
    seen.add(clean);
    dynamic.push(`${clean} ${dest} 301`);
    const withSlash = clean + '/';
    if (!seen.has(withSlash)) {
      seen.add(withSlash);
      dynamic.push(`${withSlash} ${dest} 301`);
    }
  }

  // If GSC CSV provided, parse it for discovered URLs
  let gscPaths = [];
  if (gscCsvPath) {
    const raw = await fs.readFile(gscCsvPath, 'utf8');
    const lines = raw.split('\n').slice(1).filter(Boolean);
    gscPaths = lines.map(l => {
      try { return new URL(l.split(',')[0].replace(/"/g, '')).pathname; }
      catch { return ''; }
    }).filter(Boolean);
    console.log(`📂 Loaded ${gscPaths.length} URLs from GSC CSV`);
  }

  // Generate from all known city×service combos
  const groups = [
    ['water-damage', Object.keys(RESTORATION_MAP).filter(k => RESTORATION_MAP[k] === 'water-damage-restoration')],
    ['fire-damage', Object.keys(RESTORATION_MAP).filter(k => RESTORATION_MAP[k] === 'fire-damage-restoration')],
    ['mold-remediation', Object.keys(RESTORATION_MAP).filter(k => RESTORATION_MAP[k] === 'mold-remediation')],
    ['storm-damage', Object.keys(RESTORATION_MAP).filter(k => RESTORATION_MAP[k] === 'storm-damage-repair')],
  ];

  for (const [group, subservices] of groups) {
    for (const city of Object.keys(CITY_REGION)) {
      const hasPage = CITIES_WITH_PAGES.has(city);
      for (const sub of subservices) {
        const newSvc = RESTORATION_MAP[sub];
        // City with page → /service-areas/{city}/{service}/
        // City without page → /restoration/{category}/ fallback
        const dest = hasPage
          ? `/service-areas/${city}/${newSvc}/`
          : SERVICE_CATEGORY_FALLBACK[newSvc] || '/restoration/';
        add(`/restoration/${group}/${sub}/${city}`, dest);
        add(`/restoration/mitigation-services/${sub.replace(/-restoration|ation|-damage|-remediation|-repair/g, '')}-mitigation/${city}`, dest);
      }
      // /services/remodeling/{city}
      const kitDest = hasPage ? `/service-areas/${city}/kitchen-remodeling/` : '/remodeling/kitchen/';
      const bathDest = hasPage ? `/service-areas/${city}/bathroom-remodeling/` : '/remodeling/bathroom/';
      add(`/services/kitchen-remodeling/${city}`, kitDest);
      add(`/services/bathroom-remodeling/${city}`, bathDest);
      add(`/services/bedroom-remodeling/${city}`, bathDest);
      add(`/services/home-additions-remodeling/${city}`, `/remodeling/home-additions/`);
      add(`/services/living-dining-remodeling/${city}`, `/remodeling/`);
    }
  }

  // Also process discovered GSC paths not covered above
  for (const p of gscPaths) {
    const parts = p.replace(/\/$/, '').split('/').filter(Boolean);
    if (parts.length === 4 && parts[0] === 'restoration' && RESTORATION_MAP[parts[2]]) {
      const city = parts[3];
      if (!CITY_REGION[city]) continue;
      const newSvc = RESTORATION_MAP[parts[2]];
      const hasPage = CITIES_WITH_PAGES.has(city);
      const dest = hasPage
        ? `/service-areas/${city}/${newSvc}/`
        : SERVICE_CATEGORY_FALLBACK[newSvc] || '/restoration/';
      add(p, dest);
    }
  }

  const date = new Date().toISOString().split('T')[0];
  const content = [
    `# ============================================================`,
    `# _redirects — Paramount Property Restoration`,
    `# Generado: ${date} | ${dynamic.length + STATIC_RULES.split('\n').filter(l => l && !l.startsWith('#')).length} reglas totales`,
    `# Regenerar: node scripts/generate-redirects.mjs [Pages.csv]`,
    `# ============================================================`,
    ``,
    STATIC_RULES,
    ``,
    `# --- Ciudad × servicio (${dynamic.length} reglas dinámicas) ---`,
    ...dynamic,
    ``,
    `# --- 404 fallback ---`,
    `/* /404.html 404`,
  ].join('\n');

  const outPath = path.join(ROOT, 'public', '_redirects');
  await fs.writeFile(outPath, content);
  console.log(`✅ ${outPath}`);
  console.log(`   ${dynamic.length} reglas dinámicas + estáticas`);
}

const csvArg = process.argv[2] ? path.resolve(process.argv[2]) : null;
generateRedirects(csvArg).catch(console.error);
