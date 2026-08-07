import React from "react";
import Link from "next/link";
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
          category._ref == $matchedDocId || 
          category._ref == $matchedCustomId ||
          category->id == $matchedCustomId || 
          category->name == $matchedName ||
          category->slug.current == $matchedSlug
        )] {
          "id": coalesce(slug.current, id),
          title,
          "specification": coalesce(specification, range),
          "range": coalesce(specification, range),
          "brands": brands[]->{ _id, name, logo, "slug": slug.current },
          image,
          contactNumber
        }`,
        params: { 
          matchedDocId: category._id || "", 
          matchedCustomId: category.id || "", 
          matchedName: category.name || "",
          matchedSlug: category.slug || categorySlug
        },
      })
    : [];

  // 3. Fetch standalone brand documents associated with this category
  const categoryBrands = category
    ? await sanityFetch<any[]>({
        query: `*[_type == "brand" && (
          category._ref == $matchedDocId || 
          category._ref == $matchedCustomId ||
          category->id == $matchedCustomId || 
          category->name == $matchedName ||
          category->slug.current == $matchedSlug
        )] {
          _id,
          name,
          logo,
          "slug": slug.current
        }`,
        params: { 
          matchedDocId: category._id || "", 
          matchedCustomId: category.id || "", 
          matchedName: category.name || "",
          matchedSlug: category.slug || categorySlug
        },
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

      {/* Subcategories Grid with Controls & Brand Logos */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SubcategoryListClient 
            subcategories={subcategories || []} 
            categorySlug={categorySlug} 
            categoryBrands={categoryBrands || []} 
            categoryName={categoryName}
          />
        </div>
      </section>
    </div>
  );
}
