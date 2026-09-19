import React, { useState, useMemo } from 'react';
import {
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  Send,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Clock,
  MapPin,
  Palette,
  Truck,
} from 'lucide-react';

const QUOTE_CATEGORIES = [
  {
    id: 'sublimacion',
    name: 'Insumos Sublimación',
    icon: '☕',
    description: 'Blanks, tintas, papeles y cintas térmicas listos para estampar',
    items: [
      { id: 'sub-tazones-12', name: 'Caja 12 Tazones Blancos 11oz AAA', price: 18990, unit: 'caja 12 unids' },
      { id: 'sub-tazon-magico', name: 'Tazón Mágico Negro Mate 11oz', price: 2990, unit: 'unidad' },
      { id: 'sub-botella-600', name: 'Botella Deportiva Aluminio 600ml', price: 3990, unit: 'unidad' },
      { id: 'sub-papel-a4', name: 'Resma Papel Sublimación Secado Rápido A4', price: 7990, unit: '100 hojas' },
      { id: 'sub-tintas-cmyk', name: 'Set 4 Tintas Sublimación CMYK 100ml', price: 16990, unit: 'set 4 colores' },
      { id: 'sub-cinta-termica', name: 'Cinta Térmica Alta Temp 10mm (Pack 2)', price: 3490, unit: 'pack 2 rollos' },
      { id: 'sub-mousepad', name: 'Mouse Pad Rectangular 18x22cm Sublimable', price: 1990, unit: 'unidad' },
      { id: 'sub-cojin', name: 'Funda Cojín Blanco 40x40cm Poliéster', price: 3290, unit: 'unidad' },
    ],
  },
  {
    id: 'estampados',
    name: 'Estampados Personalizados',
    icon: '🎨',
    description: 'Tazones, botellas y textiles estampados con tu logo o foto',
    items: [
      { id: 'est-tazon-diseno', name: 'Tazón Blanco Estampado Full Color', price: 4990, unit: 'unidad estampada' },
      { id: 'est-tazon-magico', name: 'Tazón Mágico Personalizado con Revelado', price: 6490, unit: 'unidad estampada' },
      { id: 'est-polera', name: 'Polera Personalizada Alta Fidelidad', price: 9990, unit: 'unidad' },
      { id: 'est-botella', name: 'Botella Aluminio Personalizada con Logo', price: 7490, unit: 'unidad' },
      { id: 'est-cojin', name: 'Cojín Personalizado 40x40cm con Relleno', price: 7990, unit: 'unidad completa' },
      { id: 'est-mousepad', name: 'Mousepad Gamer / Oficina Personalizado', price: 4490, unit: 'unidad' },
    ],
  },
  {
    id: 'papeleria',
    name: 'Papelería & Encuadernación',
    icon: '📒',
    description: 'Stickers troquelados, agendas, anillados y plastificados',
    items: [
      { id: 'pap-stickers', name: 'Plancha Stickers Troquelados con tu Marca', price: 2990, unit: 'plancha A4' },
      { id: 'pap-agenda', name: 'Agenda / Cuaderno Tapa Dura Personalizado', price: 12990, unit: 'unidad' },
      { id: 'pap-anillado', name: 'Servicio de Anillado Doble Cero', price: 2490, unit: 'por documento' },
      { id: 'pap-carton', name: 'Pack 10 Cartón Piedra 1.5mm A4', price: 4990, unit: 'pack 10 planchas' },
      { id: 'pap-termolaminado', name: 'Plastificado Térmico Termolaminado A4', price: 990, unit: 'por hoja' },
    ],
  },
  {
    id: 'mayorista',
    name: 'Mayorista & Emprendedor',
    icon: '📦',
    description: 'Precios especiales por mayor y máquinas para talleres',
    items: [
      { id: 'may-master-36', name: 'Master Caja 36 Tazones Blancos AAA', price: 52990, unit: 'caja 36 unids' },
      { id: 'may-pack-5-papel', name: 'Pack 5 Resmas Papel Sublimación A4', price: 34990, unit: '500 hojas' },
      { id: 'may-tintas-litro', name: 'Set Tintas Sublimación 1 Litro CMYK', price: 54990, unit: '4 litros total' },
      { id: 'may-estampadora', name: 'Estampadora Plana 23x30cm Taller', price: 139990, unit: 'máquina térmica' },
      { id: 'may-anilladora', name: 'Anilladora Cinch Cuadrada + Alambres', price: 169990, unit: 'kit completo' },
    ],
  },
];

export const QuoteBuilder = () => {
  const [activeTab, setActiveTab] = useState('sublimacion');
  const [quantities, setQuantities] = useState({});
  const [hasDesign, setHasDesign] = useState('si');
  const [deliveryMethod, setDeliveryMethod] = useState('retiro');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  // Find all items indexed by id
  const allItemsMap = useMemo(() => {
    const map = {};
    QUOTE_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        map[item.id] = item;
      });
    });
    return map;
  }, []);

  // Update item quantity
  const handleQuantityChange = (itemId, delta) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: updated };
    });
  };

  // Reset quote
  const handleResetQuote = () => {
    setQuantities({});
    setClientNotes('');
  };

  // Calculate selected items list & total
  const selectedList = useMemo(() => {
    return Object.entries(quantities)
      .map(([id, qty]) => {
        const item = allItemsMap[id];
        if (!item || qty <= 0) return null;
        return {
          ...item,
          quantity: qty,
          subtotal: item.price * qty,
        };
      })
      .filter(Boolean);
  }, [quantities, allItemsMap]);

  const estimatedTotal = useMemo(() => {
    return selectedList.reduce((acc, curr) => acc + curr.subtotal, 0);
  }, [selectedList]);

  const totalItemsCount = useMemo(() => {
    return selectedList.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [selectedList]);

  // Generate WhatsApp Link
  const generateWhatsAppUrl = () => {
    const deliveryLabels = {
      retiro: 'Retiro en Local Puerto Montt (Mañihual 285)',
      domicilio: 'Despacho a Domicilio en Puerto Montt',
      regiones: 'Envío a Regiones (Starken / Chilexpress / Pullman)',
    };

    const designLabels = {
      si: 'Tengo mi diseño / logo listo',
      no: 'Necesito apoyo con el diseño',
    };

    let msg = `🌸 *¡Hola PekeBook! Quiero armar la siguiente cotización:*\n\n`;

    if (selectedList.length > 0) {
      msg += `🛒 *PRODUCTOS / INSUMOS SOLICITADOS:*\n`;
      selectedList.forEach((item) => {
        msg += `• ${item.quantity}x ${item.name} (${item.unit}) -> $${item.subtotal.toLocaleString('es-CL')} CLP\n`;
      });
      msg += `\n💰 *Total Estimado Referencial:* $${estimatedTotal.toLocaleString('es-CL')} CLP\n\n`;
    } else {
      msg += `📋 *Cotización general de insumos o servicios*\n\n`;
    }

    msg += `🎨 *Diseño:* ${designLabels[hasDesign]}\n`;
    msg += `🚚 *Entrega:* ${deliveryLabels[deliveryMethod]}\n`;

    if (clientName.trim()) {
      msg += `👤 *Nombre:* ${clientName.trim()}\n`;
    }
    if (clientPhone.trim()) {
      msg += `📱 *Teléfono:* ${clientPhone.trim()}\n`;
    }
    if (clientNotes.trim()) {
      msg += `📝 *Detalles / Notas:* ${clientNotes.trim()}\n`;
    }

    msg += `\n¿Me podrían confirmar disponibilidad, tiempos y la cotización final? ¡Muchas gracias! ✨`;

    return `https://wa.me/56967486503?text=${encodeURIComponent(msg)}`;
  };

  const currentCategory = QUOTE_CATEGORIES.find((c) => c.id === activeTab) || QUOTE_CATEGORIES[0];

  return (
    <section id="servicios" className="py-14 sm:py-20 bg-gradient-to-b from-[#faf6fb] via-[#f7f2f8] to-[#ffffff] relative overflow-hidden">
      
      {/* Decorative Pastel Auras */}
      <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-100/35 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ffe8f2] text-[#ee2b91] font-heading font-black text-xs tracking-wider uppercase shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COTIZADOR RÁPIDO & PERSONALIZADO</span>
          </div>

          <h2 className="font-heading font-extrabold text-[28px] sm:text-[38px] lg:text-[44px] text-[#1e192c] leading-tight mb-3">
            ✦ Arma tu Cotización ✦
          </h2>

          <p className="font-body text-[#5c5366] text-xs sm:text-base leading-relaxed">
            Selecciona los insumos de sublimación o servicios que necesitas, dinos las cantidades y te generamos el detalle listo para coordinar al instante por WhatsApp.
          </p>
        </div>

        {/* Main Grid: Selector Column + Dynamic Summary Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Product & Category Selector */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 border border-[#eedfe9] shadow-sm">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 pb-5 border-b border-gray-100">
              {QUOTE_CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-heading font-extrabold text-xs sm:text-[13px] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#ee2b91] text-white shadow-sm scale-[1.02]'
                        : 'bg-[#f8f5f9] text-[#4d4457] hover:bg-pink-50 hover:text-[#ee2b91]'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Category Description Banner */}
            <div className="py-3 px-4 my-4 rounded-2xl bg-[#faf5f9] border border-[#f0e4ee] flex items-center justify-between text-xs text-[#52495d]">
              <span>{currentCategory.description}</span>
              <span className="font-bold text-[#ee2b91] hidden sm:inline">Paso 1: Selecciona productos</span>
            </div>

            {/* Product Items List */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {currentCategory.items.map((item) => {
                const qty = quantities[item.id] || 0;
                const isSelected = qty > 0;

                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? 'bg-pink-50/50 border-[#ee2b91] shadow-xs'
                        : 'bg-white hover:bg-[#faf8fa] border-gray-100'
                    }`}
                  >
                    <div className="flex-1 pr-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-extrabold text-xs sm:text-[13.5px] text-[#241e30] leading-snug">
                          {item.name}
                        </h4>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ee2b91] flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-heading font-bold text-xs text-[#ee2b91]">
                          ${item.price.toLocaleString('es-CL')} CLP
                        </span>
                        <span className="text-[10.5px] text-gray-400">/ {item.unit}</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 bg-[#f8f5f9] p-1 rounded-full border border-gray-200">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={qty === 0}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                          qty > 0
                            ? 'bg-white text-gray-700 hover:bg-rose-100 hover:text-rose-600 shadow-xs cursor-pointer'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                        aria-label="Restar uno"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className="w-6 text-center font-heading font-black text-xs text-[#241e30]">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-7 h-7 rounded-full bg-[#ee2b91] hover:bg-[#d82180] text-white flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer"
                        aria-label="Sumar uno"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 2: Extras (Design & Delivery) */}
            <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-heading font-bold text-xs text-[#2e263c] mb-2 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#ee2b91]" />
                  <span>¿Tienes el diseño listo?</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setHasDesign('si')}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-heading font-extrabold border transition-all text-center cursor-pointer ${
                      hasDesign === 'si'
                        ? 'bg-[#ffeaf3] border-[#ee2b91] text-[#ee2b91]'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    ✨ Sí, lo tengo listo
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasDesign('no')}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-heading font-extrabold border transition-all text-center cursor-pointer ${
                      hasDesign === 'no'
                        ? 'bg-[#ffeaf3] border-[#ee2b91] text-[#ee2b91]'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    🙋 Necesito apoyo
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-heading font-bold text-xs text-[#2e263c] mb-2 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#ee2b91]" />
                  <span>Método de entrega</span>
                </label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-heading font-bold bg-[#faf7fa] border border-gray-200 text-[#25213a] focus:outline-none focus:border-[#ee2b91]"
                >
                  <option value="retiro">📍 Retiro en Local Puerto Montt</option>
                  <option value="domicilio">🛵 Despacho a Domicilio en Puerto Montt</option>
                  <option value="regiones">📦 Envío a Regiones (Starken / Chilexpress)</option>
                </select>
              </div>
            </div>

            {/* Step 3: Contact Details */}
            <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-heading font-bold text-[11px] text-gray-600 mb-1">
                  Tu nombre / Emprendimiento (opcional):
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej: Carolina / Creaciones Kawa"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[#faf7fa] border border-gray-200 focus:outline-none focus:border-[#ee2b91] placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block font-heading font-bold text-[11px] text-gray-600 mb-1">
                  Tu Teléfono / WhatsApp (opcional):
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Ej: +56 9 1234 5678"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[#faf7fa] border border-gray-200 focus:outline-none focus:border-[#ee2b91] placeholder:text-gray-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-heading font-bold text-[11px] text-gray-600 mb-1">
                  Detalles o especificaciones (colores, tallas, urgencia):
                </label>
                <textarea
                  rows={2}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Ej: Necesito 2 cajas de tazones para este viernes en la tarde..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-[#faf7fa] border border-gray-200 focus:outline-none focus:border-[#ee2b91] placeholder:text-gray-400 resize-none"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Live Quote Summary & WhatsApp Dispatch */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            
            <div className="bg-white rounded-3xl p-6 border-2 border-pink-200 shadow-md">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#ffeaf3] flex items-center justify-center text-[#ee2b91]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-[#1b172a] leading-none">
                      Tu Cotización
                    </h3>
                    <span className="text-[11px] text-gray-400">
                      {totalItemsCount} {totalItemsCount === 1 ? 'producto' : 'productos'} seleccionados
                    </span>
                  </div>
                </div>

                {selectedList.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetQuote}
                    className="text-xs text-gray-400 hover:text-rose-500 font-heading font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Vaciar</span>
                  </button>
                )}
              </div>

              {/* Items List in Summary */}
              <div className="py-4 space-y-2.5 min-h-[120px] max-h-[220px] overflow-y-auto">
                {selectedList.length === 0 ? (
                  <div className="text-center py-6 px-3">
                    <span className="text-2xl block mb-1">🛒</span>
                    <p className="text-xs font-heading font-bold text-gray-500">
                      Aún no has agregado productos.
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Usa los botones <strong>+</strong> a la izquierda para armar tu pedido.
                    </p>
                  </div>
                ) : (
                  selectedList.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs py-1 border-b border-gray-50"
                    >
                      <div className="flex-1 pr-2 truncate">
                        <span className="font-heading font-extrabold text-[#2e263d]">
                          {item.quantity}x
                        </span>{' '}
                        <span className="text-gray-700">{item.name}</span>
                      </div>
                      <span className="font-heading font-bold text-[#ee2b91] flex-shrink-0">
                        ${item.subtotal.toLocaleString('es-CL')}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Diseño:</span>
                  <span className="font-heading font-bold text-gray-800">
                    {hasDesign === 'si' ? 'Listo para imprimir' : 'Requiere apoyo'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Entrega:</span>
                  <span className="font-heading font-bold text-gray-800 truncate max-w-[190px] text-right">
                    {deliveryMethod === 'retiro'
                      ? 'Local Puerto Montt'
                      : deliveryMethod === 'domicilio'
                      ? 'Despacho Domicilio'
                      : 'Envío Regiones'}
                  </span>
                </div>

                <div className="pt-2 border-t border-dashed border-gray-200 flex items-center justify-between">
                  <span className="font-heading font-black text-sm text-[#1b172a]">
                    Total Estimado:
                  </span>
                  <span className="font-heading font-black text-lg text-[#ee2b91]">
                    ${estimatedTotal.toLocaleString('es-CL')} CLP
                  </span>
                </div>
                <small className="block text-[10px] text-gray-400 text-center">
                  *Precios referenciales con IVA incluido. Confirmación final por WhatsApp.
                </small>
              </div>

              {/* WhatsApp Action Button */}
              <div className="mt-5">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-full font-heading font-extrabold text-sm shadow-md hover:shadow-emerald-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>Enviar Cotización a WhatsApp</span>
                </a>
              </div>

              {/* Response Time Guarantee */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-heading font-semibold text-center">
                <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>Respuesta en ~15 minutos en horario comercial</span>
              </div>

            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-heading font-bold text-[#4a4054]">
              <div className="p-2.5 rounded-2xl bg-[#f8f5f9] border border-gray-100 flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#ee2b91]" />
                <span>Puerto Montt</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#f8f5f9] border border-gray-100 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Sin compromiso</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
