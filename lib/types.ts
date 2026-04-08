export type ManifestItem = {
  slug: string;
  title: string;
  part?: string;
  description?: string;
  order: number;
};

export type SectionData = {
  slug: string;
  title: string;
  part?: string;
  description?: string;
  order: number;
  content: string;
};