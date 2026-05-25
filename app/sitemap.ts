import type { MetadataRoute } from "next";
import { LOCALES, ROUTES } from "@/lib/routes";
import { SAMPLE_TABLES } from "@/lib/tables";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://werkholz.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });

    const sectionKeys = [
      "currentPieces",
      "customTables",
      "forBusinesses",
      "process",
      "contact",
      "impressum",
      "privacy",
      "materials",
    ] as const;

    for (const key of sectionKeys) {
      entries.push({
        url: `${BASE_URL}/${locale}/${ROUTES[key][locale]}`,
        lastModified: new Date(),
        changeFrequency: key === "currentPieces" ? "weekly" : "monthly",
        priority: key === "currentPieces" ? 0.9 : 0.6,
      });
    }

    for (const item of SAMPLE_TABLES) {
      entries.push({
        url: `${BASE_URL}/${locale}/${ROUTES.currentPieces[locale]}/${item.slug[locale]}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
