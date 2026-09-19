import React from 'react';

export const HeroSlider = () => {
  return (
    <section className="hero" id="inicio">
      {/* Background Video Loop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video-bg"
        src="/magnific_movimiento-loop_N2p3t7Q6D9.mp4"
      />

      {/* Aqua / Turquoise Tint Overlay for aesthetic blend */}
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-bokeh" aria-hidden="true" />

      {/* Decorative Pastel Bubbles */}
      <div className="hero-bubble bubble-a" aria-hidden="true" />
      <div className="hero-bubble bubble-b" aria-hidden="true" />
      <div className="hero-bubble bubble-c" aria-hidden="true" />

      {/* Main Grid Container */}
      <div className="container hero-grid">
        
        {/* Left: Copy & Actions */}
        <div className="hero-copy">
          <div className="eyebrow">
            INSUMOS DE SUBLIMACIÓN + ESTAMPADO + LIBRERÍA
          </div>

          <h1 className="hero-heading">
            Todo para <span className="hero-highlight">sublimar,</span>
            <br />
            <span className="hero-highlight">crear</span> y
            <br />
            emprender
          </h1>

          <p className="hero-desc">
            Tu tienda de insumos para sublimación en Puerto Montt: tazones blancos y mágicos, botellas de aluminio, tintas de alta densidad, papeles de secado rápido, encuadernación y todo para emprender.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#productos">
              <span className="hidden sm:inline">Ver insumos sublimación</span>
              <span className="sm:hidden">Ver insumos</span>
            </a>
            <a className="btn btn-ghost" href="#contacto">
              <span className="hidden sm:inline">Cómo llegar / Retiro</span>
              <span className="sm:hidden">Cómo llegar</span>
            </a>
          </div>
        </div>

        {/* Right: Hero Card with Mascot Logo & Stickers */}
        <div className="hero-card">
          <div className="logo-card-wrapper">
            {/* Floating Stickers right on the borders */}
            <div className="floating-sticker sticker-pencil select-none" aria-hidden="true">✏️</div>
            <div className="floating-sticker sticker-rainbow select-none" aria-hidden="true">🌈</div>
            <div className="floating-sticker sticker-sparkle select-none" aria-hidden="true">✨</div>

            {/* Sublimation Showcase Card */}
            <div className="logo-card">
              <img
                src="/22.png?v=2"
                alt="Insumos y Productos para Sublimación PekeBook"
                className="logo-card-img rounded-2xl shadow-xs"
                onError={(e) => {
                  e.target.src = '/22.png';
                }}
              />
              <p className="logo-card-sub">
                Insumos para Sublimar & Emprender en Puerto Montt
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Promo Ribbon */}
      <div className="promo-ribbon container">
        <a href="#productos" className="promo-tab promo-sublimation">
          <strong>INSUMOS SUBLIMACIÓN</strong>
        </a>
        <a href="#productos" className="promo-tab promo-print">
          <strong>TAZONES & BLANKS</strong>
        </a>
        <a href="#productos" className="promo-tab promo-bind">
          <strong>PAPELES & TINTAS</strong>
        </a>
      </div>
    </section>
  );
};
