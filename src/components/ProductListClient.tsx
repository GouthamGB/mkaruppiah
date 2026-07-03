"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, Layers, SlidersHorizontal } from "lucide-react";
import { urlFor } from "@/sanity/client";
import { motion, AnimatePresence } from "framer-motion";

interface ProductModel {
  slug: string;
  name: string;
  brand: string;
  rating: number;
  projectsCount: number;
  image?: any;
  capacity: string;
  year: string;
}

interface ProductListClientProps {
  categorySlug: string;
  categoryName: string;
  subcategorySlug: string;
  subcategoryName: string;
  models: ProductModel[];
}

export default function ProductListClient({
  categorySlug,
  categoryName,
  subcategorySlug,
  subcategoryName,
  models,
}: ProductListClientProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [cols, setCols] = useState<3 | 4 | 5>(3);

  // 1. Calculate brand counts from all models
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = { All: models.length };
    models.forEach((model) => {
      const brand = model.brand || "Other";
      counts[brand] = (counts[brand] || 0) + 1;
    });
    return counts;
  }, [models]);

  const uniqueBrands = useMemo(() => {
    const brands = Object.keys(brandCounts).filter((b) => b !== "All");
    return ["All", ...brands.sort()];
  }, [brandCounts]);

  // 2. Filter models
  const filteredModels = useMemo(() => {
    if (selectedBrand === "All") return models;
    return models.filter((model) => model.brand === selectedBrand);
  }, [models, selectedBrand]);

  // 3. Sort models
  const sortedAndFilteredModels = useMemo(() => {
    const sorted = [...filteredModels];
    if (sortBy === "brand-asc") {
      sorted.sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (sortBy === "brand-desc") {
      sorted.sort((a, b) => b.brand.localeCompare(a.brand));
    } else if (sortBy === "capacity-desc") {
      sorted.sort((a, b) => {
        const numA = parseInt(a.capacity) || 0;
        const numB = parseInt(b.capacity) || 0;
        return numB - numA;
      });
    } else {
      // Default: Capacity low to high
      sorted.sort((a, b) => {
        const numA = parseInt(a.capacity) || 0;
        const numB = parseInt(b.capacity) || 0;
        return numA - numB;
      });
    }
    return sorted;
  }, [filteredModels, sortBy]);

  const isEquipment = categoryName.toLowerCase().includes("equipment") || categorySlug.toLowerCase().includes("equipment");
  const noun = isEquipment ? "equipment" : "products";

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {subcategoryName}
          </h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
            {categoryName} Products Catalog
          </p>
        </div>
      </section>

      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
        <Link
          href={`/products/${categorySlug}`}
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-red dark:text-slate-400 transition-colors duration-200 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Types
        </Link>
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/products/${categorySlug}`} className="hover:text-slate-600 transition-colors">{categoryName}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-600 dark:text-slate-200 font-bold">{subcategoryName}</span>
        </div>
      </div>

      {/* Main Filter & Grid Container */}
      <section className="py-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-8 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-bold text-slate-800 dark:text-slate-200">{sortedAndFilteredModels.length}</span> of <span className="font-bold text-slate-800 dark:text-slate-200">{models.length}</span> {noun}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Columns Selector */}
              <div className="flex items-center space-x-1 bg-slate-105 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200/30 dark:border-slate-700/30">
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

              {/* Sorting Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red cursor-pointer shadow-sm transition-all"
                >
                  <option value="default">Sort: Capacity/Model (Low to High)</option>
                  <option value="capacity-desc">Sort: Capacity/Model (High to Low)</option>
                  <option value="brand-asc">Sort: Brand (A-Z)</option>
                  <option value="brand-desc">Sort: Brand (Z-A)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Left Filter Sidebar */}
            <aside className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-100 dark:border-slate-800/60">
                <SlidersHorizontal className="h-4.5 w-4.5 text-brand-red" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-md tracking-tight">Filters</h3>
              </div>

              {/* Brand Filter */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Brand</h4>
                <div className="flex flex-col space-y-1.5">
                  {uniqueBrands.map((brand) => {
                    const isSelected = selectedBrand === brand;
                    const count = brandCounts[brand];
                    return (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          isSelected
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <span>{brand === "All" ? "All Brands" : brand}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-bold transition-all ${
                            isSelected
                              ? "bg-brand-red text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Right Product Grid */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="popLayout">
                {sortedAndFilteredModels.length > 0 ? (
                  <motion.div
                    layout
                    className={`grid gap-6 ${
                      cols === 4
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : cols === 5
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {sortedAndFilteredModels.map((model) => (
                      <motion.div
                        key={model.slug}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Link
                          href={`/products/${categorySlug}/${subcategorySlug}/${model.slug}`}
                          className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                        >
                          {/* Image Wrapper */}
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                            {model.image ? (
                              <Image
                                src={urlFor(model.image)}
                                alt={model.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-103"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                                <Layers className="h-10 w-10 text-slate-300 dark:text-slate-650" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-300"></div>

                            {/* Brand overlay badge (top left) */}
                            <div className="absolute top-4 left-4 bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] font-bold text-white border border-white/10 uppercase tracking-widest shadow-sm">
                              {model.brand}
                            </div>
                          </div>

                          {/* Details */}
                          <div className="p-5 flex-grow flex flex-col justify-between bg-white dark:bg-slate-900">
                            <div className="space-y-4">
                              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-red transition-colors duration-200 leading-snug">
                                {model.name}
                              </h4>
                              
                              {model.capacity && (
                                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 text-xs">
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Capacity</span>
                                    <span className="font-bold text-slate-850 dark:text-slate-200">{model.capacity}</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center text-xs font-bold text-brand-red uppercase tracking-wider mt-5">
                              <span>View Product</span>
                              <svg
                                className="h-3.5 w-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1"
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
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 max-w-lg mx-auto shadow-sm"
                  >
                    <Layers className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4 animate-pulse" />
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">No Models Match Filters</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Try selecting a different brand or clearing current filters.
                    </p>
                    <button
                      onClick={() => setSelectedBrand("All")}
                      className="mt-6 px-4 py-2 bg-brand-red text-white text-sm font-bold rounded-lg hover:bg-brand-red/90 transition-all shadow-md"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
