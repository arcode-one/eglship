import type { MetadataRoute } from "next";
import { absoluteUrl, basePath, siteDescription, siteName } from "./lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const startUrl = basePath ? `${basePath}/` : "/";

  return {
    name: `${siteName} — доставка товаров из США`,
    short_name: siteName,
    description: siteDescription,
    start_url: startUrl,
    scope: startUrl,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#e9551b",
    lang: "ru",
    icons: [
      {
        src: absoluteUrl("/assets/seo/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: absoluteUrl("/assets/seo/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
