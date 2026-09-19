import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';

const INSTA_POSTS = [
  {
    image: 'https://pekebook.cl/wp-content/uploads/2025/07/491445813_17913224271098232_4509710459591268297_n-1.jpg',
    caption: '¡Nuevos insumos en vitrina! Anilladoras, planners y papeles fotográficos listos para ti en Mañihual 285 🌸',
    likes: 142,
    comments: 18,
  },
  {
    image: 'https://pekebook.cl/wp-content/uploads/2025/07/491497905_17913224322098232_6545544990052419857_n-1.jpg',
    caption: 'Taller de encuadernación en proceso ✨ Tapas duras y espirales continuo doble cero.',
    likes: 98,
    comments: 12,
  },
  {
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    caption: 'Tazones sublimados con acabado brillante AAA para el día de la madre ☕💖',
    likes: 215,
    comments: 31,
  },
  {
    image: 'https://pekebook.cl/wp-content/uploads/2025/07/491509843_17913224304098232_9036823336421850543_n-1.jpg',
    caption: 'Llegó reposición de artículos de bazar kawaii: destacadores pastel, washis y libretas mini 🎁',
    likes: 176,
    comments: 24,
  },
  {
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80',
    caption: 'Planners perpetuos diseñados y anillados en nuestro taller de Puerto Montt 📅🌧️',
    likes: 189,
    comments: 15,
  },
  {
    image: 'https://pekebook.cl/wp-content/uploads/2025/07/491518317_17913224286098232_1180019673624007965_n-1.jpg',
    caption: '¡Horarios de atención actualizados! Lunes a Viernes 09:30 a 18:30 y Sábados hasta las 14:00 hrs ⏰',
    likes: 85,
    comments: 9,
  }
];

export const InstagramFeed = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 text-center sm:text-left">
        <div>
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider font-heading flex items-center justify-center sm:justify-start gap-1.5">
            <Instagram className="w-4 h-4 text-pink-500" />
            <span>Comunidad Creativa</span>
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-gray-900 mt-1">
            💖 Síguenos en Instagram @pekebook.cl 💖
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Descubre nuevos arribos, reels de talleres, tips de encuadernación y nuestro día a día en el sur.
          </p>
        </div>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-pink-200 hover:scale-105 transition-all"
        >
          <Instagram className="w-4 h-4" />
          <span>Seguir en Instagram</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid of Instagram Photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {INSTA_POSTS.map((post, idx) => (
          <div
            key={idx}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 shadow-xs cursor-pointer"
          >
            <img
              src={post.image}
              alt={`Instagram post ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover overlay with likes and caption */}
            <div className="absolute inset-0 bg-pink-900/60 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white text-center">
              <div className="flex justify-center items-center gap-3 text-xs font-bold pt-2">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-white text-white" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                  {post.comments}
                </span>
              </div>
              <p className="text-[10px] line-clamp-3 leading-tight text-pink-100">
                {post.caption}
              </p>
              <span className="text-[9px] font-bold text-pink-200 uppercase tracking-widest pb-1">
                @pekebook.cl
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
