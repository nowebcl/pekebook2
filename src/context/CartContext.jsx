import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'pekebook_cart_items';
const WISHLIST_KEY = 'pekebook_wishlist_items';
export const FREE_SHIPPING_THRESHOLD = 35000; // CLP $35.000

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Toast Helper
  const showToast = (message, product = null) => {
    setToastMessage({ message, product, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`¡${product.name} agregado al carrito!`, product);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removido de tus favoritos`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`¡Guardado en tus favoritos! ✨`, product);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Calculations
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const freeShippingProgress = Math.min(
    100,
    Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  // WhatsApp Order Link Generator
  const generateWhatsAppOrderUrl = () => {
    const phone = '56967486503';
    let message = '✨ *¡Hola Pekebook! Quiero coordinar mi pedido web* ✨\n\n';
    message += '📦 *Detalle de productos:*\n';
    cart.forEach(item => {
      const lineTotal = (item.product.price * item.quantity).toLocaleString('es-CL');
      message += `• ${item.quantity}x ${item.product.name} - $${lineTotal} CLP\n`;
    });
    message += `\n💰 *Total a pagar: $${cartTotal.toLocaleString('es-CL')} CLP*\n`;
    if (cartTotal >= FREE_SHIPPING_THRESHOLD) {
      message += '🎉 *¡Aplica a Envío Gratis en Puerto Montt!*\n';
    }
    message += '\n📍 ¿Me indican los datos para transferencia o retiro en local (Mañihual 285, Local 3)? ¡Muchas gracias!';

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
        freeShippingProgress,
        amountForFreeShipping,
        generateWhatsAppOrderUrl,
        toastMessage,
        setToastMessage,
        quickViewProduct,
        setQuickViewProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
