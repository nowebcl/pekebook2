import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloating = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      
      {/* Tooltip prompt */}
      {showTooltip && (
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-pink-200 text-xs text-gray-800 max-w-xs flex items-start gap-2.5 animate-bounce-gentle">
          <div className="flex-1">
            <p className="font-bold text-emerald-600 font-heading">
              ¿Dudas con tu compra? 🌸
            </p>
            <p className="text-[11px] text-gray-600 mt-0.5">
              ¡Escríbenos a WhatsApp (+56 9 6748 6503) y te asesoramos en vivo!
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Pulsing Floating Button */}
      <a
        href="https://wa.me/56967486503?text=Hola%20Pekebook,%20vengo%20desde%20la%20p%C3%A1gina%20web%20y%20tengo%20una%20consulta"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-300 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulse ping ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30 pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white/20 group-hover:scale-110 transition-transform" />
      </a>

    </div>
  );
};
