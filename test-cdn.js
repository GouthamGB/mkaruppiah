const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "6k0ekm0q",
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: true,
});

async function run() {
  try {
    const result = await client.fetch(`*[_type == "homePage"][0]`);
    console.log("CDN RESULTS:");
    console.log("  has result:", !!result);
    if (result) {
      console.log("  _id:", result._id);
      console.log("  slides count:", result.slides ? result.slides.length : 0);
      console.log("  slides:", JSON.stringify(result.slides, null, 2));
    }
  } catch (err) {
    console.error("CDN fetch error:", err);
  }
}

run();
