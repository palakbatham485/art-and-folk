import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ARTWORKS } from '../data/artworks';

export const ShopPage = () => {
  const { navigate, addToCart, toggleWishlist, wishlist, formatPrice } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    'All',
    'Original Oil & Ink',
    'Sculptural Ceramics',
    'Textiles & Rare Fiber',
    'Fine Woodcraft'
  ];

  const priceRanges = [
    { label: 'All Values', value: 'All' },
    { label: 'Under ₹50,000', value: 'under50k' },
    { label: '₹50,000 – ₹1,00,000', value: '50k-100k' },
    { label: 'Over ₹1,00,000', value: 'over100k' }
  ];

  const availabilities = [
    { label: 'All Works', value: 'All' },
    { label: 'Immediate Dispatch', value: 'Available' },
    { label: 'Bespoke / Commission', value: 'Bespoke' },
    { label: 'Master Reserve', value: 'Reserved' }
  ];

  // Filtering & Sorting logic
  const filteredArtworks = useMemo(() => {
    return ARTWORKS.filter((art) => {
      // Search
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.medium.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.origin.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category
      if (selectedCategory !== 'All' && art.category !== selectedCategory) {
        return false;
      }

      // Price Range
      if (selectedPriceRange === 'under50k' && art.priceINR >= 50000) return false;
      if (selectedPriceRange === '50k-100k' && (art.priceINR < 50000 || art.priceINR > 100000)) return false;
      if (selectedPriceRange === 'over100k' && art.priceINR <= 100000) return false;

      // Availability
      if (selectedAvailability !== 'All' && art.status !== selectedAvailability) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceINR - b.priceINR;
      if (sortBy === 'price-high') return b.priceINR - a.priceINR;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0; // featured
    });
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedAvailability, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriceRange('All');
    setSelectedAvailability('All');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Banner */}
      <div className="mb-10 pb-6 border-b border-outline-variant flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
            The Master Catalogue
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-primary font-normal">
            Shop All &amp; Curated Collections
          </h1>
          <p className="text-on-surface-variant text-xs sm:text-sm mt-2 max-w-xl font-light">
            Each artifact is an authentic singular creation with guaranteed provenance, certified kiln mark or studio seal, and sovereign escrow security.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artisan, medium, or title..."
            className="w-full bg-surface-container-low border border-outline-variant px-4 py-3 pl-10 text-xs tracking-wider placeholder:text-outline focus:outline-none focus:border-primary"
          />
          <span className="material-symbols-outlined absolute left-3 top-3.5 text-outline text-lg pointer-events-none">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-outline hover:text-primary"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Layout: Filter Sidebar + Artworks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 border border-outline-variant px-4 py-2.5 text-xs uppercase tracking-wider font-medium"
          >
            <span className="material-symbols-outlined text-base">filter_list</span>
            <span>{mobileFilterOpen ? 'Close Filter Rail' : 'Filter Collections'}</span>
          </button>
          <span className="text-xs text-outline">{filteredArtworks.length} Works Found</span>
        </div>

        {/* Sidebar Filters */}
        <aside
          className={`space-y-8 lg:block ${
            mobileFilterOpen ? 'block' : 'hidden'
          } bg-surface-container-low p-6 lg:p-0 lg:bg-transparent border lg:border-none border-outline-variant`}
        >
          {/* Active Filters Summary / Reset */}
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
            <span className="text-xs uppercase tracking-[0.16em] font-semibold text-primary">
              Filters &amp; Facets
            </span>
            <button
              onClick={resetFilters}
              className="text-[11px] uppercase tracking-wider text-secondary hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Discipline / Category */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] font-semibold text-primary mb-3">
              Craft Discipline
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 text-xs text-on-surface cursor-pointer hover:text-secondary">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="accent-secondary"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Value / Price Bracket */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] font-semibold text-primary mb-3">
              Acquisition Value
            </h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.value} className="flex items-center gap-3 text-xs text-on-surface cursor-pointer hover:text-secondary">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === range.value}
                    onChange={() => setSelectedPriceRange(range.value)}
                    className="accent-secondary"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Status */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] font-semibold text-primary mb-3">
              Availability
            </h3>
            <div className="space-y-2">
              {availabilities.map((avail) => (
                <label key={avail.value} className="flex items-center gap-3 text-xs text-on-surface cursor-pointer hover:text-secondary">
                  <input
                    type="radio"
                    name="availability"
                    checked={selectedAvailability === avail.value}
                    onChange={() => setSelectedAvailability(avail.value)}
                    className="accent-secondary"
                  />
                  <span>{avail.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Assurance Plaque */}
          <div className="p-4 bg-surface-container border border-outline-variant text-[11px] space-y-2">
            <span className="uppercase tracking-widest text-secondary font-bold block">
              100% Tax Compliant
            </span>
            <p className="text-on-surface-variant font-light">
              Eligible for corporate B2B GST Input Tax Credit (ITC) with instant E-Way Bill generation.
            </p>
          </div>
        </aside>

        {/* Artworks List */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant text-xs text-on-surface-variant">
            <span>
              Showing <strong className="text-primary">{filteredArtworks.length}</strong> works
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-outline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface border border-outline-variant px-3 py-1.5 text-xs text-primary focus:outline-none"
              >
                <option value="featured">Curator's Selection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title">Title (Alphabetical)</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filteredArtworks.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-low border border-outline-variant">
              <span className="material-symbols-outlined text-4xl text-outline mb-3">
                inventory_2
              </span>
              <h3 className="font-serif text-xl text-primary font-medium">No matching artifacts found</h3>
              <p className="text-xs text-outline mt-1 mb-6">
                Try loosening your filter parameters or search query.
              </p>
              <button
                onClick={resetFilters}
                className="bg-primary text-on-primary px-6 py-2.5 text-xs uppercase tracking-wider"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtworks.map((artwork) => {
                const isFav = wishlist.includes(artwork.id);
                return (
                  <div
                    key={artwork.id}
                    className="group flex flex-col bg-surface border border-outline-variant hover:border-primary transition-all duration-300"
                  >
                    {/* Image Viewport */}
                    <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                      <img
                        src={artwork.primaryImage}
                        alt={artwork.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                        onClick={() => navigate(`/product/${artwork.id}`)}
                      />

                      <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm text-[9px] uppercase tracking-widest font-bold px-2 py-1 border border-outline-variant">
                        {artwork.badge}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(artwork.id);
                        }}
                        className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-sm transition-colors ${
                          isFav
                            ? 'bg-secondary text-on-secondary'
                            : 'bg-surface/90 text-primary hover:text-secondary'
                        }`}
                        title={isFav ? "Saved in Vault" : "Save to Vault"}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isFav ? 'favorite' : 'favorite_border'}
                        </span>
                      </button>

                      {/* Quick Action Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(artwork);
                          }}
                          className="flex-1 bg-surface text-primary hover:bg-secondary hover:text-on-secondary text-[11px] uppercase tracking-wider py-2 font-medium transition-colors text-center"
                        >
                          Add to Bag
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${artwork.id}`);
                          }}
                          className="bg-primary text-on-primary hover:bg-primary-container px-3 py-2 text-[11px] uppercase tracking-wider font-medium transition-colors"
                        >
                          Inspect
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-outline mb-1">
                          <span>{artwork.artist}</span>
                          <span>{artwork.origin}</span>
                        </div>
                        <h3
                          onClick={() => navigate(`/product/${artwork.id}`)}
                          className="font-serif text-lg text-primary font-medium hover:text-secondary transition-colors cursor-pointer leading-snug"
                        >
                          {artwork.title}
                        </h3>
                        <p className="text-xs text-on-surface-variant line-clamp-1 mt-1 font-light">
                          {artwork.medium}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-outline-variant/50 flex items-center justify-between">
                        <div>
                          <span className="font-serif text-base font-semibold text-primary block">
                            {formatPrice(artwork.priceINR)}
                          </span>
                          <span className="text-[10px] text-outline tracking-wider">
                            {artwork.leadTime}
                          </span>
                        </div>

                        <button
                          onClick={() => addToCart(artwork)}
                          className="border border-outline-variant hover:border-primary text-primary px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium hover:bg-primary hover:text-on-primary transition-all"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

