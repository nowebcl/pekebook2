import React, { useState } from 'react';
import { MessageCircle, Sparkles, Send, Check } from 'lucide-react';

const SERVICE_TYPES = [
  { id: 'sublimacion', label: '☕ Insumos de Sublimación' },
  { id: 'estampados', label: '🎨 Estampados Personalizados' },
  { id: 'papeleria', label: '📒 Encuadernación & Papelería' },
  { id: 'mayorista', label: '📦 Precios Mayoristas' },
];

const QUANTITY_OPTIONS = [
  '1 a 5 unids',
  '6 a 12 unids',
  'Cajas (12 / 36 unids)',
  'Por mayor (+50)',
];

export const QuoteBuilder = () => {
  const [serviceType, setServiceType] = useState('sublimacion');
  const [quantity, setQuantity] = useState('6 a 12 unids');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');

  const generateWhatsAppUrl = () => {
    const selectedService = SERVICE_TYPES.find((s) => s.id === serviceType)?.label || 'Insumos';

    let msg = `🌸 *¡Hola PekeBook! Quiero cotizar lo siguiente:*\n\n`;
    msg += `📋 *Tipo:* ${selectedService}\n`;
    msg += `🔢 *Cantidad aproximada:* ${quantity}\n`;

    if (details.trim()) {
      msg += `📝 *Detalles:* ${details.trim()}\n`;
    }

    if (name.trim()) {
      msg += `👤 *Nombre:* ${name.trim()}\n`;
    }

    msg += `\n¿Me podrían confirmar disponibilidad y valores? ¡Muchas gracias! ✨`;

    return `https://wa.me/56967486503?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="servicios" className="py-12 sm:py-16 bg-[#fcf9fc] relative overflow-hidden">
      {/* Subtle Pastel Background Blobs */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-72 h-72 rounded-full bg-pink-100/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-100/40 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-2xl">
        
        {/* Minimal Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ffe8f2] text-[#ee2b91] font-heading font-black text-[11px] sm:text-xs tracking-wider uppercase shadow-xs mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COTIZACIONES EN VIVO</span>
          </div>

          <h2 className="font-heading font-extrabold text-[26px] sm:text-[34px] text-[#1e192c] leading-tight mb-2">
            Arma tu Cotización
          </h2>

          <p className="font-body text-[#5f5669] text-xs sm:text-sm">
            Elige lo que necesitas, cuéntanos tu idea y coordinamos directo por WhatsApp en minutos.
          </p>
        </div>

        {/* Minimal Quote Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#eee1ec] shadow-sm">
          
          {/* 1. Tipo de Servicio */}
          <div className="mb-5">
            <label className="block font-heading font-extrabold text-xs text-[#292235] mb-2.5">
              1. ¿Qué deseas cotizar?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SERVICE_TYPES.map((service) => {
                const isSelected = serviceType === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setServiceType(service.id)}
                    className={`py-2 px-3 rounded-2xl text-xs font-heading font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#ee2b91] text-white border-[#ee2b91] shadow-xs scale-[1.01]'
                        : 'bg-[#faf7fa] text-[#4d4457] border-transparent hover:bg-pink-50 hover:text-[#ee2b91]'
                    }`}
                  >
                    <span>{service.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Cantidad Aproximada */}
          <div className="mb-5">
            <label className="block font-heading font-extrabold text-xs text-[#292235] mb-2.5">
              2. Cantidad estimada:
            </label>
            <div className="flex flex-wrap gap-2">
              {QUANTITY_OPTIONS.map((opt) => {
                const isSelected = quantity === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQuantity(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-heading font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#ffeaf3] border-[#ee2b91] text-[#ee2b91]'
                        : 'bg-[#faf7fa] border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Detalle o Productos */}
          <div className="mb-4">
            <label className="block font-heading font-extrabold text-xs text-[#292235] mb-1.5">
              3. ¿Qué productos o detalles necesitas?
            </label>
            <textarea
              rows={2}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Ej: 2 cajas de tazones blancos 11oz, 1 resma de papel A4 y cinta térmica..."
              className="w-full px-3.5 py-2.5 rounded-2xl text-xs font-body bg-[#faf7fa] border border-gray-200 text-[#25213a] focus:bg-white focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-400 resize-none"
            />
          </div>

          {/* 4. Nombre (opcional) */}
          <div className="mb-6">
            <label className="block font-heading font-extrabold text-xs text-[#292235] mb-1.5">
              Tu nombre o emprendimiento (opcional):
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Sofía / Creaciones Peke"
              className="w-full px-3.5 py-2 rounded-2xl text-xs font-body bg-[#faf7fa] border border-gray-200 text-[#25213a] focus:bg-white focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Action Button: WhatsApp */}
          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-full font-heading font-extrabold text-sm shadow-md hover:shadow-emerald-200/80 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span>Cotizar por WhatsApp</span>
          </a>

          <div className="mt-3 text-center">
            <span className="text-[11px] text-gray-400 font-heading font-medium">
              🌸 Te responderemos a la brevedad con disponibilidad y precios en Puerto Montt.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
