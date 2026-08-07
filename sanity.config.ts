import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./src/sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "mkaruppiah-studio",
  title: "M. Karuppiah Content Manager",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            orderableDocumentListDeskItem({ type: "product", title: "Products (Drag & Drop Reorder)", S, context }),
            orderableDocumentListDeskItem({ type: "productSubcategory", title: "Product Subcategories (Drag & Drop Reorder)", S, context }),
            orderableDocumentListDeskItem({ type: "brand", title: "Brands (Drag & Drop Reorder)", S, context }),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !["product", "productSubcategory", "brand"].includes(item.getId() || "")
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
