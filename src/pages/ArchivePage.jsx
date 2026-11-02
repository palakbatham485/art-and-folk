import React from 'react';
import { useApp } from '../context/AppContext';
import { ARTWORKS } from '../data/artworks';

export const ArchivePage = () => {
  const { navigate, formatPrice } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-outline-variant max-w-2xl">
        <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
          Retrospective Ledger
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
          Curatorial Salon Archive
        </h1>
        <p className="text-xs text-on-surface-variant font-light mt-2">
          A historical record of previous salon cycles, monastic exhibitions, and ratified acquisitions permanently preserved in private institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ARTWORKS.map((art) => (
          <div key={art.id} className="bg-surface border border-outline-variant p-5 space-y-4">
            <div className="aspect-[4/3] bg-surface-container overflow-hidden">
              <img src={art.primaryImage} alt={art.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-outline font-mono block mb-1">
                Archival Record • {art.year} Cycle
              </span>
              <h3 className="font-serif text-xl text-primary font-medium">{art.title}</h3>
              <p className="text-xs text-on-surface-variant font-light mt-1">By {art.artist} • {art.origin}</p>
            </div>

            <div className="pt-3 border-t border-outline-variant flex items-center justify-between text-xs">
              <span className="font-serif font-semibold text-primary">{formatPrice(art.priceINR)}</span>
              <button
                onClick={() => navigate(`/product/${art.id}`)}
                className="text-secondary hover:underline uppercase tracking-wider font-semibold text-[11px]"
              >
                Inspect Record →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

