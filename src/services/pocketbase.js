import PocketBase from 'pocketbase';

export const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'https://bd.pekebook.cl';

export const pb = new PocketBase(POCKETBASE_URL);
pb.autoCancellation(false);

/**
 * Convierte un registro de PocketBase al formato unificado consumido por el e-commerce
 */
export function mapProductRecord(record) {
  if (!record) return null;

  let imageUrl = '/placeholder-product.svg';
  if (record.image) {
    // Si tiene archivo subido a PocketBase, construimos la URL oficial
    imageUrl = pb.files.getURL(record, record.image);
  } else if (record.imageUrl) {
    imageUrl = record.imageUrl;
  }

  let subcategories = [];
  if (Array.isArray(record.subcategories)) {
    subcategories = record.subcategories;
  } else if (typeof record.subcategories === 'string' && record.subcategories) {
    try {
      subcategories = JSON.parse(record.subcategories);
    } catch {
      subcategories = [record.subcategories];
    }
  }
  if (!subcategories.length && record.category) {
    subcategories = [record.category];
  }

  return {
    id: record.id,
    customId: record.customId || record.id,
    name: record.name || 'Producto sin nombre',
    price: Number(record.price) || 0,
    originalPrice: Number(record.originalPrice) || Number(record.price) || 0,
    category: record.category || 'varios',
    subcategories,
    badge: record.badge || '',
    badgeType: record.badgeType || '',
    rating: Number(record.rating) || 5.0,
    reviewsCount: Number(record.reviewsCount) || 12,
    isMayorista: Boolean(record.isMayorista),
    isOffer: Boolean(record.isOffer),
    isFeatured: Boolean(record.isFeatured),
    inStock: record.inStock !== false,
    description: record.description || '',
    image: imageUrl,
    rawImageName: record.image || '',
    created: record.created,
    updated: record.updated
  };
}

/**
 * Obtiene todos los productos de PocketBase sin caché de navegador
 */
export async function getProductsFromDB(page = 1, perPage = 500) {
  try {
    const result = await pb.collection('products').getList(page, perPage, {
      sort: '-created',
      requestKey: null,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });

    return {
      items: result.items.map(mapProductRecord),
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      page: result.page
    };
  } catch (error) {
    console.error('Error fetching products from PocketBase:', error);
    throw error;
  }
}

/**
 * Inicia sesión administrativa de forma segura
 */
export async function loginAdmin(identity, password) {
  try {
    // 1. Probar en _superusers (colección de superusuarios PB 0.23+)
    try {
      const authData = await pb.collection('_superusers').authWithPassword(identity, password);
      return { success: true, record: authData.record, token: authData.token, role: 'superuser' };
    } catch (e1) {
      // 2. Si falla superusuario, probar en la colección general de usuarios
      const authData = await pb.collection('users').authWithPassword(identity, password);
      return { success: true, record: authData.record, token: authData.token, role: 'user' };
    }
  } catch (error) {
    console.error('Admin login failed:', error);
    throw new Error(error.message || 'Credenciales inválidas. Por favor verifique el correo y la contraseña.');
  }
}

/**
 * Cierra sesión administrativa
 */
export function logoutAdmin() {
  pb.authStore.clear();
}

/**
 * Verifica si hay una sesión administrativa activa
 */
export function isAdminAuthenticated() {
  return pb.authStore.isValid;
}

/**
 * Obtiene el usuario administrativo actual
 */
export function getCurrentAdmin() {
  return pb.authStore.record;
}

/**
 * Crea un producto nuevo en PocketBase
 */
export async function createProductRecord(productData, imageFile = null) {
  if (!pb.authStore.isValid) {
    throw new Error('Debe iniciar sesión para crear un producto.');
  }

  const formData = new FormData();
  formData.append('name', productData.name.trim());
  formData.append('price', Number(productData.price) || 0);
  formData.append('originalPrice', Number(productData.originalPrice) || Number(productData.price) || 0);
  formData.append('category', productData.category || 'varios');
  formData.append('description', productData.description || '');
  formData.append('badge', productData.badge || '');
  formData.append('badgeType', productData.badgeType || '');
  formData.append('rating', Number(productData.rating) || 5.0);
  formData.append('reviewsCount', Number(productData.reviewsCount) || 1);
  formData.append('isMayorista', productData.isMayorista ? 'true' : 'false');
  formData.append('isOffer', productData.isOffer ? 'true' : 'false');
  formData.append('isFeatured', productData.isFeatured ? 'true' : 'false');
  formData.append('inStock', productData.inStock !== false ? 'true' : 'false');

  if (productData.subcategories && productData.subcategories.length) {
    formData.append('subcategories', JSON.stringify(productData.subcategories));
  }

  if (productData.customId) {
    formData.append('customId', productData.customId);
  }

  if (imageFile) {
    formData.append('image', imageFile);
  } else if (productData.imageUrl) {
    formData.append('imageUrl', productData.imageUrl);
  }

  const record = await pb.collection('products').create(formData);
  return mapProductRecord(record);
}

/**
 * Actualiza un producto existente en PocketBase
 */
export async function updateProductRecord(id, productData, imageFile = null) {
  if (!pb.authStore.isValid) {
    throw new Error('Debe iniciar sesión para modificar productos.');
  }

  const formData = new FormData();

  if (productData.name !== undefined) formData.append('name', productData.name.trim());
  if (productData.price !== undefined) formData.append('price', Number(productData.price) || 0);
  if (productData.originalPrice !== undefined) formData.append('originalPrice', Number(productData.originalPrice) || Number(productData.price) || 0);
  if (productData.category !== undefined) formData.append('category', productData.category);
  if (productData.description !== undefined) formData.append('description', productData.description);
  if (productData.badge !== undefined) formData.append('badge', productData.badge);
  if (productData.badgeType !== undefined) formData.append('badgeType', productData.badgeType);
  if (productData.rating !== undefined) formData.append('rating', Number(productData.rating));
  if (productData.reviewsCount !== undefined) formData.append('reviewsCount', Number(productData.reviewsCount));
  if (productData.isMayorista !== undefined) formData.append('isMayorista', productData.isMayorista ? 'true' : 'false');
  if (productData.isOffer !== undefined) formData.append('isOffer', productData.isOffer ? 'true' : 'false');
  if (productData.isFeatured !== undefined) formData.append('isFeatured', productData.isFeatured ? 'true' : 'false');
  if (productData.inStock !== undefined) formData.append('inStock', productData.inStock ? 'true' : 'false');

  if (productData.subcategories !== undefined) {
    formData.append('subcategories', JSON.stringify(productData.subcategories));
  }

  if (imageFile) {
    formData.append('image', imageFile);
  } else if (productData.imageUrl) {
    formData.append('imageUrl', productData.imageUrl);
  }

  const record = await pb.collection('products').update(id, formData);
  return mapProductRecord(record);
}

/**
 * Elimina un producto de PocketBase
 */
export async function deleteProductRecord(id) {
  if (!pb.authStore.isValid) {
    throw new Error('Debe iniciar sesión para eliminar productos.');
  }
  return await pb.collection('products').delete(id);
}

/**
 * Suscripción en tiempo real (SSE) a cambios en la colección
 */
export function subscribeToProductsRealtime(onChange) {
  return pb.collection('products').subscribe('*', (e) => {
    onChange({
      action: e.action, // 'create' | 'update' | 'delete'
      record: e.record ? mapProductRecord(e.record) : null
    });
  });
}

export function unsubscribeFromProducts() {
  return pb.collection('products').unsubscribe('*');
}
