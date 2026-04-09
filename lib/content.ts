import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { manifest } from "@/content/manifest";
import { ManifestItem, SectionData } from "@/lib/types";

const sectionsDirectory = path.join(process.cwd(), "content", "sections");

export function getAllManifestItems(): ManifestItem[] {
  return [...manifest].sort((a, b) => a.order - b.order);
}

export function getSectionSlugs(): string[] {
  return getAllManifestItems().map((item) => item.slug);
}

export function getSectionBySlug(slug: string): SectionData | null {
  const filePath = path.join(sectionsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const manifestItem = manifest.find((item) => item.slug === slug);

  if (!manifestItem) return null;

  return {
    slug,
    title: data.title ?? manifestItem.title,
    part: data.part ?? manifestItem.part,
    order: data.order ?? manifestItem.order,
    content,
  };
}

export function getAdjacentSections(slug: string) {
  const items = getAllManifestItems();
  const index = items.findIndex((item) => item.slug === slug);

  return {
    prev: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
  };
}

export function getProgressParts() {
  const items = getAllManifestItems();

  const grouped = new Map<
    string,
    {
      part: string;
      slugs: string[];
      weight: number;
    }
  >();

  for (const item of items) {
    const section = getSectionBySlug(item.slug);
    const part = item.part || "Untitled";
    const weight = Math.max(1, countWords(section?.content || ""));

    if (!grouped.has(part)) {
      grouped.set(part, {
        part,
        slugs: [],
        weight: 0,
      });
    }

    const group = grouped.get(part)!;
    group.slugs.push(item.slug);
    group.weight += weight;
  }

  return Array.from(grouped.values());
}

function countWords(content: string): number {
  return content
    .replace(/<[^>]+>/g, " ")
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}