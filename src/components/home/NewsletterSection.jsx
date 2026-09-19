import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setMessage('¡Gracias! Te contactaremos con novedades de PekeBook.');
    setEmail('');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <div>
          <span>💌</span>
          <h2>Entérate de las novedades</h2>
          <p>Déjanos tu correo para recibir noticias de PekeBook.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="newsletter-email">Correo electrónico</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
          <button type="submit" aria-label="Suscribirse">→</button>
          {message && (
            <small id="thanks" aria-live="polite">{message}</small>
          )}
        </form>
      </div>
    </section>
  );
};
