const PB_URL = 'https://bd.pekebook.cl';
const ADMIN_EMAIL = 'contacto@pekebook.cl';
const ADMIN_PASS = 'Peke#2026!Book';

async function init() {
  console.log('Authenticating with PocketBase superuser...');
  const authRes = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASS })
  });

  if (!authRes.ok) {
    throw new Error(`Auth failed: ${authRes.status} ${await authRes.text()}`);
  }

  const authData = await authRes.json();
  const token = authData.token;
  console.log('Authenticated successfully!');

  // Check if products collection exists
  const checkRes = await fetch(`${PB_URL}/api/collections/products`, {
    headers: { 'Authorization': token }
  });

  if (checkRes.ok) {
    console.log('Collection "products" already exists. Updating rules if needed...');
    const existing = await checkRes.json();
    const updateRes = await fetch(`${PB_URL}/api/collections/products`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        listRule: '',
        viewRule: '',
        createRule: '@request.auth.id != ""',
        updateRule: '@request.auth.id != ""',
        deleteRule: '@request.auth.id != ""'
      })
    });
    console.log('Update status:', updateRes.status);
    return;
  }

  console.log('Creating "products" collection...');
  const newCol = {
    name: 'products',
    type: 'base',
    listRule: '',
    viewRule: '',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
        presentable: true
      },
      {
        name: 'customId',
        type: 'text',
        required: false
      },
      {
        name: 'price',
        type: 'number',
        required: true
      },
      {
        name: 'originalPrice',
        type: 'number',
        required: false
      },
      {
        name: 'category',
        type: 'text',
        required: true
      },
      {
        name: 'subcategories',
        type: 'json',
        required: false
      },
      {
        name: 'badge',
        type: 'text',
        required: false
      },
      {
        name: 'badgeType',
        type: 'text',
        required: false
      },
      {
        name: 'rating',
        type: 'number',
        required: false
      },
      {
        name: 'reviewsCount',
        type: 'number',
        required: false
      },
      {
        name: 'isMayorista',
        type: 'bool',
        required: false
      },
      {
        name: 'isOffer',
        type: 'bool',
        required: false
      },
      {
        name: 'isFeatured',
        type: 'bool',
        required: false
      },
      {
        name: 'inStock',
        type: 'bool',
        required: false
      },
      {
        name: 'description',
        type: 'text',
        required: false
      },
      {
        name: 'image',
        type: 'file',
        maxSelect: 1,
        maxSize: 5242880,
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'],
        required: false
      },
      {
        name: 'imageUrl',
        type: 'text',
        required: false
      }
    ]
  };

  const createRes = await fetch(`${PB_URL}/api/collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(newCol)
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Failed to create collection: ${createRes.status} ${errorText}`);
  }

  const created = await createRes.json();
  console.log('Collection "products" created successfully with ID:', created.id);
}

init().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
