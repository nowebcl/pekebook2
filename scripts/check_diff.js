import fs from 'fs';
import path from 'path';

const newJson = JSON.parse(fs.readFileSync('C:/Users/NOWEB  DESKTOP/Downloads/catalogo_completo_pekebook (1).json', 'utf8'));
const csvLines = fs.readFileSync('C:/Users/NOWEB  DESKTOP/Downloads/web.csv', 'utf8').split('\n');

const newTitles = newJson.map(x => x.title.toLowerCase());
console.log('Total items in new JSON:', newJson.length);

const missingFromCsv = [];
for (let l of csvLines) {
  const parts = l.split('","').map(s => s.replace(/^"|"$/g, '').trim());
  const title = parts[0];
  if (title && title !== 'x1iyjqo2' && title.length > 2) {
    const found = newTitles.some(t => t.includes(title.toLowerCase()) || title.toLowerCase().includes(t));
    if (!found) {
      let price = 0;
      for (let p of parts.slice(1)) {
        if (p.includes('CLP') || p.includes('$')) {
          const num = p.replace(/[^\d]/g, '');
          if (num) price = parseInt(num, 10);
        }
      }
      missingFromCsv.push({ title, price });
    }
  }
}

console.log('Missing items from CSV:', missingFromCsv.length);
missingFromCsv.forEach(m => console.log('-', m.title, 'Price:', m.price));
