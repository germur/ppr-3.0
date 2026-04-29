#!/usr/bin/env node
// Adds trailing slash to internal hrefs that don't have one.
// Skips:
//  - external URLs (http://, https://, //)
//  - anchors (#...)
//  - mailto:, tel:
//  - file extensions (.jpg, .pdf, .xml, .js, .css, .webp, .svg, etc.)
//  - already-slashed hrefs
//  - root href ("/")

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'src');
const EXTENSIONS_TO_PROCESS = new Set(['.astro', '.tsx', '.jsx', '.ts', '.js', '.html', '.md', '.mdx']);

// Match href="/something" or href='/something' where /something has no trailing slash,
// no file extension, no anchor.
// Captures: 1=quote, 2=path
const HREF_RE = /href=(["'])(\/[a-z0-9][a-z0-9\-/]*[a-z0-9])\1/gi;

// File-extension blocklist — don't add slash to asset paths
const EXT_BLOCKLIST = /\.(jpg|jpeg|png|gif|webp|svg|ico|pdf|xml|json|js|mjs|css|woff2?|ttf|otf|mp4|webm|mp3|wav|zip|txt|csv)$/i;

let totalEdits = 0;
const fileEdits = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      walk(full);
    } else if (EXTENSIONS_TO_PROCESS.has(path.extname(entry.name))) {
      processFile(full);
    }
  }
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let edits = 0;
  const updated = original.replace(HREF_RE, (match, quote, p) => {
    if (EXT_BLOCKLIST.test(p)) return match;
    edits++;
    return `href=${quote}${p}/${quote}`;
  });
  if (edits > 0) {
    fs.writeFileSync(filePath, updated);
    totalEdits += edits;
    fileEdits.push({ file: path.relative(process.cwd(), filePath), edits });
  }
}

walk(ROOT);

console.log(`\nTotal href fixes: ${totalEdits}\n`);
for (const { file, edits } of fileEdits.sort((a, b) => b.edits - a.edits)) {
  console.log(`  ${edits.toString().padStart(3)}  ${file}`);
}
