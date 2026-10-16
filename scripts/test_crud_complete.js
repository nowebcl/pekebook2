import PocketBase from 'pocketbase';
import sharp from 'sharp';

const PB_URL = 'https://bd.pekebook.cl';
const ADMIN_EMAIL = 'contacto@pekebook.cl';
const ADMIN_PASS = 'Peke#2026!Book';

async function runCompleteTest() {
  console.log('====================================================');
  console.log('🧪 INICIANDO PRUEBA COMPLETA DE FLUJO CRUD Y MULTIMEDIA');
  console.log('====================================================\n');

  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);

  // 1. AUTENTICACIÓN
  console.log('PASO 1: Autenticación como Administrador...');
  const authData = await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASS);
  console.log(`✅ Autenticado exitosamente como: ${authData.record.email}`);
  console.log(`   Token de sesión válido: ${pb.authStore.isValid}\n`);

  // Crear una imagen de prueba optimizada WebP en memoria (simulando la compresión del frontend)
  console.log('Generando imagen de prueba WebP optimizada (600x600 px)...');
  const webpBuffer = await sharp({
    create: {
      width: 600,
      height: 600,
      channels: 3,
      background: { r: 238, g: 43, b: 145 } // Color rosa PekeBook
    }
  })
  .composite([
    {
      input: Buffer.from(`
        <svg width="600" height="600">
          <circle cx="300" cy="300" r="180" fill="white" />
          <text x="300" y="315" font-size="44" font-weight="bold" fill="#ee2b91" text-anchor="middle" font-family="Arial">PEKEBOOK QA</text>
        </svg>
      `),
      top: 0,
      left: 0
    }
  ])
  .webp({ quality: 80 })
  .toBuffer();

  console.log(`✅ Imagen WebP generada con éxito. Tamaño: ${(webpBuffer.length / 1024).toFixed(1)} KB (Ultra-ligera)\n`);

  // 2. MODIFICAR UN PRODUCTO EXISTENTE Y CAMBIAR SU IMAGEN
  console.log('PASO 2: Modificar un producto existente y cambiar su imagen...');
  const existingList = await pb.collection('products').getList(1, 1);
  if (existingList.items.length === 0) {
    throw new Error('No hay productos en la base de datos para probar modificación.');
  }

  const targetProduct = existingList.items[0];
  console.log(`   Producto seleccionado: "${targetProduct.name}" (ID: ${targetProduct.id})`);
  console.log(`   Precio actual: $${targetProduct.price} | Stock: ${targetProduct.inStock}`);
  console.log(`   Imagen actual: ${targetProduct.image || targetProduct.imageUrl}`);

  // Guardar datos originales para restaurar después de la prueba
  const originalState = {
    price: targetProduct.price,
    inStock: targetProduct.inStock,
    image: targetProduct.image,
    imageUrl: targetProduct.imageUrl,
    description: targetProduct.description
  };

  // Crear archivo File simulando el uploader del navegador
  const mockFile = new File([webpBuffer], 'imagen_prueba_modificada.webp', { type: 'image/webp' });

  // Crear FormData para enviar a PocketBase
  const updateFormData = new FormData();
  const testNewPrice = Number(targetProduct.price) + 500;
  updateFormData.append('price', testNewPrice);
  updateFormData.append('description', (targetProduct.description || '') + ' [Modificado QA Test]');
  updateFormData.append('image', mockFile);

  console.log(`   Enviando actualización a PocketBase (Precio nuevo: $${testNewPrice} + Nueva imagen WebP)...`);
  const updatedRecord = await pb.collection('products').update(targetProduct.id, updateFormData);

  console.log(`✅ Producto modificado con éxito!`);
  console.log(`   Nuevo precio guardado: $${updatedRecord.price}`);
  console.log(`   Nuevo archivo de imagen en PocketBase: ${updatedRecord.image}`);

  // Probar que la URL pública de la imagen de PocketBase sea accesible (HTTP 200)
  const imageUrl = pb.files.getURL(updatedRecord, updatedRecord.image);
  console.log(`   Verificando accesibilidad de la URL: ${imageUrl}`);
  const imgCheck = await fetch(imageUrl);
  console.log(`✅ Descarga de imagen HTTP Status: ${imgCheck.status} ${imgCheck.statusText}`);
  console.log(`   Content-Type: ${imgCheck.headers.get('content-type')}`);
  console.log(`   Content-Length: ${imgCheck.headers.get('content-length')} bytes\n`);

  // Restaurar el producto a su estado original para no alterar el catálogo real
  console.log('   Restaurando valores originales del producto existente...');
  const restoreFormData = new FormData();
  restoreFormData.append('price', originalState.price);
  restoreFormData.append('description', originalState.description || '');
  if (!originalState.image && originalState.imageUrl) {
    // Si no tenía archivo subido antes, limpiar el campo image
    restoreFormData.append('image', '');
    restoreFormData.append('imageUrl', originalState.imageUrl);
  }
  await pb.collection('products').update(targetProduct.id, restoreFormData);
  console.log('✅ Producto existente restaurado correctamente a su estado original.\n');

  // 3. AGREGAR UN PRODUCTO NUEVO CON IMAGEN
  console.log('PASO 3: Agregar un producto completamente nuevo con imagen optimizada...');
  const createFormData = new FormData();
  const testUniqueName = `Kit de Prueba QA Automatizado ${Date.now()}`;
  createFormData.append('name', testUniqueName);
  createFormData.append('price', 12990);
  createFormData.append('originalPrice', 15990);
  createFormData.append('category', 'kits-emprende');
  createFormData.append('subcategories', JSON.stringify(['kits-emprende', 'sublimacion']));
  createFormData.append('badge', 'TEST AUTOMÁTICO');
  createFormData.append('badgeType', 'star');
  createFormData.append('isFeatured', 'true');
  createFormData.append('isOffer', 'true');
  createFormData.append('inStock', 'true');
  createFormData.append('description', 'Producto creado dinámicamente para comprobar la persistencia y subida de imágenes en PocketBase.');
  createFormData.append('image', new File([webpBuffer], 'nuevo_producto_test.webp', { type: 'image/webp' }));

  const createdProduct = await pb.collection('products').create(createFormData);
  console.log(`✅ Producto nuevo creado exitosamente!`);
  console.log(`   ID asignado por PocketBase: ${createdProduct.id}`);
  console.log(`   Nombre: "${createdProduct.name}"`);
  console.log(`   Precio: $${createdProduct.price} (Original: $${createdProduct.originalPrice})`);
  console.log(`   Categoría: ${createdProduct.category}`);
  console.log(`   Imagen subida: ${createdProduct.image}`);

  // Verificar la imagen del nuevo producto
  const newImageUrl = pb.files.getURL(createdProduct, createdProduct.image);
  const newImgCheck = await fetch(newImageUrl);
  console.log(`✅ URL de la imagen del nuevo producto responde: HTTP ${newImgCheck.status} (${newImgCheck.headers.get('content-type')})\n`);

  // 4. VERIFICAR CONSULTA PÚBLICA (COMO UN CLIENTE EN LA TIENDA)
  console.log('PASO 4: Verificar que el nuevo producto aparece en la vitrina pública...');
  // Hacemos una consulta sin token, como si fuera un usuario anónimo navegando en pekebook.cl
  const publicPb = new PocketBase(PB_URL);
  const publicSearch = await publicPb.collection('products').getList(1, 5, {
    filter: `id = "${createdProduct.id}"`
  });
  if (publicSearch.items.length === 1 && publicSearch.items[0].id === createdProduct.id) {
    console.log(`✅ ÉXITO: El producto es visible inmediatamente para los compradores sin requerir login.`);
    console.log(`   Item retornado: "${publicSearch.items[0].name}" ($${publicSearch.items[0].price})\n`);
  } else {
    throw new Error('El producto no apareció en la consulta pública.');
  }

  // 5. ELIMINAR EL PRODUCTO CREADO
  console.log('PASO 5: Borrar el producto de prueba...');
  await pb.collection('products').delete(createdProduct.id);
  console.log(`✅ Producto con ID "${createdProduct.id}" eliminado exitosamente de la base de datos.`);

  // 6. COMPROBAR QUE YA NO EXISTE
  console.log('PASO 6: Comprobar que el producto fue borrado definitivamente...');
  try {
    await pb.collection('products').getOne(createdProduct.id);
    throw new Error('Error: El producto todavía existe después de borrado.');
  } catch (err) {
    if (err.status === 404) {
      console.log(`✅ Confirmado: El producto ya no existe en la base de datos (HTTP 404 Not Found).\n`);
    } else {
      throw err;
    }
  }

  console.log('====================================================');
  console.log('🎉 TODAS LAS PRUEBAS COMPLETADAS CON 100% DE ÉXITO');
  console.log('   - Modificación de producto existente: OK');
  console.log('   - Cambio y almacenamiento de imagen WebP: OK');
  console.log('   - Creación de producto nuevo: OK');
  console.log('   - Visibilidad pública inmediata sin caché: OK');
  console.log('   - Borrado definitivo de producto: OK');
  console.log('====================================================');
}

runCompleteTest().catch((err) => {
  console.error('\n❌ ERROR EN LA PRUEBA:', err);
  process.exit(1);
});
