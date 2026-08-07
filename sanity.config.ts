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
          .title("Content Manager")
          .items([
            // 1. Reorder All Main Products
            orderableDocumentListDeskItem({
              type: "product",
              title: "1. Main Products (Drag & Drop Reorder)",
              S,
              context,
            }),

            S.divider(),

            // 2. Nested view: Select Product -> Manage/Reorder Subcategories
            S.listItem()
              .title("2. Product -> Subcategories (Reorder per Product)")
              .child(
                S.documentTypeList("product")
                  .title("Select Product to manage its Subcategories")
                  .child((productId) =>
                    S.list()
                      .title("Subcategories")
                      .items([
                        orderableDocumentListDeskItem({
                          type: "productSubcategory",
                          title: "Drag & Drop Subcategories for this Product",
                          filter: "category._ref == $productId || category->_ref == $productId || category->id == $productId",
                          params: { productId },
                          S,
                          context,
                        }),
                      ])
                  )
              ),

            // 3. Nested view: Select Product -> Manage/Reorder Brands
            S.listItem()
              .title("3. Product -> Brands (Reorder per Product)")
              .child(
                S.documentTypeList("product")
                  .title("Select Product to manage its Brands")
                  .child((productId) =>
                    S.list()
                      .title("Brands")
                      .items([
                        orderableDocumentListDeskItem({
                          type: "brand",
                          title: "Drag & Drop Brands for this Product",
                          filter: "category._ref == $productId || category->_ref == $productId || category->id == $productId",
                          params: { productId },
                          S,
                          context,
                        }),
                      ])
                  )
              ),

            S.divider(),

            // 4. Global Subcategories & Brands lists
            orderableDocumentListDeskItem({
              type: "productSubcategory",
              title: "All Subcategories (Global List)",
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: "brand",
              title: "All Brands (Global List)",
              S,
              context,
            }),

            S.divider(),

            // 5. All other site content (Home Page, Directors, Projects, CSR, Contact, etc.)
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
