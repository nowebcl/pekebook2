import fs from 'fs';
import path from 'path';

const jsonPath = 'C:\\Users\\NOWEB  DESKTOP\\Downloads\\catalogo_real_pekebook.json';
const csvPath = 'C:\\Users\\NOWEB  DESKTOP\\Downloads\\web.csv';

const rawJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log(`Leidos ${rawJson.length} productos del JSON.`);

// Asegurar carpeta para imagenes
const imgDir = path.resolve('public/products/catalog');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// Cargar precios y datos de web.csv para cruzar
const csvMap = new Map();
if (fs.existsSync(csvPath)) {
  const csvText = fs.readFileSync(csvPath, 'utf8');
  const lines = csvText.split('\n');
  for (let l of lines) {
    const parts = l.split('","').map(s => s.replace(/^"|"$/g, '').trim());
    if (parts.length >= 2) {
      const name = parts[0].toLowerCase();
      let price = 0;
      let desc = '';
      for (let p of parts.slice(1)) {
        if (p.includes('CLP') || p.includes('$')) {
          const num = p.replace(/[^\d]/g, '');
          if (num) price = parseInt(num, 10);
        } else if (p.length > 5) {
          desc = p;
        }
      }
      if (name) csvMap.set(name, { price, desc });
    }
  }
}
console.log(`Cargados ${csvMap.size} productos del CSV para cruce de precios.`);

const CATEGORY_MAP = {
  sublimacion: ['tazon', 'taza', 'sublimable', 'sublimar', 'shoperos', 'enlozado', 'vaso', 'mate', 'rompecabeza', 'jockey'],
  botellas: ['botella', 'termo', 'mug', 'sport', 'cantimplora'],
  textil: ['polera', 'poleron', 'canguro', 'pantuflas', 'estuche'],
  papeleria: ['opalina', 'resma', 'papel', 'cinta', 'cajas'],
  encuadernacion: ['anillo', 'micas', 'pouch', 'paso 2:1'],
  accesorios: ['borla', 'llavero', 'llav ero', 'chapitas', 'iman'],
  insumos: ['tinta', 'guantes']
};

function getCategory(title) {
  const t = title.toLowerCase();
  for (const [cat, words] of Object.entries(CATEGORY_MAP)) {
    if (words.some(w => t.includes(w))) return cat;
  }
  return 'sublimacion';
}

const finalProducts = [];

rawJson.forEach((item, index) => {
  let title = (item.title || '').trim();
  
  // Limpiar titulos duplicados
  if (title.toLowerCase().startsWith('tazón blanco') && title.length > 15) {
    title = 'Tazón Blanco 11 oz Sublimación';
  } else if (title.toLowerCase().startsWith('anillo metálico') && title.length > 15) {
    title = 'Anillo Metálico Wire-O Paso 2:1';
  } else if (title.toLowerCase().startsWith('botella de colores') && title.length > 20) {
    title = 'Botella de Colores Sublimable';
  }

  // Capitalizar bonito
  title = title.charAt(0).toUpperCase() + title.slice(1);

  // Extraer precio
  let price = 0;
  // Intentar primero desde CSV
  for (let [k, v] of csvMap.entries()) {
    if (title.toLowerCase().includes(k) || k.includes(title.toLowerCase())) {
      if (v.price > 0) price = v.price;
      break;
    }
  }

  if (price === 0) {
    const rawPrice = item.priceText || '';
    const match = rawPrice.match(/CLP\s*([\d\.,]+)/i) || rawPrice.match(/\$\s*([\d\.,]+)/i);
    if (match) {
      price = parseInt(match[1].replace(/[^\d]/g, ''), 10) || 0;
    } else {
      const nums = (rawPrice.replace(/[^\d]/g, '') || '');
      if (nums.length >= 3) price = parseInt(nums, 10);
    }
  }

  // Precios especiales corregidos segun catalogo WhatsApp real
  if (title.toLowerCase().includes('tazón blanco') && price === 0) price = 1000;
  if (title.toLowerCase().includes('shoperos magico') && price === 0) price = 4000;
  if (title.toLowerCase().includes('polera algodón') && price < 1000) price = 4990;

  // Guardar imagen JPG
  let imageUrl = '/placeholder-product.svg';
  if (item.image && item.image.startsWith('data:')) {
    try {
      const base64Data = item.image.split(',')[1];
      const filename = `wa_${index + 1}.jpg`;
      const diskPath = path.join(imgDir, filename);
      fs.writeFileSync(diskPath, Buffer.from(base64Data, 'base64'));
      imageUrl = `/products/catalog/${filename}`;
      console.log(`[OK Foto] Guardada ${filename} para: ${title}`);
    } catch (e) {
      console.error(`Error guardando foto ${index + 1}:`, e.message);
    }
  }

  const category = getCategory(title);

  finalProducts.push({
    id: `pekebook-prod-${index + 1}`,
    name: title,
    category: category,
    price: price,
    unit: 'c/u',
    image: imageUrl,
    description: item.desc || `${title} de excelente calidad disponible en Pekebook Puerto Montt.`,
    isPromo: index < 6,
    isNew: index < 10,
    badge: index < 6 ? 'Más Vendido' : (index < 10 ? 'Catálogo Real' : null),
    tags: [category, 'Sublimación', 'Pekebook']
  });
});

console.log(`Total productos procesados con fotos: ${finalProducts.length}`);

// Ahora inyectar en src/data/pekebookData.js
const dataFilePath = path.resolve('src/data/pekebookData.js');
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

const regex = /export const PRODUCTS = \[[\s\S]*?\];/;
const newCode = `export const PRODUCTS = ${JSON.stringify(finalProducts, null, 2)};`;

if (regex.test(fileContent)) {
  fileContent = fileContent.replace(regex, newCode);
  fs.writeFileSync(dataFilePath, fileContent, 'utf8');
  console.log(`[EXITO] pekebookData.js actualizado con los ${finalProducts.length} productos reales y sus fotos.`);
} else {
  console.error('No se encontro PRODUCTS en pekebookData.js');
}
