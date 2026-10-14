import fs from 'fs';
import path from 'path';

const jsonPath = 'C:\\Users\\NOWEB  DESKTOP\\Downloads\\catalogo_real_pekebook.json';
const csvPath = 'C:\\Users\\NOWEB  DESKTOP\\Downloads\\web.csv';

const rawJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const csvText = fs.readFileSync(csvPath, 'utf8');

// Parse CSV
const csvRows = [];
const lines = csvText.split('\n');
for (let l of lines) {
  const parts = l.split('","').map(s => s.replace(/^"|"$/g, '').trim());
  if (parts.length >= 2 && parts[0] && parts[0] !== 'x1iyjqo2') {
    let name = parts[0];
    let price = 0;
    let desc = '';
    for (let p of parts.slice(1)) {
      if (p.includes('CLP') || p.includes('$')) {
        const num = p.replace(/[^\d]/g, '');
        if (num) price = parseInt(num, 10);
      } else if (p.length > 5 && !desc) {
        desc = p;
      }
    }
    csvRows.push({ name, price, desc });
  }
}

console.log(`JSON items: ${rawJson.length}, CSV items: ${csvRows.length}`);

// Categorias y mapeo
const CATEGORY_MAP = {
  sublimacion: ['tazon', 'taza', 'sublimable', 'sublimar', 'shoperos', 'enlozado', 'vaso', 'mate', 'rompecabeza', 'jockey', 'glitter'],
  botellas: ['botella', 'termo', 'mug', 'sport', 'cantimplora', 'succionador'],
  textil: ['polera', 'poleron', 'canguro', 'pantuflas', 'estuche'],
  papeleria: ['opalina', 'resma', 'papel', 'cinta', 'cajas', 'texturado'],
  encuadernacion: ['anillo', 'micas', 'pouch', 'paso 2:1', 'plastificar'],
  accesorios: ['borla', 'llavero', 'llav ero', 'chapitas', 'iman', 'pvc'],
  insumos: ['tinta', 'guantes', 'lapices']
};

function getCategory(title) {
  const t = title.toLowerCase();
  for (const [cat, words] of Object.entries(CATEGORY_MAP)) {
    if (words.some(w => t.includes(w))) return cat;
  }
  return 'sublimacion';
}

const allProducts = [];
const seenNames = new Set();

// 1. Agregar los 20 productos con sus fotos reales ya extraídas
rawJson.forEach((item, idx) => {
  let title = item.title.trim();
  if (title.toLowerCase().startsWith('tazón blanco') && title.length > 15) title = 'Tazón Blanco 11 oz Sublimación';
  if (title.toLowerCase().startsWith('anillo metálico') && title.length > 15) title = 'Anillo Metálico Wire-O Paso 2:1';
  if (title.toLowerCase().startsWith('botella de colores') && title.length > 20) title = 'Botella de Colores Sublimable';
  title = title.charAt(0).toUpperCase() + title.slice(1);

  let price = 0;
  const match = (item.priceText || '').match(/CLP\s*([\d\.,]+)/i) || (item.priceText || '').match(/\$\s*([\d\.,]+)/i);
  if (match) price = parseInt(match[1].replace(/[^\d]/g, ''), 10) || 0;
  if (price === 0) {
    const csvMatch = csvRows.find(c => c.name.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(c.name.toLowerCase()));
    if (csvMatch) price = csvMatch.price;
  }
  if (title.toLowerCase().includes('tazón blanco') && price === 0) price = 1000;
  if (title.toLowerCase().includes('shoperos magico') && price === 0) price = 4000;
  if (title.toLowerCase().includes('polera algodón') && price < 1000) price = 4990;

  seenNames.add(title.toLowerCase());
  const category = getCategory(title);

  allProducts.push({
    id: `peke-wa-${idx + 1}`,
    name: title,
    category: category,
    price: price,
    unit: 'c/u',
    image: `/products/catalog/wa_${idx + 1}.jpg`,
    description: item.desc || `${title} disponible en Librería & Bazar Pekebook Puerto Montt.`,
    isPromo: idx < 6,
    isNew: idx < 10,
    badge: idx < 4 ? 'Más Vendido' : (idx < 8 ? 'Destacado' : null),
    tags: [category, 'Sublimación', 'Pekebook']
  });
});

// 2. Agregar los productos de web.csv que no estén duplicados
csvRows.forEach((cItem) => {
  let cleanName = cItem.name.trim();
  cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

  // Verificar si ya está incluido
  const alreadyIn = allProducts.some(p => 
    p.name.toLowerCase() === cleanName.toLowerCase() ||
    (cleanName.length > 6 && p.name.toLowerCase().includes(cleanName.toLowerCase())) ||
    (p.name.length > 6 && cleanName.toLowerCase().includes(p.name.toLowerCase()))
  );

  if (!alreadyIn) {
    const category = getCategory(cleanName);
    
    // Asignar imagen inteligente según el tipo de producto
    let fallbackImg = '/placeholder-product.svg';
    const lower = cleanName.toLowerCase();
    if (lower.includes('taz') || lower.includes('mug')) fallbackImg = '/products/catalog/wa_1.jpg';
    else if (lower.includes('botella') || lower.includes('vaso')) fallbackImg = '/products/catalog/wa_3.jpg';
    else if (lower.includes('mica') || lower.includes('anillo') || lower.includes('encuadernar')) fallbackImg = '/products/catalog/wa_2.jpg';
    else if (lower.includes('tinta')) fallbackImg = '/products/catalog/wa_10.jpg';
    else if (lower.includes('shoper')) fallbackImg = '/products/catalog/wa_4.jpg';
    else if (lower.includes('poleron') || lower.includes('pantuflas')) fallbackImg = '/products/catalog/wa_12.jpg';
    else if (lower.includes('termo')) fallbackImg = '/products/catalog/wa_18.jpg';
    else if (lower.includes('borla') || lower.includes('llavero')) fallbackImg = '/products/catalog/wa_6.jpg';

    allProducts.push({
      id: `peke-wa-${allProducts.length + 1}`,
      name: cleanName,
      category: category,
      price: cItem.price || 0,
      unit: 'c/u',
      image: fallbackImg,
      description: cItem.desc || `${cleanName} de excelente calidad disponible en Pekebook.`,
      isPromo: false,
      isNew: false,
      badge: null,
      tags: [category, 'WhatsApp', 'Pekebook']
    });
  }
});

console.log(`Total productos combinados en catálogo: ${allProducts.length}`);

// Calcular conteos por categoría
const catCounts = {};
allProducts.forEach(p => {
  catCounts[p.category] = (catCounts[p.category] || 0) + 1;
});
console.log('Distribución de categorías:', catCounts);

// Actualizar CATEGORIES en pekebookData.js
const updatedCategories = [
  { id: "todos", name: "Todo el catálogo", icon: "Sparkles", count: allProducts.length },
  { id: "sublimacion", name: "Sublimación & Tazones", icon: "Printer", count: catCounts["sublimacion"] || 0 },
  { id: "botellas", name: "Botellas & Mugs", icon: "Gift", count: catCounts["botellas"] || 0 },
  { id: "encuadernacion", name: "Encuadernación", icon: "Layers", count: catCounts["encuadernacion"] || 0 },
  { id: "papeleria", name: "Papelería & Papeles", icon: "FileText", count: catCounts["papeleria"] || 0 },
  { id: "textil", name: "Textil & Poleras", icon: "Sparkles", count: catCounts["textil"] || 0 },
  { id: "insumos", name: "Tintas & Materiales", icon: "Palette", count: catCounts["insumos"] || 0 },
  { id: "accesorios", name: "Accesorios & Llaveros", icon: "Gift", count: catCounts["accesorios"] || 0 }
];

// Inyectar en src/data/pekebookData.js
const dataFilePath = path.resolve('src/data/pekebookData.js');
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Reemplazar CATEGORIES
const catRegex = /export const CATEGORIES = \[[\s\S]*?\];/;
const newCatCode = `export const CATEGORIES = ${JSON.stringify(updatedCategories, null, 2)};`;
fileContent = fileContent.replace(catRegex, newCatCode);

// Reemplazar PRODUCTS
const prodRegex = /export const PRODUCTS = \[[\s\S]*?\];/;
const newProdCode = `export const PRODUCTS = ${JSON.stringify(allProducts, null, 2)};`;
fileContent = fileContent.replace(prodRegex, newProdCode);

fs.writeFileSync(dataFilePath, fileContent, 'utf8');
console.log(`✓ ÉXITO: pekebookData.js actualizado con los ${allProducts.length} productos reales y sus categorías.`);
