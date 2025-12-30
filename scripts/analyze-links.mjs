
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Configuration
const SRC_DIR = './src';
const PAGES_DIR = './src/pages';
const DATA_DIR = './src/data'; // For checking if dynamic routes have data

// Helper to find all files in src
async function getSourceFiles() {
    return await glob(`${SRC_DIR}/**/*.{astro,jsx,tsx,html,js,ts}`, { ignore: 'node_modules/**' });
}

// Helper to extract hrefs from content
function extractHrefs(content) {
    // Regex to match href="..." or href='...'
    const regex = /href=["']([^"']+)["']/g;
    const hrefs = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        hrefs.push(match[1]);
    }
    return hrefs;
}

// Helper to check if a route exists
function routeExists(route) {
    // 1. Clean the route
    let cleanRoute = route.split('#')[0].split('?')[0];
    if (cleanRoute.endsWith('/') && cleanRoute.length > 1) {
        cleanRoute = cleanRoute.slice(0, -1);
    }
    if (cleanRoute === '') cleanRoute = '/';

    // 2. Direct file check
    // /about -> src/pages/about.astro or src/pages/about.md or src/pages/about/index.astro
    const possiblePaths = [
        path.join(PAGES_DIR, `${cleanRoute}.astro`),
        path.join(PAGES_DIR, `${cleanRoute}.md`),
        path.join(PAGES_DIR, `${cleanRoute}.mdx`),
        path.join(PAGES_DIR, cleanRoute, 'index.astro'),
        path.join(PAGES_DIR, cleanRoute, 'index.md'),
        path.join(PAGES_DIR, cleanRoute, 'index.mdx'),
        path.join(PAGES_DIR, `${cleanRoute}.html`), // unlikely but possible
    ];

    for (const p of possiblePaths) {
        if (fs.existsSync(p)) return true;
    }

    // 3. Dynamic route check (Basic heuristic)
    // If we can't find a static file, we check for dynamic patterns.
    // This is hard to do perfectly without running Astro's router, but we can guess.
    // e.g. /service-areas/miami/water-damage -> src/pages/service-areas/[region]/[city]/[service].astro

    // We will list all dynamic pages and see if we can match against them.
    // simpler approach: return 'potential-dynamic' if not found statically.

    return false;
}

// Manually mapping some known dynamic structures for "better" verification
function isLikelyDynamic(route) {
    if (route.startsWith('/service-areas/')) return true;
    if (route.startsWith('/restoration/')) return true; // Some might be static, but many are dynamic or rewritten
    if (route.startsWith('/blog/')) return true;
    if (route.startsWith('/resources/')) return true; // Resources often dynamic
    return false;
}

async function analyze() {
    const files = await getSourceFiles();
    const links = new Set();
    const brokenLinks = [];
    const emptyLinks = [];
    const validLinks = new Set();
    const dynamicLinks = new Set();

    console.log(`Scanning ${files.length} files...`);

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const fileHrefs = extractHrefs(content);

        for (const href of fileHrefs) {
            // Filter external links, anchors, mailto, tel
            if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
                continue;
            }

            if (href === '' || href === '#') {
                emptyLinks.push({ file, href });
                continue;
            }

            // Internal links start with /
            if (href.startsWith('/')) {
                links.add(href);

                if (routeExists(href)) {
                    validLinks.add(href);
                } else if (isLikelyDynamic(href)) {
                    // We assume it's valid for now, or check deeper if needed.
                    // For the user's request, listing these "likely dynamic" ones is useful to see coverage.
                    dynamicLinks.add(href);
                } else {
                    brokenLinks.push({ file, href });
                }
            }
        }
    }

    // Report
    console.log('\n--- Analysis Report ---');
    console.log(`Total Unique Internal Links Found: ${links.size}`);
    console.log(`Verified Static Links: ${validLinks.size}`);
    console.log(`Likely Dynamic Links (Need manual check or are generated): ${dynamicLinks.size}`);

    if (brokenLinks.length > 0) {
        console.log(`\nPotential Broken Links: ${brokenLinks.length}`);
        const grouped = {};
        brokenLinks.forEach(item => {
            if (!grouped[item.href]) grouped[item.href] = [];
            grouped[item.href].push(item.file);
        });

        for (const [link, files] of Object.entries(grouped)) {
            // Filter out obvious false positives if necessary
            console.log(`- ${link} (referenced in ${files.length} files)`);
            if (files.length < 5) {
                files.forEach(f => console.log(`    > ${f}`));
            } else {
                console.log(`    > ${files[0]} and ${files.length - 1} others`);
            }
        }
    } else {
        console.log('\nNo obvious broken static links found.');
    }

    if (emptyLinks.length > 0) {
        console.log(`\nEmpty/Placeholder Links (href="#" or href=""): ${emptyLinks.length} instances`);
        // We might want to list files with many placeholders
    }
}

analyze().catch(console.error);
