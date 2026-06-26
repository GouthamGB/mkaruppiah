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

export const projectItem = {
  name: "projectItem",
  title: "Completed Projects",
  type: "document",
  fields: [
    { name: "title", title: "Project Title", type: "string" },
    {
      name: "category",
      title: "Project Category",
      type: "string",
      options: {
        list: [
          { title: "Educational Institutions", value: "Educational Institutions" },
          { title: "Hospitals", value: "Hospitals" },
          { title: "Hotels & Resorts", value: "Hotels & Resorts" },
          { title: "Government Buildings", value: "Government Buildings" },
          { title: "Individual Houses", value: "Individual Houses" },
          { title: "Commercial Spaces", value: "Commercial Spaces" },
        ],
      },
    },
    { name: "location", title: "Location", type: "string" },
    { name: "year", title: "Year Completed", type: "string" },
    { name: "image", title: "Project Image", type: "image", options: { hotspot: true } },
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
            { name: "description", title: "Initiative Description", type: "text" },
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

export const schemaTypes = [homePage, product, director, projectItem, csr, contact];
