import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const TreasuryPage = () => {
  const { currency, setCurrency, formatPrice, showToast, navigate } = useApp();
  const [calcAmount, setCalcAmount] = useState('118000');

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee (Domestic)', rate: 1.0 },
    { code: 'USD', symbol: '$', name: 'United States Dollar', rate: 0.012 },
    { code: 'EUR', symbol: '€', name: 'Eurozone Currency', rate: 0.011 },
    { code: 'GBP', symbol: '£', name: 'British Pound Sterling', rate: 0.0095 },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 1.85 }
  ];

  const parsedVal = parseFloat(calcAmount) || 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-outline-variant text-center max-w-2xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
          Central Settlement Engine
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
          Sovereign Treasury &amp; Currency Protocol
        </h1>
        <p className="text-xs text-on-surface-variant font-light mt-2">
          Select your institutional or private client settlement currency. Rates are pegged real-time to wholesale central bank gross settlement feeds with 0% foreign exchange spread.
        </p>
      </div>

      {/* Currency Switcher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {currencies.map((c) => (
          <button
            key={c.code}
            onClick={() => {
              setCurrency(c.code);
              showToast(`Primary settlement currency set to ${c.code}`);
            }}
            className={`p-5 text-left border transition-all flex flex-col justify-between ${
              currency === c.code
                ? 'border-primary bg-surface-container-high font-medium shadow-sm'
                : 'border-outline-variant bg-surface hover:border-outline'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-2xl font-bold text-primary">{c.symbol}</span>
                {currency === c.code && (
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                )}
              </div>
              <span className="text-xs font-semibold text-primary block">{c.code}</span>
              <p className="text-[10px] text-outline mt-1">{c.name}</p>
            </div>
            <span className="text-[10px] font-mono text-secondary mt-4 block">
              1 INR = {(c.rate).toFixed(4)} {c.code}
            </span>
          </button>
        ))}
      </div>

      {/* Dynamic FX Calculator */}
      <div className="bg-surface border border-outline-variant p-6 sm:p-8 space-y-6">
        <h3 className="font-serif text-xl text-primary font-medium border-b border-outline-variant pb-3">
          Interactive Valuation &amp; Tax Settlement Calculator
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <label className="block text-xs uppercase tracking-wider text-outline mb-2">
              Base Acquisition Amount (INR ₹)
            </label>
            <input
              type="number"
              value={calcAmount}
              onChange={(e) => setCalcAmount(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant px-4 py-3 font-mono text-base text-primary focus:outline-none focus:border-primary"
            />
            <span className="text-[10px] text-outline mt-1 block">
              Benchmark work: Solitude No. 07 (Base valuation ₹1,18,000)
            </span>
          </div>

          <div className="bg-surface-container p-5 border border-outline-variant space-y-3 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-outline uppercase">Active Display:</span>
              <span className="font-bold text-primary">{formatPrice(parsedVal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline uppercase">Statutory GST (12%):</span>
              <span>{formatPrice(Math.round(parsedVal * 0.12))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-outline uppercase">20% Escrow Earnest:</span>
              <span className="text-secondary font-bold">{formatPrice(Math.round(parsedVal * 0.20))}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-outline-variant/60 font-serif text-sm">
              <span className="text-primary font-bold">Total Invoiced:</span>
              <span className="text-primary font-bold">{formatPrice(Math.round(parsedVal * 1.12))}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => navigate('/shop')}
            className="bg-primary text-on-primary hover:bg-secondary px-6 py-3 text-xs uppercase tracking-[0.16em] font-semibold transition-colors"
          >
            Apply &amp; Browse Catalogue
          </button>
        </div>
      </div>

    </div>
  );
};

