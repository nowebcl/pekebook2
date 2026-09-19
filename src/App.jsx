import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { CategoryNav } from './components/layout/CategoryNav';
import { HeroSlider } from './components/home/HeroSlider';
import { FeaturedSection } from './components/home/FeaturedSection';
import { BannerSlider } from './components/home/BannerSlider';
import { AboutBanner } from './components/home/AboutBanner';
import { KitsEmprende } from './components/home/KitsEmprende';
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

export function App() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
  };

  const handleResetCategory = (catId = 'todos') => {
    setActiveCategory(catId);
  };

  return (
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

        {/* Kits & Services Section (.kits-section) */}
        <KitsEmprende />

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
  );
}

export default App;
