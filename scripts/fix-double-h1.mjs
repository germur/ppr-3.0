#!/usr/bin/env node
// In blog MDX/MD content, the layout already renders the post title as H1.
// Any `# Heading` in the content body creates a duplicate H1.
// Demotes all headings in body by one level: # → ##, ## → ###, etc.

import fs from 'node:fs';

const files = [
  'src/content/blog/impact-windows-vs-shutters.mdx',
  'src/content/blog/mold-remediation-cost-2025.mdx',
  'src/content/blog/commercial-renovation-roi-miami.mdx',
  'src/content/blog/fire-damage-restoration-timeline.mdx',
  'src/content/blog/hoa-hurricane-prep-checklist-2025.mdx',
  'src/content/blog/kitchen-trends-2026.mdx',
  'src/content/blog/spa-bathroom-remodel.mdx',
  'src/content/blog/home-insurance-mold-coverage-florida.mdx',
  'src/content/blog/commercial-hurricane-prep.md',
  'src/content/blog/mold-test-kits-vs-pro.mdx',
  'src/content/blog/drone-roof-inspection-hurricane.mdx',
  'src/content/blog/historic-home-restoration-coral-gables.mdx',
];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');

  // Normalize line endings for detection, keep original for slicing
  const normalized = original.replace(/\r\n/g, '\n');

  // Find the closing --- of frontmatter (skip the opening one)
  const firstDash = normalized.indexOf('---');
  const fmEnd = normalized.indexOf('\n---', firstDash + 3);
  if (fmEnd === -1) {
    console.log(`SKIP (no frontmatter end found): ${file}`);
    continue;
  }

  const fmEndPos = fmEnd + 4; // past "\n---"
  const frontmatter = original.slice(0, fmEndPos);
  const body = original.slice(fmEndPos);

  // Count h1s before changing
  const h1count = (body.replace(/\r\n/g, '\n').match(/^# /gm) || []).length;

  if (h1count === 0) {
    console.log(`SKIP (no h1 in body): ${file}`);
    continue;
  }

  // Demote headings in body
  const fixedBody = body.replace(/^(#{1,5})[ \t]/gm, (match, hashes) => `${hashes}# `);

  fs.writeFileSync(file, frontmatter + fixedBody);
  console.log(`DONE (${h1count} h1→h2): ${file}`);
}
