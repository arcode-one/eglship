import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "./lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absoluteUrl("/assets/figma/hero-bg.webp"),
        absoluteUrl("/assets/images/cta/shopping-usa.webp"),
      ],
    },
  ];
}
