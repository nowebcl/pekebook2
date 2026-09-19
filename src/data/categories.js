export const CATEGORIES = [
  {
    id: 'todos',
    name: 'Todos',
    icon: 'Sparkles',
    badge: 'Nuevo',
    color: 'bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-200',
  },
  {
    id: 'encuadernacion',
    name: 'Encuadernación',
    icon: 'BookOpen',
    badge: 'Popular',
    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200',
  },
  {
    id: 'sublimacion',
    name: 'Sublimación',
    icon: 'Flame',
    badge: 'Estrella',
    color: 'bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200',
  },
  {
    id: 'libreria',
    name: 'Librería',
    icon: 'BookMarked',
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200',
  },
  {
    id: 'bazar',
    name: 'Bazar Kawaii',
    icon: 'Gift',
    badge: 'Kawaii',
    color: 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200',
  },
  {
    id: 'kits-emprende',
    name: 'Kits Emprende',
    icon: 'Briefcase',
    badge: 'Ahorro',
    color: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200',
  },
  {
    id: 'impresion-digital',
    name: 'Impresión Digital',
    icon: 'Printer',
    color: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200 border-cyan-200',
  },
  {
    id: 'ofertas',
    name: 'Insumos & Ofertas',
    icon: 'Tag',
    badge: 'Dcto',
    color: 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200',
  },
];

export const MOSAIC_ITEMS = [
  {
    id: 'encuadernacion',
    title: 'Encuadernación Artesanal',
    subtitle: 'Tapas duras, cartón piedra, anillados, telas y esquineros',
    tag: 'Taller & Creación',
    tagColor: 'bg-purple-500 text-white',
    bgGradient: 'from-purple-100/90 via-pink-50/80 to-purple-200/50',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    colSpan: 'col-span-1 md:col-span-2 md:row-span-2',
    accentColor: '#9333EA',
    features: ['Anilladoras Cinch', 'Espiral metálico continuo', 'Cartón piedra 1.5mm y 2mm', 'Laminados holográficos']
  },
  {
    id: 'sublimacion',
    title: 'Sublimación & Estampados',
    subtitle: 'Tazones, botellas térmicas, tintas, papeles y prensas',
    tag: 'Mayorista',
    tagColor: 'bg-pink-500 text-white',
    bgGradient: 'from-pink-100/90 via-rose-50/80 to-orange-100/50',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80',
    colSpan: 'col-span-1 md:col-span-1 md:row-span-1',
    accentColor: '#EC4899',
    features: ['Tazones 11oz AAA', 'Papel de secado rápido', 'Prensas térmicas planas']
  },
  {
    id: 'bazar',
    title: 'Bazar & Papelería Kawaii',
    subtitle: 'Stickers vinílicos, libretas, washis, lápices pastel y regalitos',
    tag: 'Amor & Diseño',
    tagColor: 'bg-amber-500 text-white',
    bgGradient: 'from-yellow-100/90 via-amber-50/80 to-pink-100/50',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80',
    colSpan: 'col-span-1 md:col-span-1 md:row-span-1',
    accentColor: '#F59E0B',
    features: ['Planners & Agendas', 'Washi tapes japoneses', 'Accesorios de escritorio']
  },
  {
    id: 'kits-emprende',
    title: '¡Kits Emprende 2026!',
    subtitle: 'Combos completos con máquina, insumos y asesoría para arrancar tu negocio',
    tag: 'Combo Emprendedor',
    tagColor: 'bg-emerald-600 text-white',
    bgGradient: 'from-emerald-100/90 via-teal-50/80 to-cyan-100/50',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80',
    colSpan: 'col-span-1 md:col-span-1 md:row-span-1',
    accentColor: '#10B981',
    features: ['Kit Alpha Cameo + Estampadora', 'Combo Anillado + Guillotina', 'Asesoría 1 a 1 de regalo']
  },
  {
    id: 'impresion-digital',
    title: 'Impresión Digital & Talleres',
    subtitle: 'Impresiones fotográficas, tarjetas, stickers troquelados y archivos listos',
    tag: 'Servicio en Tienda',
    tagColor: 'bg-sky-500 text-white',
    bgGradient: 'from-sky-100/90 via-blue-50/80 to-indigo-100/50',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=700&q=80',
    colSpan: 'col-span-1 md:col-span-1 md:row-span-1',
    accentColor: '#0EA5E9',
    features: ['Papel fotográfico glossy', 'Stickers resistentes al agua', 'Retiro en Puerto Montt']
  }
];
