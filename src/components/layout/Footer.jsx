import React from 'react';

export const Footer = () => {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src="https://pekebook.cl/wp-content/uploads/2025/07/Recurso-1.webp"
            alt="PekeBook"
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = e.target.parentElement?.querySelector('.brand-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <strong className="brand-fallback">PEKEBOOK</strong>
          <p>Librería, bazar y servicios creativos en Puerto Montt.</p>
        </div>

        <div>
          <h3>Contacto</h3>
          <a href="tel:+56967486503">+56 9 6748 6503</a>
          <a href="mailto:contacto@pekebook.cl">contacto@pekebook.cl</a>
          <p>Mañihual 285, Local 3, Puerto Montt, Chile.</p>
        </div>

        <div>
          <h3>Explorar</h3>
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#productos">Destacados</a>
          <a href="#faq">Preguntas frecuentes</a>
          <a href="#contacto">Contacto</a>
        </div>

        <div>
          <h3>Servicios</h3>
          <p>Impresión digital</p>
          <p>Encuadernación</p>
          <p>Sublimación</p>
          <p>Artículos de bazar</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© PekeBook · Puerto Montt, Chile</span>
        <span>Propuesta visual inspirada en la referencia enviada.</span>
      </div>
    </footer>
  );
};
