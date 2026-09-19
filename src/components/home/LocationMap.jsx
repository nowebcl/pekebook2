import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Sparkles } from 'lucide-react';

export const LocationMap = () => {
  return (
    <section id="contacto" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-3xl sm:rounded-4xl border border-pink-100 p-6 sm:p-10 shadow-soft">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold font-heading">
                <MapPin className="w-3.5 h-3.5 text-pink-600" />
                <span>Tienda Física & Taller</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-gray-900 mt-2 leading-tight">
                Visítanos en Puerto Montt
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Ven a conocer nuestros insumos, muestrarios de encuadernación y retira tus pedidos sin costo de envío.
              </p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-cream-50 border border-pink-100/80">
              <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">
                  Dirección del Local
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Mañihual 285, Local 3, Puerto Montt, Región de Los Lagos, Chile.
                </p>
                <a
                  href="https://maps.google.com/?q=Ma%C3%B1ihual%20285%2C%20Local%203%2C%20Puerto%20Montt%2C%20Chile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 hover:text-pink-700 mt-1.5"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Abrir en Google Maps</span>
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-cream-50 border border-pink-100/80">
              <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">
                  Horario de Atención
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  <strong>Lunes a Viernes:</strong> 09:30 - 18:30 hrs (Continuado)
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Sábados:</strong> 10:00 - 14:00 hrs
                </p>
                <p className="text-[11px] text-pink-600 font-semibold mt-1">
                  Domingos y festivos: Cerrado
                </p>
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://wa.me/56967486503"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 flex items-center gap-2.5 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-[10px] text-emerald-700 block font-medium">WhatsApp / Llamadas</span>
                  <span className="text-xs font-bold text-gray-900">+56 9 6748 6503</span>
                </div>
              </a>

              <a
                href="mailto:contacto@pekebook.cl"
                className="p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200/80 flex items-center gap-2.5 transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-600" />
                <div>
                  <span className="text-[10px] text-sky-700 block font-medium">Correo Electrónico</span>
                  <span className="text-xs font-bold text-gray-900">contacto@pekebook.cl</span>
                </div>
              </a>
            </div>

          </div>

          {/* Right Map Embed */}
          <div className="lg:col-span-7">
            <div className="w-full aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden border-2 border-pink-100 shadow-inner bg-pink-50 relative">
              <iframe
                src="https://maps.google.com/maps?q=Ma%C3%B1ihual%20285%2C%20Local%203%2C%20Puerto%20Montt%2C%20Chile.&t=m&z=16&output=embed&iwloc=near"
                title="Ubicación Pekebook Mañihual 285 Local 3 Puerto Montt"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
