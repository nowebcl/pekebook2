import fs from 'fs';
import path from 'path';

const d1Path = 'C:\\Users\\NOWEB  DESKTOP\\Downloads\\catalogo_completo_pekebook (1).json';
const d2Path = 'C:\\Users\\NOWEB  DESKTOP\\Downloads\\catalogo_real_pekebook.json';
const csvPath = 'C:\\Users\\NOWEB  DESKTOP\\Downloads\\web.csv';

const rawD1 = fs.existsSync(d1Path) ? JSON.parse(fs.readFileSync(d1Path, 'utf8')) : [];
const rawD2 = fs.existsSync(d2Path) ? JSON.parse(fs.readFileSync(d2Path, 'utf8')) : [];

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

function categorize(title) {
  const t = title.toLowerCase();

  // 1. Tazones, vasos, botellas, termos, shoperos, mugs (Blanks)
  if (t.includes('taz') || t.includes('taza') || t.includes('mug') || t.includes('botella') || 
      t.includes('termo') || t.includes('vaso') || t.includes('shopero') || t.includes('mate') || 
      t.includes('cantimplora') || t.includes('enlozado') || t.includes('cojin') || t.includes('mousepad')) {
    return {
      category: 'sublimacion',
      subcategories: ['sublimacion', 'blanks']
    };
  }

  // 2. Papeles y Tintas
  if (t.includes('papel') || t.includes('tinta') || t.includes('opalina') || t.includes('resma') || 
      t.includes('cinta térmica') || t.includes('cinta termica')) {
    return {
      category: 'sublimacion',
      subcategories: ['sublimacion', 'papeles-tintas']
    };
  }

  // 3. Encuadernación
  if (t.includes('anill') || t.includes('mica') || t.includes('pouch') || t.includes('carton') || 
      t.includes('cartón') || t.includes('espiral') || t.includes('esquinero') || t.includes('plastificar') || 
      t.includes('encuadern')) {
    return {
      category: 'encuadernacion',
      subcategories: ['encuadernacion']
    };
  }

  // 4. Impresión digital y Servicios
  if (t.includes('impresion') || t.includes('impresión') || t.includes('sticker') || t.includes('pvc') || 
      t.includes('digital') || t.includes('tarjetas')) {
    return {
      category: 'impresion',
      subcategories: ['impresion']
    };
  }

  // 5. Librería y Bazar
  if (t.includes('lapiz') || t.includes('lápiz') || t.includes('planner') || t.includes('agenda') || 
      t.includes('washi') || t.includes('bolsa') || t.includes('borla') || t.includes('llavero') || 
      t.includes('rompecabeza') || t.includes('puzzle') || t.includes('jockey') || t.includes('pantuflas') || 
      t.includes('estuche') || t.includes('caja')) {
    return {
      category: 'libreria',
      subcategories: ['libreria']
    };
  }

  // Default sublimacion
  return {
    category: 'sublimacion',
    subcategories: ['sublimacion']
  };
}

const productList = [];
const seen = new Set();

// 1. Agregar productos de D1 (con imagenes ya extraídas en public/products/catalog/real_prod_*.jpg)
let realProdIdx = 1;
rawD1.forEach((item) => {
  const title = cleanTitle(item.title);
  if (!title || seen.has(title.toLowerCase())) return;
  seen.add(title.toLowerCase());

  const price = cleanPrice(item.priceText, title);
  const imgPath = `/products/catalog/real_prod_${realProdIdx}.jpg`;
  const diskPath = path.resolve(`public/products/catalog/real_prod_${realProdIdx}.jpg`);
  
  let validImg = fs.existsSync(diskPath) ? imgPath : '/products/catalog/real_prod_1.jpg';
  realProdIdx++;

  const { category, subcategories } = categorize(title);

  let badge = null;
  let badgeType = 'sale';
  if (title.includes('Tazón Blanco') || title.includes('Anillo')) {
    badge = 'MÁS VENDIDO';
    badgeType = 'bestseller';
  } else if (title.includes('Glitter') || title.includes('Dorado') || title.includes('Plateado')) {
    badge = 'DESTACADO';
    badgeType = 'star';
  } else if (title.includes('Opalina') || title.includes('Micas')) {
    badge = 'TALLER';
    badgeType = 'mayorista';
  }

  productList.push({
    id: `prod-real-${productList.length + 1}`,
    name: title,
    category: category,
    subcategories: subcategories,
    price: price,
    originalPrice: price > 0 ? Math.round(price * 1.2 / 100) * 100 : 0,
    badge: badge,
    badgeType: badgeType,
    rating: 4.8 + Math.round((Math.random() * 0.2) * 10) / 10,
    reviewsCount: Math.floor(Math.random() * 30) + 10,
    isMayorista: badgeType === 'mayorista',
    isOffer: price > 0,
    isFeatured: productList.length < 12,
    image: validImg,
    description: item.desc || `${title} de alta calidad disponible en Librería & Bazar Pekebook Puerto Montt.`,
    inStock: true
  });
});

// 2. Agregar productos insignias originales de pekebook2 (Kits, Anilladora, Cinch, Tazones 12, etc.)
const ORIGINAL_PEKEBOOK2_KEY_PRODUCTS = [
  {
    id: 'kit-cameo-alpha',
    name: 'Kit Full Emprendedora Cameo 5 Alpha + Insumos de Inicio',
    category: 'kits-emprende',
    subcategories: ['sublimacion', 'encuadernacion'],
    price: 349990,
    originalPrice: 389990,
    badge: 'KIT ESTRELLA',
    badgeType: 'star',
    rating: 5,
    reviewsCount: 28,
    isMayorista: false,
    isOffer: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80',
    description: 'El combo definitivo para comenzar tu negocio de papelería creativa y personalización. Incluye plotter Silhouette Cameo 5, cuchilla autoajustable, tapete 30x30, vinilos de corte y adhesivos de regalo.',
    includes: ['Plotter Silhouette Cameo 5 nuevo sellado', 'Tapete de corte 30x30 cm estándar', 'Cuchilla de corte autoajustable', 'Pack 10 láminas vinilo adhesivo colores pastel', 'Taller introductorio online de regalo grabado'],
    inStock: true
  },
  {
    id: 'estampadora-plana-23x30',
    name: 'Estampadora Plana Verde Pastel 23x30 cm para Sublimación',
    category: 'sublimacion',
    subcategories: ['sublimacion'],
    price: 139990,
    originalPrice: 159990,
    badge: 'OFERTA TALLER',
    badgeType: 'sale',
    rating: 4.9,
    reviewsCount: 34,
    isMayorista: false,
    isOffer: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
    description: 'Prensa térmica compacta de apertura oscilante. Ideal para estampar poleras, bolsos de tela, rompecabezas, llaveros, placas de aluminio y mousepads en espacios pequeños.',
    includes: ['Control digital de temperatura y tiempo', 'Almohadilla de teflón y esponja siliconada', 'Manual en español y tabla de parámetros'],
    inStock: true
  },
  {
    id: 'anilladora-cinch-pro',
    name: 'Anilladora Cuadrada Tipo Cinch + Starter Pack de Encuadernación',
    category: 'encuadernacion',
    subcategories: ['encuadernacion'],
    price: 169990,
    originalPrice: 189990,
    badge: 'MÁS VENDIDO',
    badgeType: 'bestseller',
    rating: 5,
    reviewsCount: 42,
    isMayorista: false,
    isOffer: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    description: 'Perfora con precisión agujeros cuadrados para anillado doble cero (wire-o). Cuenta con selector de perforaciones cancelables para cuadernos desde tamaños micro hasta A4.',
    includes: ['Anilladora manual Cinch orificio cuadrado', 'Guía de centrado de papel', 'Pinza para alambre', 'Pack 5 alambres dobles colores pastel'],
    inStock: true
  },
  {
    id: 'pack-tazones-sublimacion-12',
    name: 'Caja 12 Tazones Blancos 11oz AAA Especial Sublimación',
    category: 'sublimacion',
    subcategories: ['sublimacion', 'blanks'],
    price: 18990,
    originalPrice: 22990,
    badge: 'CLUB MAYORISTA',
    badgeType: 'mayorista',
    rating: 5,
    reviewsCount: 67,
    isMayorista: true,
    isOffer: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    description: 'Tazones de cerámica blanca brillante con polímero ultra uniforme para una transferencia de color viva, nítida y apta para lavavajillas.',
    includes: ['12 tazones cerámicos calidad AAA', 'Caja individual de cartón blanco para cada uno'],
    inStock: true
  },
  {
    id: 'carton-piedra-pack-10',
    name: 'Pack 10 Planchas Cartón Piedra 1.5 mm (Formato A4)',
    category: 'encuadernacion',
    subcategories: ['encuadernacion'],
    price: 4990,
    originalPrice: 5990,
    badge: 'CLUB MAYORISTA',
    badgeType: 'mayorista',
    rating: 4.8,
    reviewsCount: 19,
    isMayorista: true,
    isOffer: false,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=700&q=80',
    description: 'Cartón prensado de alta densidad sin deformación, ideal para tapas duras de agendas, cuadernos, planners, recetarios y cajas artesanales.',
    includes: ['10 unidades de cartón piedra 1.5mm', 'Medida corte perfecto 21.5 x 30.5 cm'],
    inStock: true
  },
  {
    id: 'servicio-impresion-stickers',
    name: 'Servicio de Impresión 50 Stickers Troquelados Resistentes al Agua',
    category: 'impresion',
    subcategories: ['impresion'],
    price: 14990,
    originalPrice: 17990,
    badge: 'SERVICIO TALLER',
    badgeType: 'sale',
    rating: 5,
    reviewsCount: 58,
    isMayorista: false,
    isOffer: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=700&q=80',
    description: 'Impresión en vinilo fotográfico brillante con laminado protector UV contra roces y salpicaduras. ¡Envíanos tu diseño y nosotros nos encargamos del corte!',
    includes: ['50 unidades de hasta 5x5 cm', 'Corte individual o en pliegos', 'Retiro gratis en local o despacho'],
    inStock: true
  }
];

ORIGINAL_PEKEBOOK2_KEY_PRODUCTS.forEach(p => {
  if (!seen.has(p.name.toLowerCase())) {
    seen.add(p.name.toLowerCase());
    productList.unshift(p); // Colocar al principio como destacados
  }
});

console.log(`Total productos generados: ${productList.length}`);

// Guardar en src/data/products.js
const outPath = path.resolve('src/data/products.js');
const fileContent = `// Catálogo Oficial PekeBook 2026 - Con productos reales y fotos
export const PRODUCTS = ${JSON.stringify(productList, null, 2)};

export const KITS_HIGHLIGHT = PRODUCTS.filter(p => p.category === 'kits-emprende' || p.badgeType === 'star' || (p.isOffer && p.price > 50000));
`;

fs.writeFileSync(outPath, fileContent, 'utf8');
console.log('✓ Guardado exitoso en src/data/products.js');
