const fs = require('fs');

const jsonPath = 'C:/Users/NOWEB  DESKTOP/Downloads/catalogo_completo_pekebook (1).json';
if (!fs.existsSync(jsonPath)) {
  console.log('File does not exist:', jsonPath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log('Total items in JSON:', data.length);
data.forEach((item, idx) => {
  const name = item.name || item.title || 'Sin nombre';
  const hasImg = !!item.image;
  const isBase64 = item.image && item.image.startsWith('data:');
  const imgLen = item.image ? item.image.length : 0;
  console.log(`${idx + 1}. [${name}] | price: ${item.price} | base64: ${isBase64} | len: ${imgLen}`);
});
