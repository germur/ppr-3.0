
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const PROJECT_ROOT = process.cwd();
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const PAGES_DIR = path.join(SRC_DIR, 'pages');
const CONTENT_CITIES_DIR = path.join(SRC_DIR, 'content', 'cities');

async function main() {
    console.log('Starting Link Verification...');

    // 1. Collect Valid Routes
    const validRoutes = new Set();

    // a. Static Pages
    const pageFiles = await glob('**/*.{astro,md,mdx,html,js,ts}', { cwd: PAGES_DIR });
    for (const file of pageFiles) {
        let route = '/' + file.replace(/\.(astro|md|mdx|html|js|ts)$/, '');
        if (route.endsWith('/index')) {
            route = route.slice(0, -6) + '/'; // /foo/index -> /foo/
        } else {
            route = route + '/'; // force trailing slash for checking
        }
        if (route === '//') route = '/';
        validRoutes.add(route);
        // Add variant without trailing slash just in case
        if (route !== '/') validRoutes.add(route.slice(0, -1));
    }

    // b. Cities
    const cityFiles = await glob('*.md', { cwd: CONTENT_CITIES_DIR });
    const validCities = new Set();
    for (const file of cityFiles) {
        const slug = file.replace(/\.md$/, '');
        validCities.add(slug);
        validRoutes.add(`/service-areas/${slug}/`);
        validRoutes.add(`/service-areas/${slug}`);
    }
    console.log(`Found ${validCities.size} cities.`);

    // c. Regions (Hardcoded based on inspection)
    const regions = ['central-florida', 'tampa-bay', 'south-florida', 'southwest-florida'];
    for (const region of regions) {
        validRoutes.add(`/service-areas/${region}/`);
        validRoutes.add(`/service-areas/${region}`);
    }

    // d. Special hardcoded valid routes (e.g. sitemap.xml if generated later)
    validRoutes.add('/sitemap-index.xml');
    validRoutes.add('/sitemap-0.xml');
    validRoutes.add('/sitemap.html'); // We just added this

    // 2. Scan Footer for Links
    const footerPath = path.join(SRC_DIR, 'components/common/Footer.astro');
    if (!fs.existsSync(footerPath)) {
        console.error('Footer not found!');
        return;
    }

    const footerContent = fs.readFileSync(footerPath, 'utf-8');
    // Regex to find href="..."
    const hrefRegex = /href="([^"]+)"|href='([^']+)'/g;
    let match;
    const linksToCheck = [];

    while ((match = hrefRegex.exec(footerContent)) !== null) {
        const url = match[1] || match[2];
        if (url.startsWith('/')) {
            linksToCheck.push(url);
        }
    }

    console.log(`Found ${linksToCheck.length} internal links in Footer.`);

    // 3. Verify Links
    let errors = 0;
    for (const link of linksToCheck) {
        // Normalize link for checking (remove hash)
        const linkPath = link.split('#')[0];

        // exact match
        let isValid = validRoutes.has(linkPath);

        // try adding/removing trailing slash
        if (!isValid) {
            if (linkPath.endsWith('/')) {
                isValid = validRoutes.has(linkPath.slice(0, -1));
            } else {
                isValid = validRoutes.has(linkPath + '/');
            }
        }

        if (!isValid) {
            // Special check for dynamic routes that might be missed
            // e.g. /remodeling/#kitchen -> /remodeling/ is valid
            if (validRoutes.has(linkPath)) {
                isValid = true;
            } else {
                // Check if it's a known missing page
                console.error(`[BROKEN] ${link}`);
                errors++;
            }
        } else {
            // console.log(`[OK] ${link}`);
        }
    }

    if (errors === 0) {
        console.log('✅ All Footer links appear valid (based on file existence).');
    } else {
        console.log(`❌ Found ${errors} broken links.`);
        process.exit(1);
    }
}

main().catch(console.error);
