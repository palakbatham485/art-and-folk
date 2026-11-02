import React from 'react';
import { useApp } from '../context/AppContext';
import { ARTISANS } from '../data/artworks';

export const ArtistsPage = () => {
  const { navigate, showToast } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-outline-variant max-w-2xl">
        <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
          Guild Fellowship
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
          Master Artisans &amp; Guild Residencies
        </h1>
        <p className="text-xs text-on-surface-variant font-light mt-2">
          Profiles of resident creators, studio fellowships, and living masters represented across our international salons.
        </p>
      </div>

      <div className="space-y-12">
        {ARTISANS.map((artist) => (
          <div key={artist.name} className="bg-surface border border-outline-variant p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 aspect-square bg-surface-container overflow-hidden border border-outline-variant">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf61uXw4ei-ot0sgACqtqS4Vg6DZaDfTn2Z3QOUiC0EnUEiILi_YLuJ1VrYvRff6FA-H2_yO9S5-yYMStZaXRb6Q7IZjgjU4y2coAqeJ6JzGkOgvVJYLa2KmwCGgtbjfoSo5n-0HD18oirNdPV-aMI1R9XF8jwEYd7_uPN_aCDHiedraYL3Ihm0H0nh2jKwSgJmwQDdZD2o2I0BoBrS3sdCUbXWrgMuvlHeP8N3Qo"
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary">
                  {artist.stats.residency}
                </span>
                <span className="text-xs font-mono text-outline">{artist.location}</span>
              </div>

              <h2 className="font-serif text-3xl text-primary font-medium">{artist.name}</h2>
              <span className="text-xs uppercase tracking-wider text-outline block">{artist.role}</span>

              <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                {artist.bio}
              </p>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-outline-variant text-xs">
                <div>
                  <span className="text-[10px] uppercase text-outline block">Active Catalog Works</span>
                  <span className="font-serif text-lg font-bold text-primary">{artist.stats.works} Pieces</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-outline block">Patron Acquisitions</span>
                  <span className="font-serif text-lg font-bold text-primary">{artist.stats.collected} Acquisitions</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/shop')}
                  className="bg-primary text-on-primary hover:bg-secondary px-6 py-3 text-xs uppercase tracking-[0.16em] font-semibold transition-colors"
                >
                  View Artist Works
                </button>
                <button
                  onClick={() => showToast(`Consultation requested with ${artist.name}'s studio manager.`)}
                  className="border border-outline-variant hover:border-primary px-6 py-3 text-xs uppercase tracking-[0.16em] font-semibold transition-colors"
                >
                  Request Atelier Commission
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

