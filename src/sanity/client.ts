import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { mockData } from "@/data/mockData";

const envProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const projectId = (envProjectId && envProjectId !== "mock-project-id" && envProjectId !== "undefined" && envProjectId.trim() !== "")
  ? envProjectId
  : "6k0ekm0q";

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-03-11";

// Check if we should use local mock data
const useMock = !projectId || projectId === "mock-project-id";

export const client = !useMock
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export interface ImageUrlOptions {
  width?: number;
  height?: number;
  quality?: number;
}

// Next.js custom image loader for Sanity image CDN
export function sanityImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  if (!src) return "";
  if (!src.includes("cdn.sanity.io")) return src;
  try {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    url.searchParams.set("w", width.toString());
    url.searchParams.set("q", (quality || 80).toString());
    return url.toString();
  } catch {
    return src;
  }
}

// Highly optimized image URL helper: automatically delivers WebP/AVIF, responsive widths, and quality compression
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any, options?: ImageUrlOptions): string {
  if (!source) return "";
  if (typeof source === "string") {
    try {
      if (source.includes("cdn.sanity.io")) {
        const url = new URL(source);
        url.searchParams.set("auto", "format");
        url.searchParams.set("fit", "max");
        if (!url.searchParams.has("q")) url.searchParams.set("q", (options?.quality || 80).toString());
        if (options?.width) url.searchParams.set("w", options.width.toString());
        if (options?.height) url.searchParams.set("h", options.height.toString());
        return url.toString();
      }
      if (source.includes("images.unsplash.com")) {
        const url = new URL(source);
        url.searchParams.set("auto", "format");
        url.searchParams.set("fit", "crop");
        if (!url.searchParams.has("q")) url.searchParams.set("q", (options?.quality || 80).toString());
        if (options?.width) url.searchParams.set("w", options.width.toString());
        if (options?.height) url.searchParams.set("h", options.height.toString());
        return url.toString();
      }
    } catch {
      return source;
    }
    return source;
  }
  if (source.asset && typeof source.asset._ref === "string") {
    try {
      if (builder) {
        let b = builder.image(source).auto("format").fit("max").quality(options?.quality || 80);
        if (options?.width) b = b.width(options.width);
        if (options?.height) b = b.height(options.height);
        return b.url();
      }
    } catch (e) {
      console.warn("Builder failed to generate URL, using manual parser:", e);
    }
    // Robust manual fallback parser for standard Sanity image refs
    // Format: image-[assetId]-[dimensions]-[extension]
    const ref = source.asset._ref;
    const parts = ref.split("-");
    if (parts.length >= 4) {
      const id = parts[1];
      const dims = parts[2];
      const ext = parts[3];
      const pId = projectId || "6k0ekm0q";
      const dSet = dataset || "production";
      const params = new URLSearchParams();
      params.set("auto", "format");
      params.set("fit", "max");
      params.set("q", (options?.quality || 80).toString());
      if (options?.width) params.set("w", options.width.toString());
      if (options?.height) params.set("h", options.height.toString());
      return `https://cdn.sanity.io/images/${pId}/${dSet}/${id}-${dims}.${ext}?${params.toString()}`;
    }
  }
  if (source.asset && typeof source.asset.url === "string") {
    try {
      const url = new URL(source.asset.url);
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "max");
      url.searchParams.set("q", (options?.quality || 80).toString());
      if (options?.width) url.searchParams.set("w", options.width.toString());
      if (options?.height) url.searchParams.set("h", options.height.toString());
      return url.toString();
    } catch {
      return source.asset.url;
    }
  }
  return "";
}

// Global fetch helper that routes between Sanity and local Mock Data
export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
}): Promise<T> {
  if (!useMock && client) {
    try {
      const result = await client.fetch<T>(
        query,
        params,
        process.env.NODE_ENV === "development" ? { next: { revalidate: 0 } } : undefined
      );
      if (result !== null && result !== undefined && (!Array.isArray(result) || result.length > 0)) {
        console.log(`[Sanity] successfully fetched query: ${query.substring(0, 60)}...`);
        return result;
      }
      console.log(`[Sanity] query returned empty/null, falling back to mock data for: ${query.substring(0, 60)}...`);
    } catch (err) {
      console.warn("[Sanity] fetch failed, falling back to mock data:", err);
      // Write error to sanity-debug.log (server-side only)
      if (typeof window === "undefined") {
        try {
          const fs = eval("require")("fs");
          const path = eval("require")("path");
          const logMessage = `[${new Date().toISOString()}] Query: ${query.substring(0, 100)}...\nError: ${err instanceof Error ? err.stack : err}\n\n`;
          fs.appendFileSync(path.join(process.cwd(), "sanity-debug.log"), logMessage);
        } catch {
          // ignore logging failures
        }
      }
    }
  }

  // Simple query routing to return appropriate mock data
  const lowercaseQuery = query.toLowerCase();

  if (lowercaseQuery.includes('_type == "homepage"') || lowercaseQuery.includes('homepage')) {
    return {
      title: mockData.hero.title,
      description: mockData.hero.description,
      slides: mockData.hero.slides,
      mission: mockData.mission,
      vision: mockData.vision,
      coreValues: mockData.coreValues,
    } as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "productsubcategory"') || lowercaseQuery.includes('productsubcategory')) {
    if (lowercaseQuery.includes('[0]')) {
      const subSlug = params.subcategorySlug || params.slug || params.decodedSubcategory;
      const decSubSlug = subSlug ? decodeURIComponent(subSlug) : "";
      const match = mockData.productSubcategories.find((sub) => sub.id === subSlug || sub.id === decSubSlug || sub.title === subSlug || sub.title === decSubSlug);
      return match as unknown as T;
    }
    const catSlug = params.categorySlug || params.category || params.decodedCategory;
    const decCatSlug = catSlug ? decodeURIComponent(catSlug) : "";
    if (catSlug || decCatSlug) {
      return mockData.productSubcategories.filter((sub) => sub.category === catSlug || sub.category === decCatSlug) as unknown as T;
    }
    return mockData.productSubcategories as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "brand"') || lowercaseQuery.includes('brand')) {
    if (params) {
      const catId = (params.matchedName || params.matchedSlug || params.matchedCustomId || params.matchedDocId || params.matchedId || params.category || "").toString().toLowerCase();
      if (catId) {
        const matches = mockData.brands.filter((b) => {
          if (!b.category) return false;
          const bCat = b.category.toLowerCase();
          return bCat === catId || catId.includes(bCat) || bCat.includes(catId);
        });
        if (matches.length > 0) return matches as unknown as T;
      }
    }
    return mockData.brands as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "product"') || lowercaseQuery.includes('product')) {
    if (lowercaseQuery.includes('[0]') || lowercaseQuery.includes('id ==') || params.categorySlug || params.id || params.decodedCategory) {
      const catId = params.categorySlug || params.id || params.decodedCategory;
      const decCatId = catId ? decodeURIComponent(catId) : "";
      const match = mockData.products.find((p) => p.id === catId || p.id === decCatId || p.name === catId || p.name === decCatId);
      return match as unknown as T;
    }
    return mockData.products as unknown as T;
  }


  if (lowercaseQuery.includes('_type == "award"') || lowercaseQuery.includes('award')) {
    return [] as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "director"') || lowercaseQuery.includes('director') || lowercaseQuery.includes('aboutpage')) {
    return {
      about: {
        history: mockData.about.history,
      },
      history: mockData.about.history,
      directors: mockData.about.directors,
      awards: [],
    } as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "projectcategory"') || lowercaseQuery.includes('projectcategory')) {
    return [] as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "project"') || lowercaseQuery.includes('project')) {
    if (params && params.id) {
      const match = mockData.projects.find((p) => p.id === params.id);
      return match as unknown as T;
    }
    if (params && params.categoryName) {
      const matches = mockData.projects.filter((p) => p.category === params.categoryName);
      return matches as unknown as T;
    }
    return mockData.projects as unknown as T;
  }

  if (lowercaseQuery.includes("slug.current") && (lowercaseQuery.includes("csr") || lowercaseQuery.includes("initiatives"))) {
    const slugVal = params.slug;
    const match = mockData.csr.initiatives.find((item) => item.slug?.current === slugVal);
    return match as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "csrpage"') || lowercaseQuery.includes('csr')) {
    return mockData.csr as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "testimonial"') || lowercaseQuery.includes('testimonial')) {
    return mockData.testimonials as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "contactpage"') || lowercaseQuery.includes('contact')) {
    return mockData.contact as unknown as T;
  }

  return mockData as unknown as T;
}
