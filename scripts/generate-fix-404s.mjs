import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURACIÓN ---
const CSV_FILENAME = 'Table.csv'; // Asegúrate de usar el archivo de los 404s

// Mapa de tus ciudades ACTIVAS (Copiado de tu service-areas.ts)
const activeCities = new Set([
    'orlando', 'winter-park', 'winter-garden', 'ocoee', 'apopka', 'altamonte-springs',
    'sanford', 'lake-mary', 'oviedo', 'kissimmee', 'st-cloud', 'clermont',
    'tampa', 'hyde-park', 'westchase', 'brandon', 'riverview', 'plant-city',
    'st-petersburg', 'clearwater', 'largo', 'palm-harbor', 'dunedin', 'tarpon-springs',
    'wesley-chapel', 'land-o-lakes', 'new-port-richey', 'zephyrhills', 'trinity', 'odessa',
    'miami', 'miami-beach', 'coral-gables', 'homestead', 'doral', 'fort-lauderdale',
    'hollywood', 'pembroke-pines', 'coral-springs', 'davie', 'sunrise', 'west-palm-beach',
    'boca-raton', 'delray-beach', 'boynton-beach', 'jupiter', 'naples', 'marco-island',
    'fort-myers', 'cape-coral', 'bonita-springs', 'estero', 'lehigh-acres',
    'punta-gorda', 'port-charlotte'
]);

// Mapa de Servicios para normalizar
const serviceMap = {
    'fire-damage': 'fire-damage-restoration',
    'smoke-damage': 'fire-damage-restoration',
    'soot-cleanup': 'fire-damage-restoration',
    'water-damage': 'water-damage-restoration',
    'leak-repair': 'water-damage-restoration',
    'emergency-water': 'water-damage-restoration',
    'flood-damage': 'water-damage-restoration',
    'basement-flooding': 'water-damage-restoration',
    'mold-remediation': 'mold-remediation',
    'mold-inspection': 'mold-remediation',
    'mold-damage': 'mold-remediation',
    'storm-damage': 'storm-damage-repair',
    'hurricane': 'storm-damage-repair'
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(__dirname, '..', CSV_FILENAME);

console.log(`🔍 Analizando 404s desde ${CSV_FILENAME}...`);

try {
    const data = fs.readFileSync(csvPath, 'utf8');
    const lines = data.split(/\r?\n/);
    const redirects = new Set();

    // Reglas Manuales para errores específicos (Hardcoded fixes)
    redirects.add('/home  /  301');
    redirects.add('/aboutUs  /contact  301');
    redirects.add('/portfolio/portfolio  /remodeling  301');
    redirects.add('/blog/blog/post  /resources  301');
    // Fix para el bug de "null" - asume diseño moderno por defecto
    redirects.add('/services/kitchen-remodeling/null/:city  /remodeling/kitchen/modern-design/:city  301');

    lines.forEach(line => {
        if (!line.includes('https://')) return;
        const urlMatch = line.match(/(https?:\/\/[^\s,]+)/);
        if (!urlMatch) return;

        const urlObj = new URL(urlMatch[0]);
        const pathSegments = urlObj.pathname.split('/').filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];

        // Lógica: ¿Es una URL de ciudad/servicio antigua?
        if (pathSegments.length >= 3) {
            // Intentar detectar si el último segmento es una ciudad
            const potentialCity = lastSegment;

            // Buscar servicio en la URL
            let targetService = null;
            for (const [key, value] of Object.entries(serviceMap)) {
                if (urlObj.pathname.includes(key)) {
                    targetService = value;
                    break;
                }
            }

            if (targetService) {
                if (activeCities.has(potentialCity)) {
                    // Caso A: Ciudad Activa -> Redirigir a la nueva URL perfecta
                    redirects.add(`${urlObj.pathname}  /service-areas/${potentialCity}/${targetService}  301`);
                } else {
                    // Caso B: Ciudad Fantasma (Leesburg, Vero Beach, etc.) -> Redirigir a Service Areas General
                    redirects.add(`${urlObj.pathname}  /service-areas  301`);
                }
            }
        }
    });

    console.log('\n--- AGREGA ESTO A TU _redirects (AL PRINCIPIO) ---\n');
    redirects.forEach(rule => console.log(rule));

} catch (err) {
    console.error("Error:", err);
}
