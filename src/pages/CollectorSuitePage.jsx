import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ARTWORKS } from '../data/artworks';

export const CollectorSuitePage = () => {
  const { order, formatPrice, navigate, showToast } = useApp();
  const [escrowReleased, setEscrowReleased] = useState(false);

  const handleReleaseEscrow = () => {
    setEscrowReleased(true);
    showToast('Escrow Balance (80%) released to Helena Vance Tokyo Atelier. Transaction settled.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-outline-variant flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
            Patron Sovereign Ledger
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
            Patron &amp; Collector Suite
          </h1>
          <p className="text-xs text-on-surface-variant font-light mt-1">
            Registered Patron ID: #PT-48901 • Sovereign Tier: Guild Benefactor
          </p>
        </div>

        <button
          onClick={() => navigate('/shop')}
          className="border border-outline-variant px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:border-primary"
        >
          Explore Acquisitions
        </button>
      </div>

      {/* Active Acquisition Status & Escrow Release */}
      <div className="bg-surface border border-outline-variant p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-secondary font-bold block mb-1">
              Active Escrow Custody
            </span>
            <h2 className="font-serif text-2xl text-primary font-medium">
              Solitude No. 07 by Helena Vance
            </h2>
            <span className="text-xs text-outline font-mono">
              Transit Dossier: {order.orderNumber} • Destination: {order.residence.slice(0, 32)}...
            </span>
          </div>

          <div className="text-right">
            <span className="font-serif text-2xl font-bold text-primary block">
              {formatPrice(order.totalINR)}
            </span>
            <span className="text-[10px] text-green-700 font-bold uppercase tracking-wider bg-green-100 px-2 py-0.5">
              20% Earnest Locked
            </span>
          </div>
        </div>

        {/* Stepper Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4">
          {[
            { step: '1', title: 'Escrow Sealed', date: 'Ratified', active: true },
            { step: '2', title: 'Museum Crated', date: 'Tokyo Atelier', active: true },
            { step: '3', title: 'Armored Transit', date: 'In Flight (Telematics Active)', active: true },
            { step: '4', title: 'Condition Approval', date: 'Pending Plinth Uncrating', active: escrowReleased }
          ].map((s) => (
            <div
              key={s.step}
              className={`p-4 border ${
                s.active ? 'border-primary bg-surface-container-high' : 'border-outline-variant/60 bg-surface-container-low'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-secondary">Step {s.step}</span>
                <span className="material-symbols-outlined text-sm text-primary">
                  {s.active ? 'check_circle' : 'pending'}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-primary">{s.title}</h4>
              <p className="text-[10px] text-outline mt-1">{s.date}</p>
            </div>
          ))}
        </div>

        {/* Escrow Release Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container p-4 border border-outline-variant">
          <div className="text-xs text-on-surface-variant font-light">
            Once your white-glove courier delivers and uncrates the piece at your residence, click below to release the remaining balance to the artist.
          </div>

          <button
            onClick={handleReleaseEscrow}
            disabled={escrowReleased}
            className={`px-6 py-3 text-xs uppercase tracking-[0.16em] font-semibold transition-colors shrink-0 ${
              escrowReleased
                ? 'bg-green-700 text-white cursor-default'
                : 'bg-primary text-on-primary hover:bg-secondary'
            }`}
          >
            {escrowReleased ? 'Escrow Released & Ratified ✓' : 'Authorize Escrow Release (80%)'}
          </button>
        </div>
      </div>

      {/* Historical Vault / Provenance Deeds */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl text-primary font-normal">
          Permanent Patron Art Vault
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTWORKS.slice(0, 3).map((art) => (
            <div key={art.id} className="bg-surface border border-outline-variant p-5 space-y-4">
              <div className="aspect-[4/3] bg-surface-container overflow-hidden">
                <img src={art.primaryImage} alt={art.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-secondary font-bold block mb-1">
                  NFC Verified Seal Active
                </span>
                <h4 className="font-serif text-lg text-primary font-medium">{art.title}</h4>
                <p className="text-xs text-on-surface-variant font-light">By {art.artist} ({art.year})</p>
              </div>
              <div className="pt-3 border-t border-outline-variant flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-outline">Deed #0x{art.id.slice(0, 8)}</span>
                <button
                  onClick={() => navigate('/receipt')}
                  className="text-secondary font-semibold hover:underline"
                >
                  View Deed →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

