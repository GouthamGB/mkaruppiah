import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Layers } from "lucide-react";
import { sanityFetch } from "@/sanity/client";
import SubcategoryListClient from "@/components/SubcategoryListClient";
import type { Subcategory } from "@/components/SubcategoryListClient";
import { slugify } from "@/lib/slugify";

interface Category {
  _id?: string;
  id: string;
  name: string;
  description: string;
  slug?: string;
}

interface PageProps {
  params: {
    category: string;
  };
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: PageProps) {
  const categorySlug = params.category;
  let decodedCategory = categorySlug;
  try {
    decodedCategory = decodeURIComponent(categorySlug);
  } catch (e) {
    console.error(e);
  }

  // 1. Fetch all products to find matching product
  const allProducts = await sanityFetch<Category[]>({
    query: `*[_type == "product"] { _id, id, name, description, "slug": slug.current }`,
  });

  const category = allProducts?.find((p) =>
    p.slug === categorySlug ||
    p.slug === decodedCategory ||
    p.id === categorySlug ||
    p.id === decodedCategory ||
    p.name === categorySlug ||
    p.name === decodedCategory ||
    (p.name && slugify(p.name) === slugify(decodedCategory)) ||
    (p.id && slugify(p.id) === slugify(decodedCategory))
  );

  // 2. Fetch subcategories of this category
  const subcategories = category
    ? await sanityFetch<Subcategory[]>({
        query: `*[_type == "productSubcategory" && (
          category->_ref == $matchedId || 
          category->id == $matchedId || 
          category->id == $matchedName || 
          category->name == $matchedName
        )] {
          "id": coalesce(slug.current, id),
          title,
          range,
          modelCount,
          image,
          contactNumber
        }`,
        params: { matchedId: category._id || category.id, matchedName: category.name },
      })
    : [];

  const categoryName = category?.name || decodedCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const isEquipment = categoryName.toLowerCase().includes("equipment") || categorySlug.toLowerCase().includes("equipment");
  const displayTitle = isEquipment ? "Select Equipment Type" : `Select ${categoryName} Type`;
  const displaySubtitle = isEquipment 
    ? `Choose from ${subcategories?.length || 0} different types of equipment`
    : `Choose from ${subcategories?.length || 0} different types of ${categoryName.toLowerCase()}`;

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Dynamic Header section */}
      <section className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-80 rounded-full bg-brand-red/10 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans">
            {displayTitle}
          </h1>
          <p className="text-brand-gold text-sm sm:text-base font-bold uppercase tracking-widest">
            {displaySubtitle}
          </p>
        </div>
      </section>

      {/* Breadcrumbs & Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-red dark:text-slate-400 transition-colors duration-200 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Products
        </Link>
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-600 dark:text-slate-200 font-bold">{categoryName}</span>
        </div>
      </div>

      {/* Subcategories Grid with Controls */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {subcategories && subcategories.length > 0 ? (
            <SubcategoryListClient subcategories={subcategories} categorySlug={categorySlug} />
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 max-w-2xl mx-auto shadow-sm">
              <Layers className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-650 mb-4 animate-pulse" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">No Types Found</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                We are currently updating our catalog for {categoryName} types. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
