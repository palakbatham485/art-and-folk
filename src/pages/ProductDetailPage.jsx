import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ARTWORKS } from '../data/artworks';

export const ProductDetailPage = () => {
  const {
    selectedProductId,
    navigate,
    addToCart,
    toggleWishlist,
    wishlist,
    formatPrice,
    showToast
  } = useApp();

  const artwork = ARTWORKS.find((a) => a.id === selectedProductId) || ARTWORKS[0];

  // Gallery view angle
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Framing selection
  const framingOptions = [
    { id: 'linen', label: 'Natural Raw Linen Stretched (Included)', price: 0 },
    { id: 'hinoki', label: 'Hand-Crafted Hinoki Float Frame', price: 14500 },
    { id: 'museum', label: 'Museum Anti-Reflective UV Glass Vitrine', price: 28000 }
  ];
  const [selectedFraming, setSelectedFraming] = useState(framingOptions[1]);

  // Pincode validation state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState('narrative');

  // Modals
  const [arModalOpen, setArModalOpen] = useState(false);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  // Consultation Form
  const [consultForm, setConsultForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const isFav = wishlist.includes(artwork.id);
  const currentTotalItemPriceINR = artwork.priceINR + selectedFraming.price;

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.trim().length >= 5) {
      setPincodeStatus({
        valid: true,
        message: `Verified delivery for ${pincode}: White-glove armored transit available in 48-72h. Temperature & shock telematics active.`
      });
      showToast(`Transit route verified for pincode ${pincode}`);
    } else {
      setPincodeStatus({
        valid: false,
        message: 'Please enter a valid 5 or 6 digit postal PIN code.'
      });
    }
  };

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    showToast(`Inquiry received for ${artwork.title}. An atelier curator will reach out within 4 business hours.`);
    setConsultationModalOpen(false);
    setConsultForm({ name: '', phone: '', email: '', message: '' });
  };

  const handleAcquireNow = () => {
    addToCart(artwork, selectedFraming.label, selectedFraming.price);
    navigate('/checkout');
  };

  // Gallery images array
  const displayImages = artwork.detailImages || [
    { label: "1. Master Work", url: artwork.primaryImage }
  ];
  const activeImageUrl = displayImages[selectedImageIndex]?.url || artwork.primaryImage;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-outline uppercase tracking-widest mb-8">
        <button onClick={() => navigate('/')} className="hover:text-primary">Home</button>
        <span>/</span>
        <button onClick={() => navigate('/shop')} className="hover:text-primary">Catalog</button>
        <span>/</span>
        <span className="text-primary font-medium">{artwork.title}</span>
      </nav>

      {/* Main Two-Column Exhibition Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Visual Gallery & Interactive Inspection */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Visual Display */}
          <div className="relative aspect-[4/5] bg-surface-container border border-outline-variant overflow-hidden group">
            <img
              src={activeImageUrl}
              alt={artwork.title}
              className="w-full h-full object-cover object-center transition-transform duration-700"
            />

            {/* Interactive Viewport Action Pills */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <button
                onClick={() => setArModalOpen(true)}
                className="bg-surface/90 hover:bg-surface text-primary border border-outline-variant px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold shadow-md flex items-center gap-1.5 backdrop-blur-md transition-colors"
                title="View in Augmented Reality"
              >
                <span className="material-symbols-outlined text-base">view_in_ar</span>
                <span>AR View</span>
              </button>
              <button
                onClick={() => setZoomModalOpen(true)}
                className="bg-surface/90 hover:bg-surface text-primary border border-outline-variant p-1.5 shadow-md backdrop-blur-md transition-colors"
                title="High-Resolution Macro Zoom"
              >
                <span className="material-symbols-outlined text-lg">zoom_in</span>
              </button>
            </div>

            {/* Verification Badge */}
            <div className="absolute bottom-4 left-4 bg-primary/90 text-on-primary text-[10px] uppercase tracking-[0.16em] px-3 py-1 font-medium backdrop-blur-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
              <span>Physical Tamper-Evident NFC Capsule Embedded</span>
            </div>
          </div>

          {/* Gallery Angle Switcher */}
          <div className="grid grid-cols-4 gap-3">
            {displayImages.map((img, idx) => (
              <button
                key={img.label}
                onClick={() => setSelectedImageIndex(idx)}
                className={`flex flex-col text-left p-2 border transition-all ${
                  selectedImageIndex === idx
                    ? 'border-primary bg-surface-container-high'
                    : 'border-outline-variant/60 bg-surface hover:border-outline'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider text-outline font-semibold line-clamp-1">
                  {img.label}
                </span>
                <span className="text-[9px] text-on-surface-variant font-light mt-0.5">
                  Inspection Angle
                </span>
              </button>
            ))}
          </div>

          {/* Curatorial Provenance Plaque */}
          <div className="p-6 bg-surface-container-low border border-outline-variant space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-secondary">
              <span>Provenance &amp; Cryptographic Deed</span>
              <span>Deed #INK-7029-KYOTO</span>
            </div>
            <p className="text-xs text-on-surface-variant font-light leading-relaxed">
              {artwork.provenance}
            </p>
          </div>
        </div>

        {/* Right Column: Specifications, Customization & Acquisition Controls */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Header & Title */}
          <div className="space-y-3 border-b border-outline-variant pb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.18em] font-semibold text-secondary">
                {artwork.badge} • {artwork.tag}
              </span>
              <button
                onClick={() => toggleWishlist(artwork.id)}
                className={`flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                  isFav ? 'text-secondary' : 'text-outline hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {isFav ? 'favorite' : 'favorite_border'}
                </span>
                <span>{isFav ? 'In Vault' : 'Save to Vault'}</span>
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
              {artwork.title}
            </h1>

            <p className="text-sm text-on-surface-variant">
              Created by <strong className="text-primary font-semibold">{artwork.artist}</strong> • {artwork.location} ({artwork.year})
            </p>
          </div>

          {/* Price & Settlement Info */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-primary">
                {formatPrice(currentTotalItemPriceINR)}
              </span>
              {selectedFraming.price > 0 && (
                <span className="text-xs text-outline">
                  (Includes {formatPrice(selectedFraming.price)} framing)
                </span>
              )}
            </div>
            <div className="text-xs text-outline flex items-center gap-3">
              <span>GST ITC Input Tax Credit Included</span>
              <span>•</span>
              <span className="text-secondary font-medium">Sovereign Escrow Secured</span>
            </div>
          </div>

          {/* Custom Framing Selector */}
          <div className="space-y-3 pt-4 border-t border-outline-variant">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-[0.14em] font-semibold text-primary">
                Atelier Framing Selection
              </span>
              <span className="text-outline text-[11px]">Museum Grade</span>
            </div>

            <div className="space-y-2">
              {framingOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFraming(opt)}
                  className={`w-full text-left p-3 text-xs border flex items-center justify-between transition-all ${
                    selectedFraming.id === opt.id
                      ? 'border-primary bg-surface-container-high font-medium text-primary'
                      : 'border-outline-variant bg-surface hover:border-outline text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-secondary">
                      {selectedFraming.id === opt.id ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                    <span>{opt.label}</span>
                  </div>
                  <span className="text-outline font-semibold">
                    {opt.price === 0 ? 'Included' : `+${formatPrice(opt.price)}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleAcquireNow}
              className="w-full bg-primary text-on-primary hover:bg-secondary py-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">lock</span>
              <span>Acquire Now / Express Escrow</span>
            </button>

            <button
              onClick={() => addToCart(artwork, selectedFraming.label, selectedFraming.price)}
              className="w-full border border-primary text-primary hover:bg-primary hover:text-on-primary py-3.5 text-xs uppercase tracking-[0.18em] font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              <span>Add to Curated Bag</span>
            </button>

            <button
              onClick={() => setConsultationModalOpen(true)}
              className="w-full text-center text-xs text-outline hover:text-primary py-2 underline uppercase tracking-widest"
            >
              Request Private Curatorial Consultation →
            </button>
          </div>

          {/* Delivery & Pincode Checker Form */}
          <div className="p-5 bg-surface-container-low border border-outline-variant space-y-3">
            <span className="text-xs uppercase tracking-[0.14em] font-semibold text-primary block">
              White-Glove Delivery Estimator
            </span>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter postal PIN code (e.g. 400001, 110001)"
                className="flex-1 bg-surface border border-outline-variant px-3 py-2 text-xs tracking-wider placeholder:text-outline focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="bg-primary-container text-surface hover:bg-secondary px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors"
              >
                Validate
              </button>
            </form>
            {pincodeStatus && (
              <p className={`text-xs ${pincodeStatus.valid ? 'text-green-700' : 'text-error'}`}>
                {pincodeStatus.message}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Accordion / Tabbed Specifications Section */}
      <section className="mt-20 pt-10 border-t border-outline-variant">
        {/* Tab Headers */}
        <div className="flex flex-wrap gap-4 border-b border-outline-variant pb-4">
          {[
            { id: 'narrative', label: 'Artwork Narrative & Overview' },
            { id: 'materials', label: 'Materials & Archival Dimensions' },
            { id: 'artist', label: `Meet ${artwork.artist}` },
            { id: 'provenance', label: 'Provenance & Logistics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs uppercase tracking-[0.16em] font-medium py-2 px-4 transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary bg-surface-container-low'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="py-8 text-sm text-on-surface-variant font-light leading-relaxed max-w-4xl">
          {activeTab === 'narrative' && (
            <div className="space-y-4">
              <p>{artwork.description}</p>
              {artwork.exhibitions && (
                <div className="pt-4 border-t border-outline-variant/40">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-primary mb-2">Exhibition Record</h4>
                  <p className="text-xs">{artwork.exhibitions}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-primary mb-2">Physical Specifications</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                {artwork.materials ? artwork.materials.map((m, i) => <li key={i}>{m}</li>) : <li>{artwork.medium}</li>}
                <li>Dimensions: {artwork.dimensions}</li>
              </ul>
            </div>
          )}

          {activeTab === 'artist' && (
            <div className="space-y-3">
              <h4 className="font-serif text-xl text-primary font-medium">{artwork.artist} ({artwork.location})</h4>
              <p className="text-xs">
                Celebrated for radical spatial restraint and material purity. Vance's works are held in permanent private collections across Tokyo, Zurich, and New York.
              </p>
            </div>
          )}

          {activeTab === 'provenance' && (
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-primary mb-2">Dual Sovereign Verification</h4>
              <p className="text-xs">
                Accompanied by a physical archival envelope containing the signed artist certificate with micro-NFC verification chip and an immutable digital ledger deed recorded at transaction settlement.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* AR Modal Visualizer Simulator */}
      {arModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface max-w-xl w-full border border-outline-variant p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">view_in_ar</span>
                <span className="text-xs uppercase tracking-[0.16em] font-semibold text-primary">
                  In-Situ AR Living Visualizer
                </span>
              </div>
              <button onClick={() => setArModalOpen(false)} className="text-outline hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="relative aspect-video bg-neutral-900 overflow-hidden flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgJX8gy_nXx-Arenh49tRiSljzOVpVXiFb5oX0AESZSNW3E63bDgVEn7S69PwL7bMaQGepig41dGEc6UVrR_ipubhBO3_N0a0G-HeSP62yXhUb68GlQUPMlffO_TtS24aRSejPY9NUql4ST3QFq11wRfEjpL4yTXlAEP17dDQdsdVj19CFjnSbUKIg6wpoal3FsgMYjn3JB7sxE1Jc5fIBusgf3SZktvXjygWBY3U"
                alt="Room setting"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute w-44 shadow-2xl border-4 border-amber-950/80 animate-pulse">
                <img src={artwork.primaryImage} alt="Artwork" className="w-full" />
              </div>
            </div>

            <p className="text-xs text-on-surface-variant">
              Simulating 120 × 90 cm canvas rendered against a 10ft gallery wall. You can calibrate scale and lighting conditions.
            </p>

            <button
              onClick={() => setArModalOpen(false)}
              className="w-full bg-primary text-on-primary py-3 text-xs uppercase tracking-wider font-semibold"
            >
              Close AR Preview
            </button>
          </div>
        </div>
      )}

      {/* Macro Zoom Modal */}
      {zoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/95 flex flex-col items-center justify-center p-6">
          <button
            onClick={() => setZoomModalOpen(false)}
            className="absolute top-6 right-6 text-surface hover:text-tertiary-fixed text-sm uppercase tracking-widest flex items-center gap-1"
          >
            <span>Close Zoom</span>
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="max-w-4xl max-h-[85vh] overflow-auto border border-surface/20 p-2">
            <img src={activeImageUrl} alt="High resolution inspection" className="max-w-none w-[160%] sm:w-[130%]" />
          </div>
          <p className="text-surface-variant/80 text-xs mt-4">
            Macro grain inspection • Natural hide glue suspension on Belgian raw linen
          </p>
        </div>
      )}

      {/* Private Consultation Modal */}
      {consultationModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface max-w-lg w-full border border-outline-variant p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <span className="text-xs uppercase tracking-[0.16em] font-semibold text-primary">
                Private Curatorial Consultation
              </span>
              <button onClick={() => setConsultationModalOpen(false)} className="text-outline hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant">
              Inquiring on behalf of a collection, residence, or architectural project for <strong>{artwork.title}</strong>.
            </p>

            <form onSubmit={handleConsultSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-outline mb-1">Patron Full Name</label>
                <input
                  type="text"
                  required
                  value={consultForm.name}
                  onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                  placeholder="Lord / Lady / Curator Name"
                  className="w-full bg-surface-container-low border border-outline-variant px-3 py-2 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-outline mb-1">Telephone</label>
                  <input
                    type="tel"
                    required
                    value={consultForm.phone}
                    onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                    placeholder="+91 98200 00000"
                    className="w-full bg-surface-container-low border border-outline-variant px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-outline mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={consultForm.email}
                    onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                    placeholder="patron@domain.com"
                    className="w-full bg-surface-container-low border border-outline-variant px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-outline mb-1">Project / Advisory Scope</label>
                <textarea
                  rows="3"
                  value={consultForm.message}
                  onChange={(e) => setConsultForm({ ...consultForm, message: e.target.value })}
                  placeholder="e.g. Inquiring for private estate residence in Alibaug or Mumbai penthouse installation..."
                  className="w-full bg-surface-container-low border border-outline-variant px-3 py-2 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary hover:bg-secondary py-3 text-xs uppercase tracking-[0.16em] font-semibold transition-colors"
              >
                Dispatch Consultation Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

