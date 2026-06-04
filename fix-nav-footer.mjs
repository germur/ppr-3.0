// Limpieza post-poda SEO v2: elimina Cleaning y Remodeling del menu/footer
// y reapunta enlaces de matriz/regiones (410) a paginas vivas.
// Ejecutar: node fix-nav-footer.mjs   (valida balance de <div> antes de guardar)
import { readFileSync, writeFileSync } from 'node:fs';

const navPath = 'src/components/common/Navigation.astro';
let nav = readFileSync(navPath, 'utf8');
const navBefore = nav.length;
const EOL = nav.includes('\r\n') ? '\r\n' : '\n';

// 1) DESKTOP CLEANING: cortar solo el 5o silo, dejando los cierres de grid+wrapper.
//    Va desde "<!-- Cleaning Silo (NEW) -->" hasta el "<!-- Remodeling Mega Menu Trigger -->",
//    pero reinsertamos los 2 </div> (grid + group) que cerraban la seccion Restoration.
{
  const a = nav.indexOf('<!-- Cleaning Silo (NEW) -->');
  const b = nav.indexOf('<!-- Remodeling Mega Menu Trigger -->');
  if (a === -1 || b === -1) { console.error('ABORT: no hallo limites Cleaning desktop'); process.exit(1); }
  const closes = '        </div>' + EOL + '    </div>' + EOL + EOL + '    ';
  nav = nav.slice(0, a) + closes + nav.slice(b);
  console.log('  [cut] desktop Cleaning (preservando cierres grid+wrapper)');
}
// grid-cols-5 -> grid-cols-4 (ya no hay 5o silo). Solo el primer dropdown (Restoration).
nav = nav.replace('grid grid-cols-5 gap-6 z-50 text-left', 'grid grid-cols-4 gap-6 z-50 text-left');

// 2) DESKTOP REMODELING: es un .group.relative hermano completo -> cortar entero,
//    desde su comentario hasta el bloque "{ links.slice(1)".
{
  const a = nav.indexOf('<!-- Remodeling Mega Menu Trigger -->');
  const re = /\{\s*links\.slice\(1\)/g; re.lastIndex = a;
  const m = re.exec(nav);
  if (a === -1 || !m) { console.error('ABORT: no hallo limites Remodeling desktop'); process.exit(1); }
  nav = nav.slice(0, a) + nav.slice(m.index);
  console.log('  [cut] desktop Remodeling');
}

// 3) MOBILE CLEANING: dropdown autocontenido -> cortar entero
{
  const a = nav.indexOf('<!-- Mobile Cleaning Dropdown (NEW) -->');
  const b = nav.indexOf('<!-- Mobile Remodeling Dropdown -->');
  if (a===-1||b===-1){console.error('ABORT mobile cleaning');process.exit(1);}
  nav = nav.slice(0,a) + nav.slice(b);
  console.log('  [cut] mobile Cleaning');
}
// 4) MOBILE REMODELING: autocontenido -> cortar entero
{
  const a = nav.indexOf('<!-- Mobile Remodeling Dropdown -->');
  const b = nav.indexOf('<!-- Main Links -->');
  if (a===-1||b===-1){console.error('ABORT mobile remodeling');process.exit(1);}
  nav = nav.slice(0,a) + nav.slice(b);
  console.log('  [cut] mobile Remodeling');
}

const opens = (nav.match(/<div\b/g)||[]).length;
const closes = (nav.match(/<\/div>/g)||[]).length;
console.log('  Navigation: <div> abren='+opens+' cierran='+closes+' '+(opens===closes?'OK':'DESBALANCE'));
if (opens!==closes){console.error('  ABORTANDO: desbalance.');process.exit(1);}
const navLeft=(nav.match(/\/remodeling\/|\/cleaning-services\//g)||[]).length;
if(navLeft>0){console.error('  ABORTANDO: quedan '+navLeft+' enlaces rotos en Nav');process.exit(1);}
writeFileSync(navPath, nav, 'utf8');
console.log('  Navigation OK ('+navBefore+' -> '+nav.length+' chars)');

// ---------- FOOTER ----------
const ftPath='src/components/common/Footer.astro';
let ft=readFileSync(ftPath,'utf8');
ft=ft.replace(/href="\/service-areas\/(central-florida|south-florida|tampa-bay|southwest-florida)\/"/g,'href="/service-areas/"');
const map={'water-damage-restoration':'/restoration/water-damage/','mold-remediation':'/restoration/mold-remediation/','fire-damage-restoration':'/restoration/fire-damage/','storm-damage-repair':'/restoration/storm-damage/'};
for(const s in map){ft=ft.replace(new RegExp('href="/service-areas/[a-z-]+/'+s+'/?"','g'),'href="'+map[s]+'"');}
ft=ft.replace(/href="\/remodeling\/#?[a-z-]*\/?"/g,'href="/restoration/"');
ft=ft.replace(/href="\/cleaning-services\/[a-z-]*\/?"/g,'href="/restoration/"');
writeFileSync(ftPath,ft,'utf8');
const ftLeft=(ft.match(/service-areas\/[a-z-]+\/[a-z]/g)||[]).length;
console.log('  Footer OK. Matriz restante: '+ftLeft+' (debe ser 0)');
