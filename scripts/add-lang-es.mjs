#!/usr/bin/env node
// Adds `lang: es` to frontmatter of the 9 Spanish blog posts.
import fs from 'node:fs';

const files = [
  'src/content/blog/impact-windows-vs-shutters.mdx',
  'src/content/blog/mold-remediation-cost-2025.mdx',
  'src/content/blog/hoa-hurricane-prep-checklist-2025.mdx',
  'src/content/blog/kitchen-trends-2026.mdx',
  'src/content/blog/spa-bathroom-remodel.mdx',
  'src/content/blog/home-insurance-mold-coverage-florida.mdx',
  'src/content/blog/mold-test-kits-vs-pro.mdx',
  'src/content/blog/drone-roof-inspection-hurricane.mdx',
  'src/content/blog/historic-home-restoration-coral-gables.mdx',
];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('lang: es')) {
    console.log(`SKIP (already set): ${file}`);
    continue;
  }
  // Insert lang: es before the closing ---
  const updated = content.replace(/^---\n([\s\S]*?)\n---/, (match, body) => {
    return `---\n${body}\nlang: es\n---`;
  });
  fs.writeFileSync(file, updated);
  console.log(`DONE: ${file}`);
}
