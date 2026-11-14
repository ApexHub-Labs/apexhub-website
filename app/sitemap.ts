import type { MetadataRoute } from "next";
import { CASE_STUDY_PATH, SITE_URL } from "@/lib/site";

// The home route carries every section (services, pricing, work, about,
// contact…) as anchors; the case study is the only other page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${CASE_STUDY_PATH}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
