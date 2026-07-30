const { createClient } = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");

const client = createClient({
  projectId: "6k0ekm0q",
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

function urlFor(source) {
  if (!source) return "";
  if (typeof source === "string") return source;
  if (source.asset && typeof source.asset._ref === "string") {
    return builder ? builder.image(source).url() : "";
  }
  return "";
}

const image = {
  "_type": "image",
  "asset": {
    "_ref": "image-55c9b0d0f91ef512b987e9d79c3096b011731037-5472x3648-jpg",
    "_type": "reference"
  }
};

console.log("RESOLVED URL:", urlFor(image));
