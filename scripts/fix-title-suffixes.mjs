#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'src');
const EXTS = new Set(['.astro', '.tsx', '.ts', '.js', '.mjs']);

// All patterns → | Paramount (longest/most specific first)
const REPLACEMENTS = [
  // pipe variants
  [/\| Paramount Property Restoration\b/g, '| Paramount'],
  [/\| Paramount Property Resources\b/g,   '| Paramount'],
  [/\| Paramount Property\b/g,             '| Paramount'],
  [/\| Paramount Restoration\b/g,          '| Paramount'],
  [/\| PPR\b/g,                            '| Paramount'],
  // dash variants (space-dash-space)
  [/ - Paramount Property Restoration\b/g, ' | Paramount'],
  [/ - Paramount Property\b/g,             ' | Paramount'],
  [/ - Paramount Restoration\b/g,          ' | Paramount'],
];

let totalFiles = 0;
let totalFixes = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      walk(full);
    } else if (EXTS.has(path.extname(entry.name))) {
      processFile(full);
    }
  }
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;
  let fixes = 0;

  for (const [pattern, replacement] of REPLACEMENTS) {
    const count = (updated.match(pattern) || []).length;
    if (count > 0) {
      updated = updated.replace(pattern, replacement);
      fixes += count;
    }
  }

  if (fixes > 0) {
    fs.writeFileSync(filePath, updated);
    totalFiles++;
    totalFixes += fixes;
    console.log(`  ${String(fixes).padStart(2)}  ${path.relative(process.cwd(), filePath)}`);
  }
}

console.log('Fixing title suffixes (pass 2)...\n');
walk(ROOT);
console.log(`\nDone: ${totalFixes} replacements across ${totalFiles} files.`);
