import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { navigate, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast(`Invitation sent to ${email}. Welcome to the Patron Salon.`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-primary text-surface hairline-t mt-24">
      {/* Editorial Newsletter Strip */}
      <div className="border-b border-surface/10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-[11px] uppercase tracking-[0.2em] text-tertiary-fixed-dim font-medium block mb-2">
              Private Curatorial Salon
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-surface font-light">
              Receive confidential monographs on new studio firings, rare weaves, and uncataloged works.
            </h3>
          </div>
          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@institution.org"
                required
                className="bg-primary-container text-surface border border-outline/40 px-4 py-3 text-xs tracking-wider placeholder:text-outline-variant focus:outline-none focus:border-tertiary-fixed-dim flex-1"
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-on-secondary px-6 py-3 text-xs uppercase tracking-[0.16em] font-semibold transition-colors shrink-0"
              >
                Request Access
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <span className="font-serif text-2xl tracking-tight block text-surface font-medium mb-3">
            INK &amp; CRAFT
          </span>
          <p className="text-surface-variant/80 text-xs leading-relaxed max-w-sm mb-6">
            A sovereign gallery and guild connecting discerning global patrons directly to master artisans, contemporary painters, and heirloom ceramicists through escrow-backed provenance.
          </p>
          <div className="flex items-center space-x-3 text-tertiary-fixed-dim text-xs">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>All acquisitions backed by physical NFC seals and cryptographic ledger deeds.</span>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-tertiary-fixed-dim mb-4">
            Atelier Exhibition
          </h4>
          <ul className="space-y-2.5 text-xs text-surface-variant/80">
            <li><button onClick={() => navigate('/shop')} className="hover:text-surface transition-colors">Curated Catalog</button></li>
            <li><button onClick={() => navigate('/product/solitude-07')} className="hover:text-surface transition-colors">Solitude No. 07 (Spotlight)</button></li>
            <li><button onClick={() => navigate('/disciplines')} className="hover:text-surface transition-colors">Craft Disciplines</button></li>
            <li><button onClick={() => navigate('/archive')} className="hover:text-surface transition-colors">Curatorial Salon Archive</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-tertiary-fixed-dim mb-4">
            Patron Protocol
          </h4>
          <ul className="space-y-2.5 text-xs text-surface-variant/80">
            <li><button onClick={() => navigate('/collector-suite')} className="hover:text-surface transition-colors">Patron Private Suite</button></li>
            <li><button onClick={() => navigate('/guild-portal')} className="hover:text-surface transition-colors">Guild Atelier Portal (Artisans)</button></li>
            <li><button onClick={() => navigate('/treasury')} className="hover:text-surface transition-colors">Sovereign Treasury &amp; FX</button></li>
            <li><button onClick={() => navigate('/manifesto')} className="hover:text-surface transition-colors">Atelier Manifesto &amp; Charter</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-tertiary-fixed-dim mb-4">
            Institutional Trust
          </h4>
          <p className="text-xs text-surface-variant/80 leading-relaxed mb-3">
            Armored logistics with temperature and shock telematics. GST Input Tax Credit compliant.
          </p>
          <span className="inline-block border border-outline/40 px-2 py-1 text-[10px] tracking-wider text-outline-variant uppercase">
            GSTIN: 27AABCU9603R1ZM
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-surface/10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-surface-variant/60">
        <div>© 2026 INK &amp; CRAFT Atelier Ltd. All rights reserved.</div>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <button onClick={() => navigate('/manifesto')} className="hover:text-surface">Provenance Charter</button>
          <button onClick={() => navigate('/treasury')} className="hover:text-surface">Escrow Terms</button>
          <button onClick={() => navigate('/collector-suite')} className="hover:text-surface">Patron Privacy</button>
        </div>
      </div>
    </footer>
  );
};

