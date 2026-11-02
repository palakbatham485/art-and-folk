import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ARTWORKS } from '../data/artworks';

export const HomePage = () => {
  const { navigate, addToCart, toggleWishlist, wishlist, formatPrice } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Original Oil & Ink',
    'Sculptural Ceramics',
    'Textiles & Rare Fiber',
    'Fine Woodcraft'
  ];

  const filteredArtworks = activeCategory === 'All'
    ? ARTWORKS
    : ARTWORKS.filter((a) => a.category === activeCategory);

  const heroArtwork = ARTWORKS[0]; // Solitude No. 07

  return (
    <div className="space-y-24">
      {/* Editorial Hero Marquee */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 border border-outline-variant px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold bg-surface-container-low">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              The Autumn Curatorial • Volume VIII
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-normal leading-[1.1] tracking-tight">
              Monastic Silence, Pine Soot &amp; Raw Belgian Linen.
            </h1>

            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed font-light">
              INK &amp; CRAFT connects global collectors directly with master ateliers. Every acquisition is secured via cryptographic escrow, verified through embedded physical NFC deeds, and crated by museum white-glove handlers.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/product/solitude-07')}
                className="bg-primary text-on-primary hover:bg-secondary px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium transition-colors text-center"
              >
                Inspect Solitude No. 07
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="border border-primary text-primary hover:bg-primary hover:text-on-primary px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium transition-colors text-center"
              >
                Browse Master Catalog
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-outline-variant/60">
              <div>
                <span className="font-serif text-2xl font-normal text-primary">100%</span>
                <span className="block text-[10px] uppercase tracking-widest text-outline mt-1">Provenance Proof</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-normal text-primary">₹0</span>
                <span className="block text-[10px] uppercase tracking-widest text-outline mt-1">Buyer Escrow Fee</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-normal text-primary">48h</span>
                <span className="block text-[10px] uppercase tracking-widest text-outline mt-1">White-Glove Crated</span>
              </div>
            </div>
          </div>

          {/* Right Visual Marquee */}
          <div className="lg:col-span-7">
            <div className="relative group cursor-pointer" onClick={() => navigate('/product/solitude-07')}>
              <div className="aspect-[4/5] sm:aspect-[16/11] overflow-hidden bg-surface-container border border-outline-variant shadow-xl">
                <img
                  src={heroArtwork.primaryImage}
                  alt={heroArtwork.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Floating Curatorial Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md bg-surface/95 backdrop-blur-md border border-outline-variant p-5 shadow-lg">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-secondary font-bold mb-1.5">
                  <span>{heroArtwork.badge}</span>
                  <span>{heroArtwork.tag}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-primary font-medium">
                  {heroArtwork.title}
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  By {heroArtwork.artist} • {heroArtwork.location}
                </p>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-outline-variant/50">
                  <span className="font-serif text-base sm:text-lg font-medium text-primary">
                    {formatPrice(heroArtwork.priceINR)}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-secondary font-semibold group-hover:underline">
                    View Dossier →
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Curated Category Switcher & Catalog Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-outline-variant">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
              Curated Inventory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
              Active Studio Works &amp; Master Editions
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-[0.12em] px-4 py-2 border transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-on-primary border-primary font-medium'
                    : 'bg-surface text-on-surface-variant border-outline-variant hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredArtworks.map((artwork) => {
            const isFav = wishlist.includes(artwork.id);
            return (
              <div
                key={artwork.id}
                className="group flex flex-col bg-surface border border-outline-variant hover:border-primary transition-all duration-300"
              >
                {/* Image Viewport */}
                <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                  <img
                    src={artwork.primaryImage}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                    onClick={() => navigate(`/product/${artwork.id}`)}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm text-[9px] uppercase tracking-widest font-bold px-2 py-1 border border-outline-variant">
                    {artwork.badge}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(artwork.id);
                    }}
                    className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-sm transition-colors ${
                      isFav
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-surface/90 text-primary hover:text-secondary'
                    }`}
                    title={isFav ? "Saved in Vault" : "Save to Vault"}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isFav ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(artwork);
                      }}
                      className="flex-1 bg-surface text-primary hover:bg-secondary hover:text-on-secondary text-[11px] uppercase tracking-wider py-2 font-medium transition-colors text-center"
                    >
                      Quick Add
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${artwork.id}`);
                      }}
                      className="bg-primary text-on-primary hover:bg-primary-container px-3 py-2 text-[11px] uppercase tracking-wider font-medium transition-colors"
                      title="Inspect Dossier"
                    >
                      Inspect
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-outline mb-1">
                      <span>{artwork.artist}</span>
                      <span>{artwork.origin}</span>
                    </div>
                    <h3
                      onClick={() => navigate(`/product/${artwork.id}`)}
                      className="font-serif text-lg text-primary font-medium hover:text-secondary transition-colors cursor-pointer leading-snug"
                    >
                      {artwork.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-1 mt-1 font-light">
                      {artwork.medium}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/50 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-base font-semibold text-primary block">
                        {formatPrice(artwork.priceINR)}
                      </span>
                      <span className="text-[10px] text-outline tracking-wider">
                        GST ITC Compliant
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(artwork)}
                      className="border border-outline-variant hover:border-primary text-primary px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium hover:bg-primary hover:text-on-primary transition-all"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Escrow & Provenance Security Protocol Section */}
      <section className="bg-surface-container py-20 border-y border-outline-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
              Sovereign Governance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
              How INK &amp; CRAFT Guarantees Provenance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface p-8 border border-outline-variant">
              <span className="material-symbols-outlined text-3xl text-secondary mb-4 block">
                lock
              </span>
              <h3 className="font-serif text-xl text-primary font-medium mb-3">
                1. Multi-Sig Escrow Settlement
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                Your payment is locked into an independent high-value sovereign escrow. Funds are never released to the artisan until you physically receive, inspect, and ratify the piece.
              </p>
            </div>

            <div className="bg-surface p-8 border border-outline-variant">
              <span className="material-symbols-outlined text-3xl text-secondary mb-4 block">
                nfc
              </span>
              <h3 className="font-serif text-xl text-primary font-medium mb-3">
                2. Embedded Physical NFC Seals
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                Each work contains a micro-NFC cryptographic capsule embedded directly into the linen stretcher or ceramic base, verifiable instantly with any smartphone camera.
              </p>
            </div>

            <div className="bg-surface p-8 border border-outline-variant">
              <span className="material-symbols-outlined text-3xl text-secondary mb-4 block">
                local_shipping
              </span>
              <h3 className="font-serif text-xl text-primary font-medium mb-3">
                3. Armored White-Glove Transit
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                Shipped in temperature-monitored, shock-resistant museum crates with private art couriers and full transit insurance from the Tokyo atelier directly to your residence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

