import React from "react";
import { sanityFetch } from "@/sanity/client";
import ProductListClient from "@/components/ProductListClient";
import { notFound } from "next/navigation";
import { slugify } from "@/lib/slugify";

interface Category {
  _id?: string;
  id: string;
  name: string;
  slug?: string;
}

interface Subcategory {
  _id?: string;
  id: string;
  title: string;
  slug?: string;
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
  let decodedCategory = categorySlug;
  let decodedSubcategory = subcategorySlug;
  try { decodedCategory = decodeURIComponent(categorySlug); } catch (e) { console.error(e); }
  try { decodedSubcategory = decodeURIComponent(subcategorySlug); } catch (e) { console.error(e); }

  // 1. Fetch parent category details
  const allProducts = await sanityFetch<Category[]>({
    query: `*[_type == "product"] { _id, id, name, "slug": slug.current }`,
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

  // 2. Fetch subcategory details
  const allSubcategories = await sanityFetch<Subcategory[]>({
    query: `*[_type == "productSubcategory"] { 
      _id,
      "id": coalesce(slug.current, id),
      title,
      "slug": slug.current 
    }`,
  });
  const subcategory = allSubcategories?.find((s) =>
    s.slug === subcategorySlug ||
    s.slug === decodedSubcategory ||
    s.id === subcategorySlug ||
    s.id === decodedSubcategory ||
    s.title === subcategorySlug ||
    s.title === decodedSubcategory ||
    (s.title && slugify(s.title) === slugify(decodedSubcategory)) ||
    (s.id && slugify(s.id) === slugify(decodedSubcategory))
  );

  // 3. Fetch product models under this subcategory
  const models = subcategory
    ? await sanityFetch<ProductModel[]>({
        query: `*[_type == "productModel" && (
          subcategory->_ref == $subId || 
          subcategory->slug.current == $subId || 
          subcategory->id == $subId || 
          subcategory->title == $subTitle
        )] {
          name,
          "slug": slug.current,
          brand,
          rating,
          projectsCount,
          image,
          capacity,
          year
        }`,
        params: { subId: subcategory._id || subcategory.id, subTitle: subcategory.title },
      })
    : [];

  if (!subcategory) {
    notFound();
  }

  const categoryName = category?.name || decodedCategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const subcategoryName = subcategory?.title || decodedSubcategory.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

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
