import React, { useState } from 'react';
import { ShoppingBag, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Header = ({ searchQuery = '', onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const el = document.getElementById('productos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Brand */}
        <a className="brand flex-shrink-0" href="#inicio" aria-label="PekeBook inicio">
          <img
            src="/logo.png"
            alt="PekeBook Librería y Bazar"
            className="brand-logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = e.target.parentElement?.querySelector('.brand-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <span className="brand-fallback">PEKEBOOK</span>
        </a>

        {/* Center Header: PC Search Bar (Visible on desktop/PC, hidden on small mobile screens) */}
        <div className="hidden md:flex flex-1 max-w-lg mx-6 relative">
          <form onSubmit={handleSearchSubmit} className="w-full relative flex items-center">
            <div className="absolute left-4 pointer-events-none text-pink-400 flex items-center">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              placeholder="Buscar insumos para sublimar, tazones, tintas, papeles..."
              className="w-full pl-11 pr-10 py-2.5 bg-[#faf7fa] hover:bg-[#fff7fa] focus:bg-white border border-[#ebdce6] focus:border-[#ee2b91] rounded-full text-sm font-body text-[#25213a] placeholder:text-[#998f9e] focus:outline-none focus:ring-3 focus:ring-pink-100 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearch && onSearch('')}
                className="absolute right-3.5 text-gray-400 hover:text-gray-600 p-1 text-xs cursor-pointer"
                aria-label="Borrar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Right Header: Menu Button with 3 Yellow Decorative Rays */}
        <div className="relative flex items-center flex-shrink-0">
          {/* 3 Yellow Decorative Rays (彡) */}
          <svg
            className="absolute -top-3 -right-1 sm:-right-3.5 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none select-none text-[#f5a623]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          >
            <path d="M4 14C8 10 13 6 19 3" />
            <path d="M6 17C12 16 17 15 23 15" />
            <path d="M6 20C11 21 16 23 21 24" />
          </svg>

          <button
            className="menu-button-box"
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-2xl font-bold leading-none select-none text-[#25213a]">
              {isMenuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {/* Nav Dropdown / Drawer when menu is opened */}
      {isMenuOpen && (
        <div className="header-nav-drawer">
          <nav className="flex flex-col gap-2 p-5 text-center">
            <a
              href="#inicio"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-4 rounded-full font-heading font-bold text-gray-800 hover:bg-pink-50 hover:text-pink-600 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-4 rounded-full font-heading font-bold text-gray-800 hover:bg-pink-50 hover:text-pink-600 transition-colors"
            >
              Cotizar
            </a>
            <a
              href="#productos"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-4 rounded-full font-heading font-bold text-gray-800 hover:bg-pink-50 hover:text-pink-600 transition-colors"
            >
              Destacados
            </a>
            <a
              href="#nosotros"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-4 rounded-full font-heading font-bold text-gray-800 hover:bg-pink-50 hover:text-pink-600 transition-colors"
            >
              Nosotros
            </a>
            <a
              href="#faq"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-4 rounded-full font-heading font-bold text-gray-800 hover:bg-pink-50 hover:text-pink-600 transition-colors"
            >
              FAQS
            </a>
            <a
              href="#contacto"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-4 rounded-full font-heading font-bold text-gray-800 hover:bg-pink-50 hover:text-pink-600 transition-colors"
            >
              Contacto
            </a>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                openCart();
              }}
              className="mt-2 py-2.5 px-6 rounded-full font-heading font-extrabold text-white bg-[#ee2b91] hover:bg-[#d82180] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Ver Carrito ({cartCount})</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
