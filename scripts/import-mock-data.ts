import { createClient } from "@sanity/client";
import { mockData } from "../src/data/mockData";

// Retrieve token from environment variables
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("❌ Error: SANITY_WRITE_TOKEN environment variable is not defined.");
  console.error("Please run: export SANITY_WRITE_TOKEN='your_write_token_here' (Linux/macOS) or $env:SANITY_WRITE_TOKEN='your_write_token_here' (PowerShell)");
  process.exit(1);
}

const client = createClient({
  projectId: "6k0ekm0q",
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: false,
  token: token,
});

/**
 * Downloads an image from a URL and uploads it as a Sanity image asset.
 */
async function uploadImageFromUrl(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Extract filename from URL
    const filename = url.split("/").pop()?.split("?")[0] || "image.jpg";
    
    const asset = await client.assets.upload("image", buffer, {
      filename: filename,
    });
    
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.error(`⚠️ Failed to upload image from URL ${url}:`, err);
    return null;
  }
}

async function run() {
  console.log("🚀 Starting database upload of mockData to Sanity...");

  try {
    // 1. Create Categories (Products)
    const categoryIdMap = new Map<string, string>();
    console.log("\n--- Importing Categories ---");
    for (const cat of mockData.products) {
      console.log(`Processing Category: ${cat.name}...`);
      const imageAsset = cat.image ? await uploadImageFromUrl(cat.image) : null;
      
      const doc = {
        _type: "product",
        name: cat.name,
        id: cat.id,
        description: cat.description,
        ...(imageAsset && { image: imageAsset }),
      };
      
      const created = await client.createOrReplace({
        _id: `category-${cat.id}`,
        ...doc,
      });
      categoryIdMap.set(cat.id, created._id);
      console.log(`✅ Category "${cat.name}" imported.`);
    }

    // 2. Create Subcategories
    const subcategoryIdMap = new Map<string, string>();
    console.log("\n--- Importing Subcategories ---");
    for (const sub of mockData.productSubcategories) {
      console.log(`Processing Subcategory: ${sub.title}...`);
      const imageAsset = sub.image ? await uploadImageFromUrl(sub.image) : null;
      const parentRef = categoryIdMap.get(sub.category);

      const doc = {
        _type: "productSubcategory",
        title: sub.title,
        slug: { _type: "slug", current: sub.id },
        specification: sub.specification || sub.range,
        range: sub.specification || sub.range,
        ...(parentRef && {
          category: {
            _type: "reference",
            _ref: parentRef,
          },
        }),
        ...(imageAsset && { image: imageAsset }),
      };

      const created = await client.createOrReplace({
        _id: `subcategory-${sub.id}`,
        ...doc,
      });
      subcategoryIdMap.set(sub.id, created._id);
      console.log(`✅ Subcategory "${sub.title}" imported.`);
    }

    console.log("\n🎉 Bulk import completed successfully!");
  } catch (err) {
    console.error("❌ Critical error during import execution:", err);
  }
}

run();
