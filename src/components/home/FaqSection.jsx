import React from 'react';

export const FaqSection = () => {
  return (
    <section id="faq" className="section faq-section">
      <div className="container faq-grid">
        <div className="faq-intro">
          <span className="eyebrow">PREGUNTAS FRECUENTES</span>
          <h2>Antes de visitarnos</h2>
          <p>Estas son algunas de las consultas habituales sobre los servicios de PekeBook.</p>
        </div>

        <div className="accordion">
          <details open>
            <summary>¿Realizan servicios de impresión?</summary>
            <p>Sí. PekeBook ofrece impresión digital para documentos, pósters, tarjetas y otros trabajos.</p>
          </details>
          <details>
            <summary>¿Ofrecen encuadernación?</summary>
            <p>Sí. Realizan encuadernación profesional para libros, proyectos, tesis y otros trabajos.</p>
          </details>
          <details>
            <summary>¿Venden insumos para sublimación?</summary>
            <p>Sí. Cuentan con materiales y productos para desarrollar proyectos de sublimación.</p>
          </details>
          <details>
            <summary>¿Puedo pedir asesoría antes de comprar?</summary>
            <p>Sí. El equipo ofrece orientación para ayudarte a encontrar el producto o servicio adecuado.</p>
          </details>
        </div>
      </div>
    </section>
  );
};
