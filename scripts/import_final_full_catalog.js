import fs from 'fs';
import path from 'path';

const downloadsDir = 'C:\\Users\\NOWEB  DESKTOP\\Downloads';
const candidateFiles = [
  path.join(downloadsDir, 'catalogo_completo_pekebook (1).json'),
  path.join(downloadsDir, 'catalogo_completo_pekebook.json'),
  path.join(downloadsDir, 'catalogo_real_pekebook.json')
];

const targetFile = candidateFiles.find(f => fs.existsSync(f));
console.log(`Leyendo archivo fuente: ${targetFile}`);

const rawJson = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
console.log(`Total productos crudos: ${rawJson.length}`);

const imgDir = path.resolve('public/products/catalog');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// Mapa de categorías
const CATEGORY_MAP = {
  sublimacion: ['tazón', 'taza', 'sublimable', 'sublimar', 'shoperos', 'shopero', 'enlozado', 'vaso', 'mate', 'rompecabeza', 'puzzle', 'jockey', 'glitter'],
  botellas: ['botella', 'termo', 'mug', 'sport', 'cantimplora', 'succionador'],
  textil: ['polera', 'poleron', 'canguro', 'pantuflas', 'estuche'],
  papeleria: ['opalina', 'resma', 'papel', 'cinta', 'cajas', 'texturado'],
  encuadernacion: ['anillo', 'micas', 'pouch', 'paso 2:1', 'plastificar'],
  accesorios: ['borla', 'llavero', 'chapitas', 'iman', 'pvc'],
  insumos: ['tinta', 'guantes', 'lapices']
};

function getCategory(title) {
  const t = title.toLowerCase();
  for (const [cat, words] of Object.entries(CATEGORY_MAP)) {
    if (words.some(w => t.includes(w))) return cat;
  }
  return 'sublimacion';
}

function cleanTitle(raw) {
  let t = raw.trim();
  const lower = t.toLowerCase();

  if (lower.startsWith('tazón blanco') || lower.startsWith('tazon blanco')) return 'Tazón Blanco 11 oz Sublimación';
  if (lower.startsWith('anillo metálico') || lower.startsWith('anillo metalico')) return 'Anillo Metálico Wire-O Paso 2:1';
  if (lower.startsWith('micas para encuadernar')) return 'Micas para Encuadernar Carta / Oficio';
  if (lower.startsWith('opalina blanca oficio grofada')) return 'Opalina Blanca Oficio Grofada 200g (100 Hojas)';
  if (lower.startsWith('opalina blanca oficio lisa')) return 'Opalina Blanca Oficio Lisa 200g (100 Hojas)';
  if (lower.startsWith('papel texturado')) return 'Papel Texturado para Tarjetas 230g';
  if (lower.startsWith('cajas para tarjetas')) return 'Cajas para Tarjetas de Presentación';
  if (lower.startsWith('estuche crea')) return 'Estuche Crea Sublimable';
  if (lower.startsWith('vaso con asa')) return 'Vaso con Asa y Tapa Metálica';
  if (lower.startsWith('guantes protección') || lower.startsWith('guantes proteccion')) return 'Guantes Protección de Calor';
  if (lower.startsWith('tinta alternativa brother')) return 'Tinta Alternativa Brother / Canon 100ml';
  if (lower.startsWith('tarjetas de pvc')) return 'Tarjetas de PVC Imprimible / Sublimable';
  if (lower.startsWith('pantuflas para sublimar')) return 'Pantuflas para Sublimar';
  if (lower.startsWith('mate losa')) return 'Mate Losa Sublimable';
  if (lower.startsWith('termo digital')) return 'Termo Digital con Sensor de Temperatura';
  if (lower.startsWith('tazón glitter duo') || lower.startsWith('tazon glitter duo')) return 'Tazón Glitter Duo Sublimable';
  if (lower.startsWith('tazón glitter') || lower.startsWith('tazon glitter')) return 'Tazón Glitter Sublimable';
  if (lower.startsWith('tazon dorado') || lower.startsWith('tazón dorado')) return 'Tazón Dorado Sublimable';
  if (lower.startsWith('tazón plateado') || lower.startsWith('tazon plateado')) return 'Tazón Plateado Efecto Espejo';
  if (lower.startsWith('tazón 11 oz interior') || lower.startsWith('tazon 11 oz interior')) return 'Tazón 11 oz Interior de Color';
  if (lower.startsWith('tazón mágico glitter') || lower.startsWith('tazon magico glitter')) return 'Tazón Mágico Glitter 11 oz';
  if (lower.startsWith('tazón neón') || lower.startsWith('tazon neon')) return 'Tazón Neón Sublimable 11 oz';
  if (lower.startsWith('termo niños') || lower.startsWith('termo ninos')) return 'Termo Niños y Niñas';
  if (lower.startsWith('tazón colores pasteles') || lower.startsWith('tazon colores pasteles')) return 'Tazón Cerámica Colores Pasteles';
  if (lower.startsWith('tazón empabonados') || lower.startsWith('tazon empabonados')) return 'Tazón Empabonado de Colores';
  if (lower.startsWith('shoperos empabonado') || lower.startsWith('shopero empabonado')) return 'Shopero Empabonado Sublimable';
  if (lower.startsWith('borla decorativa')) return 'Borlas Decorativas con Ribete Pekebook';
  if (lower.startsWith('llav ero') || lower.startsWith('llavero')) return 'Llavero Metálico Sublimable Redondo';
  if (lower.startsWith('rompecabeza') || lower.startsWith('puzzle')) return 'Puzzle / Rompecabezas Sublimable';
  if (lower.startsWith('cinta térmica') || lower.startsWith('cinta termica')) return 'Cinta Térmica para Sublimación';
  if (lower.startsWith('jockey sublimable')) return 'Jockey Trucker Sublimable';
  if (lower.startsWith('tinta alternativa')) return 'Tinta Alternativa Premium';
  if (lower.startsWith('tinta de sublimación') || lower.startsWith('tinta de sublimacion')) return 'Tinta de Sublimación Especializada';
  if (lower.startsWith('polera algodón') || lower.startsWith('polera algodon')) return 'Polera Algodón Niños y Adultos';
  if (lower.startsWith('mate termico') || lower.startsWith('mate térmico')) return 'Mate Térmico con Bombilla Metálica';
  if (lower.startsWith('botella con succionador')) return 'Botella Deportiva con Succionador';
  if (lower.startsWith('shoperos magico') || lower.startsWith('shopero magico')) return 'Shopero Mágico Sublimable';
  if (lower.startsWith('cantimplora')) return 'Cantimplora Sublimable';
  if (lower.startsWith('botella de colores')) return 'Botella de Colores Sublimable';

  // Capitalize general
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function cleanPrice(priceText, title) {
  let price = 0;
  const match = (priceText || '').match(/CLP\s*([\d\.,]+)/i) || (priceText || '').match(/\$\s*([\d\.,]+)/i);
  if (match) {
    price = parseInt(match[1].replace(/[^\d]/g, ''), 10) || 0;
  }
  // Correcciones específicas conocidas
  const lower = title.toLowerCase();
  if (lower.includes('polera') && price < 1000) price = 4990;
  if (lower.includes('anillo') && price === 0) price = 2490;
  if (lower.includes('tazón blanco') && price === 0) price = 1000;
  if (lower.includes('botella de colores') && price === 0) price = 2890;
  return price;
}

const finalProducts = [];
const seenTitles = new Set();
let savedCount = 0;

rawJson.forEach((item, idx) => {
  const title = cleanTitle(item.title || '');
  if (!title || seenTitles.has(title.toLowerCase())) return;
  seenTitles.add(title.toLowerCase());

  const price = cleanPrice(item.priceText, title);
  let imageUrl = '/placeholder-product.svg';

  if (item.image && item.image.startsWith('data:')) {
    try {
      const base64Data = item.image.split(',')[1];
      const filename = `real_prod_${savedCount + 1}.jpg`;
      const diskPath = path.join(imgDir, filename);
      fs.writeFileSync(diskPath, Buffer.from(base64Data, 'base64'));
      imageUrl = `/products/catalog/${filename}`;
      savedCount++;
    } catch (e) {
      console.error(`Error guardando imagen para ${title}:`, e.message);
    }
  }

  const category = getCategory(title);

  finalProducts.push({
    id: `peke-real-${savedCount}`,
    name: title,
    category: category,
    price: price,
    unit: 'c/u',
    image: imageUrl,
    description: item.desc || `${title} disponible en Librería & Bazar Pekebook Puerto Montt.`,
    isPromo: savedCount <= 6,
    isNew: savedCount <= 12,
    badge: savedCount <= 4 ? 'Más Vendido' : (savedCount <= 8 ? 'Destacado' : null),
    tags: [category, 'Catálogo WhatsApp', 'Pekebook']
  });
});

console.log(`✓ Total productos únicos importados con fotos reales: ${finalProducts.length}`);
console.log(`✓ Total imágenes físicas guardadas en disco: ${savedCount}`);

// Calcular categorías
const catCounts = {};
finalProducts.forEach(p => {
  catCounts[p.category] = (catCounts[p.category] || 0) + 1;
});

const updatedCategories = [
  { id: "todos", name: "Todo el catálogo", icon: "Sparkles", count: finalProducts.length },
  { id: "sublimacion", name: "Sublimación & Tazones", icon: "Printer", count: catCounts["sublimacion"] || 0 },
  { id: "botellas", name: "Botellas & Mugs", icon: "Gift", count: catCounts["botellas"] || 0 },
  { id: "encuadernacion", name: "Encuadernación", icon: "Layers", count: catCounts["encuadernacion"] || 0 },
  { id: "papeleria", name: "Papelería & Papeles", icon: "FileText", count: catCounts["papeleria"] || 0 },
  { id: "textil", name: "Textil & Poleras", icon: "Sparkles", count: catCounts["textil"] || 0 },
  { id: "insumos", name: "Tintas & Materiales", icon: "Palette", count: catCounts["insumos"] || 0 },
  { id: "accesorios", name: "Accesorios & Llaveros", icon: "Gift", count: catCounts["accesorios"] || 0 }
];

// Escribir en src/data/pekebookData.js
const dataFilePath = path.resolve('src/data/pekebookData.js');
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

const catRegex = /export const CATEGORIES = \[[\s\S]*?\];/;
fileContent = fileContent.replace(catRegex, `export const CATEGORIES = ${JSON.stringify(updatedCategories, null, 2)};`);

const prodRegex = /export const PRODUCTS = \[[\s\S]*?\];/;
fileContent = fileContent.replace(prodRegex, `export const PRODUCTS = ${JSON.stringify(finalProducts, null, 2)};`);

fs.writeFileSync(dataFilePath, fileContent, 'utf8');
console.log(`✓ pekebookData.js actualizado exitosamente.`);
