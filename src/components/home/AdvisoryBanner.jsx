import React from 'react';
import { Mail, Phone } from 'lucide-react';

export const AdvisoryBanner = () => {
  return (
    <section id="contacto" className="w-full relative overflow-hidden bg-gradient-to-r from-[#f87eb9] via-[#f774b3] to-[#f87eb9]">
      
      {/* Full-width Horizontal Banner Container (Edge-to-Edge) */}
      <div className="w-full relative">
        <img
          src="/ayuda-banner.png"
          alt="¿Necesitas ayuda con tu compra o proyecto? Escríbenos o visítanos en Puerto Montt - PekeBook"
          className="w-full h-auto block select-none object-contain sm:object-cover md:object-contain mx-auto"
          onError={(e) => {
            e.target.src = 'https://pekebook.cl/wp-content/uploads/2025/07/Recurso-1.webp';
          }}
        />

        {/* Interactive Clickable Hotspots overlay for Desktop & Tablet */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Button: Enviar email */}
          <a
            href="mailto:contacto@pekebook.cl"
            className="pointer-events-auto absolute left-[8.2%] top-[58.5%] w-[19.5%] h-[15.5%] rounded-full cursor-pointer hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-white transition-opacity"
            aria-label="Enviar email a contacto@pekebook.cl"
            title="Enviar email a contacto@pekebook.cl"
          />

          {/* Button: +56 9 6748 6503 */}
          <a
            href="https://wa.me/56967486503?text=Hola%20PekeBook,%20necesito%20ayuda%20con%20mi%20compra%20o%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto absolute left-[29.5%] top-[58.5%] w-[17.5%] h-[15.5%] rounded-full cursor-pointer hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-opacity"
            aria-label="Llamar o escribir al WhatsApp +56 9 6748 6503"
            title="WhatsApp / Teléfono: +56 9 6748 6503"
          />

          {/* Address in Card */}
          <a
            href="https://maps.google.com/?q=Ma%C3%B1ihual+285,+Puerto+Montt"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto absolute left-[59%] top-[19%] w-[31%] h-[17%] rounded-xl cursor-pointer hover:bg-white/20 transition-colors"
            aria-label="Ver dirección en Google Maps"
            title="Ver en Google Maps"
          />

          {/* Email in Card */}
          <a
            href="mailto:contacto@pekebook.cl"
            className="pointer-events-auto absolute left-[59%] top-[41%] w-[27%] h-[15%] rounded-xl cursor-pointer hover:bg-white/20 transition-colors"
            aria-label="Enviar correo a contacto@pekebook.cl"
            title="contacto@pekebook.cl"
          />

          {/* Phone in Card */}
          <a
            href="tel:+56967486503"
            className="pointer-events-auto absolute left-[59%] top-[63%] w-[23%] h-[15%] rounded-xl cursor-pointer hover:bg-white/20 transition-colors"
            aria-label="Llamar a +56 9 6748 6503"
            title="+56 9 6748 6503"
          />
        </div>
      </div>

      {/* Mobile Fast Action Buttons (Visible on mobile screens for easy, comfortable tapping) */}
      <div className="flex sm:hidden flex-col gap-2 p-3.5 bg-white border-t border-pink-100">
        <a
          href="mailto:contacto@pekebook.cl"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#ee2b91] hover:bg-[#d82180] text-white py-2.5 px-4 rounded-full font-heading font-extrabold text-xs shadow-xs transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>Enviar email a contacto@pekebook.cl</span>
        </a>
        <a
          href="https://wa.me/56967486503?text=Hola%20PekeBook,%20necesito%20ayuda%20con%20mi%20compra%20o%20proyecto"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#25213a] border border-pink-200 py-2.5 px-4 rounded-full font-heading font-extrabold text-xs shadow-xs hover:bg-pink-50 transition-colors"
        >
          <Phone className="w-4 h-4 text-[#ee2b91]" />
          <span>WhatsApp / Teléfono (+56 9 6748 6503)</span>
        </a>
      </div>

    </section>
  );
};
