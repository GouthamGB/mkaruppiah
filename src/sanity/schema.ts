import { orderRankField } from "@sanity/orderable-document-list";

export const homePage = {
  name: "homePage",
  title: "Home Page Content",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Hero Title",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Hero Subtitle",
      type: "string",
    },
    {
      name: "description",
      title: "Hero Description",
      type: "text",
    },
    {
      name: "slides",
      title: "Hero Image Slides",
      type: "array",
      of: [
        {
          type: "object",
          name: "slide",
            fields: [
              { name: "image", title: "Slide Image", type: "image", options: { hotspot: true } },
              { name: "title", title: "Slide Title", type: "string" },
              { name: "subtitle", title: "Slide Subtitle", type: "string" },
              { name: "description", title: "Slide Description", type: "text" },
              { name: "btnText1", title: "Primary Button Text (Optional)", type: "string" },
              { name: "btnLink1", title: "Primary Button Link (Optional)", type: "string" },
              { name: "btnText2", title: "Secondary Button Text (Optional)", type: "string" },
              { name: "btnLink2", title: "Secondary Button Link (Optional)", type: "string" },
            ],
        },
      ],
    },
    {
      name: "mission",
      title: "Mission",
      type: "text",
    },
    {
      name: "vision",
      title: "Vision",
      type: "text",
    },
    {
      name: "coreValues",
      title: "Core Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Value Title", type: "string" },
            { name: "description", title: "Value Description", type: "text" },
          ],
        },
      ],
    },
  ],
};

export const brand = {
  name: "brand",
  title: "Brands",
  type: "document",
  fields: [
    orderRankField({ type: "brand" }),
    { name: "order", title: "Display Order (Ascending)", type: "number" },
    { name: "name", title: "Brand Name (e.g., XCMG, UltraTech, Tata Tiscon)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 } },
    { name: "logo", title: "Brand Logo Image", type: "image", options: { hotspot: true } },
    { name: "description", title: "Brand Description", type: "text" },
    {
      name: "category",
      title: "Product Category",
      type: "reference",
      to: [{ type: "product" }],
    },
  ],
};

export const product = {
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    orderRankField({ type: "product" }),
    { name: "order", title: "Display Order (Ascending)", type: "number" },
    { name: "name", title: "Product Name", type: "string" },
    { name: "slug", title: "Slug (URL)", type: "slug", options: { source: "name", maxLength: 96 } },
    { name: "id", title: "Product ID (Unique, e.g., cement)", type: "string" },
    { name: "description", title: "Product Description", type: "text" },
    { name: "image", title: "Product Image", type: "image", options: { hotspot: true } },
    {
      name: "brands",
      title: "Associated Brands",
      type: "array",
      of: [{ type: "reference", to: [{ type: "brand" }] }],
    },
  ],
};

export const director = {
  name: "director",
  title: "Board of Directors",
  type: "document",
  fields: [
    { name: "name", title: "Director Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "image", title: "Director Image", type: "image", options: { hotspot: true } },
    { name: "order", title: "Display Order (Ascending)", type: "number" },
  ],
};

export const projectCategory = {
  name: "projectCategory",
  title: "Project Categories",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Category Title",
      type: "string",
    },
    {
      name: "image",
      title: "Category Thumbnail Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "description",
      title: "Category Description (Optional)",
      type: "text",
    },
  ],
};

export const projectItem = {
  name: "projectItem",
  title: "Completed Projects",
  type: "document",
  fields: [
    { name: "title", title: "Project Title", type: "string" },
    {
      name: "category",
      title: "Project Category",
      type: "reference",
      to: [{ type: "projectCategory" }],
    },
    { name: "location", title: "Location", type: "string" },
    { name: "year", title: "Year Completed", type: "string" },
    { name: "image", title: "Project Image", type: "image", options: { hotspot: true } },
    { name: "description", title: "Project Description", type: "text" },
    { name: "client", title: "Client Name", type: "string" },
    { name: "area", title: "Built Area (sq. ft.)", type: "string" },
  ],
};

export const csr = {
  name: "csr",
  title: "CSR Initiatives",
  type: "document",
  fields: [
    { name: "title", title: "CSR Main Title", type: "string" },
    { name: "description", title: "CSR Main Description", type: "text" },
    {
      name: "initiatives",
      title: "Initiatives List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Initiative Title", type: "string" },
            { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },
            { name: "description", title: "Initiative Description", type: "text" },
            { name: "image", title: "Initiative Image", type: "image", options: { hotspot: true } },
            {
              name: "media",
              title: "Media Gallery (Photos & Videos)",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "mediaItem",
                  fields: [
                    {
                      name: "type",
                      title: "Media Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Image", value: "image" },
                          { title: "Video", value: "video" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "image",
                    },
                    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
                    { name: "videoUrl", title: "Video URL (YouTube, Vimeo, or MP4)", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const contact = {
  name: "contact",
  title: "Contact Details",
  type: "document",
  fields: [
    { name: "email", title: "General Inquiry Email", type: "string" },
    { name: "phonePudukkottai", title: "Pudukkottai Phone Line", type: "string" },
    { name: "phoneKaraikudi", title: "Karaikkudi Phone Line", type: "string" },
    { name: "weekdaysHours", title: "Weekdays Office Hours", type: "string" },
    { name: "sundayHours", title: "Sunday Office Hours", type: "string" },
    {
      name: "offices",
      title: "Office Location Addresses",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Office Name", type: "string" },
            { name: "address", title: "Address", type: "text" },
            { name: "phone", title: "Office Phone Line", type: "string" },
          ],
        },
      ],
    },
  ],
};

export const award = {
  name: "award",
  title: "Awards & Recognitions",
  type: "document",
  fields: [
    { name: "title", title: "Award Title", type: "string" },
    { name: "description", title: "Award Description", type: "text" },
    { name: "image", title: "Award Image", type: "image", options: { hotspot: true } },
    { name: "order", title: "Display Order (Ascending)", type: "number" },
  ],
};

export const productSubcategory = {
  name: "productSubcategory",
  title: "Product Subcategories / Types",
  type: "document",
  fields: [
    orderRankField({ type: "productSubcategory" }),
    { name: "order", title: "Display Order (Ascending)", type: "number" },
    { name: "title", title: "Subcategory Title (e.g. Tyre Mounted Crane)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },
    { name: "category", title: "Parent Category", type: "reference", to: [{ type: "product" }] },
    { name: "image", title: "Subcategory Image", type: "image", options: { hotspot: true } },
    { name: "specification", title: "Specification (e.g. 8 and 10 available, Grade 53)", type: "string" },
    { name: "range", title: "Range / Spec (Legacy)", type: "string" },
    {
      name: "brands",
      title: "Associated Brands",
      type: "array",
      of: [{ type: "reference", to: [{ type: "brand" }] }],
    },
    { name: "contactNumber", title: "Contact Number (e.g. +91 94433 12345)", type: "string" },
  ],
};

export const schemaTypes = [homePage, product, productSubcategory, brand, director, projectCategory, projectItem, csr, contact, award];


