const fs = require('fs');
const path = require('path');

// 1. Ensure public/products/catalog exists
const imgDir = path.resolve('public/products/catalog');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// 2. Read catalogo_completo_pekebook (1).json
const jsonPath = 'C:/Users/NOWEB  DESKTOP/Downloads/catalogo_completo_pekebook (1).json';
const rawJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Extract base64 images if needed
let savedCount = 0;
const seenTitles = new Set();
const waProducts = [];

function cleanTitle(raw) {
  let t = (raw || '').trim();
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

  return t.charAt(0).toUpperCase() + t.slice(1);
}

function cleanPrice(priceText, title) {
  let price = 0;
  const match = (priceText || '').match(/CLP\s*([\d\.,]+)/i) || (priceText || '').match(/\$\s*([\d\.,]+)/i);
  if (match) {
    price = parseInt(match[1].replace(/[^\d]/g, ''), 10) || 0;
  }
  const lower = title.toLowerCase();
  if (lower.includes('polera') && price < 1000) price = 4990;
  if (lower.includes('anillo') && price === 0) price = 2490;
  if (lower.includes('tazón blanco') && price === 0) price = 1000;
  if (lower.includes('botella de colores') && price === 0) price = 2890;
  return price;
}

function getCategories(title) {
  const t = title.toLowerCase();
  if (t.includes('anillo') || t.includes('mica') || t.includes('encuadernar')) {
    return { category: 'encuadernacion', subcategories: ['encuadernacion'] };
  }
  if (t.includes('opalina') || t.includes('papel') || t.includes('tarjetas de presentación') || t.includes('cajas para tarjetas')) {
    return { category: 'encuadernacion', subcategories: ['encuadernacion', 'libreria', 'papeles-tintas'] };
  }
  if (t.includes('tinta')) {
    return { category: 'sublimacion', subcategories: ['sublimacion', 'papeles-tintas', 'libreria'] };
  }
  if (t.includes('tazón') || t.includes('vaso') || t.includes('termo') || t.includes('mate') || t.includes('shopero') || t.includes('botella') || t.includes('cantimplora')) {
    return { category: 'sublimacion', subcategories: ['sublimacion', 'blanks'] };
  }
  if (t.includes('polera') || t.includes('pantuflas') || t.includes('estuche') || t.includes('jockey')) {
    return { category: 'sublimacion', subcategories: ['sublimacion', 'textil'] };
  }
  if (t.includes('llavero') || t.includes('rompecabeza') || t.includes('borla')) {
    return { category: 'sublimacion', subcategories: ['sublimacion', 'bazar'] };
  }
  return { category: 'sublimacion', subcategories: ['sublimacion'] };
}

rawJson.forEach((item) => {
  const title = cleanTitle(item.title);
  if (!title || seenTitles.has(title.toLowerCase())) return;
  seenTitles.add(title.toLowerCase());

  savedCount++;
  const filename = `real_prod_${savedCount}.jpg`;
  const diskPath = path.join(imgDir, filename);

  // If image file doesn't exist or is empty, write from base64
  if (item.image && item.image.startsWith('data:')) {
    try {
      const base64Data = item.image.split(',')[1];
      if (!fs.existsSync(diskPath) || fs.statSync(diskPath).size === 0) {
        fs.writeFileSync(diskPath, Buffer.from(base64Data, 'base64'));
      }
    } catch (e) {
      console.error(`Error saving image for ${title}:`, e.message);
    }
  }

  const price = cleanPrice(item.priceText, title);
  const origPrice = Math.round(price * 1.2 / 100) * 100;
  const { category, subcategories } = getCategories(title);

  waProducts.push({
    id: `peke-wa-${savedCount}`,
    name: title,
    category: category,
    subcategories: subcategories,
    price: price,
    originalPrice: origPrice > price ? origPrice : price + 500,
    badge: savedCount <= 4 ? 'MÁS VENDIDO' : (savedCount <= 8 ? 'DESTACADO' : 'REAL FOTO'),
    badgeType: savedCount <= 4 ? 'bestseller' : 'new',
    rating: 4.9,
    reviewsCount: 15 + (savedCount % 15),
    isMayorista: false,
    isOffer: savedCount <= 6,
    isFeatured: savedCount <= 12,
    image: `/products/catalog/${filename}`,
    description: item.desc || `${title} disponible con stock real en Librería & Bazar Pekebook Puerto Montt.`,
    inStock: true
  });
});

console.log(`Processed ${waProducts.length} unique WhatsApp products with real photos.`);

// 3. Read current src/data/products.js
const productsPath = path.resolve('src/data/products.js');
let content = fs.readFileSync(productsPath, 'utf8');

// Match existing PRODUCTS array
const match = content.match(/export const PRODUCTS = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find PRODUCTS array in src/data/products.js');
  process.exit(1);
}

// Parse existing products
let existingProducts;
try {
  existingProducts = eval(match[1]);
} catch (e) {
  console.error('Eval error:', e.message);
  process.exit(1);
}

// Filter out old wa products and keep existing PedidosYa products
const otherProducts = existingProducts.filter(p => !p.id.startsWith('peke-wa-'));

// For all other products (PedidosYa):
// Reset broken external URLs to '/placeholder-product.svg' ("Pronto imagen") as requested by the user
otherProducts.forEach(p => {
  if (p.image && p.image.startsWith('http')) {
    p.image = '/placeholder-product.svg';
  }
});

const merged = [...waProducts, ...otherProducts];

console.log(`Total merged products: ${merged.length} (${waProducts.length} real WA photos + ${otherProducts.length} PedidosYa)`);

// Write updated products.js
const updatedContent = `// Catálogo Completo PekeBook 2026 - Con imágenes reales integradas desde WhatsApp y placeholder oficial
export const PRODUCTS = ${JSON.stringify(merged, null, 2)};
`;

fs.writeFileSync(productsPath, updatedContent, 'utf8');
console.log('✓ Successfully updated src/data/products.js');
