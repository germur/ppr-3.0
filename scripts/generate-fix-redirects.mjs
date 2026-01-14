import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURACIÓN ---
// 1. Nombre de tu archivo CSV (Pon el archivo en la raíz o ajusta la ruta)
const CSV_FILENAME = 'Table.csv';

// 2. Mapa de Ciudades a Regiones (Basado en tu service-areas.ts)
// NOTA: En la versión 'corrected' del script, la región NO se usa en la URL final
// porque la estructura válida es /service-areas/city/service.
// Se mantiene por si se necesita para lógica futura.
const cityRegionMap = {
    // Central Florida
    'orlando': 'central-florida', 'winter-park': 'central-florida', 'winter-garden': 'central-florida',
    'ocoee': 'central-florida', 'apopka': 'central-florida', 'altamonte-springs': 'central-florida',
    'sanford': 'central-florida', 'lake-mary': 'central-florida', 'oviedo': 'central-florida',
    'kissimmee': 'central-florida', 'st-cloud': 'central-florida', 'clermont': 'central-florida',

    // Tampa Bay
    'tampa': 'tampa-bay', 'hyde-park': 'tampa-bay', 'westchase': 'tampa-bay',
    'brandon': 'tampa-bay', 'riverview': 'tampa-bay', 'plant-city': 'tampa-bay',
    'st-petersburg': 'tampa-bay', 'clearwater': 'tampa-bay', 'largo': 'tampa-bay',
    'palm-harbor': 'tampa-bay', 'dunedin': 'tampa-bay', 'tarpon-springs': 'tampa-bay',
    'wesley-chapel': 'tampa-bay', 'land-o-lakes': 'tampa-bay', 'new-port-richey': 'tampa-bay',
    'zephyrhills': 'tampa-bay', 'trinity': 'tampa-bay', 'odessa': 'tampa-bay',

    // South Florida
    'miami': 'south-florida', 'miami-beach': 'south-florida', 'coral-gables': 'south-florida',
    'homestead': 'south-florida', 'doral': 'south-florida', 'fort-lauderdale': 'south-florida',
    'hollywood': 'south-florida', 'pembroke-pines': 'south-florida', 'coral-springs': 'south-florida',
    'davie': 'south-florida', 'sunrise': 'south-florida', 'west-palm-beach': 'south-florida',
    'boca-raton': 'south-florida', 'delray-beach': 'south-florida', 'boynton-beach': 'south-florida',
    'jupiter': 'south-florida', 'deerfield-beach': 'south-florida', 'miramar': 'south-florida',
    'hobe-sound': 'south-florida', 'stuart': 'south-florida', 'fort-pierce': 'south-florida',
    'vero-beach': 'south-florida',

    // Southwest Florida
    'naples': 'southwest-florida', 'marco-island': 'southwest-florida', 'fort-myers': 'southwest-florida',
    'cape-coral': 'southwest-florida', 'bonita-springs': 'southwest-florida', 'estero': 'southwest-florida',
    'lehigh-acres': 'southwest-florida', 'punta-gorda': 'southwest-florida', 'port-charlotte': 'southwest-florida',
    'sarasota': 'southwest-florida', 'bradenton': 'southwest-florida', 'port-st-lucie': 'southwest-florida'
};

// 3. Mapa de "Sub-servicios Antiguos" a "Nuevos Slugs Maestros"
const serviceMap = {
    // Fire
    'fire-damage-repair': 'fire-damage-restoration',
    'smoke-damage': 'fire-damage-restoration',
    'soot-cleanup': 'fire-damage-restoration',
    'emergency-fire-response': 'fire-damage-restoration',

    // Water & Leak
    'leak-repair': 'water-damage-restoration',
    'ceiling-water-damage': 'water-damage-restoration',
    'basement-flooding': 'water-damage-restoration',
    'water-mitigation': 'water-damage-restoration',
    'flood-damage': 'water-damage-restoration',

    // Storm
    'emergency-storm-repair': 'storm-damage-repair',
    'hurricane-damage': 'storm-damage-repair',
    'storm-mitigation': 'storm-damage-repair',

    // Mold
    'mold-inspection': 'mold-remediation',
    'mold-mitigation': 'mold-remediation',

    // Remodeling 
    'bathroom-remodeling': 'bathroom-remodeling'
};

// --- LÓGICA DEL SCRIPT ---

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(__dirname, '..', CSV_FILENAME);

console.log(`🔍 Analizando ${CSV_FILENAME}...`);

try {
    const data = fs.readFileSync(csvPath, 'utf8');
    const lines = data.split(/\r?\n/);

    const redirects = new Set();
    let processedCount = 0;

    lines.forEach(line => {
        if (!line.includes('https://') || line.startsWith('URL')) return;

        const urlMatch = line.match(/(https?:\/\/[^\s,]+)/);
        if (!urlMatch) return;

        const fullUrl = urlMatch[0];
        const urlObj = new URL(fullUrl);
        const pathSegments = urlObj.pathname.split('/').filter(Boolean);

        const potentialCity = pathSegments[pathSegments.length - 1];

        if (cityRegionMap[potentialCity]) {
            // const region = cityRegionMap[potentialCity]; // Unused in valid URL structure

            let matchedService = null;

            for (const [oldSlug, newSlug] of Object.entries(serviceMap)) {
                if (urlObj.pathname.includes(oldSlug)) {
                    matchedService = newSlug;
                    break;
                }
            }

            if (matchedService) {
                let newPath;
                // Correct path structure: /service-areas/city/service
                newPath = `/service-areas/${potentialCity}/${matchedService}`;

                const rule = `${urlObj.pathname}  ${newPath}  301`;
                redirects.add(rule);
                processedCount++;
            }
        }
    });

    console.log(`✅ Procesadas ${processedCount} URLs.`);
    console.log(`✨ Se generaron ${redirects.size} reglas únicas.`);
    console.log('\n--- COPIA ESTO EN TU ARCHIVO public/_redirects (AL PRINCIPIO) ---\n');

    console.log('# --- Fix GSC Duplicates (Auto-generated) ---');
    redirects.forEach(rule => console.log(rule));

} catch (err) {
    console.error("Error:", err.message);
    console.log("💡 Asegúrate de descargar el CSV de GSC como 'Table.csv' y ponerlo en la raíz del proyecto.");
}
