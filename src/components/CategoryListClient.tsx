"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Layers } from "lucide-react";
import { urlFor } from "@/sanity/client";
import { Product } from "@/data/mockData";
import { slugify } from "@/lib/slugify";

interface CategoryListClientProps {
  products: Product[];
}

function CategoryCardImage({ image, title }: { image: any; title: string }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = image && !imageError ? urlFor(image) : null;

  if (!imageUrl) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 p-4 text-center">
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
      className="object-cover transition-transform duration-500 group-hover:scale-103"
    />
  );
}

export default function CategoryListClient({ products }: CategoryListClientProps) {
  const [cols, setCols] = useState<3 | 4 | 5>(3);

  const totalItems = products.length;
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
    <div className="space-y-6">
      {/* Grid Controller - Only show if products count >= 4 */}
      {canShow4 && (
        <div className={`flex justify-end items-center ${activeCols === 3 ? "max-w-5xl mx-auto" : ""}`}>
          <div className="flex items-center space-x-1 bg-slate-100/80 dark:bg-slate-800/60 p-1 rounded-md border border-slate-200/50 dark:border-slate-700/50">
            <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 px-1.5 tracking-wider">Columns</span>
            
            {/* 3 Columns Button */}
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

            {/* 4 Columns Button */}
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

            {/* 5 Columns Button */}
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
        </div>
      )}

      {/* Cards Grid */}
      <div className={`grid ${gridColsClass} gap-8 sm:gap-10 w-full`}>
        {products.map((product) => {
          const productSlug = product.slug || (product.id && !product.id.includes(" ") && !product.id.includes("%") && !product.id.includes("&") ? product.id : slugify(product.name || product.id));
          return (
            <Link
              key={product.id || product.name}
              href={`/products/${productSlug}`}
              className="group relative block aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 max-w-sm mx-auto bg-slate-100 dark:bg-slate-900"
            >
              {/* Product Image */}
              <CategoryCardImage image={product.image} title={product.name} />

              {/* Minimalist Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent group-hover:from-slate-950/80 transition-opacity duration-300"></div>

              {/* Minimalist Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-widest leading-snug drop-shadow-xs group-hover:text-brand-gold transition-colors duration-200">
                  {product.name}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
