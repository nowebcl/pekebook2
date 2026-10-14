const fs = require('fs');

// 1. FeaturedSection.jsx
const fsPath = 'src/components/home/FeaturedSection.jsx';
let fsCode = fs.readFileSync(fsPath, 'utf8');
fsCode = fsCode.replace(
  /<img\s+src=\{product\.image\}\s+alt=\{product\.name\}\s+onError=\{[\s\S]*?\}\s*\/>/,
  `<img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/placeholder-product.svg';
                      }}
                    />`
);
fs.writeFileSync(fsPath, fsCode, 'utf8');
console.log('✓ FeaturedSection updated');

// 2. QuickViewModal.jsx
const qvPath = 'src/components/ui/QuickViewModal.jsx';
let qvCode = fs.readFileSync(qvPath, 'utf8');
qvCode = qvCode.replace(
  /<img\s+src=\{product\.image\}\s+alt=\{product\.name\}\s+className="w-full h-full object-cover"\s+onError=\{[\s\S]*?\}\s*\/>/,
  `<img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/placeholder-product.svg';
              }}
            />`
);
fs.writeFileSync(qvPath, qvCode, 'utf8');
console.log('✓ QuickViewModal updated');

// 3. CartDrawer.jsx
const cdPath = 'src/components/layout/CartDrawer.jsx';
let cdCode = fs.readFileSync(cdPath, 'utf8');
cdCode = cdCode.replace(
  /<img\s+src=\{product\.image\}\s+alt=\{product\.name\}\s+className="w-16 h-16 rounded-xl object-cover border border-pink-100 bg-pink-50\/50 shrink-0"\s*\/>/,
  `<img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-pink-100 bg-pink-50/50 shrink-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/placeholder-product.svg';
                  }}
                />`
);
fs.writeFileSync(cdPath, cdCode, 'utf8');
console.log('✓ CartDrawer updated');

// 4. ProductCard.jsx
const pcPath = 'src/components/ui/ProductCard.jsx';
let pcCode = fs.readFileSync(pcPath, 'utf8');
pcCode = pcCode.replace(
  /<img\s+src=\{product\.image\}\s+alt=\{product\.name\}\s+className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"\s+loading="lazy"\s*\/>/,
  `<img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/placeholder-product.svg';
          }}
        />`
);
fs.writeFileSync(pcPath, pcCode, 'utf8');
console.log('✓ ProductCard updated');
