import React from "react";
import { sanityFetch } from "@/sanity/client";
import ProductDetailsClient from "@/components/ProductDetailsClient";
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
  name: string;
  brand: string;
  rating: number;
  projectsCount: number;
  image?: any;
  images?: any[];
  description: string;
  overview: string;
  capacity: string;
  year: string;
  power: string;
  grade: string;
  brochureUrl?: string;
  brochureFileUrl?: string;
}

interface PageProps {
  params: {
    category: string;
    subcategory: string;
    productSlug: string;
  };
}

export const dynamic = "force-dynamic";

export default async function ProductModelDetailsPage({ params }: PageProps) {
  const { category: categorySlug, subcategory: subcategorySlug, productSlug } = params;

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

  // 3. Fetch product model details
  const model = await sanityFetch<ProductModel>({
    query: `*[_type == "productModel" && (slug.current == $productSlug || id == $productSlug) && (subcategory->slug.current == $subcategorySlug || subcategory->_ref in *[_type=="productSubcategory" && (slug.current == $subcategorySlug || id == $subcategorySlug)]._id)][0] {
      name,
      brand,
      rating,
      projectsCount,
      image,
      images,
      description,
      overview,
      capacity,
      year,
      power,
      grade,
      brochureUrl,
      "brochureFileUrl": brochureFile.asset->url
    }`,
    params: { productSlug, subcategorySlug },
  });

  if (!model) {
    notFound();
  }

  const categoryName = category?.name || categorySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const subcategoryName = subcategory?.title || subcategorySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <ProductDetailsClient
      categorySlug={categorySlug}
      categoryName={categoryName}
      subcategorySlug={subcategorySlug}
      subcategoryName={subcategoryName}
      model={model}
    />
  );
}
