import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    image: '/1.png?v=2',
    alt: 'Papeles, Tintas y Accesorios para Sublimación - PekeBook',
    title: 'Papeles, Tintas y Accesorios',
    link: '#productos'
  },
  {
    id: 2,
    image: '/2.png?v=2',
    alt: 'Insumos para Sublimación - Diseña, Crea, Regala - PekeBook',
    title: 'Insumos para Sublimación',
    link: '#productos'
  },
  {
    id: 3,
    image: '/3.png?v=2',
    alt: 'Todo lo que necesitas para sublimar - PekeBook',
    title: 'Todo para Sublimar',
    link: '#productos'
  }
];

export const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section className="py-6 sm:py-8 bg-[#fdfcfd]" aria-label="Banners de Insumos para Sublimación">
      <div className="container">
        <div
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow border-2 border-pink-100/80 group bg-white"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides Track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BANNERS.map((banner, index) => (
              <div key={banner.id} className="w-full flex-shrink-0">
                <a href={banner.link} className="block w-full cursor-pointer">
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-auto object-cover select-none block"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Navigation Arrow Left */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 active:scale-95 z-10 cursor-pointer"
            aria-label="Banner anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#ee2b91]" />
          </button>

          {/* Navigation Arrow Right */}
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 active:scale-95 z-10 cursor-pointer"
            aria-label="Siguiente banner"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#ee2b91]" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/25 backdrop-blur-xs px-3 py-1.5 rounded-full">
            {BANNERS.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index
                    ? 'w-6 sm:w-7 bg-[#ee2b91]'
                    : 'w-2 sm:w-2.5 bg-white/80 hover:bg-white'
                }`}
                aria-label={`Ir al banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
