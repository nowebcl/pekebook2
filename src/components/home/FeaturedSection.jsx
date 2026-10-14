import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

import { PRODUCTS } from '../../data/products';

const REDESIGN_PRODUCTS = PRODUCTS;

export const FeaturedSection = ({ activeCategory, onResetCategory, searchQuery = '', onClearSearch }) => {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist } = useCart();
  const ITEMS_PER_PAGE = 16;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    const el = document.getElementById('productos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const trimmedSearch = searchQuery.trim().toLowerCase();

  // If user is typing in search, search across all products; otherwise filter by selected category
  const displayedProducts = trimmedSearch
    ? REDESIGN_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(trimmedSearch) ||
        p.description.toLowerCase().includes(trimmedSearch) ||
        (p.badge && p.badge.toLowerCase().includes(trimmedSearch)) ||
        (p.category && p.category.toLowerCase().includes(trimmedSearch))
      )
    : (activeCategory && activeCategory !== 'todos'
        ? REDESIGN_PRODUCTS.filter(p => 
            p.category === activeCategory || 
            (p.subcategories && p.subcategories.includes(activeCategory))
          )
        : REDESIGN_PRODUCTS);

  const totalPages = Math.ceil(displayedProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = displayedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Generador de páginas para paginación inteligente con elipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section id="productos" className="section section-soft">
      <div className="container">
        <div className="section-heading">
          <span>✨</span>
          <h2>Insumos para Sublimación & Destacados PekeBook</h2>
          <span>✨</span>
        </div>

        {/* Search Feedback Pill (when searching) */}
        {trimmedSearch && (
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="inline-flex items-center gap-2 bg-pink-100/80 border border-pink-300 text-[#ee2b91] px-4 py-1.5 rounded-full text-xs font-heading font-extrabold shadow-xs animate-fadeIn">
              <span>🔍 Resultados para: &ldquo;<strong>{searchQuery}</strong>&rdquo; ({displayedProducts.length} encontrados)</span>
              <button
                type="button"
                onClick={onClearSearch}
                className="ml-1.5 hover:bg-pink-200/80 rounded-full w-4 h-4 flex items-center justify-center text-[#ee2b91] font-black cursor-pointer transition-colors"
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Sub-tabs for fast filtering right inside the section */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('todos');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              (!activeCategory || activeCategory === 'todos') && !trimmedSearch
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            Todos los Insumos
          </button>
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('sublimacion');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              activeCategory === 'sublimacion'
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            ✨ Sublimación
          </button>
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('blanks');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              activeCategory === 'blanks' && !trimmedSearch
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            ☕ Tazones & Blanks
          </button>
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('papeles-tintas');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              activeCategory === 'papeles-tintas' && !trimmedSearch
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            📄 Papeles & Tintas
          </button>
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('encuadernacion');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              activeCategory === 'encuadernacion' && !trimmedSearch
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            📒 Encuadernación
          </button>
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('libreria');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              activeCategory === 'libreria' && !trimmedSearch
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            🎁 Librería & Bazar
          </button>
        </div>

        {/* Empty Search Result State */}
        {displayedProducts.length === 0 && (
          <div className="text-center py-12 px-6 bg-white/70 rounded-3xl border border-pink-200 my-6 max-w-md mx-auto shadow-xs">
            <span className="text-4xl mb-3 block">🔍</span>
            <h3 className="font-heading font-extrabold text-base text-gray-800 mb-1">
              No encontramos productos para &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Prueba buscando por <em>tazones, tintas, botellas, papeles, cinta térmica</em>...
            </p>
            <button
              type="button"
              onClick={() => {
                if (onClearSearch) onClearSearch();
                onResetCategory('todos');
              }}
              className="px-5 py-2 bg-[#ee2b91] hover:bg-[#d92d81] text-white rounded-full text-xs font-heading font-extrabold transition-all cursor-pointer shadow-xs"
            >
              Ver todos los insumos
            </button>
          </div>
        )}

        <div className="product-grid">
          {paginatedProducts.map((product) => {
            const isWish = isInWishlist(product.id);
            return (
              <article key={product.id} className="product-card">
                <div>
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/placeholder-product.svg';
                      }}
                    />
                    <div className="badge">{product.badge}</div>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/80 transition-transform ${
                        isWish ? 'text-rose-500 scale-110' : 'text-gray-400 hover:text-rose-500'
                      }`}
                      aria-label="Favorito"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>

                <div>
                  <div className="price">
                    ${product.price.toLocaleString('es-CL')} CLP
                  </div>
                  <div className="card-actions">
                    <a
                      onClick={() => setQuickViewProduct(product)}
                      className="cursor-pointer"
                    >
                      Consultar detalle →
                    </a>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="inline-flex items-center gap-1 bg-[#ef4fa1] hover:bg-[#d92d81] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-xs transition-transform active:scale-95"
                      aria-label={`Añadir ${product.name} al carrito`}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {/* Controles de Paginación Oficial PekeBook */}
        {totalPages > 1 && (
          <div className="mt-10 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Contador de productos mostrados */}
            <div className="text-xs text-gray-500 font-medium">
              Mostrando <strong className="text-[#ee2b91]">{startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, displayedProducts.length)}</strong> de <strong className="text-gray-800">{displayedProducts.length}</strong> insumos
            </div>

            {/* Botones de navegación numerados */}
            <div className="flex items-center gap-1.5 select-none">
              
              {/* Botón Anterior */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-heading font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white hover:bg-pink-50 text-gray-700 border border-pink-200 shadow-2xs"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              {/* Números de página */}
              {getPageNumbers().map((p, idx) => {
                if (p === '...') {
                  return (
                    <span key={'ellipsis-' + idx} className="px-2 py-1 text-xs text-gray-400 font-bold">
                      …
                    </span>
                  );
                }
                const isActive = p === currentPage;
                return (
                  <button
                    key={'page-' + p}
                    type="button"
                    onClick={() => handlePageChange(p)}
                    className={`w-8 h-8 rounded-full text-xs font-heading font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#ee2b91] text-white shadow-sm scale-105'
                        : 'bg-white text-gray-700 hover:bg-pink-50 border border-pink-200'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              {/* Botón Siguiente */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-heading font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white hover:bg-pink-50 text-gray-700 border border-pink-200 shadow-2xs"
                aria-label="Página siguiente"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>
        )}
      </div>
    </section>
  );
};
