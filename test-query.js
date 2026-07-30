const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "6k0ekm0q",
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: false,
});

const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "6k0ekm0q",
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: false,
});

async function run() {
  const result = await client.fetch(`*[_type == "productModel"]`);
  console.log("ALL PRODUCT MODELS:", JSON.stringify(result, null, 2));
}

run();





