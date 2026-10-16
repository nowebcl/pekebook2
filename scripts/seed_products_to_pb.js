import { PRODUCTS } from '../src/data/products.js';

const PB_URL = 'https://bd.pekebook.cl';
const ADMIN_EMAIL = 'contacto@pekebook.cl';
const ADMIN_PASS = 'Peke#2026!Book';

async function seed() {
  console.log('Authenticating with PocketBase...');
  const authRes = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASS })
  });

  if (!authRes.ok) {
    throw new Error(`Auth failed: ${authRes.status}`);
  }

  const authData = await authRes.json();
  const token = authData.token;

  // Check how many exist
  const existingRes = await fetch(`${PB_URL}/api/collections/products/records?perPage=1`, {
    headers: { 'Authorization': token }
  });
  const existingData = await existingRes.json();
  console.log(`Current items in DB: ${existingData.totalItems}`);

  if (existingData.totalItems > 0) {
    console.log(`Database already has ${existingData.totalItems} products. Skipping initial seed.`);
    return;
  }

  console.log(`Seeding ${PRODUCTS.length} products to PocketBase...`);
  let successCount = 0;

  // We can insert with concurrency of 5
  const chunkSize = 5;
  for (let i = 0; i < PRODUCTS.length; i += chunkSize) {
    const chunk = PRODUCTS.slice(i, i + chunkSize);
    await Promise.all(
      chunk.map(async (prod) => {
        const body = {
          customId: prod.id || '',
          name: prod.name || 'Sin título',
          price: Number(prod.price) || 0,
          originalPrice: Number(prod.originalPrice) || Number(prod.price) || 0,
          category: prod.category || 'varios',
          subcategories: prod.subcategories || [],
          badge: prod.badge || '',
          badgeType: prod.badgeType || '',
          rating: Number(prod.rating) || 5.0,
          reviewsCount: Number(prod.reviewsCount) || 10,
          isMayorista: Boolean(prod.isMayorista),
          isOffer: Boolean(prod.isOffer),
          isFeatured: Boolean(prod.isFeatured),
          inStock: prod.inStock !== false,
          description: prod.description || '',
          imageUrl: prod.image || ''
        };

        const res = await fetch(`${PB_URL}/api/collections/products/records`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(body)
        });

        if (res.ok) {
          successCount++;
        } else {
          const err = await res.text();
          console.error(`Failed to insert "${prod.name}":`, err);
        }
      })
    );
    if ((i + chunkSize) % 25 === 0 || i + chunkSize >= PRODUCTS.length) {
      console.log(`Progress: ${Math.min(i + chunkSize, PRODUCTS.length)} / ${PRODUCTS.length} (${successCount} seeded)`);
    }
  }

  console.log(`Seeding complete! Successfully inserted ${successCount} products.`);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
