import React from 'react';
import { BookOpen, Printer, Sparkles, Scissors, MessageCircle } from 'lucide-react';

const SERVICES = [
  {
    title: 'Encuadernación Profesional',
    desc: 'Anillados metálicos continuos, tapas duras personalizadas, plastificados y restauración de textos o agendas.',
    icon: BookOpen,
    image: 'https://pekebook.cl/wp-content/uploads/elementor/thumbs/freepik__generate-an-image-of-a-professional-bookbinding-se__15632-r92hhkn8rbwn250600i4jdnvcg33ailcg20h87qyj4.jpeg',
    badge: 'Taller Propio'
  },
  {
    title: 'Impresión Digital Full Color',
    desc: 'Impresión láser y fotográfica de alta resolución para stickers troquelados, tarjetas, pósters y documentos en el acto.',
    icon: Printer,
    image: 'https://pekebook.cl/wp-content/uploads/elementor/thumbs/freepik__create-a-professional-realistic-image-of-a-digital__15631-r92hgpmkhsq6f098153fr3hnqqbz8i67bshge30y8g.jpeg',
    badge: 'Alta Definición'
  },
  {
    title: 'Bazar Kawaii & Papelería',
    desc: 'Gran surtido de washis, lápices pastel Morandi, stickers resistentes al agua, libretas artesanales y regalos únicos.',
    icon: Sparkles,
    image: 'https://pekebook.cl/wp-content/uploads/elementor/thumbs/freepik__generate-a-realistic-highquality-image-of-a-bazaar__15630-r92hfulw89jprvia29oqytbg50kv6hr27iyfjyaxxs.jpeg',
    badge: 'Novedades'
  },
  {
    title: 'Corte, Laminado & Sublimación',
    desc: 'Servicio de corte con guillotina de precisión, termolaminados mate/brillo y estampados de artículos personalizados.',
    icon: Scissors,
    image: 'https://pekebook.cl/wp-content/uploads/elementor/thumbs/women-cutting-paper-in-printing-shop-DGH9QFZ-r92fgr3dae7xlos481bmv97akt0dyohyrmj9rhpykw.jpg',
    badge: 'Acabados Pro'
  }
];

export const StoreServices = () => {
  return (
    <section id="servicios" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold font-heading">
          <Sparkles className="w-3.5 h-3.5 fill-purple-400" />
          <span>Servicios en Puerto Montt</span>
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
          💖 Todo lo que Necesitas, en un Solo Lugar 💖
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          En Pekebook transformamos tu experiencia con servicios personalizados, rápidos y de calidad garantizada.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-soft hover:shadow-soft-lg flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-pink-50">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-pink-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    {srv.badge}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-sm text-gray-900">
                      {srv.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href={`https://wa.me/56967486503?text=${encodeURIComponent(
                    `Hola Pekebook, quisiera cotizar el servicio de: ${srv.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Cotizar Servicio</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
