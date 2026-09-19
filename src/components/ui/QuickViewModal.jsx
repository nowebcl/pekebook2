import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Heart, Star, CheckCircle2, MessageCircle, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, openCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
    openCart();
  };

  const whatsappDirectQuery = `https://wa.me/56967486503?text=${encodeURIComponent(
    `¡Hola Pekebook! Tengo una consulta sobre el producto "${product.name}" ($${product.price.toLocaleString('es-CL')} CLP). ¿Tienen stock en la tienda de Puerto Montt?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      
      {/* Click outside to close */}
      <div
        className="fixed inset-0"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative bg-white max-w-2xl w-full rounded-3xl p-5 sm:p-7 shadow-2xl border border-pink-100 z-10 max-h-[90vh] overflow-y-auto animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-pink-50 transition-colors"
          aria-label="Cerrar vista rápida"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-50 border border-pink-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-pink-500 text-white text-[10px] font-black tracking-wide uppercase px-2.5 py-1 rounded-full shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wider font-heading">
                {product.category}
              </span>
              <h2 className="font-heading font-black text-lg sm:text-xl text-gray-900 mt-1 leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-semibold">
                  {product.rating} ({product.reviewsCount} opiniones)
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-heading font-black text-2xl text-gray-900">
                  ${product.price.toLocaleString('es-CL')} CLP
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toLocaleString('es-CL')}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                {product.description}
              </p>

              {/* What includes */}
              {product.includes && (
                <div className="mt-3 bg-pink-50/60 p-3 rounded-2xl border border-pink-100 text-xs">
                  <p className="font-bold text-gray-800 mb-1.5 font-heading">
                    ✨ Contenido del paquete:
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    {product.includes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quantity Selector & Action */}
            <div className="space-y-3 pt-3 border-t border-pink-100">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-gray-700">Cantidad:</span>
                <div className="flex items-center border border-pink-200 rounded-full bg-cream-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:text-pink-600 text-gray-500 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-gray-800 min-w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 hover:text-pink-600 text-gray-500 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-pink-200 transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar al Carrito</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-2xl border transition-all ${
                    isWish
                      ? 'bg-rose-50 border-rose-200 text-rose-500'
                      : 'bg-white border-pink-200 text-gray-400 hover:text-rose-500'
                  }`}
                  title="Favoritos"
                >
                  <Heart className={`w-5 h-5 ${isWish ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Direct WhatsApp Question */}
              <a
                href={whatsappDirectQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Consultar dudas de este producto por WhatsApp</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 pt-1">
                <Truck className="w-3 h-3 text-pink-400" />
                <span>Retiro gratis en Mañihual 285, Local 3, Puerto Montt</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
