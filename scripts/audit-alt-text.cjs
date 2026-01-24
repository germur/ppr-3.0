
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const scanDir = 'src';
const patterns = ['**/*.astro', '**/*.tsx', '**/*.jsx', '**/*.mdx'];

// Regex to find img tags and Image components
const imgRegex = /<img\s+[^>]*>/g;
const imageComponentRegex = /<Image\s+[^>]*>/g;

let issuesFound = 0;

patterns.forEach(pattern => {
    const files = glob.sync(path.join(scanDir, pattern));

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');

        let match;

        // Check standard <img> tags
        while ((match = imgRegex.exec(content)) !== null) {
            const imgTag = match[0];
            if (!imgTag.includes('alt=') || imgTag.includes('alt=""') || imgTag.includes("alt=''")) {
                // Find line number
                const lineNum = content.substring(0, match.index).split('\n').length;
                console.log(`[MISSING ALT] ${file}:${lineNum} -> ${imgTag}`);
                issuesFound++;
            }
        }

        // Check Astro <Image /> components
        while ((match = imageComponentRegex.exec(content)) !== null) {
            const imgTag = match[0];
            if (!imgTag.includes('alt=')) {
                const lineNum = content.substring(0, match.index).split('\n').length;
                console.log(`[MISSING ALT PROP] ${file}:${lineNum} -> ${imgTag}`);
                issuesFound++;
            }
        }
    });
});

if (issuesFound === 0) {
    console.log("✅ No missing alt text issues found!");
} else {
    console.log(`\n❌ Found ${issuesFound} images with missing or empty alt text.`);
}
