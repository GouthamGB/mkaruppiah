"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { Product } from "@/data/mockData";

interface CategoryListClientProps {
  products: Product[];
}

export default function CategoryListClient({ products }: CategoryListClientProps) {
  const [cols, setCols] = useState<3 | 4 | 5>(3);

  // Determine grid column class names based on cols selection
  const gridColsClass = 
    cols === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : cols === 5
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="space-y-6">
      {/* Grid Controller */}
      <div className="flex justify-end items-center">
        <div className="flex items-center space-x-1 bg-slate-105 dark:bg-slate-800/80 p-1 rounded-lg shadow-sm border border-slate-200/30 dark:border-slate-700/30">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-2 tracking-wider">Columns</span>
          
          {/* 3 Columns Button */}
          <button
            onClick={() => setCols(3)}
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-all ${
              cols === 3
                ? "bg-white dark:bg-slate-900 text-brand-red shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
            title="3 Columns"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="4" width="4" height="16" rx="0.5" />
              <rect x="10" y="4" width="4" height="16" rx="0.5" />
              <rect x="17" y="4" width="4" height="16" rx="0.5" />
            </svg>
          </button>

          {/* 4 Columns Button */}
          <button
            onClick={() => setCols(4)}
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-all ${
              cols === 4
                ? "bg-white dark:bg-slate-900 text-brand-red shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
            title="4 Columns"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="4" width="3" height="16" rx="0.5" />
              <rect x="7.5" y="4" width="3" height="16" rx="0.5" />
              <rect x="13" y="4" width="3" height="16" rx="0.5" />
              <rect x="18.5" y="4" width="3" height="16" rx="0.5" />
            </svg>
          </button>

          {/* 5 Columns Button */}
          <button
            onClick={() => setCols(5)}
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-all ${
              cols === 5
                ? "bg-white dark:bg-slate-900 text-brand-red shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
            title="5 Columns"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="4" width="2" height="16" rx="0.5" />
              <rect x="6.5" y="4" width="2" height="16" rx="0.5" />
              <rect x="11" y="4" width="2" height="16" rx="0.5" />
              <rect x="15.5" y="4" width="2" height="16" rx="0.5" />
              <rect x="20" y="4" width="2" height="16" rx="0.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={`grid ${gridColsClass} gap-6`}>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image Wrapper - Compact aspect-[16/10] */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              {product.image && (
                <Image
                  src={urlFor(product.image)}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                />
              )}
              <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/0 transition-colors duration-300"></div>
            </div>

            {/* Card Content - Compact padding and sizing */}
            <div className="flex flex-col flex-grow p-5 justify-between bg-white dark:bg-slate-900">
              <div className="space-y-1.5">
                <h4 className="text-md font-bold text-slate-900 dark:text-white group-hover:text-brand-red transition-colors duration-200 leading-snug">
                  {product.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              </div>
              
              {/* Explore indicator */}
              <div className="flex items-center text-[10px] font-bold text-brand-red uppercase tracking-wider mt-4 pt-3 border-t border-slate-100 dark:border-slate-850">
                <span>Explore Products</span>
                <svg
                  className="h-3 w-3 ml-1 transition-transform duration-200 group-hover:translate-x-0.5"
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
