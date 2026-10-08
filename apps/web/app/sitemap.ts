import { posts, projects, publishedIso } from "@atelier/content";
import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/studio", "/services", "/portfolio", "/reviews", "/journal", "/contact"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.8,
  }));

  const work = projects.map((project) => ({
    url: absoluteUrl(`/portfolio/${project.slug}`),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const journal = posts.map((post) => ({
    url: absoluteUrl(`/journal/${post.slug}`),
    lastModified: publishedIso(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...work, ...journal];
}
