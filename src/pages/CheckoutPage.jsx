import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export const CheckoutPage = () => {
  const {
    cart,
    totalCartINR,
    subtotalINR,
    gstAmountINR,
    logisticsINR,
    formatPrice,
    navigate,
    setOrder,
    showToast
  } = useApp();

  const [selectedResidence, setSelectedResidence] = useState('mumbai');
  const [selectedLogistics, setSelectedLogistics] = useState('armored');
  const [selectedPayment, setSelectedPayment] = useState('escrow');
  const [isProcessing, setIsProcessing] = useState(false);

  // Address data
  const residences = [
    {
      id: 'mumbai',
      title: 'South Mumbai Residence',
      address: '74 Altamount Road, Cumballa Hill, Mumbai, MH 400026'
    },
    {
      id: 'manhattan',
      title: 'Manhattan Curatorial Suite',
      address: '884 Fifth Avenue, Upper East Side, New York, NY 10021'
    },
    {
      id: 'alibaug',
      title: 'Alibaug Coastal Villa Plinth',
      address: 'Villa No. 4, Awas Beach Road, Alibaug, MH 402201'
    }
  ];

  const handleSealEscrow = () => {
    setIsProcessing(true);
    showToast('Connecting to Sovereign Multi-Sig Escrow Node...', 'info');

    setTimeout(() => {
      // Create confirmed order
      const newOrder = {
        orderNumber: `INK-${Math.floor(100000 + Math.random() * 900000)}-E`,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...cart],
        totalINR: totalCartINR,
        escrowDepositINR: Math.round(totalCartINR * 0.20),
        settlementNode: selectedPayment === 'escrow'
          ? 'High-Value Sovereign Multi-Sig Escrow (Tier 1)'
          : selectedPayment === 'wire'
          ? 'RTGS / Fedwire Institutional Reserve'
          : 'Encrypted Private Client Settlement',
        residence: residences.find((r) => r.id === selectedResidence)?.address || residences[0].address,
        gstin: "27AABCU9603R1ZM",
        irn: "98a12f607dbe4a8109dcb4e27f093121efd4187e",
        cryptographicDeedHash: "0x89f41b2a76f2d90e3cd811a9f029f1a53dd"
      };

      setOrder(newOrder);
      setIsProcessing(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback
      }

      navigate('/receipt');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-outline-variant flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
            Multi-Sig Escrow Protocol
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
            Secure Checkout &amp; Escrow Settlement
          </h1>
        </div>

        <button
          onClick={() => navigate('/cart')}
          className="text-xs uppercase tracking-widest text-outline hover:text-primary flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Edit Bag</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Form Controls Column */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Step 1: Residence Destination */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-outline-variant pb-2">
              <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">1</span>
              <h2 className="font-serif text-lg text-primary font-medium">
                Select Patron Delivery Residence
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {residences.map((res) => (
                <button
                  key={res.id}
                  onClick={() => setSelectedResidence(res.id)}
                  className={`p-4 text-left border transition-all flex flex-col justify-between ${
                    selectedResidence === res.id
                      ? 'border-primary bg-surface-container-high font-medium'
                      : 'border-outline-variant bg-surface hover:border-outline'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-primary">{res.title}</span>
                      <span className="material-symbols-outlined text-sm text-secondary">
                        {selectedResidence === res.id ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant font-light leading-relaxed">
                      {res.address}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-outline font-semibold mt-4">
                    Inspected Zone
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Logistics Tier */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-outline-variant pb-2">
              <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">2</span>
              <h2 className="font-serif text-lg text-primary font-medium">
                Logistics &amp; Environmental Crate Tier
              </h2>
            </div>

            <div className="space-y-3">
              <label
                onClick={() => setSelectedLogistics('armored')}
                className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                  selectedLogistics === 'armored'
                    ? 'border-primary bg-surface-container-high'
                    : 'border-outline-variant bg-surface'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="logistics"
                    checked={selectedLogistics === 'armored'}
                    onChange={() => setSelectedLogistics('armored')}
                    className="mt-1 accent-secondary"
                  />
                  <div>
                    <span className="text-xs font-semibold text-primary block">
                      Armored Art Courier with Climate-Controlled Crate
                    </span>
                    <p className="text-[11px] text-on-surface-variant font-light mt-0.5">
                      Shock, tilt, and humidity live telematic monitoring. Dual courier custody from Tokyo Atelier to your plinth.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-primary shrink-0">Included</span>
              </label>

              <label
                onClick={() => setSelectedLogistics('curatorial')}
                className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                  selectedLogistics === 'curatorial'
                    ? 'border-primary bg-surface-container-high'
                    : 'border-outline-variant bg-surface'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="logistics"
                    checked={selectedLogistics === 'curatorial'}
                    onChange={() => setSelectedLogistics('curatorial')}
                    className="mt-1 accent-secondary"
                  />
                  <div>
                    <span className="text-xs font-semibold text-primary block">
                      Curatorial Installation Team On-Site (+₹18,000)
                    </span>
                    <p className="text-[11px] text-on-surface-variant font-light mt-0.5">
                      Professional hanging, laser levelling, and lighting consultation upon delivery.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-secondary shrink-0">+₹18,000</span>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Node */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-outline-variant pb-2">
              <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">3</span>
              <h2 className="font-serif text-lg text-primary font-medium">
                Settlement Node &amp; Escrow Mechanism
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'escrow',
                  title: 'High-Value Sovereign Escrow (Tier-1 Multi-Sig)',
                  desc: '20% deposit locked into escrow now. 80% balance held until you inspect and ratify in person.'
                },
                {
                  id: 'wire',
                  title: 'RTGS / Fedwire Institutional Reserve',
                  desc: 'Direct central bank gross settlement instructions issued upon ratification.'
                },
                {
                  id: 'card',
                  title: 'Private Client Encrypted Card (Amex Centurion / Visa Infinite)',
                  desc: 'Immediate settlement with zero foreign exchange markup fees.'
                }
              ].map((pay) => (
                <label
                  key={pay.id}
                  onClick={() => setSelectedPayment(pay.id)}
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                    selectedPayment === pay.id
                      ? 'border-primary bg-surface-container-high'
                      : 'border-outline-variant bg-surface'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedPayment === pay.id}
                    onChange={() => setSelectedPayment(pay.id)}
                    className="mt-1 accent-secondary"
                  />
                  <div>
                    <span className="text-xs font-semibold text-primary block">{pay.title}</span>
                    <p className="text-[11px] text-on-surface-variant font-light mt-0.5">{pay.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Right Summary & Escrow Authorization */}
        <div className="lg:col-span-4">
          <div className="bg-surface border border-outline-variant p-6 space-y-6 sticky top-28">
            <h3 className="font-serif text-xl text-primary font-medium pb-4 border-b border-outline-variant">
              Settlement Allocation
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Selected Masterworks ({cart.length})</span>
                <span className="text-primary font-medium">{formatPrice(subtotalINR)}</span>
              </div>

              <div className="flex justify-between text-on-surface-variant">
                <span>Art GST (12% Statutory)</span>
                <span className="text-primary font-medium">{formatPrice(gstAmountINR)}</span>
              </div>

              <div className="flex justify-between text-on-surface-variant">
                <span>Armored White-Glove Logistics</span>
                <span className="text-primary font-medium">
                  {logisticsINR === 0 ? 'Complimentary' : formatPrice(logisticsINR)}
                </span>
              </div>

              <div className="pt-4 border-t border-outline-variant flex justify-between items-baseline">
                <span className="font-serif text-base font-semibold text-primary">
                  Total Ratification
                </span>
                <span className="font-serif text-2xl font-bold text-primary">
                  {formatPrice(totalCartINR)}
                </span>
              </div>

              <div className="p-3 bg-secondary/10 border border-secondary/30 text-[11px] text-secondary flex justify-between font-semibold">
                <span>Initial 20% Escrow Earnest:</span>
                <span>{formatPrice(Math.round(totalCartINR * 0.20))}</span>
              </div>
            </div>

            <button
              onClick={handleSealEscrow}
              disabled={isProcessing}
              className={`w-full bg-primary text-on-primary hover:bg-secondary py-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors flex items-center justify-center gap-2 ${
                isProcessing ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isProcessing ? 'sync' : 'lock'}
              </span>
              <span>
                {isProcessing
                  ? 'Sealing Multi-Sig Escrow...'
                  : `Authorize Acquisition & Seal Escrow — ${formatPrice(totalCartINR)}`}
              </span>
            </button>

            <div className="text-[10px] text-outline text-center space-y-1">
              <p>Cryptographic hash generated upon seal.</p>
              <p>E-Way Bill &amp; IRN compliant with GST portal.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

