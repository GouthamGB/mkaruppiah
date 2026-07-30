const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "6k0ekm0q",
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: false,
});

async function run() {
  try {
    const result = await client.fetch(`*[_type == "homePage"]`);
    console.log("ALL HOMEPAGE DOCUMENTS:");
    result.forEach((doc, idx) => {
      console.log(`Document #${idx + 1}:`);
      console.log(`  _id: ${doc._id}`);
      console.log(`  title: ${doc.title}`);
      console.log(`  slides: ${doc.slides ? doc.slides.length : 0} slides`);
      console.log(`  keys: ${Object.keys(doc).join(", ")}`);
    });
  } catch (err) {
    console.error("Error fetching documents:", err);
  }
}

run();
