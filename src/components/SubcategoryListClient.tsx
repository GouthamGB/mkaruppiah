"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Layers, Phone, Sparkles } from "lucide-react";
import { urlFor } from "@/sanity/client";

export interface BrandItem {
  _id?: string;
  name: string;
  logo?: any;
  slug?: string;
}

export interface Subcategory {
  id: string;
  title: string;
  specification?: string;
  range?: string;
  brands?: (string | BrandItem)[];
  image?: any;
  contactNumber?: string;
}

interface SubcategoryListClientProps {
  subcategories: Subcategory[];
  categorySlug: string;
  categoryBrands?: BrandItem[];
  categoryName?: string;
}

const DEFAULT_CATEGORY_BRANDS: Record<string, string[]> = {
  equipment: ["XCMG", "SANY", "Zoomlion", "Caterpillar", "JCB", "Komatsu"],
  cement: ["UltraTech", "Ramco", "Dalmia", "Chettinad", "Coromandel", "ACC"],
  steel: ["Tata Tiscon", "JSW Steel", "SAIL", "Vizag Steel", "Kamdhenu"],
  tile: ["Kajaria", "Somany", "Johnson", "Nitco", "RAK Ceramics"],
  tiles: ["Kajaria", "Somany", "Johnson", "Nitco", "RAK Ceramics"],
  granite: ["Kajaria", "Somany", "Johnson", "Nitco", "RAK Ceramics"],
  granites: ["Kajaria", "Somany", "Johnson", "Nitco", "RAK Ceramics"],
  paint: ["Asian Paints", "Berger Paints", "Nerolac", "Dulux", "JSW Paints"],
  paints: ["Asian Paints", "Berger Paints", "Nerolac", "Dulux", "JSW Paints"],
  sanitary: ["Jaquar", "Parryware", "Hindware", "Cera", "Kohler"],
  sanitaryware: ["Jaquar", "Parryware", "Hindware", "Cera", "Kohler"],
  pipe: ["Finolex", "Ashirvad", "Supreme", "Astral", "Prince"],
  sheet: ["Tata Shaktee", "JSW Pragati", "Jindal India", "Everest"],
  fuel: ["Bharat Petroleum", "Indian Oil", "Hindustan Petroleum", "Shell"],
  fertilizer: ["IFFCO", "Coromandel", "IPL", "Nagarjuna", "Chambal"],
  aac: ["Hard Worker", "MYK Laticrete", "Renacon", "UltraTech"],
  adhesive: ["MYK Laticrete", "Roff", "Weber", "Hard Worker"],
  fence: ["Tata Wiron", "Jindal Steel", "JSW Steel"],
  fencing: ["Tata Wiron", "Jindal Steel", "JSW Steel"],
};

// Ultra-minimalist, sleek brand mark rendering
function MinimalistBrandLogo({ name }: { name: string }) {
  const cleanName = name.trim().toLowerCase();

  if (cleanName.includes("xcmg")) {
    return <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-slate-800 dark:text-slate-200">XCMG</span>;
  }
  if (cleanName.includes("sany")) {
    return (
      <div className="flex items-center space-x-2 font-black tracking-wider text-lg sm:text-xl md:text-2xl text-slate-800 dark:text-slate-200">
        <svg className="w-6 h-6 md:w-8 md:h-8 fill-red-600 inline-block" viewBox="0 0 24 24">
          <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
        </svg>
        <span>SANY</span>
      </div>
    );
  }
  if (cleanName.includes("cat") || cleanName.includes("caterpillar")) {
    return (
      <div className="flex items-center space-x-2 font-black tracking-wider text-lg sm:text-xl md:text-2xl text-slate-900 dark:text-white">
        <span className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 bg-amber-400 rotate-45 inline-block"></span>
        <span>CAT</span>
      </div>
    );
  }
  if (cleanName.includes("jcb")) {
    return (
      <span className="px-3 py-1.5 bg-amber-400 text-slate-950 text-sm sm:text-base md:text-lg font-black rounded-md">
        JCB
      </span>
    );
  }
  if (cleanName.includes("zoomlion")) {
    return <span className="text-base sm:text-lg md:text-xl font-black tracking-widest text-emerald-600 dark:text-emerald-400">ZOOMLION</span>;
  }
  if (cleanName.includes("ultratech")) {
    return <span className="text-base sm:text-lg md:text-xl font-black tracking-tight text-blue-700 dark:text-blue-400">UltraTech</span>;
  }
  if (cleanName.includes("tata")) {
    return (
      <div className="flex items-center space-x-2 text-base sm:text-lg md:text-xl font-extrabold tracking-wider text-slate-800 dark:text-slate-200">
        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-sky-500" />
        <span>TATA STEEL</span>
      </div>
    );
  }
  if (cleanName.includes("jsw")) {
    return <span className="text-base sm:text-lg md:text-xl font-black tracking-widest text-slate-800 dark:text-slate-200">JSW STEEL</span>;
  }
  if (cleanName.includes("jaquar")) {
    return <span className="text-base sm:text-lg md:text-xl font-extrabold tracking-widest text-slate-900 dark:text-white">JAQUAR</span>;
  }
  if (cleanName.includes("kajaria")) {
    return <span className="text-base sm:text-lg md:text-xl font-extrabold tracking-wider text-rose-600 dark:text-rose-400">KAJARIA</span>;
  }

  return <span className="text-base sm:text-lg md:text-xl font-bold tracking-wider text-slate-700 dark:text-slate-300 uppercase">{name}</span>;
}

function SubcategoryCardImage({ image, title }: { image: any; title: string }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = image && !imageError ? urlFor(image) : null;

  if (!imageUrl) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-4 text-center">
        <Layers className="h-10 w-10 text-slate-400 dark:text-slate-500 mb-2" />
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</span>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={title}
      fill
      onError={() => setImageError(true)}
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export default function SubcategoryListClient({
  subcategories,
  categorySlug,
  categoryBrands = [],
  categoryName = "",
}: SubcategoryListClientProps) {
  const [cols, setCols] = useState<3 | 4 | 5>(3);

  const getBrandName = (b: string | BrandItem): string => {
    if (!b) return "";
    return typeof b === "string" ? b : b.name || "";
  };

  // Collect all brand items for this product
  const brandsList = useMemo(() => {
    const brandMap = new Map<string, BrandItem | string>();

    // 1. From category-level Brand documents
    if (categoryBrands && Array.isArray(categoryBrands)) {
      categoryBrands.forEach((b) => {
        if (b && b.name) brandMap.set(b.name, b);
      });
    }

    // 2. From subcategories
    subcategories.forEach((sub) => {
      if (sub.brands && Array.isArray(sub.brands)) {
        sub.brands.forEach((b) => {
          const name = getBrandName(b);
          if (name && !brandMap.has(name)) {
            brandMap.set(name, b);
          }
        });
      }
    });

    // 3. Category defaults fallback
    if (brandMap.size === 0) {
      const searchTarget = `${categorySlug} ${categoryName} ${subcategories.map(s => s.title).join(" ")}`.toLowerCase();
      const slugKey = Object.keys(DEFAULT_CATEGORY_BRANDS).find((k) =>
        searchTarget.includes(k)
      );
      const defaults = slugKey ? DEFAULT_CATEGORY_BRANDS[slugKey] : ["UltraTech", "Ramco", "Dalmia", "Chettinad", "Coromandel", "ACC"];
      defaults.forEach((d) => brandMap.set(d, d));
    }

    return Array.from(brandMap.values());
  }, [subcategories, categorySlug, categoryBrands, categoryName]);

  const totalItems = subcategories.length;
  const canShow4 = totalItems >= 4;
  const canShow5 = totalItems >= 5;
  const activeCols = cols === 5 && !canShow5 ? (canShow4 ? 4 : 3) : cols === 4 && !canShow4 ? 3 : cols;

  const gridColsClass = 
    activeCols === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : activeCols === 5
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto";

  return (
    <div className="space-y-8">
      {/* Brand Logos Strip */}
      {brandsList.length > 0 && (
        <div className="py-4 sm:py-6">
          <div className="flex flex-wrap items-center justify-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full">
            {brandsList.map((brandItem) => {
              const brandName = getBrandName(brandItem);
              if (!brandName) return null;
              const logoUrl = typeof brandItem !== "string" && brandItem.logo ? urlFor(brandItem.logo) : null;

              return (
                <div
                  key={brandName}
                  className="hover:scale-105 transition-transform duration-200 flex items-center justify-center py-2 px-2"
                >
                  {logoUrl ? (
                    <div className="relative h-10 sm:h-12 md:h-14 lg:h-16 w-28 sm:w-36 md:w-40 lg:w-44 flex items-center justify-center">
                      <Image
                        src={logoUrl}
                        alt={brandName}
                        fill
                        className="object-contain transition-all duration-200"
                      />
                    </div>
                  ) : (
                    <MinimalistBrandLogo name={brandName} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* When subcategories exist: Control Bar & Grid */}
      {subcategories.length > 0 && (
        <>
          {/* Control Bar above Subcategories Cards (Columns Selector) */}
          <div className={`flex items-center justify-between pb-2 ${activeCols === 3 ? "max-w-5xl mx-auto" : ""}`}>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Available Product Types ({subcategories.length})
            </div>

            {/* Grid Columns Controller - Only show if subcategories >= 4 */}
            {canShow4 && (
              <div className="flex items-center space-x-1 bg-slate-100/80 dark:bg-slate-800/60 p-1 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 px-1.5 tracking-wider">
                  Columns
                </span>
                <button
                  onClick={() => setCols(3)}
                  className={`w-6 h-6 flex items-center justify-center rounded transition-all ${
                    activeCols === 3
                      ? "bg-white dark:bg-slate-900 text-brand-red border border-slate-200 dark:border-slate-700 shadow-2xs"
                      : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                  title="3 Columns"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="4" width="4" height="16" rx="0.5" />
                    <rect x="10" y="4" width="4" height="16" rx="0.5" />
                    <rect x="17" y="4" width="4" height="16" rx="0.5" />
                  </svg>
                </button>

                {canShow4 && (
                  <button
                    onClick={() => setCols(4)}
                    className={`w-6 h-6 flex items-center justify-center rounded transition-all ${
                      activeCols === 4
                        ? "bg-white dark:bg-slate-900 text-brand-red border border-slate-200 dark:border-slate-700 shadow-2xs"
                        : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                    title="4 Columns"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="4" width="3" height="16" rx="0.5" />
                      <rect x="7.5" y="4" width="3" height="16" rx="0.5" />
                      <rect x="13" y="4" width="3" height="16" rx="0.5" />
                      <rect x="18.5" y="4" width="3" height="16" rx="0.5" />
                    </svg>
                  </button>
                )}

                {canShow5 && (
                  <button
                    onClick={() => setCols(5)}
                    className={`w-6 h-6 flex items-center justify-center rounded transition-all ${
                      activeCols === 5
                        ? "bg-white dark:bg-slate-900 text-brand-red border border-slate-200 dark:border-slate-700 shadow-2xs"
                        : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                    title="5 Columns"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="4" width="2" height="16" rx="0.5" />
                      <rect x="6.5" y="4" width="2" height="16" rx="0.5" />
                      <rect x="11" y="4" width="2" height="16" rx="0.5" />
                      <rect x="15.5" y="4" width="2" height="16" rx="0.5" />
                      <rect x="20" y="4" width="2" height="16" rx="0.5" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Subcategories Cards Grid */}
          <div className={`grid ${gridColsClass} gap-8 sm:gap-10 w-full`}>
            {subcategories.map((sub) => {
              const specText = sub.specification || sub.range;

              return (
                <div
                  key={sub.id}
                  className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full max-w-sm mx-auto w-full"
                >
                  {/* Premium Image Frame */}
                  <div 
                    className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 block"
                  >
                    <SubcategoryCardImage image={sub.image} title={sub.title} />
                  </div>

                  {/* Aesthetic Card Body */}
                  <div className="p-5 flex-grow flex flex-col justify-between bg-white dark:bg-slate-900 space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {sub.title}
                      </h4>

                      {specText && (
                        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300">
                          <span className="text-slate-400 dark:text-slate-500 font-medium">Specification:</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{specText}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800">
                      <Link 
                        href={`/contacts?inquiry=${encodeURIComponent(sub.title)}`}
                        className="flex items-center text-xs font-bold text-brand-red hover:text-brand-red/80 transition-colors uppercase tracking-wider group/link"
                      >
                        <span>Inquire Now</span>
                        <svg
                          className="h-3.5 w-3.5 ml-1 transition-transform duration-200 group-hover/link:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>

                      {sub.contactNumber && (
                        <a 
                          href={`tel:${sub.contactNumber}`}
                          className="flex items-center space-x-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-brand-red transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          <span>{sub.contactNumber}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
