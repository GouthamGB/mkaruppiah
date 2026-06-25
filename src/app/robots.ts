import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.mkaruppiah.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
