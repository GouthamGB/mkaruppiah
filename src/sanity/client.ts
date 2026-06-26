import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { mockData } from "@/data/mockData";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-03-11";

// Check if we should use local mock data
const useMock = !projectId;

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
    return builder ? builder.image(source).url() : "";
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
      const result = await client.fetch<T>(query, params);
      if (result !== null && result !== undefined && (!Array.isArray(result) || result.length > 0)) {
        return result;
      }
      console.log("Sanity query returned empty/null, falling back to mock data.");
    } catch (err) {
      console.warn("Sanity fetch failed, falling back to mock data:", err);
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

  if (lowercaseQuery.includes('_type == "product"') || lowercaseQuery.includes('product')) {
    return mockData.products as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "director"') || lowercaseQuery.includes('director') || lowercaseQuery.includes('aboutpage')) {
    return {
      history: mockData.about.history,
      directors: mockData.about.directors,
      awards: mockData.about.awards,
    } as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "project"') || lowercaseQuery.includes('project')) {
    return mockData.projects as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "csrpage"') || lowercaseQuery.includes('csr')) {
    return mockData.csr as unknown as T;
  }

  if (lowercaseQuery.includes('_type == "contactpage"') || lowercaseQuery.includes('contact')) {
    return mockData.contact as unknown as T;
  }

  return mockData as unknown as T;
}
