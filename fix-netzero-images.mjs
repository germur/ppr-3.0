// Reemplaza las 6 URLs googleusercontent (aida-public) del post net-zero
// por imágenes Unsplash estables. Ejecutar: node fix-netzero-images.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const f = 'src/content/blog/net-zero-ev-ready-florida.mdx';
let s = readFileSync(f, 'utf8');

// Reemplazos por alt-text / posición (orden de aparición)
const byAlt = {
  'Modern Florida home with solar panels and clear sky':
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2572&auto=format&fit=crop',
  'Author profile picture':
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
  'Diagram showing solar energy flow in a modern home':
    'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?q=80&w=2570&auto=format&fit=crop',
  'Modern heat pump water heater installation':
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2570&auto=format&fit=crop',
  'Smart electrical panel interior':
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2569&auto=format&fit=crop',
};

// 1) frontmatter image: (es la misma que el hero principal)
s = s.replace(
  /image:\s*"https:\/\/lh3\.googleusercontent\.com\/aida-public\/[A-Za-z0-9_\-]*"/,
  'image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2572&auto=format&fit=crop"'
);

// 2) cada <img ...> con googleusercontent, segun su alt
s = s.replace(/<img[^>]*googleusercontent[^>]*>/g, (block) => {
  for (const [alt, url] of Object.entries(byAlt)) {
    if (block.includes(alt)) {
      return block.replace(
        /src="https:\/\/lh3\.googleusercontent\.com\/aida-public\/[A-Za-z0-9_\-]*"/,
        `src="${url}"`
      );
    }
  }
  return block; // sin match de alt: dejar igual (no deberia pasar)
});

writeFileSync(f, s, 'utf8');
const left = (s.match(/googleusercontent/g) || []).length;
console.log(`Listo. URLs googleusercontent restantes: ${left} (debe ser 0)`);
