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
  const imageUrl = image && !imageError ? urlFor(image, { width: 600, quality: 80 }) : null;

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
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      loading="lazy"
      onError={() => setImageError(true)}
      className="object-cover transition-transform duration-500 group-hover:scale-103"
    />
  );
}

export default function CategoryListClient({ products }: CategoryListClientProps) {
  return (
    <div className="w-full">
      {/* Cards Grid: default 4 items per row on big screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
        {products.map((product) => {
          const productSlug = product.slug || (product.name ? slugify(product.name) : (product.id && !product.id.includes(" ") ? product.id : slugify(product.id)));
          return (
            <Link
              key={product.id || product.name}
              href={`/products/${productSlug}`}
              className="group relative block aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-gold/50 hover:-translate-y-1 transition-all duration-300 bg-slate-100 dark:bg-slate-900"
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
