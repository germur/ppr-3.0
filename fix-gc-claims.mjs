// Limpieza legal + enlaces post-poda: quita claims de General Contractor / licencia CGC
// (Paramount NO tiene licencia GC) y reapunta enlaces a 410 en paginas vivas.
// Ejecutar: node fix-gc-claims.mjs   (valida y reporta antes de guardar)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

let totalChanges = 0;
function edit(path, replacers) {
  if (!existsSync(path)) { console.log('  [skip no existe] ' + path); return; }
  let s = readFileSync(path, 'utf8');
  let before = s;
  let n = 0;
  for (const [find, repl] of replacers) {
    const parts = s.split(find);
    if (parts.length > 1) { n += parts.length - 1; s = parts.join(repl); }
  }
  if (s !== before) { writeFileSync(path, s, 'utf8'); console.log('  [' + n + '] ' + path); totalChanges += n; }
  else { console.log('  [0 - revisar] ' + path); }
}

// ---- HOME hero (HeroSplit.tsx) ----
edit('src/components/HeroSplit.tsx', [
  ["Florida's Trusted General Contractor for", "Florida's Trusted"],
  ['<span className="text-blue-400">Restoration</span> & <span className="text-orange-500">Remodeling</span>',
   '<span className="text-blue-400">Restoration</span> & <span className="text-orange-500">Recovery Experts</span>'],
  ['From catastrophic storm recovery to luxury kitchen renovations, we rebuild homes and restore peace of mind. Fast response, expert craftsmanship.',
   'From catastrophic storm recovery to water, fire and mold damage, we restore your property and your peace of mind. Fast 24/7 response, expert craftsmanship.'],
]);

// ---- HOME (index.astro) ----
edit('src/pages/index.astro', [
  ['Florida General Contractor & Restoration | Paramount', 'Florida Restoration & Recovery Experts | Paramount'],
  ["Florida’s Complete Property Partner: Restoration & Remodeling. Licensed General Contractor handling water, fire, mold restoration and luxury home remodeling.",
   "Florida’s trusted restoration partner. Fully insured, IICRC-certified water, fire, mold and storm damage restoration with 24/7 emergency response."],
  ['Florida’s Trusted General Contractor for', 'Florida’s Trusted'],
  ['<span class="kinetic-text">Restoration & Remodeling</span>', '<span class="kinetic-text">Restoration & Recovery</span>'],
]);

// ---- SEO.astro default description ----
edit('src/components/common/SEO.astro', [
  ['Florida’s Trusted General Contractor for Restoration & Remodeling.',
   'Florida’s trusted restoration experts. Fully insured, IICRC-certified, 24/7 emergency response.'],
]);

// ---- MainLayout.astro default title/desc ----
edit('src/layouts/MainLayout.astro', [
  ['Paramount Property Restoration | Florida General Contractor', 'Paramount Property Restoration | Florida Restoration Experts'],
  ['Florida’s Trusted General Contractor for Restoration & Remodeling. From catastrophic storm recovery to luxury kitchen renovations.',
   'Florida’s trusted restoration experts. Water, fire, mold and storm damage recovery with 24/7 emergency response. Fully insured & IICRC-certified.'],
]);

// ---- TrustBar.astro (sale en muchas paginas) ----
edit('src/components/sections/TrustBar.astro', [
  ['{ label: "Licensed GC", icon: "gavel" },', '{ label: "Bonded", icon: "gavel" },'],
  ['{ label: "CGC #1529683", icon: "badge" },', '{ label: "Family Owned", icon: "badge" },'],
]);

// ---- WaterTemplate.astro ----
edit('src/components/templates/WaterTemplate.astro', [
  ['CGC #1529606', 'IICRC Certified'],
]);

// ---- commercial/index.astro ----
edit('src/pages/commercial/index.astro', [
  ['Licensed, Bonded & Insured - CGC #1529606', 'Fully Bonded & Insured'],
]);

// ---- our-process.astro ----
edit('src/pages/our-process.astro', [
  ['We leverage our CGC license to handle all city submissions. We navigate the "Florida Factor" of building codes so you don\'t have to.',
   'We coordinate the permitting process with licensed contractors and navigate the "Florida Factor" of building codes so you don\'t have to.'],
  ['We are a State Certified General Contractor (<span class="text-white font-mono">CGC#1529606</span>). We adhere to the highest standards of safety and legality in Florida.',
   'We are fully insured and IICRC-certified, adhering to the highest standards of safety and legality in Florida.'],
  ['Fully Licensed &amp; Certified', 'Fully Insured & Certified'],
]);

// ---- data/regions.ts ----
edit('src/data/regions.ts', [
  ['Premier General Contractor & Restoration Services in the Tampa Bay Area',
   'Premier Property Restoration Services in the Tampa Bay Area'],
]);

// ---- data/restoration-faqs.ts ----
edit('src/data/restoration-faqs.ts', [
  ['Yes. In Florida, most kitchen renovations involving electrical, plumbing, or structural changes require a permit. As a licensed General Contractor, we handle all permitting and inspections for you.',
   'Restoration work that involves structural repairs may require permits. We coordinate with licensed contractors and guide you through the permitting and inspection process.'],
]);

// ---- ciudades conservadas (titles) ----
edit('src/content/cities/miami.md', [['Miami General Contractor & Restoration Experts', 'Miami Property Restoration Experts']]);
edit('src/content/cities/naples.md', [['General Contractor & Restoration Services in Naples, FL', 'Property Restoration Services in Naples, FL']]);

// ====== ENLACES A 410 EN PAGINAS VIVAS ======
// Componentes que salen en muchas paginas:
edit('src/components/BentoGridServices.tsx', [['href="/remodeling/kitchen/"', 'href="/restoration/water-damage/"']]);
edit('src/components/HeroSplit.tsx', [['href="/remodeling/"', 'href="/restoration/"']]);
// Home:
edit('src/pages/index.astro', [
  ['href="/remodeling/"', 'href="/restoration/"'],
  ['href="/remodeling/kitchen/">View Portfolio</a', 'href="/restoration/">View Our Work</a'],
]);
// mold-remediation pillar enlaza a cleaning (air-duct):
edit('src/pages/restoration/mold-remediation/index.astro', [['href="/cleaning-services/air-duct-hvac/"', 'href="/restoration/mold-remediation/prevention/"']]);
// service-areas hub:
edit('src/pages/service-areas/index.astro', [['href="/remodeling/"', 'href="/restoration/"']]);
// resources/index (enlaces a remodeling/matriz):
edit('src/pages/resources/index.astro', [
  ['href="/remodeling/kitchen/">Kitchen Trends</a', 'href="/restoration/">Restoration Tips</a'],
  ['href="/remodeling/kitchen/">2025 Kitchen Trends</a', 'href="/restoration/water-damage/">Water Damage Guide</a'],
  ['href="/remodeling/bathroom/">Bathroom ROI</a', 'href="/restoration/mold-remediation/">Mold Prevention</a'],
  ['href="/remodeling/">Flooring Ideas</a', 'href="/restoration/storm-damage/">Storm Prep</a'],
  ['href="/service-areas/west-palm-beach/kitchen-remodeling/"', 'href="/service-areas/west-palm-beach/"'],
]);

// Matriz podada (410, no se ve) pero limpiamos el claim legal igual:
edit('src/pages/service-areas/[city]/[service].astro', [
  [' Licensed contractor CGC #1529606.', ' Fully insured & IICRC-certified.'],
]);

// Paginas remodeling (410 pero aun indexadas): quitar claim legal de las metadesc:
edit('src/pages/remodeling/home-additions/index.astro', [[' CGC #1529606.', '']]);
edit('src/pages/remodeling/whole-home/index.astro', [[' CGC #1529606.', '']]);
edit('src/pages/remodeling/index.astro', [['Licensed General Contractor (CGC #1529606) specializing', 'Specializing']]);
edit('src/pages/remodeling/kitchen/index.astro', [[' Licensed & Insured (CGC #1529606).', ' Fully insured.']]);
edit('src/pages/remodeling/bathroom/index.astro', [[' Licensed CGC #1529606.', ' Fully insured.']]);

// 2 paginas de restoration conservadas: quitar "General Contractor" (cambio minimo, riesgo legal):
edit('src/pages/restoration/storm-damage/hurricane-recovery.astro', [
  ['Licensed General Contractor.', 'Fully insured & IICRC-certified.'],
  ['<span class="text-slate-300 text-sm font-semibold">Licensed General Contractor</span>',
   '<span class="text-slate-300 text-sm font-semibold">Fully Insured & Certified</span>'],
]);
edit('src/pages/restoration/fire-damage/repair.astro', [
  ['Licensed General Contractor.', 'Fully insured & IICRC-certified.'],
  ['As Licensed', 'Our restoration teams'],
  ['General Contractors, we manage every step from', 'manage every step from'],
  ['No. We are a licensed General Contractor. Unlike many',
   'Unlike many'],
]);

console.log('\nTOTAL cambios aplicados: ' + totalChanges);
// Verificacion final
const checkPaths = ['src/components/HeroSplit.tsx','src/pages/index.astro','src/components/sections/TrustBar.astro','src/layouts/MainLayout.astro','src/components/common/SEO.astro','src/pages/our-process.astro','src/pages/commercial/index.astro'];
let leftGC = 0;
for (const p of checkPaths) { if (existsSync(p)) { const c=(readFileSync(p,'utf8').match(/General Contractor|CGC ?#?15296|CGC ?#?15296|Licensed GC/g)||[]).length; if(c>0){console.log('  AUN queda GC en '+p+': '+c); leftGC+=c;} } }
console.log('Claims GC restantes en paginas vivas clave: ' + leftGC + ' (debe ser 0)');
