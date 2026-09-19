import React from 'react';

export const CategoryNav = ({ onSelectCategory, activeCategory }) => {
  return (
    <div className="category-strip" aria-label="Accesos rápidos">
      <div className="container category-list-styled">
        
        {/* 1. Sublimación (Lilac) */}
        <div className="chip-wrapper">
          {/* Decorative rays top */}
          <svg className="chip-rays -top-2.5 left-1/2 -translate-x-1/2 w-6 h-4 text-[#c084fc]" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 13L3 5" />
            <path d="M12 12L12 2" />
            <path d="M19 13L21 5" />
          </svg>
          <button
            className={`chip-pill chip-lilac ${activeCategory === 'sublimacion' ? 'chip-active' : ''}`}
            onClick={() => {
              onSelectCategory('sublimacion');
              const el = document.getElementById('productos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="chip-icon">✨</span>
            <span className="chip-text">Sublimación</span>
          </button>
        </div>

        {/* 2. Tazones & Blanks (Mint) */}
        <div className="chip-wrapper">
          {/* Decorative rays left */}
          <svg className="chip-rays -left-3 top-1/2 -translate-y-1/2 w-4 h-5 text-[#34d399]" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 4L3 2" />
            <path d="M14 10L2 10" />
            <path d="M12 16L3 18" />
          </svg>
          <button
            className={`chip-pill chip-mint ${activeCategory === 'blanks' ? 'chip-active' : ''}`}
            onClick={() => {
              onSelectCategory('blanks');
              const el = document.getElementById('productos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="chip-icon">☕</span>
            <span className="chip-text">Tazones & Blanks</span>
          </button>
        </div>

        {/* 3. Papeles & Tintas (Yellow) */}
        <div className="chip-wrapper">
          {/* Decorative rays top-right */}
          <svg className="chip-rays -top-2.5 -right-2 w-5 h-4 text-[#fbbf24]" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 14L8 4" />
            <path d="M10 14L14 3" />
            <path d="M16 14L18 7" />
          </svg>
          <button
            className={`chip-pill chip-yellow ${activeCategory === 'papeles-tintas' ? 'chip-active' : ''}`}
            onClick={() => {
              onSelectCategory('papeles-tintas');
              const el = document.getElementById('productos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="chip-icon">📄</span>
            <span className="chip-text">Papeles & Tintas</span>
          </button>
        </div>

        {/* 4. Impresión Digital (Blue) */}
        <div className="chip-wrapper">
          {/* Decorative rays bottom */}
          <svg className="chip-rays -bottom-2 -left-1.5 w-5 h-4 text-[#38bdf8]" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M16 3L12 13" />
            <path d="M10 3L6 14" />
            <path d="M4 3L2 10" />
          </svg>
          <button
            className={`chip-pill chip-blue ${activeCategory === 'impresion' ? 'chip-active' : ''}`}
            onClick={() => {
              onSelectCategory('impresion');
              const el = document.getElementById('productos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="chip-icon">🖨️</span>
            <span className="chip-text">Impresión</span>
          </button>
        </div>

        {/* 5. Encuadernación (Pink) */}
        <div className="chip-wrapper">
          {/* Decorative rays bottom-right */}
          <svg className="chip-rays -bottom-2 -right-2 w-5 h-4 text-[#f472b6]" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 3L8 13" />
            <path d="M10 3L14 14" />
            <path d="M16 3L18 10" />
          </svg>
          <button
            className={`chip-pill chip-pink ${activeCategory === 'encuadernacion' ? 'chip-active' : ''}`}
            onClick={() => {
              onSelectCategory('encuadernacion');
              const el = document.getElementById('productos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="chip-icon">📒</span>
            <span className="chip-text">Encuadernación</span>
          </button>
        </div>

        {/* 6. Librería & Bazar (Peach) */}
        <div className="chip-wrapper">
          {/* Decorative rays right */}
          <svg className="chip-rays -right-3 top-1/2 -translate-y-1/2 w-4 h-5 text-[#fb923c]" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 4L13 2" />
            <path d="M2 10L14 10" />
            <path d="M4 16L13 18" />
          </svg>
          <button
            className={`chip-pill chip-peach ${activeCategory === 'libreria' ? 'chip-active' : ''}`}
            onClick={() => {
              onSelectCategory('libreria');
              const el = document.getElementById('productos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="chip-icon">🎁</span>
            <span className="chip-text">Librería & Bazar</span>
          </button>
        </div>

      </div>
    </div>
  );
};
