import React from "react";
import { sanityFetch } from "@/sanity/client";
import ProductListClient from "@/components/ProductListClient";
import { notFound } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

interface Subcategory {
  id: string;
  title: string;
}

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

interface PageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export const dynamic = "force-dynamic";

export default async function SubcategoryPage({ params }: PageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = params;

  // 1. Fetch parent category details
  const category = await sanityFetch<Category>({
    query: `*[_type == "product" && id == $categorySlug][0] { id, name }`,
    params: { categorySlug },
  });

  // 2. Fetch subcategory details
  const subcategory = await sanityFetch<Subcategory>({
    query: `*[_type == "productSubcategory" && (slug.current == $subcategorySlug || id == $subcategorySlug)][0] { 
      "id": coalesce(slug.current, id),
      title 
    }`,
    params: { subcategorySlug },
  });

  // 3. Fetch product models under this subcategory
  const models = await sanityFetch<ProductModel[]>({
    query: `*[_type == "productModel" && (subcategory->slug.current == $subcategorySlug || subcategory->_ref in *[_type=="productSubcategory" && (slug.current == $subcategorySlug || id == $subcategorySlug)]._id)] {
      name,
      "slug": slug.current,
      brand,
      rating,
      projectsCount,
      image,
      capacity,
      year
    }`,
    params: { subcategorySlug },
  });

  if (!subcategory) {
    notFound();
  }

  const categoryName = category?.name || categorySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const subcategoryName = subcategory?.title || subcategorySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <ProductListClient
      categorySlug={categorySlug}
      categoryName={categoryName}
      subcategorySlug={subcategorySlug}
      subcategoryName={subcategoryName}
      models={models || []}
    />
  );
}
