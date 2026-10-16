import React, { useState, useEffect } from 'react';
import { X, Upload, Check, AlertCircle, Sparkles, Image as ImageIcon, Loader2, RefreshCw } from 'lucide-react';
import { optimizeProductImage } from '../../utils/imageOptimizer';
import { createProductRecord, updateProductRecord } from '../../services/pocketbase';

const CATEGORIES_OPTIONS = [
  { id: 'sublimacion', label: 'Sublimación & Blanks' },
  { id: 'encuadernacion', label: 'Encuadernación & Papelería' },
  { id: 'libreria', label: 'Librería General' },
  { id: 'bazar', label: 'Bazar Kawaii & Regalos' },
  { id: 'kits-emprende', label: 'Kits Emprende' },
  { id: 'impresion-digital', label: 'Impresión Digital' },
  { id: 'ofertas', label: 'Insumos & Ofertas' }
];

export const ProductEditorModal = ({ product, isOpen, onClose, onSaved }) => {
  const isEditing = Boolean(product && product.id);

  const [formData, setFormData] = useState({
    name: '',
    category: 'sublimacion',
    price: '',
    originalPrice: '',
    description: '',
    badge: '',
    badgeType: 'bestseller',
    inStock: true,
    isFeatured: false,
    isOffer: false,
    isMayorista: false
  });

  // Estado para la imagen optimizada
  const [selectedFile, setSelectedFile] = useState(null);
  const [optimizedImage, setOptimizedImage] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentImagePreview, setCurrentImagePreview] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Inicializar formulario al abrir
  useEffect(() => {
    if (!isOpen) return;

    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'sublimacion',
        price: product.price ?? '',
        originalPrice: product.originalPrice ?? '',
        description: product.description || '',
        badge: product.badge || '',
        badgeType: product.badgeType || 'bestseller',
        inStock: product.inStock !== false,
        isFeatured: Boolean(product.isFeatured),
        isOffer: Boolean(product.isOffer),
        isMayorista: Boolean(product.isMayorista)
      });
      setCurrentImagePreview(product.image || '');
    } else {
      setFormData({
        name: '',
        category: 'sublimacion',
        price: '',
        originalPrice: '',
        description: '',
        badge: '',
        badgeType: 'bestseller',
        inStock: true,
        isFeatured: false,
        isOffer: false,
        isMayorista: false
      });
      setCurrentImagePreview('');
    }

    setSelectedFile(null);
    setOptimizedImage(null);
    setError('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  // Manejar cambio y optimización de imagen
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsOptimizing(true);
      setError('');
      const result = await optimizeProductImage(file, {
        maxDimension: 900,
        targetQuality: 0.80,
        maxFileSizeKB: 100
      });

      setSelectedFile(result.file);
      setOptimizedImage(result);
      setCurrentImagePreview(result.previewUrl);
    } catch (err) {
      console.error(err);
      setError('Error al procesar y optimizar la imagen: ' + err.message);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('El nombre del producto es obligatorio.');
      return;
    }
    if (formData.price === '' || isNaN(Number(formData.price))) {
      setError('Debe especificar un precio válido.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price),
        description: formData.description,
        badge: formData.badge,
        badgeType: formData.badgeType,
        inStock: formData.inStock,
        isFeatured: formData.isFeatured,
        isOffer: formData.isOffer,
        isMayorista: formData.isMayorista,
        subcategories: [formData.category]
      };

      let savedRecord;
      if (isEditing) {
        savedRecord = await updateProductRecord(product.id, payload, selectedFile);
      } else {
        savedRecord = await createProductRecord(payload, selectedFile);
      }

      onSaved(savedRecord, isEditing);
      onClose();
    } catch (err) {
      console.error('Save product error:', err);
      setError(err.message || 'Error al guardar los datos en PocketBase.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <h2 className="text-xl font-black text-slate-900 font-heading">
              {isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {isEditing ? `Modificando ID: ${product.id}` : 'El producto se guardará directamente en la base de datos'}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Nombre y Categoría */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Nombre del Producto *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Tazón Blanco 11 oz Sublimación"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Categoría *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all font-medium"
              >
                {CATEGORIES_OPTIONS.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Precios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Precio de Venta (CLP $) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-sm">
                  $
                </span>
                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Ej. 1000"
                  className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Precio Original / Normal (CLP $)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-sm">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="Ej. 1200 (para mostrar descuento)"
                  className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 3. OPTIMIZACIÓN Y SUBIDA DE IMAGEN */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                  Fotografía del Producto (Optimización Automática)
                </label>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Las imágenes se convierten a WebP y se comprimen al menor tamaño posible sin pérdida visual.
                </p>
              </div>
              {optimizedImage && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <Check className="w-3 h-3" /> Optimizado {optimizedImage.reductionPercent}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Image Preview Box */}
              <div className="relative w-28 h-28 rounded-2xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                {currentImagePreview ? (
                  <img
                    src={currentImagePreview}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/placeholder-product.svg';
                    }}
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                )}
                {isOptimizing && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center gap-1">
                    <Loader2 className="w-6 h-6 text-[#ee2b91] animate-spin" />
                    <span className="text-[10px] font-bold text-slate-600">Comprimiendo...</span>
                  </div>
                )}
              </div>

              {/* Upload Input & Details */}
              <div className="flex-1 w-full space-y-2">
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-[#ee2b91] rounded-2xl bg-white cursor-pointer transition-colors group">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 group-hover:text-[#ee2b91]">
                    <Upload className="w-4 h-4 text-[#ee2b91]" />
                    <span>Haga clic para subir o arrastrar una imagen</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    JPG, PNG, WebP • Se optimizará automáticamente a ~50 KB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>

                {/* Métricas de compresión en tiempo real */}
                {optimizedImage && (
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-xs text-slate-700 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-slate-500">Tamaño original:</span>
                      <span className="line-through text-slate-400">{optimizedImage.originalSize}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-emerald-700">Tamaño final optimizado:</span>
                      <span className="text-emerald-700 font-extrabold">{optimizedImage.compressedSize}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>Resolución: {optimizedImage.dimensions.width}×{optimizedImage.dimensions.height}px</span>
                      <span className="text-emerald-600 font-bold">Ahorro: {optimizedImage.reductionPercent}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4. Interruptores de Estado (Stock, Oferta, Destacado) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Stock */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="w-4 h-4 text-[#ee2b91] rounded border-slate-300 focus:ring-pink-200"
              />
              <span className="text-xs font-bold text-slate-700">En Stock</span>
            </label>

            {/* Destacado */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 text-[#ee2b91] rounded border-slate-300 focus:ring-pink-200"
              />
              <span className="text-xs font-bold text-slate-700">Destacado</span>
            </label>

            {/* Oferta */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={formData.isOffer}
                onChange={(e) => setFormData({ ...formData, isOffer: e.target.checked })}
                className="w-4 h-4 text-[#ee2b91] rounded border-slate-300 focus:ring-pink-200"
              />
              <span className="text-xs font-bold text-slate-700">En Oferta</span>
            </label>

            {/* Mayorista */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={formData.isMayorista}
                onChange={(e) => setFormData({ ...formData, isMayorista: e.target.checked })}
                className="w-4 h-4 text-[#ee2b91] rounded border-slate-300 focus:ring-pink-200"
              />
              <span className="text-xs font-bold text-slate-700">Mayorista</span>
            </label>
          </div>

          {/* 5. Etiquetas Promocionales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Texto de Etiqueta (Badge)
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Ej. MÁS VENDIDO, NUEVO, 20% DCTO"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Estilo de Etiqueta
              </label>
              <select
                value={formData.badgeType}
                onChange={(e) => setFormData({ ...formData, badgeType: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all font-medium"
              >
                <option value="bestseller">Rosa - Más Vendido</option>
                <option value="sale">Rojo - Oferta / Descuento</option>
                <option value="star">Gradiente - Destacado Premium</option>
                <option value="kawaii">Dorado - Kawaii</option>
                <option value="mayorista">Púrpura - Mayorista</option>
              </select>
            </div>
          </div>

          {/* 6. Descripción */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Descripción del Producto
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detalles sobre materiales, medidas, uso y stock disponible en la tienda..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all"
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || isOptimizing}
            className="px-6 py-2.5 rounded-xl bg-[#ee2b91] hover:bg-[#d61e7e] text-white text-xs font-bold shadow-md shadow-pink-200 transition-all flex items-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Guardando en BD...</span>
              </>
            ) : (
              <span>{isEditing ? 'Guardar Cambios' : 'Crear Producto'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
