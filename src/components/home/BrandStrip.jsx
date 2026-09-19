import React from 'react';
import { BRANDS } from '../../data/brands';
import { Scissors, Printer, BookOpen, Palette, Layers, Flame, Heart, Sparkles } from 'lucide-react';

const iconMap = {
  Scissors,
  Printer,
  BookOpen,
  Palette,
  Layers,
  Flame,
  Heart,
  Sparkles
};

export const BrandStrip = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="bg-white/60 backdrop-blur-xs rounded-2xl p-4 border border-pink-100/70 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-3 px-2">
          <p className="text-xs font-bold font-heading text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Marcas & Marcas Aliadas en Insumos Creativos</span>
          </p>
          <span className="text-[11px] text-pink-600 font-semibold hidden sm:inline">
            Insumos Originales & Garantizados
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {BRANDS.map((brand, i) => {
            const Icon = iconMap[brand.icon] || Heart;
            return (
              <div
                key={i}
                className="group flex flex-col items-center justify-center p-3 rounded-xl bg-pink-50/40 hover:bg-white border border-pink-100/60 hover:border-pink-300 hover:shadow-xs transition-all duration-200 text-center"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-pink-500 group-hover:scale-110 shadow-xs mb-1.5 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-xs text-gray-800 line-clamp-1">
                  {brand.name}
                </span>
                <span className="text-[9px] text-gray-400 line-clamp-1">
                  {brand.tagline}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
