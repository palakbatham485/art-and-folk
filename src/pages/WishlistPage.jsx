import React from 'react';
import { useApp } from '../context/AppContext';
import { ARTWORKS } from '../data/artworks';

export const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart, formatPrice, navigate } = useApp();

  const reservedArtworks = ARTWORKS.filter((a) => wishlist.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-outline-variant flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
            Patron Vault
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
            Patron Salon Reserve
          </h1>
          <p className="text-xs text-on-surface-variant font-light mt-1">
            Works saved in your private vault enjoy a 48-hour priority reservation window before public release.
          </p>
        </div>

        <button
          onClick={() => navigate('/shop')}
          className="border border-outline-variant px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:border-primary"
        >
          Explore Catalogue
        </button>
      </div>

      {reservedArtworks.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-low border border-outline-variant space-y-4">
          <span className="material-symbols-outlined text-5xl text-outline">favorite_border</span>
          <h3 className="font-serif text-xl text-primary font-medium">Your Patron Vault is Empty</h3>
          <p className="text-xs text-outline max-w-sm mx-auto font-light">
            Bookmark singular artworks and limited edition craft pieces while browsing the exhibition to reserve them in your vault.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-primary text-on-primary px-6 py-3 text-xs uppercase tracking-wider font-semibold"
          >
            Browse Master Catalogue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reservedArtworks.map((art) => (
            <div key={art.id} className="bg-surface border border-outline-variant flex flex-col justify-between p-5 space-y-4">
              <div className="aspect-[4/3] bg-surface-container overflow-hidden relative">
                <img src={art.primaryImage} alt={art.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-primary/90 text-on-primary text-[9px] uppercase tracking-wider px-2 py-0.5">
                  Priority Reserve Active
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-secondary font-bold block mb-1">
                  {art.badge}
                </span>
                <h3
                  onClick={() => navigate(`/product/${art.id}`)}
                  className="font-serif text-lg text-primary font-medium hover:text-secondary cursor-pointer"
                >
                  {art.title}
                </h3>
                <p className="text-xs text-on-surface-variant font-light mt-0.5">
                  By {art.artist} • {art.medium}
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant flex items-center justify-between">
                <span className="font-serif text-base font-semibold text-primary">
                  {formatPrice(art.priceINR)}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleWishlist(art.id)}
                    className="p-1.5 border border-outline-variant hover:border-error text-error text-xs"
                    title="Remove from Vault"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>

                  <button
                    onClick={() => {
                      addToCart(art);
                      toggleWishlist(art.id);
                    }}
                    className="bg-primary text-on-primary hover:bg-secondary px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold"
                  >
                    Move to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

