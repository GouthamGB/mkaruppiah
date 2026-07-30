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

export const product = {
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    { name: "name", title: "Product Name", type: "string" },
    { name: "slug", title: "Slug (URL)", type: "slug", options: { source: "name", maxLength: 96 } },
    { name: "id", title: "Product ID (Unique, e.g., cement)", type: "string" },
    { name: "description", title: "Product Description", type: "text" },
    { name: "image", title: "Product Image", type: "image", options: { hotspot: true } },
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
    { name: "title", title: "Subcategory Title (e.g. Tyre Mounted Crane)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },
    { name: "category", title: "Parent Category", type: "reference", to: [{ type: "product" }] },
    { name: "image", title: "Subcategory Image", type: "image", options: { hotspot: true } },
    { name: "range", title: "Range (e.g. 110 tons - 60 Tons)", type: "string" },
    { name: "modelCount", title: "Models Count (e.g. 13)", type: "number" },
    { name: "contactNumber", title: "Contact Number (e.g. +91 94433 12345)", type: "string" },
  ],
};

export const productModel = {
  name: "productModel",
  title: "Product Models / Details",
  type: "document",
  fields: [
    { name: "name", title: "Model Name (e.g. XCMG XCT25Y)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 } },
    { name: "subcategory", title: "Subcategory / Type", type: "reference", to: [{ type: "productSubcategory" }] },
    { name: "brand", title: "Brand (e.g. XCMG)", type: "string" },
    { name: "rating", title: "Rating (e.g. 4.4)", type: "number" },
    { name: "projectsCount", title: "Projects Count (e.g. 10)", type: "number" },
    { name: "image", title: "Model Main Image (Fallback)", type: "image", options: { hotspot: true } },
    {
      name: "images",
      title: "Model Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    { name: "description", title: "Short Description", type: "text" },
    { name: "overview", title: "Overview (Long Description)", type: "text" },
    { name: "capacity", title: "Capacity (e.g. 25 Tons)", type: "string" },
    { name: "year", title: "Year (e.g. 2024)", type: "string" },
    { name: "power", title: "Power (e.g. 260 HP (192 kW) @ 2,200 rpm)", type: "string" },
    { name: "grade", title: "Grade (e.g. Premium)", type: "string" },
    { name: "brochureUrl", title: "Brochure Link (Optional)", type: "string" },
    { name: "brochureFile", title: "Brochure PDF File (Optional)", type: "file" },
  ],
};

export const schemaTypes = [homePage, product, productSubcategory, productModel, director, projectCategory, projectItem, csr, contact, award];


