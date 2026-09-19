import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  Truck,
  MessageCircle,
  CreditCard,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useCart, FREE_SHIPPING_THRESHOLD } from '../../context/CartContext';
import confetti from 'canvas-confetti';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    freeShippingProgress,
    amountForFreeShipping,
    generateWhatsAppOrderUrl
  } = useCart();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckoutModal = () => {
    setIsCheckoutModalOpen(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <aside
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-slideInRight border-l border-pink-100"
        role="dialog"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-pink-100 bg-cream-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-gray-800 text-base">
                Tu Carrito Creativo
              </h2>
              <p className="text-xs text-pink-600 font-medium">
                {cart.length} {cart.length === 1 ? 'producto' : 'productos'} en total
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-white transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-3.5 bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border-b border-pink-100 text-xs">
          <div className="flex items-center justify-between font-medium text-gray-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-pink-500" />
              {amountForFreeShipping > 0 ? (
                <>
                  Faltan{' '}
                  <strong className="text-pink-600">
                    ${amountForFreeShipping.toLocaleString('es-CL')}
                  </strong>{' '}
                  para Envío Gratis en Pto. Montt
                </>
              ) : (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> ¡Calificas para Retiro Gratis o Envío Sin Costo!
                </span>
              )}
            </span>
            <span className="font-bold text-pink-600">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-pink-200/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-pink-50">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center text-pink-300">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-gray-700 text-lg">
                  Tu carrito está vacío
                </h3>
                <p className="text-xs text-gray-400 max-w-xs mt-1">
                  ¡Inspírate con nuestras anilladoras, insumos de encuadernación, sublimación y papelería kawaii!
                </p>
              </div>
              <button
                onClick={closeCart}
                className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-xs font-semibold shadow-md shadow-pink-200 transition-transform active:scale-95"
              >
                Explorar Catálogo ✨
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="pt-3 first:pt-0 flex gap-3 items-center group"
              >
                {/* Product Thumbnail */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-pink-100 bg-pink-50/50 shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-semibold text-xs text-gray-800 line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-xs text-pink-600">
                      ${(product.price * quantity).toLocaleString('es-CL')} CLP
                    </span>
                    {quantity > 1 && (
                      <span className="text-[10px] text-gray-400">
                        (${product.price.toLocaleString('es-CL')} c/u)
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="inline-flex items-center border border-pink-200 rounded-full bg-cream-50">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1 hover:text-pink-600 text-gray-500 rounded-full transition-colors"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-gray-700 min-w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1 hover:text-pink-600 text-gray-500 rounded-full transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-400 hover:text-rose-500 text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Quitar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Buttons */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-pink-100 bg-cream-50/70 space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">Subtotal Estimado:</span>
              <span className="font-heading font-black text-lg text-gray-900">
                ${cartTotal.toLocaleString('es-CL')} CLP
              </span>
            </div>

            <p className="text-[11px] text-gray-400 text-center">
              Impuestos incluidos. Despacho coordinado vía WhatsApp o retiro gratis en tienda.
            </p>

            {/* Main Action: WhatsApp Order (Chilean e-commerce preferred pattern) */}
            <a
              href={generateWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-200 transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Pedir directo por WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Secondary Action: Pay with Webpay / Transferencia */}
            <button
              onClick={handleCheckoutModal}
              className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-pink-50 text-gray-700 font-semibold text-xs border border-pink-200 flex items-center justify-center gap-2 transition-colors"
            >
              <CreditCard className="w-4 h-4 text-pink-500" />
              <span>Pagar con Webpay / Transferencia</span>
            </button>

            {/* Clear cart */}
            <div className="text-center pt-1">
              <button
                onClick={clearCart}
                className="text-[10px] text-gray-400 hover:text-rose-500 underline"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Simulated Payment / Webpay Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border border-pink-100 space-y-4 animate-scaleUp">
            <div className="flex justify-between items-center pb-2 border-b border-pink-100">
              <h3 className="font-heading font-bold text-gray-800 text-base flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-pink-500" />
                Opciones de Pago Pekebook
              </h3>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-pink-50 p-3.5 rounded-2xl text-xs space-y-1 text-gray-700">
              <p className="font-bold text-pink-700">
                Total a pagar: ${cartTotal.toLocaleString('es-CL')} CLP
              </p>
              <p className="text-gray-500">
                Puedes pagar con tarjeta de crédito/débito vía Transbank Webpay o transferencia bancaria directa.
              </p>
            </div>

            {/* Bank details */}
            <div className="border border-purple-100 bg-purple-50/50 p-3.5 rounded-2xl text-xs space-y-1.5 text-gray-700">
              <p className="font-bold text-purple-800">🏦 Datos para Transferencia:</p>
              <p><span className="font-semibold">Banco:</span> BancoEstado / Cuenta RUT</p>
              <p><span className="font-semibold">Nombre:</span> Pekebook Librería y Bazar</p>
              <p><span className="font-semibold">Email:</span> contacto@pekebook.cl</p>
              <p><span className="font-semibold">WhatsApp comprobante:</span> +56 9 6748 6503</p>
            </div>

            {checkoutSuccess ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="font-bold text-sm">¡Comprobante Registrado!</p>
                <p className="text-xs">
                  Te hemos redirigido a WhatsApp para validar tu comprobante y despachar tu pedido.
                </p>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCheckoutSuccess(true)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-pink-200 hover:from-pink-600 hover:to-rose-500 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Comprobante por WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setCheckoutSuccess(true);
                    setTimeout(() => {
                      setIsCheckoutModalOpen(false);
                      clearCart();
                      closeCart();
                    }, 2000);
                  }}
                  className="w-full py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
                >
                  Simular Pago Exitoso Webpay
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
