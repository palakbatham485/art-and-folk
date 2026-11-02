import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Header = () => {
  const {
    currentRoute,
    navigate,
    cart,
    wishlist,
    currency,
    setCurrency,
    showToast
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { label: "Shop All", path: "/shop" },
    { label: "Original Art", path: "/shop" },
    { label: "Handmade", path: "/disciplines" },
    { label: "Artists & Guild", path: "/artists" },
    { label: "Our Story", path: "/manifesto" },
    { label: "Collector Suite", path: "/collector-suite" },
    { label: "Guild Atelier", path: "/guild-portal" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md hairline-b transition-all">
      {/* Top Archival Banner */}
      <div className="bg-primary text-on-primary text-[10px] sm:text-[11px] tracking-[0.16em] uppercase py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
        <span>Sovereign Art Escrow Protocol Active • 100% Tamper-Evident NFC & Provenance Certified</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-primary hover:text-secondary transition-colors"
              aria-label="Toggle Navigation"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

          {/* Brand Signature / Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="group flex flex-col text-left focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-primary group-hover:text-secondary transition-colors">
                INK &amp; CRAFT
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-outline font-semibold">
                Haute Atelier &amp; Fine Art
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.path;
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className={`text-xs uppercase tracking-[0.14em] font-medium transition-all relative py-1 ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-secondary" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Utilities (Currency, Wishlist, Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-xs tracking-wider font-medium text-on-surface hover:text-primary py-1 px-2 border border-outline-variant/50 rounded-none bg-surface-container-low transition-colors"
                title="Select Settlement Currency"
              >
                <span>{currency}</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-surface border border-outline-variant shadow-lg z-50 py-1">
                  {['INR', 'USD', 'EUR', 'GBP', 'JPY'].map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        setCurrency(cur);
                        setCurrencyDropdownOpen(false);
                        showToast(`Switched settlement currency to ${cur}`);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs tracking-wider flex items-center justify-between hover:bg-surface-container-high transition-colors ${
                        currency === cur ? 'font-semibold text-secondary' : 'text-on-surface'
                      }`}
                    >
                      <span>{cur}</span>
                      {currency === cur && <span className="material-symbols-outlined text-[14px]">check</span>}
                    </button>
                  ))}
                  <div className="border-t border-outline-variant/40 mt-1 pt-1">
                    <button
                      onClick={() => {
                        navigate('/treasury');
                        setCurrencyDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[10px] tracking-widest uppercase text-outline hover:text-primary"
                    >
                      Treasury Hub →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Patron Vault / Wishlist */}
            <button
              onClick={() => navigate('/wishlist')}
              className="relative p-2 text-on-surface hover:text-secondary transition-colors"
              title="Patron Vault (Wishlist)"
            >
              <span className="material-symbols-outlined text-xl">favorite</span>
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-0.5 bg-secondary text-on-secondary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Curated Acquisition Bag */}
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 bg-primary text-on-primary hover:bg-secondary transition-colors px-3 sm:px-4 py-2.5 text-xs uppercase tracking-[0.12em] font-medium"
              title="View Acquisition Bag"
            >
              <span className="material-symbols-outlined text-lg">shopping_bag</span>
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-primary-container text-tertiary-fixed px-1.5 py-0.5 text-[10px] font-bold">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container border-b border-outline-variant px-6 py-6 transition-all animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm uppercase tracking-[0.16em] font-medium py-2 border-b border-outline-variant/30 text-on-surface hover:text-secondary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-outline">Settlement Currency:</span>
              <span className="text-xs font-bold text-primary">{currency}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

