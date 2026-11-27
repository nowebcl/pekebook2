import React from 'react';
import { Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src="/logo.png"
            alt="PekeBook"
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = e.target.parentElement?.querySelector('.brand-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <strong className="brand-fallback">PEKEBOOK</strong>
          <p>Librería, bazar y servicios creativos en Puerto Montt.</p>
          <a
            href="https://www.instagram.com/pekebook_/"
            target="_blank"
            rel="noopener noreferrer"
            className="!inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#ee2b91] to-[#f472b6] !text-white font-heading font-bold text-xs shadow-sm hover:opacity-90 transition-opacity"
            aria-label="Síguenos en Instagram @pekebook_"
          >
            <Instagram className="w-4 h-4" />
            <span>@pekebook_</span>
          </a>
        </div>

        <div>
          <h3>Contacto & Sucursales</h3>
          <a href="tel:+56941764653">+56 9 4176 4653</a>
          <a href="mailto:contacto@pekebook.cl">contacto@pekebook.cl</a>
          <p><strong>Peke 1:</strong> Av. Gabriela Mistral 957, Local 7</p>
          <p><strong>Peke 2:</strong> Av. Violeta Parra, Local 1</p>
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
        <span>
          Desarrollado por{' '}
          <a
            href="https://www.instagram.com/noweb.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ee2b91] hover:underline font-bold transition-colors"
          >
            @noweb.dev
          </a>
        </span>
      </div>
    </footer>
  );
};
