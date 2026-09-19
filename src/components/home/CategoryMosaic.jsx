import React from 'react';

export const CategoryMosaic = () => {
  return (
    <section id="servicios" className="category-mosaic">
      {/* 1. Insumos para Sublimación */}
      <a className="mosaic-card card-sublimation" href="#productos">
        <img
          src="https://pekebook.cl/wp-content/uploads/elementor/thumbs/freepik__create-a-realistic-image-of-a-section-of-a-store-d__15633-r92hihjlej5ochodnwq2gnd04xkxrx7y8kuh0we6hc.jpeg"
          alt="Insumos para sublimación"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80';
          }}
        />
        <div>
          <span>✨</span>
          <strong>Insumos de Sublimación</strong>
          <small>Tintas, papeles, cintas térmicas y prensas</small>
        </div>
      </a>

      {/* 2. Tazones & Blanks */}
      <a className="mosaic-card card-blanks" href="#productos">
        <img
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80"
          alt="Tazones y Blanks para Sublimar"
          loading="lazy"
        />
        <div>
          <span>☕</span>
          <strong>Tazones & Blanks</strong>
          <small>Cerámica 11oz AAA, mágicos y botellas</small>
        </div>
      </a>

      {/* 3. Impresión Digital */}
      <a className="mosaic-card card-print" href="#productos">
        <img
          src="https://pekebook.cl/wp-content/uploads/elementor/thumbs/freepik__create-a-professional-realistic-image-of-a-digital__15631-r92hgpmkhsq6f098153fr3hnqqbz8i67bshge30y8g.jpeg"
          alt="Impresión digital"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=700&q=80';
          }}
        />
        <div>
          <span>🖨️</span>
          <strong>Impresión Digital</strong>
          <small>Documentos, stickers troquelados y pósters</small>
        </div>
      </a>

      {/* 4. Encuadernación & Bazar */}
      <a className="mosaic-card card-bind" href="#productos">
        <img
          src="https://pekebook.cl/wp-content/uploads/elementor/thumbs/freepik__generate-an-image-of-a-professional-bookbinding-se__15632-r92hhkn8rbwn250600i4jdnvcg33ailcg20h87qyj4.jpeg"
          alt="Encuadernación profesional"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80';
          }}
        />
        <div>
          <span>📒</span>
          <strong>Encuadernación & Bazar</strong>
          <small>Cartón piedra, anillados, agendas y papelería</small>
        </div>
      </a>
    </section>
  );
};
