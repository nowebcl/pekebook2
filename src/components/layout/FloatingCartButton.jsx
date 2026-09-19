import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const FloatingCartButton = () => {
  const { cartCount, openCart, cartTotal } = useCart();

  if (cartCount === 0) return null;

  return (
    <button
      onClick={openCart}
      aria-label={`Ver carrito con ${cartCount} productos`}
      className="fixed bottom-18 right-4 sm:bottom-24 sm:right-6 z-40 bg-[#ee2b91] hover:bg-[#d82180] text-white py-2 px-3 sm:py-2.5 sm:px-4 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 animate-slideInUp font-heading font-extrabold text-xs sm:text-sm border-2 border-white"
    >
      <div className="relative">
        <ShoppingBag className="w-5 h-5" />
        <span className="absolute -top-2 -right-2.5 bg-amber-400 text-[#25213a] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
          {cartCount}
        </span>
      </div>
      <span>Ver Carrito (${cartTotal.toLocaleString('es-CL')})</span>
    </button>
  );
};
