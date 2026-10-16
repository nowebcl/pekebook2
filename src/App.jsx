import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import { Header } from './components/layout/Header';
import { CategoryNav } from './components/layout/CategoryNav';
import { HeroSlider } from './components/home/HeroSlider';
import { FeaturedSection } from './components/home/FeaturedSection';
import { BannerSlider } from './components/home/BannerSlider';
import { AboutBanner } from './components/home/AboutBanner';
import { QuoteBuilder } from './components/home/QuoteBuilder';
import { AdvisoryBanner } from './components/home/AdvisoryBanner';
import { TrustBadges } from './components/home/TrustBadges';
import { FaqSection } from './components/home/FaqSection';
import { NewsletterSection } from './components/home/NewsletterSection';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { QuickViewModal } from './components/ui/QuickViewModal';
import { ToastNotification } from './components/ui/ToastNotification';
import { WhatsAppFloating } from './components/layout/WhatsAppFloating';
import { FloatingCartButton } from './components/layout/FloatingCartButton';
import { AdminPage } from './components/admin/AdminPage';

// Función para detectar si la ruta actual es el link privado de administración
function checkIsAdminRoute() {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = new URLSearchParams(window.location.search);
  
  return (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    hash === '#admin' ||
    hash === '#/admin' ||
    search.has('admin')
  );
}

export function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdminRoute);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Escuchar cambios de URL (popstate y hashchange)
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(checkIsAdminRoute());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleNavigateToStore = () => {
    if (window.location.pathname.toLowerCase().startsWith('/admin')) {
      window.history.pushState({}, '', '/');
    } else {
      window.location.hash = '';
    }
    setIsAdminRoute(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
  };

  const handleResetCategory = (catId = 'todos') => {
    setActiveCategory(catId);
  };

  return (
    <ProductsProvider>
      {/* Si la ruta es el link particular de administración, se renderiza la página completa sin el frontend */}
      {isAdminRoute ? (
        <AdminPage onNavigateToStore={handleNavigateToStore} />
      ) : (
        <CartProvider>
          {/* 1. Site Header */}
          <Header searchQuery={searchQuery} onSearch={setSearchQuery} />

          {/* 3. Category Strip */}
          <CategoryNav
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* 4. Main content matching exact redesign hierarchy */}
          <main id="inicio">
            {/* Hero Section */}
            <HeroSlider />

            {/* Destacados PekeBook (#productos) */}
            <FeaturedSection
              activeCategory={activeCategory}
              onResetCategory={handleResetCategory}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />

            {/* Slider de Banners de Sublimación */}
            <BannerSlider />

            {/* About Banner (#nosotros) */}
            <AboutBanner />

            {/* Dynamic Quote Builder (#servicios) */}
            <QuoteBuilder />

            {/* Help & Contact Banner (.help-banner #contacto) */}
            <AdvisoryBanner />

            {/* Benefits Strip (.benefits) */}
            <TrustBadges />

            {/* FAQs Section (#faq) */}
            <FaqSection />

            {/* Newsletter Section */}
            <NewsletterSection />
          </main>

          {/* 5. Footer */}
          <Footer />

          {/* Interactive E-commerce Overlays */}
          <CartDrawer />
          <QuickViewModal />
          <ToastNotification />
          <WhatsAppFloating />
          <FloatingCartButton />
        </CartProvider>
      )}
    </ProductsProvider>
  );
}

export default App;
