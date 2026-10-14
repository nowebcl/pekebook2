import fs from 'fs';
import path from 'path';

// Buscar archivos posibles en Downloads o en la raíz
const downloadsDir = 'C:\\Users\\NOWEB  DESKTOP\\Downloads';
const candidateFiles = [
  path.join(downloadsDir, 'catalogo_real_pekebook.json'),
  path.join(downloadsDir, 'catalogo_con_fotos (1).json'),
  path.join(downloadsDir, 'catalogo_con_fotos.json'),
  path.join(downloadsDir, 'productos_whatsapp.json'),
  path.join(downloadsDir, 'web (1).csv'),
  path.join(downloadsDir, 'web.csv'),
  path.resolve('catalogo_real_pekebook.json'),
  path.resolve('catalogo_con_fotos.json'),
  path.resolve('web.csv')
];

let targetFile = candidateFiles.find(f => fs.existsSync(f));

if (!targetFile) {
  console.log('No se encontró ningún archivo de catálogo en Downloads o en el proyecto.');
  process.exit(1);
}

console.log(`Procesando archivo: ${targetFile}`);

const CATEGORY_KEYWORDS = {
  sublimacion: ['tazon', 'taza', 'sublimable', 'sublimar', 'glitter', 'mug', 'enlozado', 'vaso', 'termo', 'shoperos', 'mate'],
  botellas: ['botella', 'sport', 'termo', 'vaso', 'tapa rosca'],
  textil: ['poleron', 'canguro', 'pantuflas', 'estuche crea'],
  papeleria: ['opalina', 'resma', 'papel', 'tarjetas', 'grofada', 'lisa', 'iman'],
  encuadernacion: ['micas', 'anillo', 'pouch', 'plastificar', 'encuadernar', 'paso 2:1'],
  maquinas: ['maquina', 'chapitas', 'prensa'],
  insumos: ['tinta', 'guantes', 'lapices', 'cajas', 'pvc']
};

function detectCategory(title, desc = '') {
  const text = `${title} ${desc}`.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => text.includes(k))) {
      return cat;
    }
  }
  return 'sublimacion';
}

let products = [];

if (targetFile.endsWith('.json')) {
  const data = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
  products = data.map((item, idx) => ({
    id: `peke-real-${idx + 1}`,
    name: (item.title || item.name || '').trim(),
    category: detectCategory(item.title || item.name, item.description || item.desc),
    price: item.price || 0,
    unit: 'c/u',
    image: item.image || item.img || '/placeholder-product.svg',
    description: item.description || item.desc || `${item.title || item.name} disponible en Pekebook.`,
    isPromo: idx < 8,
    isNew: idx < 12,
    badge: idx < 8 ? 'Más Pedido' : null,
    tags: ['WhatsApp', 'Pekebook']
  }));
} else if (targetFile.endsWith('.csv')) {
  // Parse CSV
  const content = fs.readFileSync(targetFile, 'utf8');
  // Simple CSV parser for quoted multiline strings
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentField);
      if (currentRow.length > 0 && currentRow.some(f => f.trim() !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  const headers = rows[0] || [];
  console.log('Columnas encontradas en el CSV:', headers);

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length === 0) continue;
    
    const name = (row[0] || '').trim();
    if (!name) continue;

    let desc = '';
    let priceStr = '';
    let image = '';

    // Check columns for price, desc, image
    for (let c = 1; c < row.length; c++) {
      const val = (row[c] || '').trim();
      if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('data:image')) {
        image = val;
      } else if (val.includes('CLP') || val.includes('$')) {
        priceStr = val;
      } else if (val.length > 5 && !desc) {
        desc = val;
      }
    }

    let price = 0;
    if (priceStr) {
      const digits = priceStr.replace(/[^\d]/g, '');
      if (digits) price = parseInt(digits, 10);
    }

    products.push({
      id: `peke-real-${r}`,
      name: name,
      category: detectCategory(name, desc),
      price: price,
      unit: 'c/u',
      image: image || '/placeholder-product.svg',
      description: desc || `${name} para personalizar y sublimar en Pekebook.`,
      isPromo: r <= 8,
      isNew: r <= 12,
      badge: r <= 8 ? 'Destacado' : null,
      tags: ['WhatsApp', 'Pekebook']
    });
  }
}

console.log(`Se procesaron ${products.length} productos reales.`);
const withImages = products.filter(p => p.image && !p.image.includes('placeholder'));
console.log(`Productos con imagen real: ${withImages.length} de ${products.length}`);

// Guardar e inyectar en pekebookData.js
const dataFilePath = path.resolve('src/data/pekebookData.js');
let pekebookData = fs.readFileSync(dataFilePath, 'utf8');

const productsRegex = /export const PRODUCTS = \[[\s\S]*?\];/;
const newProductsCode = `export const PRODUCTS = ${JSON.stringify(products, null, 2)};`;

if (productsRegex.test(pekebookData)) {
  pekebookData = pekebookData.replace(productsRegex, newProductsCode);
  fs.writeFileSync(dataFilePath, pekebookData, 'utf8');
  console.log(`✓ ÉXITO: src/data/pekebookData.js actualizado con los ${products.length} productos reales.`);
} else {
  console.error('No se pudo encontrar export const PRODUCTS en pekebookData.js');
}
