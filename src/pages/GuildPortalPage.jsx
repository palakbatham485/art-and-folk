import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ARTWORKS } from '../data/artworks';

export const GuildPortalPage = () => {
  const { formatPrice, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [scanActive, setScanActive] = useState(false);

  // Submission Form
  const [form, setForm] = useState({
    title: '',
    medium: '',
    dimensions: '',
    price: '',
    edition: '1 OF 1 UNIQUE'
  });

  const handleScanNFC = () => {
    setScanActive(true);
    showToast('NFC Scanner activated. Hold RFID / NFC microcapsule against sensor...', 'info');
    setTimeout(() => {
      setScanActive(false);
      showToast('NFC Tag Verified: Capsule UID #04:8A:2F:E1:90:3B — Authenticity Confirmed.', 'success');
    }, 2200);
  };

  const handleSubmitMasterwork = (e) => {
    e.preventDefault();
    showToast(`Masterwork "${form.title}" submitted to Curatorial Board for Provenance verification.`);
    setSubmitModalOpen(false);
    setForm({ title: '', medium: '', dimensions: '', price: '', edition: '1 OF 1 UNIQUE' });
  };

  const handleExportTaxDossier = () => {
    const taxData = {
      atelier: "Helena Vance Studio / Guild Residency",
      gstin: "27AAAAA0000A1Z5",
      financialYear: "2026-2027",
      totalTurnoverINR: 1480000,
      gstCollectedINR: 177600,
      escrowDisbursedINR: 1302400
    };
    const blob = new Blob([JSON.stringify(taxData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GSTR1_ATELIER_DOSSIER_2026.json`;
    a.click();
    showToast('Exported GSTR-1 Tax Dossier JSON.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-outline-variant flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
            Artisan Atelier Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
            Guild Atelier Workspace
          </h1>
          <p className="text-xs text-on-surface-variant font-light mt-1">
            Studio: Helena Vance (Tokyo Atelier) • Guild Accreditation: Tier-1 Master Artisan
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSubmitModalOpen(true)}
            className="bg-primary text-on-primary hover:bg-secondary px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Submit Masterwork</span>
          </button>

          <button
            onClick={handleScanNFC}
            disabled={scanActive}
            className="border border-outline-variant hover:border-primary text-primary px-4 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">nfc</span>
            <span>{scanActive ? 'Scanning Capsule...' : 'Batch NFC Scan'}</span>
          </button>

          <button
            onClick={handleExportTaxDossier}
            className="border border-outline-variant hover:border-primary text-primary px-4 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">receipt_long</span>
            <span>Export Tax Dossier</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-surface border border-outline-variant p-5">
          <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">Total Studio Inventory</span>
          <span className="font-serif text-3xl font-normal text-primary">12 Works</span>
          <span className="text-[10px] text-green-700 block mt-2">5 Available for Acquisition</span>
        </div>

        <div className="bg-surface border border-outline-variant p-5">
          <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">Escrow Custody Held</span>
          <span className="font-serif text-3xl font-normal text-primary">{formatPrice(140700)}</span>
          <span className="text-[10px] text-secondary block mt-2">Solitude No. 07 in transit</span>
        </div>

        <div className="bg-surface border border-outline-variant p-5">
          <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">Disbursed This Quarter</span>
          <span className="font-serif text-3xl font-normal text-primary">{formatPrice(842000)}</span>
          <span className="text-[10px] text-outline block mt-2">Settled via Sovereign Treasury</span>
        </div>

        <div className="bg-surface border border-outline-variant p-5">
          <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">Physical NFC Seals</span>
          <span className="font-serif text-3xl font-normal text-primary">100% Valid</span>
          <span className="text-[10px] text-green-700 block mt-2">Tamper-evident verification</span>
        </div>
      </div>

      {/* Inventory Table with Filter Tabs */}
      <div className="bg-surface border border-outline-variant p-6 space-y-6">
        <div className="flex flex-wrap gap-2 border-b border-outline-variant pb-4">
          {[
            { id: 'all', label: 'All Works (12)' },
            { id: 'available', label: 'Available (5)' },
            { id: 'transit', label: 'In Transit (3)' },
            { id: 'sold', label: 'Archived / Sold (4)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs uppercase tracking-[0.14em] font-medium px-4 py-2 transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-outline-variant uppercase tracking-wider text-outline text-[10px]">
              <tr>
                <th className="py-3 px-4">Artifact / Work</th>
                <th className="py-3 px-4">Medium &amp; Dimensions</th>
                <th className="py-3 px-4">Valuation</th>
                <th className="py-3 px-4">NFC Deed ID</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60 font-light">
              {ARTWORKS.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container/50">
                  <td className="py-3 px-4 font-medium text-primary flex items-center gap-3">
                    <img src={item.primaryImage} alt={item.title} className="w-8 h-8 object-cover border border-outline-variant" />
                    <span>{item.title}</span>
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant">{item.medium}</td>
                  <td className="py-3 px-4 font-serif font-semibold text-primary">{formatPrice(item.priceINR)}</td>
                  <td className="py-3 px-4 font-mono text-outline text-[10px]">NFC-2026-{item.id.slice(0, 6)}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] uppercase font-semibold text-secondary bg-secondary/10 px-2 py-0.5">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => showToast(`NFC Verified for ${item.title}`)}
                      className="text-secondary hover:underline text-[11px] uppercase tracking-wider font-semibold"
                    >
                      Verify NFC
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Masterwork Modal */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface max-w-lg w-full border border-outline-variant p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <span className="text-xs uppercase tracking-[0.16em] font-semibold text-primary">
                Submit Masterwork for Provenance
              </span>
              <button onClick={() => setSubmitModalOpen(false)} className="text-outline hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmitMasterwork} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-outline mb-1">Work Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Kyoto Shadow Study IX"
                  className="w-full bg-surface-container-low border border-outline-variant px-3 py-2 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-outline mb-1">Medium &amp; Materials</label>
                <input
                  type="text"
                  required
                  value={form.medium}
                  onChange={(e) => setForm({ ...form, medium: e.target.value })}
                  placeholder="e.g. Natural Pine Soot on Belgian Raw Linen"
                  className="w-full bg-surface-container-low border border-outline-variant px-3 py-2 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-outline mb-1">Dimensions</label>
                  <input
                    type="text"
                    required
                    value={form.dimensions}
                    onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                    placeholder="120 × 90 cm"
                    className="w-full bg-surface-container-low border border-outline-variant px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-outline mb-1">Reserve Valuation (INR)</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="118000"
                    className="w-full bg-surface-container-low border border-outline-variant px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary hover:bg-secondary py-3 text-xs uppercase tracking-[0.16em] font-semibold transition-colors"
              >
                Ratify &amp; Assign NFC Provenance Deed
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

