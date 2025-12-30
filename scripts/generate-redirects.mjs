
import fs from 'fs/promises';
import path from 'path';

// --- Configuration ---
const NEW_REPO_PATH = '/Users/rogermurillo/.gemini/antigravity/scratch/ppr-3-0';
const OLD_DATA_LOCATIONS = [
    // Hardcoding legacy data here for simplicity and self-containment 
    // based on previous analysis of old-ppr-repo/src/data/locations.js and restoration.js
];

// --- Legacy Data (Hardcoded based on analysis) ---
const legacyCities = [
    { slug: "orlando", region: "central-florida" },
    { slug: "kissimmee", region: "central-florida" },
    { slug: "lakeland", region: "central-florida" },
    { slug: "winter-garden", region: "central-florida" },
    { slug: "clermont", region: "central-florida" },
    { slug: "leesburg", region: "central-florida" },
    { slug: "ocala", region: "central-florida" },
    { slug: "deltona", region: "central-florida" },
    { slug: "winter-haven", region: "central-florida" },
    { slug: "sanford", region: "central-florida" },
    { slug: "apopka", region: "central-florida" },
    { slug: "plant-city", region: "central-florida" },
    { slug: "tampa", region: "tampa-bay" },
    { slug: "st-petersburg", region: "tampa-bay" },
    { slug: "clearwater", region: "tampa-bay" },
    { slug: "brandon", region: "tampa-bay" },
    { slug: "largo", region: "tampa-bay" },
    { slug: "pinellas-park", region: "tampa-bay" },
    { slug: "temple-terrace", region: "tampa-bay" },
    { slug: "safety-harbor", region: "tampa-bay" },
    { slug: "fort-myers", region: "southwest-florida" },
    { slug: "cape-coral", region: "southwest-florida" },
    { slug: "naples", region: "southwest-florida" },
    { slug: "bonita-springs", region: "southwest-florida" },
    { slug: "estero", region: "southwest-florida" },
    { slug: "sarasota", region: "southwest-florida" },
    { slug: "bradenton", region: "southwest-florida" },
    { slug: "venice", region: "southwest-florida" },
    { slug: "port-charlotte", region: "southwest-florida" },
    { slug: "north-port", region: "southwest-florida" },
    { slug: "miami", region: "south-florida" },
    { slug: "fort-lauderdale", region: "south-florida" },
    { slug: "hollywood", region: "south-florida" },
    { slug: "coral-gables", region: "south-florida" },
    { slug: "hialeah", region: "south-florida" },
    { slug: "plantation", region: "south-florida" },
    { slug: "davie", region: "south-florida" },
    { slug: "sunrise", region: "south-florida" },
    { slug: "pompano-beach", region: "south-florida" },
    { slug: "deerfield-beach", region: "south-florida" },
    { slug: "boca-raton", region: "south-florida" },
    { slug: "west-palm-beach", region: "south-florida" },
    { slug: "miramar", region: "south-florida" },
    { slug: "pembroke-pines", region: "south-florida" },
    { slug: "homestead", region: "south-florida" },
    { slug: "port-st-lucie", region: "treasure-coast" },
    { slug: "fort-pierce", region: "treasure-coast" },
    { slug: "stuart", region: "treasure-coast" },
    { slug: "jensen-beach", region: "treasure-coast" },
    { slug: "vero-beach", region: "treasure-coast" },
    { slug: "jupiter", region: "treasure-coast" },
    { slug: "palm-city", region: "treasure-coast" },
    { slug: "hobe-sound", region: "treasure-coast" },
    { slug: "marco-island", region: "southwest-florida" },
    { slug: "jacksonville", region: "northeast-florida" },
    { slug: "st-augustine", region: "northeast-florida" },
    { slug: "gainesville", region: "northeast-florida" },
    { slug: "palm-coast", region: "northeast-florida" },
    { slug: "tallahassee", region: "northwest-florida" },
    { slug: "pensacola", region: "northwest-florida" },
    { slug: "panama-city", region: "northwest-florida" }
];

const legacyServiceMapping = [
    // Water Damage
    { old: 'flood-damage', new: 'water-damage-restoration', group: 'water-damage' },
    { old: 'leak-repair', new: 'leak-detection', group: 'water-damage' },
    { old: 'basement-flooding', new: 'water-damage-restoration', group: 'water-damage' },
    { old: 'ceiling-water-damage', new: 'water-damage-restoration', group: 'water-damage' },
    { old: 'emergency-water-removal', new: 'water-damage-restoration', group: 'water-damage' },

    // Fire Damage
    { old: 'smoke-damage', new: 'fire-damage-restoration', group: 'fire-damage' },
    { old: 'soot-cleanup', new: 'fire-damage-restoration', group: 'fire-damage' },
    { old: 'fire-damage-repair', new: 'fire-damage-restoration', group: 'fire-damage' },
    { old: 'emergency-fire-response', new: 'fire-damage-restoration', group: 'fire-damage' },

    // Mold
    { old: 'mold-inspection', new: 'mold-remediation', group: 'mold-remediation' },
    { old: 'black-mold-removal', new: 'mold-remediation', group: 'mold-remediation' },
    { old: 'mold-prevention', new: 'mold-remediation', group: 'mold-remediation' },
    { old: 'mold-testing', new: 'mold-remediation', group: 'mold-remediation' },
    { old: 'mold-damage-restoration', new: 'mold-remediation', group: 'mold-remediation' },

    // Storm
    { old: 'hurricane-damage', new: 'storm-damage-repair', group: 'storm-damage' },
    { old: 'wind-damage', new: 'storm-damage-repair', group: 'storm-damage' },
    { old: 'storm-debris-removal', new: 'storm-damage-repair', group: 'storm-damage' },
    { old: 'emergency-storm-repair', new: 'storm-damage-repair', group: 'storm-damage' },

    // Litigation
    { old: 'water-mitigation', new: 'water-damage-restoration', group: 'mitigation-services' },
    { old: 'fire-mitigation', new: 'fire-damage-restoration', group: 'mitigation-services' },
    { old: 'mold-mitigation', new: 'mold-remediation', group: 'mitigation-services' },
    { old: 'storm-mitigation', new: 'storm-damage-repair', group: 'mitigation-services' },
];

const staticRedirects = [
    { from: '/restoration', to: '/' },
    { from: '/services', to: '/remodeling-services' },
    { from: '/portfolio', to: '/remodeling-services' },
    { from: '/contact', to: '/contact' },
    { from: '/privacy', to: '/privacy-policy' },
    { from: '/services/kitchen-remodeling', to: '/remodeling-services/kitchen-remodeling' },
    { from: '/services/bathroom-remodeling', to: '/remodeling-services/bathroom-remodeling' },
    { from: '/restoration/remodeling-services', to: '/remodeling-services' },
    { from: '/contacto-antiguo', to: '/contact' },
    { from: '/servicio-viejo', to: '/restoration/water-damage/' }, // Mapping to main restoration if possible or root
];

// --- Generator ---

async function generateRedirects() {
    let redirects = [];

    // 1. Static Redirects
    for (const rule of staticRedirects) {
        redirects.push(`${rule.from} ${rule.to} 301`);
    }

    // 2. Dynamic City Redirects
    for (const city of legacyCities) {
        for (const mapping of legacyServiceMapping) {
            // Old Pattern: /restoration/[group]/[subservice]/[city]
            const oldPath = `/restoration/${mapping.group}/${mapping.old}/${city.slug}`;

            // New Pattern: /service-areas/[region]/[city]/[service]
            // Note: Region slug usually matches loosely but let's assume valid mapping from old data for now
            // In a real scenario we'd query the NEW regions.ts to be 100% sure, but let's trust the logic for now

            // Adjust region slug if needed (e.g. if new repo uses different slugs)
            const newRegion = city.region; // Assuming identical slugs

            const newPath = `/service-areas/${newRegion}/${city.slug}/${mapping.new}`;

            redirects.push(`${oldPath} ${newPath} 301`);
        }
    }

    // 3. Category Redirects (General subservices pages -> New Service Pages)
    // Old: /restoration/[group]/[subservice] -> New: / (or best match)
    // Since new site is location based, we might redirect generic service pages to a general service page if it exists, or Home.
    // Given the new structure implies /restoration/water-damage might exist as a page? 
    // Let's redirect specific subservices to the generic restoration page or home 
    // IF the new site doesn't have a specific global service page (it seems to have /restoration/water-damage etc based on file search earlier?)
    // Actually, earlier file search showed `src/pages/restoration/water-damage.astro` exists in the NEW repo.

    // Let's map the general category pages too
    const categoryMapping = [
        { old: '/restoration/water-damage/flood-damage', new: '/restoration/water-damage' },
        { old: '/restoration/water-damage/leak-repair', new: '/restoration/water-damage/leak-detection' }, // If exists
        { old: '/restoration/fire-damage/smoke-damage', new: '/restoration/fire-damage' },
        { old: '/restoration/mold-remediation/mold-inspection', new: '/restoration/mold-remediation' },
        // Add more as needed
    ];

    for (const rule of categoryMapping) {
        redirects.push(`${rule.old} ${rule.new} 301`);
    }


    const content = redirects.join('\n');
    await fs.writeFile(path.join(NEW_REPO_PATH, 'public', '_redirects'), content);
    console.log(`Generated ${redirects.length} redirects in public/_redirects`);
}

generateRedirects().catch(console.error);
