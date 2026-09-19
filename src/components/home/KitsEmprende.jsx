import React from 'react';

export const KitsEmprende = () => {
  return (
    <section id="servicios" className="section kits-section">
      <div className="container">
        <div className="section-heading">
          <span>✦</span>
          <h2>Insumos para Sublimar & Emprender</h2>
          <span>✦</span>
        </div>
        <div className="service-cards">
          <article>
            <div className="service-icon">☕</div>
            <h3>Insumos de Sublimación</h3>
            <p>Tazones 11oz AAA, botellas, papeles de secado rápido, tintas y blanks listos para estampar.</p>
          </article>
          <article>
            <div className="service-icon">📦</div>
            <h3>Precios Club Mayorista</h3>
            <p>Tarifas convenientes por caja cerrada y volumen para talleres y creadores independientes.</p>
          </article>
          <article>
            <div className="service-icon">🧾</div>
            <h3>Impresión & Encuadernación</h3>
            <p>Impresión láser de alta resolución, stickers troquelados y anillados profesionales.</p>
          </article>
          <article>
            <div className="service-icon">🙋</div>
            <h3>Asesoría en Estampado</h3>
            <p>Te orientamos en parámetros de tiempo, temperatura y perfiles de color para resultados perfectos.</p>
          </article>
        </div>
      </div>
    </section>
  );
};
