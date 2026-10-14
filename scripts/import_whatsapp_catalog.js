import fs from 'fs';
import path from 'path';

// Script to convert extracted WhatsApp products into pekebookData.js format
const inputPath = path.resolve('productos_whatsapp.json');

if (!fs.existsSync(inputPath)) {
  console.log('Esperando archivo productos_whatsapp.json en la raíz del proyecto...');
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
console.log(`Procesando ${rawData.length} productos extraídos de WhatsApp...`);

const CATEGORY_KEYWORDS = {
  arte: ['oleo', 'acrilico', 'pincel', 'tempera', 'pintura', 'bastidor', 'croquera', 'acuarela', 'lapiz', 'lapices', 'tiza'],
  oficina: ['archivador', 'carpeta', 'corchete', 'perforadora', 'tijera', 'cinta', 'pegamento', 'silicona', 'clip', 'regla'],
  papeleria: ['resma', 'papel', 'opalina', 'kraft', 'cartulina', 'cuaderno', 'libreta', 'block', 'agenda', 'sobre'],
  escolar: ['plastilina', 'goma', 'sacapuntas', 'regla', 'estuche', 'cola fria', 'plumon', 'destacador'],
  sublimacion: ['tazon', 'sublimar', 'sublimacion', 'vinilo', 'transfer', 'poliester', 'parche', 'taza', 'termica', 'dtf'],
  encuadernacion: ['anillo', 'espiral', 'wire-o', 'mica', 'carton piedra', 'portada', 'encuadernar', 'prensa'],
  bazar: ['regalo', 'adorno', 'peluche', 'bateria', 'llavero', 'juguete', 'globo', 'taza', 'botella']
};

function detectCategory(title, desc = '') {
  const text = `${title} ${desc}`.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => text.includes(k))) {
      return cat;
    }
  }
  return 'bazar';
}

const formattedProducts = rawData.map((item, index) => {
  const category = detectCategory(item.title, item.description);
  return {
    id: `wa-prod-${index + 1}`,
    name: item.title.trim(),
    category: category,
    price: item.price || 0,
    unit: 'unid',
    image: item.image || '/placeholder-product.svg',
    description: item.description || `${item.title} disponible en Librería & Bazar Pekebook.`,
    isPromo: index < 8,
    isNew: index < 12,
    badge: index < 8 ? 'Destacado' : (index < 12 ? 'Catálogo WhatsApp' : null),
    tags: [category, 'WhatsApp', 'Pekebook']
  };
});

console.log(`✓ ${formattedProducts.length} productos formateados con éxito.`);

// Actualizar en pekebookData.js manteniendo STORE_INFO y SERVICES
const dataFilePath = path.resolve('src/data/pekebookData.js');
let currentContent = fs.readFileSync(dataFilePath, 'utf8');

// Reemplazar la sección PRODUCTS = [...]
const productsRegex = /export const PRODUCTS = \[[\s\S]*?\];/;
const newProductsCode = `export const PRODUCTS = ${JSON.stringify(formattedProducts, null, 2)};`;

if (productsRegex.test(currentContent)) {
  currentContent = currentContent.replace(productsRegex, newProductsCode);
  fs.writeFileSync(dataFilePath, currentContent, 'utf8');
  console.log(`✓ src/data/pekebookData.js ha sido actualizado con los ${formattedProducts.length} productos reales.`);
} else {
  console.error('No se encontró export const PRODUCTS en pekebookData.js');
}
