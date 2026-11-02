import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ReceiptPage = () => {
  const { order, formatPrice, navigate, showToast } = useApp();
  const [deedModalOpen, setDeedModalOpen] = useState(false);

  // Real JSON exporter for E-Way Bill & IRN
  const handleExportJSON = () => {
    const ewayPayload = {
      orderId: order.orderNumber,
      irn: order.irn,
      date: order.date,
      consignee: {
        address: order.residence,
        gstin: order.gstin
      },
      consignor: {
        atelier: "INK & CRAFT Master Guild Ltd",
        gstin: "27AABCU9603R1ZM",
        state: "Maharashtra (27)"
      },
      items: order.items.map((i) => ({
        title: i.artwork.title,
        artist: i.artwork.artist,
        hsnCode: "97011010",
        valueINR: i.artwork.priceINR
      })),
      cryptographicDeed: {
        hash: order.cryptographicDeedHash,
        verified: true,
        protocol: "Sovereign Art Ledger v2.4"
      }
    };

    const blob = new Blob([JSON.stringify(ewayPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EWAY_IRN_${order.orderNumber}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Downloaded E-Way Bill & IRN JSON for ${order.orderNumber}`);
  };

  // Real Print / PDF Trigger
  const handleDownloadPDF = () => {
    window.print();
    showToast('Tax Invoice print dialog initiated.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Top Banner */}
      <div className="border border-outline-variant bg-surface p-8 sm:p-12 space-y-8 shadow-sm">
        
        {/* Certificate Header */}
        <div className="text-center space-y-3 pb-8 border-b border-outline-variant">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-secondary">
            <span className="material-symbols-outlined text-base">verified</span>
            <span>Cryptographic Acquisition Ratified</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-primary font-medium">
            Certificate of Provenance &amp; Tax Receipt
          </h1>

          <p className="text-xs text-outline tracking-wider font-mono">
            Transaction Identifier: {order.orderNumber} • Dated {order.date}
          </p>
        </div>

        {/* Deed and Settlement Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-outline-variant pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">
              Beneficiary Patron / Consignee
            </span>
            <p className="font-semibold text-primary">{order.residence}</p>
            <p className="text-on-surface-variant font-mono mt-1">GSTIN: {order.gstin}</p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">
              Escrow Settlement Node
            </span>
            <p className="font-semibold text-primary">{order.settlementNode}</p>
            <p className="text-secondary font-mono mt-1">IRN: {order.irn.slice(0, 24)}...</p>
          </div>
        </div>

        {/* Item Dossier Table */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-primary block">
            Acquired Masterworks
          </span>

          <div className="border border-outline-variant divide-y divide-outline-variant text-xs">
            {order.items.map((item) => (
              <div key={item.artwork.id} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base text-primary font-medium">{item.artwork.title}</h4>
                  <p className="text-on-surface-variant text-[11px]">
                    By {item.artwork.artist} • {item.artwork.medium}
                  </p>
                  <p className="text-[10px] text-outline font-mono mt-0.5">
                    Framing: {item.framing}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-base font-semibold text-primary block">
                    {formatPrice((item.artwork.priceINR + (item.framingPrice || 0)) * item.quantity)}
                  </span>
                  <span className="text-[10px] text-outline font-mono">Qty: {item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Grand Totals */}
          <div className="flex justify-between items-baseline pt-4 border-t border-outline-variant text-xs">
            <div>
              <span className="text-outline uppercase tracking-wider block">Total Sealed in Escrow</span>
              <span className="text-[10px] text-secondary font-mono">20% Earnest Released to Crate Atelier</span>
            </div>
            <span className="font-serif text-2xl font-bold text-primary">
              {formatPrice(order.totalINR)}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-outline-variant flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 bg-primary text-on-primary hover:bg-secondary py-3.5 text-xs uppercase tracking-[0.16em] font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Download Tax Invoice PDF</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex-1 border border-outline-variant hover:border-primary text-primary py-3.5 text-xs uppercase tracking-[0.16em] font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">data_object</span>
            <span>Export E-Way Bill &amp; IRN (.JSON)</span>
          </button>
        </div>

        {/* Verification Link Row */}
        <div className="flex flex-wrap items-center justify-between text-xs pt-4 border-t border-outline-variant/60 gap-4">
          <button
            onClick={() => setDeedModalOpen(true)}
            className="text-secondary font-semibold hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Inspect Cryptographic Deed</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>

          <button
            onClick={() => navigate('/collector-suite')}
            className="text-primary font-semibold hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View in Patron Private Suite</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

      </div>

      {/* Cryptographic Deed Modal */}
      {deedModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface max-w-lg w-full border border-outline-variant p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <span className="text-xs uppercase tracking-[0.16em] font-semibold text-primary">
                Sovereign Cryptographic Deed Proof
              </span>
              <button onClick={() => setDeedModalOpen(false)} className="text-outline hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 font-mono text-[11px] bg-surface-container p-4 border border-outline-variant/60">
              <div>
                <span className="text-outline uppercase block text-[9px]">Merkle Root Hash:</span>
                <span className="text-primary break-all">{order.cryptographicDeedHash}</span>
              </div>
              <div>
                <span className="text-outline uppercase block text-[9px]">IRN (Invoice Reference Number):</span>
                <span className="text-primary break-all">{order.irn}</span>
              </div>
              <div>
                <span className="text-outline uppercase block text-[9px]">Physical NFC UID:</span>
                <span className="text-secondary font-bold">NFC-8041-KYOTO-HELENA-VANCE</span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant font-light">
              This proof is irreversibly etched into the INK &amp; CRAFT sovereign art ledger. Scannable via tap on the physical frame NFC seal upon arrival.
            </p>

            <button
              onClick={() => setDeedModalOpen(false)}
              className="w-full bg-primary text-on-primary py-3 text-xs uppercase tracking-wider font-semibold"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

