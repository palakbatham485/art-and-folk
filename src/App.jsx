import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ReceiptPage } from './pages/ReceiptPage';
import { CollectorSuitePage } from './pages/CollectorSuitePage';
import { GuildPortalPage } from './pages/GuildPortalPage';
import { WishlistPage } from './pages/WishlistPage';
import { TreasuryPage } from './pages/TreasuryPage';
import { ManifestoPage } from './pages/ManifestoPage';
import { DisciplinesPage } from './pages/DisciplinesPage';
import { ArtistsPage } from './pages/ArtistsPage';
import { ArchivePage } from './pages/ArchivePage';

export const App = () => {
  const { currentRoute, toast } = useApp();

  const renderPage = () => {
    if (currentRoute === '/' || currentRoute === '') return <HomePage />;
    if (currentRoute === '/shop') return <ShopPage />;
    if (currentRoute.startsWith('/product/')) return <ProductDetailPage />;
    if (currentRoute === '/cart') return <CartPage />;
    if (currentRoute === '/checkout') return <CheckoutPage />;
    if (currentRoute === '/receipt') return <ReceiptPage />;
    if (currentRoute === '/collector-suite') return <CollectorSuitePage />;
    if (currentRoute === '/guild-portal') return <GuildPortalPage />;
    if (currentRoute === '/wishlist') return <WishlistPage />;
    if (currentRoute === '/treasury') return <TreasuryPage />;
    if (currentRoute === '/manifesto') return <ManifestoPage />;
    if (currentRoute === '/disciplines') return <DisciplinesPage />;
    if (currentRoute === '/artists') return <ArtistsPage />;
    if (currentRoute === '/archive') return <ArchivePage />;

    // Fallback
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />

      {/* Interactive Toast Notifications */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3.5 shadow-2xl border border-outline/30 flex items-center gap-3 text-xs tracking-wider animate-bounce">
          <span className="material-symbols-outlined text-secondary text-base">
            {toast.type === 'success' ? 'check_circle' : 'info'}
          </span>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

