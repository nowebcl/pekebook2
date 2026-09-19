import React from 'react';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const REDESIGN_PRODUCTS = [
  {
    id: 'pack-tazones-sublimacion-12',
    name: 'Caja 12 Tazones Blancos 11oz AAA Sublimación',
    badge: 'MAYORISTA',
    price: 18990,
    originalPrice: 22990,
    description: 'Cerámica brillante blanca de alta calidad para estampados con colores vivos y resistentes al lavavajillas.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    category: 'sublimacion',
    subcategories: ['sublimacion', 'blanks']
  },
  {
    id: 'tazon-magico-sublimar',
    name: 'Tazón Mágico Negro Mate 11oz Sublimable',
    badge: 'MÁS VENDIDO',
    price: 2990,
    originalPrice: 3890,
    description: 'Revela la imagen personalizada al contacto con líquido caliente. Acabado suave de alta fidelidad.',
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80',
    category: 'sublimacion',
    subcategories: ['sublimacion', 'blanks']
  },
  {
    id: 'botella-aluminio-blanca-600',
    name: 'Botella Deportiva Aluminio Blanca 600ml',
    badge: 'BLANKS',
    price: 3990,
    originalPrice: 4990,
    description: 'Botella de aluminio lista para sublimar con tapa deportiva y mosquetón incluido.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    category: 'sublimacion',
    subcategories: ['sublimacion', 'blanks']
  },
  {
    id: 'papel-sublimacion-a4',
    name: 'Resma Papel Sublimación Secado Rápido A4 (100 Hojas)',
    badge: 'ALTA DEFINICIÓN',
    price: 7990,
    originalPrice: 9490,
    description: 'Papel microporoso de 100g con secado instantáneo y transferencia de color superior al 95%.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    category: 'sublimacion',
    subcategories: ['sublimacion', 'papeles-tintas']
  },
  {
    id: 'tintas-sublimacion-cmyk',
    name: 'Set 4 Tintas Sublimación CMYK 100ml Alta Densidad',
    badge: 'OFERTA TALLER',
    price: 16990,
    originalPrice: 19990,
    description: 'Pack de 4 botellas CMYK para impresoras Epson de sublimación. Negros puros y colores vibrantes.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    category: 'sublimacion',
    subcategories: ['sublimacion', 'papeles-tintas']
  },
  {
    id: 'cinta-termica-pack2',
    name: 'Cinta Térmica Alta Temperatura 10mm (Pack 2 Rollos)',
    badge: 'INDISPENSABLE',
    price: 3490,
    originalPrice: 4290,
    description: 'Resiste hasta 260°C sin manchar ni dejar restos de pegamento en tus productos estampados.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
    category: 'sublimacion',
    subcategories: ['sublimacion']
  },
  {
    id: 'mousepad-sublimable',
    name: 'Mouse Pad Rectangular 18x22cm para Sublimar',
    badge: 'SUBLIMABLE',
    price: 1990,
    originalPrice: 2490,
    description: 'Base de caucho antideslizante con cubierta textil blanca de alta definición para mousepads personalizados.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    category: 'sublimacion',
    subcategories: ['sublimacion', 'blanks']
  },
  {
    id: 'cojin-textil-sublimable',
    name: 'Funda Cojín Blanco 40x40cm Poliéster Sublimable',
    badge: 'TEXTIL',
    price: 3290,
    originalPrice: 3990,
    description: 'Tejido suave tipo lino con cierre invisible, ideal para fotos y estampados conmemorativos.',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
    category: 'sublimacion',
    subcategories: ['sublimacion', 'blanks']
  },
  {
    id: 'estampadora-plana-23x30',
    name: 'Estampadora Plana Verde Pastel 23x30 cm Taller',
    badge: 'MÁQUINAS',
    price: 139990,
    originalPrice: 159990,
    description: 'Prensa térmica oscilante para poleras, rompecabezas, llaveros, placas y textiles.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    category: 'sublimacion',
    subcategories: ['sublimacion']
  },
  {
    id: 'anilladora-cinch-pro',
    name: 'Anilladora Cinch Cuadrada + Alambres',
    badge: 'ENCUADERNACIÓN',
    price: 169990,
    originalPrice: 189990,
    description: 'Perforadora y anilladora manual para cuadernos, agendas y recetarios.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    category: 'encuadernacion',
    subcategories: ['encuadernacion']
  },
  {
    id: 'carton-piedra-pack-10',
    name: 'Pack 10 Cartón Piedra 1.5mm A4',
    badge: 'INSUMO',
    price: 4990,
    originalPrice: 5990,
    description: 'Planchas de cartón prensado rígido para tapas duras de libretas.',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=600&q=80',
    category: 'encuadernacion',
    subcategories: ['encuadernacion']
  },
  {
    id: 'agenda-personalizada',
    name: 'Agendas & Planificación PekeBook',
    badge: 'DISEÑO',
    price: 12990,
    originalPrice: 14990,
    description: 'Diseños prácticos y creativos para organizar tu día a día en Puerto Montt.',
    image: 'https://pekebook.cl/wp-content/uploads/2025/07/491445813_17913224271098232_4509710459591268297_n-1.jpg',
    category: 'libreria',
    subcategories: ['libreria']
  }
];

export const FeaturedSection = ({ activeCategory, onResetCategory, searchQuery = '', onClearSearch }) => {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist } = useCart();

  const trimmedSearch = searchQuery.trim().toLowerCase();

  // If user is typing in search, search across all products; otherwise filter by selected category
  const displayedProducts = trimmedSearch
    ? REDESIGN_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(trimmedSearch) ||
        p.description.toLowerCase().includes(trimmedSearch) ||
        (p.badge && p.badge.toLowerCase().includes(trimmedSearch)) ||
        (p.category && p.category.toLowerCase().includes(trimmedSearch))
      )
    : (activeCategory && activeCategory !== 'todos'
        ? REDESIGN_PRODUCTS.filter(p => 
            p.category === activeCategory || 
            (p.subcategories && p.subcategories.includes(activeCategory))
          )
        : REDESIGN_PRODUCTS);

  return (
    <section id="productos" className="section section-soft">
      <div className="container">
        <div className="section-heading">
          <span>✨</span>
          <h2>Insumos para Sublimación & Destacados PekeBook</h2>
          <span>✨</span>
        </div>

        {/* Search Feedback Pill (when searching) */}
        {trimmedSearch && (
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="inline-flex items-center gap-2 bg-pink-100/80 border border-pink-300 text-[#ee2b91] px-4 py-1.5 rounded-full text-xs font-heading font-extrabold shadow-xs animate-fadeIn">
              <span>🔍 Resultados para: &ldquo;<strong>{searchQuery}</strong>&rdquo; ({displayedProducts.length} encontrados)</span>
              <button
                type="button"
                onClick={onClearSearch}
                className="ml-1.5 hover:bg-pink-200/80 rounded-full w-4 h-4 flex items-center justify-center text-[#ee2b91] font-black cursor-pointer transition-colors"
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Sub-tabs for fast filtering right inside the section */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('todos');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              (!activeCategory || activeCategory === 'todos') && !trimmedSearch
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            Todos los Insumos
          </button>
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('sublimacion');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              activeCategory === 'sublimacion'
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            ✨ Sublimación
          </button>
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('blanks');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              activeCategory === 'blanks' && !trimmedSearch
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            ☕ Tazones & Blanks
          </button>
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('papeles-tintas');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              activeCategory === 'papeles-tintas' && !trimmedSearch
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            📄 Papeles & Tintas
          </button>
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('encuadernacion');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              activeCategory === 'encuadernacion' && !trimmedSearch
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            📒 Encuadernación
          </button>
          <button
            onClick={() => {
              if (onClearSearch) onClearSearch();
              onResetCategory('libreria');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-extrabold transition-all ${
              activeCategory === 'libreria' && !trimmedSearch
                ? 'bg-[#ee2b91] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
            }`}
          >
            🎁 Librería & Bazar
          </button>
        </div>

        {/* Empty Search Result State */}
        {displayedProducts.length === 0 && (
          <div className="text-center py-12 px-6 bg-white/70 rounded-3xl border border-pink-200 my-6 max-w-md mx-auto shadow-xs">
            <span className="text-4xl mb-3 block">🔍</span>
            <h3 className="font-heading font-extrabold text-base text-gray-800 mb-1">
              No encontramos productos para &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Prueba buscando por <em>tazones, tintas, botellas, papeles, cinta térmica</em>...
            </p>
            <button
              type="button"
              onClick={() => {
                if (onClearSearch) onClearSearch();
                onResetCategory('todos');
              }}
              className="px-5 py-2 bg-[#ee2b91] hover:bg-[#d92d81] text-white rounded-full text-xs font-heading font-extrabold transition-all cursor-pointer shadow-xs"
            >
              Ver todos los insumos
            </button>
          </div>
        )}

        <div className="product-grid">
          {displayedProducts.map((product) => {
            const isWish = isInWishlist(product.id);
            return (
              <article key={product.id} className="product-card">
                <div>
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="badge">{product.badge}</div>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/80 transition-transform ${
                        isWish ? 'text-rose-500 scale-110' : 'text-gray-400 hover:text-rose-500'
                      }`}
                      aria-label="Favorito"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>

                <div>
                  <div className="price">
                    ${product.price.toLocaleString('es-CL')} CLP
                  </div>
                  <div className="card-actions">
                    <a
                      onClick={() => setQuickViewProduct(product)}
                      className="cursor-pointer"
                    >
                      Consultar detalle →
                    </a>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="inline-flex items-center gap-1 bg-[#ef4fa1] hover:bg-[#d92d81] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-xs transition-transform active:scale-95"
                      aria-label={`Añadir ${product.name} al carrito`}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
