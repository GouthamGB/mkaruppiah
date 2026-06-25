import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "mkaruppiah-studio",
  title: "M. Karuppiah Content Manager",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
