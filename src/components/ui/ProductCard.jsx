import React from 'react';
import { ShoppingBag, Eye, Heart, Star, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();
  const isWish = isInWishlist(product.id);

  const getBadgeStyle = (badgeType) => {
    switch (badgeType) {
      case 'sale':
        return 'bg-rose-500 text-white shadow-xs';
      case 'mayorista':
        return 'bg-purple-600 text-white shadow-xs';
      case 'star':
        return 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs';
      case 'kawaii':
        return 'bg-amber-400 text-gray-900 shadow-xs';
      default:
        return 'bg-pink-100 text-pink-700 border border-pink-200';
    }
  };

  return (
    <div className="group craft-card relative bg-white rounded-3xl p-3 sm:p-4 border border-pink-100/90 shadow-soft hover:shadow-soft-lg flex flex-col justify-between transition-all duration-300">
      
      {/* Top Image Container */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-pink-50/40 mb-3">
        
        {/* Floating Badge (Top Left) */}
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 z-10 text-[10px] font-black tracking-wide uppercase px-2.5 py-1 rounded-full badge-shimmer ${getBadgeStyle(
              product.badgeType
            )}`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-xs transition-all ${
            isWish
              ? 'bg-rose-50 text-rose-500 shadow-xs scale-110'
              : 'bg-white/80 text-gray-400 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label="Guardar en favoritos"
        >
          <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick View Overlay Button */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute inset-x-4 bottom-3 z-10 py-2 px-3 rounded-full bg-white/95 backdrop-blur-xs text-gray-800 text-xs font-semibold flex items-center justify-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-md hover:bg-pink-50 hover:text-pink-600"
        >
          <Eye className="w-3.5 h-3.5 text-pink-500" />
          <span>Vista Rápida</span>
        </button>
      </div>

      {/* Info Body */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-semibold text-pink-500 uppercase tracking-wider font-heading">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="text-gray-500 text-[10px] font-bold">
                {product.rating} ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-heading font-bold text-gray-800 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-pink-600 cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-3 mt-2 border-t border-pink-50 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-black text-sm sm:text-base text-gray-900">
                ${product.price.toLocaleString('es-CL')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[11px] text-gray-400 line-through">
                  ${product.originalPrice.toLocaleString('es-CL')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-400 block font-medium">
              CLP · Iva incl.
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-pink-200/80 active:scale-95 transition-all"
            title="Añadir al carrito"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>

      </div>
    </div>
  );
};
