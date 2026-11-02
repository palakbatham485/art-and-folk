import React from 'react';
import { useApp } from '../context/AppContext';

export const DisciplinesPage = () => {
  const { navigate } = useApp();

  const disciplines = [
    {
      title: "Original Sumi Ink & Mineral Canvas",
      region: "Kyoto & Paris",
      materials: "Pine soot ink, Belgian raw linen, crushed slate, cold-pressed walnut oil",
      desc: "Breath-synchronized wash techniques applied to unbleached archival linens.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBf61uXw4ei-ot0sgACqtqS4Vg6DZaDfTn2Z3QOUiC0EnUEiILi_YLuJ1VrYvRff6FA-H2_yO9S5-yYMStZaXRb6Q7IZjgjU4y2coAqeJ6JzGkOgvVJYLa2KmwCGgtbjfoSo5n-0HD18oirNdPV-aMI1R9XF8jwEYd7_uPN_aCDHiedraYL3Ihm0H0nh2jKwSgJmwQDdZD2o2I0BoBrS3sdCUbXWrgMuvlHeP8N3Qo"
    },
    {
      title: "Wood-Fired Anagama Stoneware",
      region: "Shigaraki, Japan",
      materials: "Mountain river feldspar, unglazed coarse clay, natural pine wood ash",
      desc: "Seven-day continuous wood firings reaching 1,300°C without synthetic glazes.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgJX8gy_nXx-Arenh49tRiSljzOVpVXiFb5oX0AESZSNW3E63bDgVEn7S69PwL7bMaQGepig41dGEc6UVrR_ipubhBO3_N0a0G-HeSP62yXhUb68GlQUPMlffO_TtS24aRSejPY9NUql4ST3QFq11wRfEjpL4yTXlAEP17dDQdsdVj19CFjnSbUKIg6wpoal3FsgMYjn3JB7sxE1Jc5fIBusgf3SZktvXjygWBY3U"
    },
    {
      title: "Rare Botanical Fiber & Hand-Loom Weaves",
      region: "Gotland, Sweden",
      materials: "Wild Eri peace silk, Swedish unbleached flax, natural birch mordants",
      desc: "Loom-spun architectural textiles dyed with wild-harvested roots and lichens.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA42M68sftnYmwpyr0WYcsW3CLpz8zy8hwj66eTFU-0wc6FMlc6G5RkbAL_4vSpViO9JA7GVulxLuJX8XDd7j7gHqEV97fhpnbq27ugrA4alSLpaeEX0SR2KWYy9KTGG6blimGnEH7pf8hJVSREAiPPs83anb_Ndio4dvljEKzQGGRYHpVxXKk5LVh1yCceYb179L5uluJfb9Y3LhcViokhmVKIRxxhASV2cGbN_74"
    },
    {
      title: "Joinery & Shou Sugi Ban Woodcraft",
      region: "Copenhagen & Kyoto",
      materials: "Japanese Hinoki cypress, quarter-sawn smoked European oak, tung oil",
      desc: "Traditional fastener-free joinery finished with flame scorch and hand plane.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj8FTHdROEhZ0nnh_SoElBrF6dRVV4FqZGaIpJF9Li71PMdzPS8e7RzXaeLloeAATzyK4mhyg8mk9cHjOdrJx-reKC1USEA7RIuDhFe-W-AURt1BVGrRLvocwEFzuXYWjILbdCCHwUJ0QqbFPZcl3zT_rLBeS5c5AtJjJiJaWUF7nxRc48StZ69WLMj3X6Nsmc99HWJOSfK05hg8YewiiXCzkTVdDxqVDQyROB8R4"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-outline-variant max-w-2xl">
        <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
          Atelier Guild Taxonomy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
          Handmade Rare Craft Disciplines
        </h1>
        <p className="text-xs text-on-surface-variant font-light mt-2">
          An exploration into the foundational media, regional techniques, and centuries-old ancestral processes certified by our curatorial guild.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {disciplines.map((d) => (
          <div key={d.title} className="bg-surface border border-outline-variant p-6 space-y-4">
            <div className="aspect-[16/10] bg-surface-container overflow-hidden">
              <img src={d.image} alt={d.title} className="w-full h-full object-cover" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold block mb-1">
                {d.region}
              </span>
              <h3 className="font-serif text-2xl text-primary font-medium">{d.title}</h3>
              <p className="text-xs text-on-surface-variant font-light mt-2">{d.desc}</p>
            </div>

            <div className="pt-3 border-t border-outline-variant text-xs text-outline font-mono">
              <strong>Materials:</strong> {d.materials}
            </div>

            <button
              onClick={() => navigate('/shop')}
              className="text-xs uppercase tracking-widest text-primary font-semibold hover:text-secondary flex items-center gap-1"
            >
              <span>View Works in this Discipline</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

