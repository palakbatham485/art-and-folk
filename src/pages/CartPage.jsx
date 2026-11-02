import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    navigate,
    formatPrice,
    subtotalINR,
    gstAmountINR,
    logisticsINR,
    totalCartINR,
    showToast
  } = useApp();

  const [gstin, setGstin] = useState('27AAAAA0000A1Z5');
  const [companyName, setCompanyName] = useState('Atelier Modern Arts Pvt Ltd');
  const [b2bApplied, setB2bApplied] = useState(true);

  const handleApplyGST = (e) => {
    e.preventDefault();
    if (gstin.length >= 10) {
      setB2bApplied(true);
      showToast(`GSTIN ${gstin} verified for ${companyName}. Tax Invoice will be generated.`);
    } else {
      showToast('Please enter a valid 15-character GSTIN.', 'error');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <span className="material-symbols-outlined text-6xl text-outline">
          shopping_bag
        </span>
        <h1 className="font-serif text-3xl text-primary font-normal">
          Your Curated Acquisition Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto font-light">
          Explore our seasonal curatorial exhibition or master catalogue to reserve and acquire authentic artisan masterworks.
        </p>
        <div className="pt-4">
          <button
            onClick={() => navigate('/shop')}
            className="bg-primary text-on-primary hover:bg-secondary px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium transition-colors"
          >
            Explore Master Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-outline-variant flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
            Order Review &amp; Allocation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
            Your Curated Acquisition Bag
          </h1>
        </div>

        <button
          onClick={() => navigate('/shop')}
          className="text-xs uppercase tracking-widest text-outline hover:text-primary flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Return to Gallery Exhibition</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Item List */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => {
            const itemTotal = (item.artwork.priceINR + (item.framingPrice || 0)) * item.quantity;
            return (
              <div
                key={item.artwork.id}
                className="bg-surface border border-outline-variant p-6 flex flex-col sm:flex-row gap-6 items-start justify-between"
              >
                {/* Thumbnail */}
                <div
                  className="w-full sm:w-32 aspect-square bg-surface-container shrink-0 border border-outline-variant overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${item.artwork.id}`)}
                >
                  <img
                    src={item.artwork.primaryImage}
                    alt={item.artwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">
                      {item.artwork.badge}
                    </span>
                    <span className="text-xs text-outline">{item.artwork.origin}</span>
                  </div>

                  <h3
                    onClick={() => navigate(`/product/${item.artwork.id}`)}
                    className="font-serif text-xl text-primary font-medium hover:text-secondary cursor-pointer"
                  >
                    {item.artwork.title}
                  </h3>

                  <p className="text-xs text-on-surface-variant font-light">
                    By {item.artwork.artist} • {item.artwork.medium}
                  </p>

                  <div className="text-xs text-outline pt-1">
                    Framing: <span className="text-primary font-medium">{item.framing}</span>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-6">
                    {/* Counter */}
                    <div className="flex items-center border border-outline-variant">
                      <button
                        onClick={() => updateQuantity(item.artwork.id, -1)}
                        className="px-3 py-1 text-xs text-primary hover:bg-surface-container font-bold"
                        title="Decrease Quantity"
                      >
                        –
                      </button>
                      <span className="px-3 py-1 text-xs font-semibold text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.artwork.id, 1)}
                        className="px-3 py-1 text-xs text-primary hover:bg-surface-container font-bold"
                        title="Increase Quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        toggleWishlist(item.artwork.id);
                        removeFromCart(item.artwork.id);
                      }}
                      className="text-xs text-outline hover:text-secondary flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span className="material-symbols-outlined text-sm">bookmark_add</span>
                      <span>Save to Patron Vault</span>
                    </button>

                    <button
                      onClick={() => removeFromCart(item.artwork.id)}
                      className="text-xs text-error hover:underline flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right sm:self-center shrink-0 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-outline-variant">
                  <span className="font-serif text-xl font-semibold text-primary block">
                    {formatPrice(itemTotal)}
                  </span>
                  <span className="text-[10px] text-outline">
                    {formatPrice(item.artwork.priceINR + (item.framingPrice || 0))} each
                  </span>
                </div>
              </div>
            );
          })}

          {/* B2B Institutional GST Form */}
          <div className="bg-surface-container-low border border-outline-variant p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.16em] font-semibold text-primary">
                Corporate B2B &amp; GST Compliance
              </span>
              <span className="text-[10px] uppercase tracking-wider text-green-700 font-bold bg-green-100 px-2 py-0.5">
                Eligible for ITC Credit
              </span>
            </div>

            <form onSubmit={handleApplyGST} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-outline mb-1">
                  Entity Legal Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Atelier Modern Arts Pvt Ltd"
                  className="w-full bg-surface border border-outline-variant px-3 py-2 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-outline mb-1">
                  GSTIN Number (15 Digits)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="27AAAAA0000A1Z5"
                    className="flex-1 bg-surface border border-outline-variant px-3 py-2 text-xs font-mono focus:outline-none focus:border-primary uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-on-primary px-4 py-2 text-xs uppercase tracking-wider font-semibold"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Summary Plaque */}
        <div className="lg:col-span-4">
          <div className="bg-surface border border-outline-variant p-6 space-y-6 sticky top-28">
            <h3 className="font-serif text-xl text-primary font-medium pb-4 border-b border-outline-variant">
              Acquisition Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Selected Works Subtotal</span>
                <span className="text-primary font-medium">{formatPrice(subtotalINR)}</span>
              </div>

              <div className="flex justify-between text-on-surface-variant">
                <span>Art GST (12% Statutory)</span>
                <span className="text-primary font-medium">{formatPrice(gstAmountINR)}</span>
              </div>

              <div className="flex justify-between text-on-surface-variant">
                <span>Armored White-Glove Crate &amp; Telematics</span>
                <span className="text-primary font-medium">
                  {logisticsINR === 0 ? 'Complimentary' : formatPrice(logisticsINR)}
                </span>
              </div>

              <div className="pt-4 border-t border-outline-variant flex justify-between items-baseline">
                <span className="font-serif text-base font-semibold text-primary">
                  Total Settlement
                </span>
                <span className="font-serif text-2xl font-bold text-primary">
                  {formatPrice(totalCartINR)}
                </span>
              </div>
            </div>

            <div className="p-4 bg-surface-container text-[11px] space-y-2 border border-outline-variant/60">
              <div className="flex items-center gap-1.5 text-secondary font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>Protected by Sovereign Escrow</span>
              </div>
              <p className="text-on-surface-variant font-light leading-relaxed">
                20% initial earnest deposit required upon checkout ratification. Balance disbursed strictly following patron physical uncrating and condition approval.
              </p>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-on-primary hover:bg-secondary py-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>Proceed to Escrow Checkout</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

