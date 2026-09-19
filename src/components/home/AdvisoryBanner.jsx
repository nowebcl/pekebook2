import React from 'react';

export const AdvisoryBanner = () => {
  return (
    <section className="help-banner" id="contacto">
      <div className="container help-grid">
        <div>
          <span className="eyebrow light">ESTAMOS PARA AYUDARTE</span>
          <h2>¿Necesitas ayuda con tu compra o proyecto?</h2>
          <p>Escríbenos o visítanos en Puerto Montt.</p>
          <div className="contact-actions">
            <a className="btn btn-dark" href="mailto:contacto@pekebook.cl">Enviar email</a>
            <a className="btn btn-light" href="tel:+56967486503">+56 9 6748 6503</a>
          </div>
        </div>

        <div className="contact-card">
          <div className="contact-row">
            <span>📍</span>
            <div>
              <small>Dirección</small>
              <strong>Mañihual 285, Local 3<br />Puerto Montt, Chile</strong>
            </div>
          </div>
          <div className="contact-row">
            <span>✉️</span>
            <div>
              <small>Email</small>
              <strong>contacto@pekebook.cl</strong>
            </div>
          </div>
          <div className="contact-row">
            <span>☎️</span>
            <div>
              <small>Teléfono</small>
              <strong>+56 9 6748 6503</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
