import React from "react";
import CategoryListClient from "@/components/CategoryListClient";
import { sanityFetch } from "@/sanity/client";
import { Product } from "@/data/mockData";

export const dynamic = "force-static";

export default async function ProductsIndexPage() {
  const products = await sanityFetch<Product[]>({
    query: `*[_type == "product"] | order(coalesce(orderRank, order, 999) asc, _createdAt asc) { id, name, "slug": slug.current, description, image }`,
  });

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Header section */}
      <section className="bg-slate-900 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans uppercase text-white">
            All Products & Supplies
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Explore our comprehensive range of high-grade construction materials, tools, and industrial supplies.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryListClient products={products || []} />
        </div>
      </section>
    </div>
  );
}
