import React, { createContext, useContext, useState, useEffect } from 'react';
import { ARTWORKS } from '../data/artworks';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation route
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.hash.replace('#', '') || '/';
  });

  // Selected product ID for PDP
  const [selectedProductId, setSelectedProductId] = useState('solitude-07');

  // Cart items: default to Solitude No. 07 for instant live experience
  const [cart, setCart] = useState([
    {
      artwork: ARTWORKS[0],
      quantity: 1,
      framing: "Hand-Crafted Hinoki Float Frame (+₹14,500)",
      framingPrice: 14500
    }
  ]);

  // Wishlist / Patron Vault
  const [wishlist, setWishlist] = useState(['vessel-ochre-pumice', 'terra-cotta-urn']);

  // Currency
  const [currency, setCurrency] = useState('INR'); // INR, USD, EUR, GBP, JPY

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Active user role view: 'patron' | 'artisan'
  const [userRole, setUserRole] = useState('patron');

  // Active Escrow Order
  const [order, setOrder] = useState({
    orderNumber: "INK-2026-98104-E",
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    items: [ARTWORKS[0]],
    totalINR: 140700,
    escrowDepositINR: 28140, // 20%
    settlementNode: "High-Value Sovereign Escrow (Tier-1 Multi-Sig)",
    residence: "South Mumbai Atelier, Altamount Road",
    gstin: "27AABCU9603R1ZM",
    irn: "98a12f607dbe4a8109dcb4e27f093121efd4187e",
    cryptographicDeedHash: "0x89f41b2a...90e3cd"
  });

  // Sync hash with route
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      if (hash.startsWith('/product/')) {
        const id = hash.replace('/product/', '');
        setSelectedProductId(id);
      }
      setCurrentRoute(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    if (path.startsWith('/product/')) {
      const id = path.replace('/product/', '');
      setSelectedProductId(id);
    }
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Cart controls
  const addToCart = (artwork, framing = "Natural Raw Linen Stretched (Included)", framingPrice = 0) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.artwork.id === artwork.id);
      if (existing) {
        showToast(`Increased quantity for "${artwork.title}" in Acquisition Bag.`);
        return prev.map((item) =>
          item.artwork.id === artwork.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        showToast(`Added "${artwork.title}" to Curated Acquisition Bag.`);
        return [...prev, { artwork, quantity: 1, framing, framingPrice }];
      }
    });
  };

  const removeFromCart = (artworkId) => {
    setCart((prev) => prev.filter((item) => item.artwork.id !== artworkId));
    showToast('Item removed from Acquisition Bag.');
  };

  const updateQuantity = (artworkId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.artwork.id === artworkId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Wishlist controls
  const toggleWishlist = (artworkId) => {
    setWishlist((prev) => {
      if (prev.includes(artworkId)) {
        showToast('Removed from Patron Vault Reserve.');
        return prev.filter((id) => id !== artworkId);
      } else {
        showToast('Saved to Patron Vault Reserve.');
        return [...prev, artworkId];
      }
    });
  };

  // Price formatting
  const formatPrice = (amountINR) => {
    if (currency === 'USD') {
      const usd = Math.round(amountINR / 83.3);
      return `$${usd.toLocaleString('en-US')}`;
    }
    if (currency === 'EUR') {
      const eur = Math.round(amountINR / 90.5);
      return `€${eur.toLocaleString('de-DE')}`;
    }
    if (currency === 'GBP') {
      const gbp = Math.round(amountINR / 105.8);
      return `£${gbp.toLocaleString('en-GB')}`;
    }
    if (currency === 'JPY') {
      const jpy = Math.round((amountINR / 83.3) * 154);
      return `¥${jpy.toLocaleString('ja-JP')}`;
    }
    return `₹${amountINR.toLocaleString('en-IN')}`;
  };

  // Cart Totals
  const subtotalINR = cart.reduce(
    (sum, item) => sum + (item.artwork.priceINR + (item.framingPrice || 0)) * item.quantity,
    0
  );
  const gstRate = 0.12; // 12% Art GST
  const gstAmountINR = Math.round(subtotalINR * gstRate);
  const logisticsINR = subtotalINR > 0 ? 8200 : 0; // Armored Courier
  const totalCartINR = subtotalINR + gstAmountINR + logisticsINR;

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigate,
        selectedProductId,
        setSelectedProductId,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlist,
        toggleWishlist,
        currency,
        setCurrency,
        formatPrice,
        toast,
        showToast,
        order,
        setOrder,
        userRole,
        setUserRole,
        subtotalINR,
        gstAmountINR,
        logisticsINR,
        totalCartINR
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

