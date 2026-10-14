import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve('src/data/pekebookData.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

const regex = /export const PRODUCTS = (\[[\s\S]*?\]);/;
const match = content.match(regex);

if (match) {
  const products = JSON.parse(match[1]);
  console.log(`Original count: ${products.length}`);

  // Filtrar textos basura
  const garbagePhrases = ['calidad  premium', '32 mm ($3490)', 'rosado, turquesa, negro'];
  const filtered = products.filter(p => {
    const nameLower = p.name.toLowerCase();
    return !garbagePhrases.some(g => nameLower.includes(g));
  });

  // Limpiar imagenes prestadas
  // Solo los primeros 20 productos tienen su foto unica wa_1 a wa_20
  filtered.forEach((p, idx) => {
    if (idx < 20) {
      p.image = `/products/catalog/wa_${idx + 1}.jpg`;
    } else {
      // Los productos adicionales no deben tener fotos prestadas falsas
      p.image = '/placeholder-product.svg';
    }
  });

  console.log(`Cleaned count: ${filtered.length}`);

  // Recalcular conteos
  const catCounts = {};
  filtered.forEach(p => {
    catCounts[p.category] = (catCounts[p.category] || 0) + 1;
  });

  const updatedCategories = [
    { id: "todos", name: "Todo el catálogo", icon: "Sparkles", count: filtered.length },
    { id: "sublimacion", name: "Sublimación & Tazones", icon: "Printer", count: catCounts["sublimacion"] || 0 },
    { id: "botellas", name: "Botellas & Mugs", icon: "Gift", count: catCounts["botellas"] || 0 },
    { id: "encuadernacion", name: "Encuadernación", icon: "Layers", count: catCounts["encuadernacion"] || 0 },
    { id: "papeleria", name: "Papelería & Papeles", icon: "FileText", count: catCounts["papeleria"] || 0 },
    { id: "textil", name: "Textil & Poleras", icon: "Sparkles", count: catCounts["textil"] || 0 },
    { id: "insumos", name: "Tintas & Materiales", icon: "Palette", count: catCounts["insumos"] || 0 },
    { id: "accesorios", name: "Accesorios & Llaveros", icon: "Gift", count: catCounts["accesorios"] || 0 }
  ];

  const catRegex = /export const CATEGORIES = \[[\s\S]*?\];/;
  content = content.replace(catRegex, `export const CATEGORIES = ${JSON.stringify(updatedCategories, null, 2)};`);
  content = content.replace(regex, `export const PRODUCTS = ${JSON.stringify(filtered, null, 2)};`);

  fs.writeFileSync(dataFilePath, content, 'utf8');
  console.log('✓ Actualizado correctamente sin imágenes repetidas ni filas basura.');
}
