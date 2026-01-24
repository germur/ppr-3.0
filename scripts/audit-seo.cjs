
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const scanDir = 'src/pages';
const patterns = ['**/*.astro'];

let issuesFound = 0;

const files = glob.sync(path.join(scanDir, patterns[0]));

console.log(`Scanning ${files.length} pages for unique meta descriptions...`);

files.forEach(file => {
    // Skip dynamic routes or partials often used for injection if necessary, 
    // but usually we want SEO on everything in pages/
    const content = fs.readFileSync(file, 'utf8');

    // Check for Layout Import
    if (content.includes('Layout')) {
        // Look for <MainLayout ... description="..." or description={...}>
        // Simpler regex: Check if 'description=' exists inside the Layout tag

        // Find Layout opening tag
        const layoutMatch = /<[A-Z][a-zA-Z]*Layout([\s\S]*?)>/.exec(content);

        if (layoutMatch) {
            const props = layoutMatch[1];
            if (!props.includes('description=')) {
                console.log(`[MISSING DESC] ${file} -> Uses Layout but no 'description' prop`);
                issuesFound++;
            }
        } else {
            // Maybe it's using a different structure or not using a layout directly (e.g. redirect)
            // Warning if substantial content exists
            if (content.length > 500 && !content.includes('Layout')) {
                console.log(`[NO LAYOUT DETECTED] ${file}`);
            }
        }
    }
});

if (issuesFound === 0) {
    console.log("✅ All pages appear to have custom descriptions passed to Layouts!");
} else {
    console.log(`\n⚠️ Found ${issuesFound} potential SEO issues.`);
}
