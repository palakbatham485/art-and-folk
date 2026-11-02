import React from 'react';
import { useApp } from '../context/AppContext';

export const ManifestoPage = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Manifesto Headline */}
      <div className="text-center space-y-4">
        <span className="text-[11px] uppercase tracking-[0.24em] text-secondary font-semibold">
          The Atelier Manifesto
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-primary font-normal leading-tight">
          A Return to Physical Truth &amp; Material Sovereignity.
        </h1>
        <p className="text-xs uppercase tracking-widest text-outline">
          Published by the Curatorial Board of INK &amp; CRAFT • Tokyo &amp; Kyoto
        </p>
      </div>

      {/* Editorial Content */}
      <div className="space-y-8 text-on-surface-variant font-light leading-relaxed text-sm sm:text-base border-t border-b border-outline-variant py-12">
        <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:mr-3 first-letter:float-left first-letter:text-primary">
          In an era inundated with ephemeral digital reproductions and mass-manufactured replicas, INK &amp; CRAFT exists to protect and venerate the irreducible weight of genuine human craftsmanship. We believe that true luxury is not marked by synthetic gloss, but by the quiet patience of an artisan shaping raw earth, hand-beating mountain minerals, and waiting seven days by the mouth of a wood-burning anagama kiln.
        </p>

        <h3 className="font-serif text-2xl text-primary font-normal pt-4">
          I. The Rejection of the Intermediary
        </h3>
        <p>
          Traditional gallery models extract up to 60% of an artist’s livelihood while obscuring provenance behind opaque invoices. Our model operates on sovereign escrow: 100% of the artisan's valuation reaches their studio plinth upon patron receipt ratification.
        </p>

        <h3 className="font-serif text-2xl text-primary font-normal pt-4">
          II. Cryptographic Physical Dualism
        </h3>
        <p>
          Every work in our collection exists simultaneously as a physical masterpiece and an immutable cryptographic deed. Embedded tamper-evident NFC microcapsules tie the molecular canvas directly to the patron's permanent sovereign ledger.
        </p>

        <h3 className="font-serif text-2xl text-primary font-normal pt-4">
          III. Materiality Over Decoration
        </h3>
        <p>
          We do not curate decorative trends. We curate elemental disciplines: uncarded wild peace silk dyed with forest lichen, quarter-sawn smoked European oak planed by hand without metal fasteners, and pure iron soot suspended in ancient temple pine resins.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-4">
        <h4 className="font-serif text-2xl text-primary font-medium">Explore the Living Collection</h4>
        <button
          onClick={() => navigate('/shop')}
          className="bg-primary text-on-primary hover:bg-secondary px-8 py-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
        >
          Enter the Master Exhibition
        </button>
      </div>

    </div>
  );
};

