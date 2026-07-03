"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Layers, Phone } from "lucide-react";
import { urlFor } from "@/sanity/client";

export interface Subcategory {
  id: string;
  title: string;
  range: string;
  modelCount: number;
  image?: any;
  contactNumber?: string;
}

interface SubcategoryListClientProps {
  subcategories: Subcategory[];
  categorySlug: string;
}

export default function SubcategoryListClient({ subcategories, categorySlug }: SubcategoryListClientProps) {
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
        {subcategories.map((sub) => (
          <div
            key={sub.id}
            className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
          >
            {/* Image Frame Wrapper as Link */}
            <Link 
              href={`/products/${categorySlug}/${sub.id}`}
              className="relative aspect-[4/3] w-full overflow-hidden bg-slate-105 dark:bg-slate-800"
            >
              {sub.image ? (
                <Image
                  src={urlFor(sub.image)}
                  alt={sub.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-105 dark:bg-slate-800">
                  <Layers className="h-10 w-10 text-slate-300 dark:text-slate-650" />
                </div>
              )}
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-300"></div>
              
              {/* Models overlay badge (top right) */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 dark:text-white shadow-sm border border-slate-100 dark:border-slate-800">
                {sub.modelCount} Models
              </div>
            </Link>

            {/* Card Details */}
            <div className="p-5 flex-grow flex flex-col justify-between bg-white dark:bg-slate-900">
              <div className="space-y-4">
                <Link href={`/products/${categorySlug}/${sub.id}`}>
                  <h4 className="text-md font-bold text-slate-900 dark:text-white group-hover:text-brand-red transition-colors duration-200 leading-snug">
                    {sub.title}
                  </h4>
                </Link>
                <div className="space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-450">Models:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{sub.modelCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-450">Range:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{sub.range}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <Link 
                  href={`/products/${categorySlug}/${sub.id}`}
                  className="flex items-center text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors uppercase tracking-wider"
                >
                  <span>View All</span>
                  <svg
                    className="h-3.5 w-3.5 ml-1 transition-transform duration-200 group-hover:translate-x-1"
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
                    className="flex items-center space-x-1 text-xs font-extrabold text-brand-red hover:text-brand-red/80 transition-colors p-1"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>{sub.contactNumber}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
