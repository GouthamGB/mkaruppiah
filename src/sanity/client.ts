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

// Clean image URL helper that handles both Sanity assets and local/external mock image strings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any): string {
  if (!source) return "";
  if (typeof source === "string") return source;
  if (source.asset && typeof source.asset._ref === "string") {
    try {
      if (builder) {
        return builder.image(source).url();
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
      return `https://cdn.sanity.io/images/${pId}/${dSet}/${id}-${dims}.${ext}`;
    }
  }
  if (source.asset && typeof source.asset.url === "string") {
    return source.asset.url;
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
      const result = await client.fetch<T>(query, params, {
        next: { revalidate: 0 },
      });
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
      subtitle: mockData.hero.subtitle,
      description: mockData.hero.description,
      slides: mockData.hero.slides,
      mission: mockData.mission,
      vision: mockData.vision,
      coreValues: mockData.coreValues,
    } as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "productsubcategory"') || lowercaseQuery.includes('productsubcategory')) {
    if (lowercaseQuery.includes('[0]')) {
      const subSlug = params.subcategorySlug || params.slug;
      const match = mockData.productSubcategories.find((sub) => sub.id === subSlug);
      return match as unknown as T;
    }
    const catSlug = params.categorySlug || params.category;
    if (catSlug) {
      return mockData.productSubcategories.filter((sub) => sub.category === catSlug) as unknown as T;
    }
    return mockData.productSubcategories as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "productmodel"') || lowercaseQuery.includes('productmodel')) {
    if (lowercaseQuery.includes('[0]')) {
      const modelSlug = params.productSlug || params.slug;
      const match = mockData.productModels.find((model) => model.slug === modelSlug);
      return match as unknown as T;
    }
    const subSlug = params.subcategorySlug || params.subcategory;
    if (subSlug) {
      return mockData.productModels.filter((model) => model.subcategory === subSlug) as unknown as T;
    }
    return mockData.productModels as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "product"') || lowercaseQuery.includes('product')) {
    if (lowercaseQuery.includes('[0]') || lowercaseQuery.includes('id ==') || params.categorySlug || params.id) {
      const catId = params.categorySlug || params.id;
      const match = mockData.products.find((p) => p.id === catId);
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

  if (lowercaseQuery.includes('_type == "contactpage"') || lowercaseQuery.includes('contact')) {
    return mockData.contact as unknown as T;
  }

  return mockData as unknown as T;
}
