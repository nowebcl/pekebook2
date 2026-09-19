import React from 'react';
import { Sparkles, Check, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ToastNotification = () => {
  const { toastMessage, setToastMessage, openCart } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-60 max-w-sm w-full bg-white/95 backdrop-blur-md border border-pink-200 shadow-xl shadow-pink-200/50 rounded-2xl p-3.5 flex items-center gap-3 animate-slideInUp">
      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
        <Sparkles className="w-4 h-4 fill-pink-500" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-gray-800 leading-tight">
          {toastMessage.message}
        </p>
        <button
          onClick={openCart}
          className="text-[11px] font-semibold text-pink-600 hover:text-pink-700 underline mt-0.5"
        >
          Ver mi carrito →
        </button>
      </div>

      <button
        onClick={() => setToastMessage(null)}
        className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
