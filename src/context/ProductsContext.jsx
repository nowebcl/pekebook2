import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getProductsFromDB, subscribeToProductsRealtime, unsubscribeFromProducts } from '../services/pocketbase';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Carga productos desde PocketBase sin caché
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getProductsFromDB(1, 500);
      if (res && res.items && res.items.length > 0) {
        setProducts(res.items);
      }
      setLastUpdated(Date.now());
    } catch (err) {
      console.warn('PocketBase fetch failed, using fallback data:', err.message);
      setError(err.message);
      // Mantener los productos de respaldo si la base de datos no responde
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial y suscripción en tiempo real
  useEffect(() => {
    loadProducts();

    let isSubscribed = true;
    try {
      subscribeToProductsRealtime(({ action, record }) => {
        if (!isSubscribed) return;
        setProducts(prev => {
          if (action === 'create' && record) {
            // Evitar duplicados
            const filtered = prev.filter(p => p.id !== record.id);
            return [record, ...filtered];
          } else if (action === 'update' && record) {
            return prev.map(p => p.id === record.id ? record : p);
          } else if (action === 'delete' && record) {
            return prev.filter(p => p.id !== record.id);
          }
          return prev;
        });
        setLastUpdated(Date.now());
      });
    } catch (err) {
      console.warn('Realtime subscription not active:', err);
    }

    return () => {
      isSubscribed = false;
      try {
        unsubscribeFromProducts();
      } catch {
        // ignore
      }
    };
  }, [loadProducts]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts: loadProducts,
        lastUpdated
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
