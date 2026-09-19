import React from 'react';
import { Store, ShieldCheck, Truck, Heart, ArrowRight } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Store,
    title: 'Atención personalizada',
    bg: 'bg-[#ffe4f0]',
    color: 'text-[#ee2b91]',
  },
  {
    icon: ShieldCheck,
    title: 'Productos de calidad',
    bg: 'bg-[#fef3c7]',
    color: 'text-[#d97706]',
  },
  {
    icon: Truck,
    title: 'Todo en un solo lugar',
    bg: 'bg-[#d1fae5]',
    color: 'text-[#059669]',
  },
  {
    icon: Heart,
    title: 'Compromiso con la comunidad',
    bg: 'bg-[#ede9fe]',
    color: 'text-[#7c3aed]',
  },
];

export const AboutBanner = () => {
  return (
    <section id="nosotros" className="relative py-10 sm:py-16 lg:py-24 bg-white overflow-hidden max-w-full">
      {/* Decorative soft pastel background blobs */}
      <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#dcfce7]/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-[#fce7f3]/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full bg-[#fef9c3]/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-[#ede9fe]/50 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full min-w-0">
          
          {/* Left Column: Information, Values & Action */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left min-w-0 w-full">
            
            {/* Tag / Eyebrow */}
            <div className="inline-flex items-center gap-1.5 mb-2.5 self-start">
              <span className="px-3.5 py-1 rounded-full bg-[#ffe8f2] text-[#ee2b91] font-heading font-black text-[11px] sm:text-xs tracking-wider uppercase shadow-xs">
                QUIÉNES SOMOS
              </span>
              {/* Decorative pastel rays */}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#f472b6]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              >
                <path d="M5 19L10 13" />
                <path d="M12 16L17 10" />
              </svg>
            </div>

            {/* Main Title */}
            <h2 className="font-heading font-extrabold text-[24px] sm:text-[36px] lg:text-[46px] leading-[1.12] text-[#1b172a] mb-3 break-words">
              Más que una librería,<br />
              <span className="text-[#ee2b91]">somos parte de tu historia</span>
            </h2>

            {/* Description Paragraph */}
            <p className="font-body text-[#52495d] text-xs sm:text-base lg:text-[16px] leading-relaxed mb-6 max-w-xl">
              En PekeBook trabajamos con la pasión de ofrecerte productos de calidad en librería, bazar, impresión, encuadernación y sublimación. Creemos en la creatividad, el estudio y los pequeños grandes proyectos que hacen la vida más colorida.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-2 mb-6 w-full min-w-0">
              {HIGHLIGHTS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center p-1.5 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                  >
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-2 shadow-xs`}
                    >
                      <IconComponent className={`w-5 h-5 sm:w-7 sm:h-7 ${item.color}`} strokeWidth={2.2} />
                    </div>
                    <span className="font-heading font-extrabold text-[11px] sm:text-[12.5px] text-[#241e30] leading-tight max-w-[110px]">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Actions: Button + Handwritten Note + Paper Airplane */}
            <div className="relative flex flex-wrap items-center gap-3 sm:gap-6 pt-1 w-full min-w-0">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-[#f83a99] hover:bg-[#e42183] text-white px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-heading font-extrabold text-xs sm:text-sm shadow-md hover:shadow-pink-200/80 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Conocé más</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>

              {/* Handwritten Note with Heart */}
              <div className="flex items-center gap-1.5 font-['Caveat',_cursive] text-base sm:text-xl lg:text-2xl font-bold text-[#2e263d] select-none break-words">
                <span>Gracias por ser parte de PekeBook</span>
                <span className="text-[#ee2b91] text-xl sm:text-2xl animate-pulse">❤️</span>
              </div>

              {/* Decorative Paper Airplane with Dashed Trail */}
              <div className="hidden sm:block absolute -right-2 -bottom-2 pointer-events-none select-none opacity-85">
                <svg className="w-20 h-14" viewBox="0 0 90 60" fill="none">
                  <path
                    d="M 5 50 Q 40 58 65 30"
                    stroke="#433951"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                  <g transform="translate(62, 14) rotate(15)">
                    <path
                      d="M0 0 L22 8 L6 13 L0 0 Z"
                      fill="#f43f5e"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M6 13 L22 8 L10 20 L6 13 Z"
                      fill="#e11d48"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                    />
                  </g>
                </svg>
              </div>
            </div>

          </div>

          {/* Right Column: Provided Image f2537851-903c-481b-a189-bf63daf3f581.png */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center w-full min-w-0 overflow-hidden">
            <div className="relative w-full max-w-[420px] lg:max-w-[580px] min-w-0 mx-auto">
              <img
                src="/f2537851-903c-481b-a189-bf63daf3f581.png"
                alt="PekeBook Puerto Montt - Más que una librería, somos parte de tu historia"
                className="w-full max-w-full h-auto object-contain rounded-2xl sm:rounded-3xl drop-shadow-xl hover:scale-[1.01] transition-transform duration-300 block"
                onError={(e) => {
                  e.target.src = 'https://pekebook.cl/wp-content/uploads/2025/07/491445813_17913224271098232_4509710459591268297_n-1.jpg';
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
