
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const scanDir = 'src';
const patterns = ['**/*.astro', '**/*.tsx', '**/*.jsx', '**/*.ts'];

const searchTerms = [
    { label: 'Phone (Formatted)', term: '(786) 602-2217' },
    { label: 'Phone (Raw)', term: '7866022217' },
    { label: 'Phone (Dashes)', term: '786-602-2217' },
    { label: 'Email', term: 'services@paramountpropertyrestoration.com' },
    { label: 'Address', term: '10890 NW 17th St' },
    { label: 'City/Zip', term: 'Miami, FL 33172' }
];

let totalMatches = 0;
const results = {};

console.log("Scanning for hardcoded contact information...");

patterns.forEach(pattern => {
    const files = glob.sync(path.join(scanDir, pattern));

    files.forEach(file => {
        // Skip config or constant files themselves relative to where they might be expected
        if (file.includes('consts.ts') || file.includes('site.ts') || file.includes('config.ts')) return;

        const content = fs.readFileSync(file, 'utf8');

        searchTerms.forEach(({ label, term }) => {
            if (content.includes(term)) {
                if (!results[label]) results[label] = [];
                // Count occurrences
                const count = content.split(term).length - 1;
                results[label].push({ file, count });
                totalMatches += count;
            }
        });
    });
});

if (totalMatches === 0) {
    console.log("✅ Excellent! No hardcoded values found (excluding likely config files).");
} else {
    console.log(`\n⚠️ Found ${totalMatches} instances of hardcoded contact info.\n`);
    Object.keys(results).forEach(label => {
        console.log(`--- ${label} ---`);
        results[label].forEach(item => {
            console.log(`  ${item.file} (${item.count})`);
        });
    });
}
