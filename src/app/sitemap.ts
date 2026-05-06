import type { MetadataRoute } from "next";
import { getCategories, listProducts } from "@/lib/api/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://phatngocanh.com";

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "daily" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/news", priority: 0.5, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
];

export const revalidate = 3600; // refresh sitemap once an hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [categories, productsResp] = await Promise.all([
    getCategories(),
    listProducts({ pageSize: 200 }),
  ]);

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  for (const cat of categories) {
    entries.push({
      url: `${BASE_URL}/products?category=${encodeURIComponent(cat.slug)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const p of productsResp.items) {
    entries.push({
      url: `${BASE_URL}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return entries;
}
