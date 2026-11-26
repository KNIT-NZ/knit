export type ProjectLink = {
  title: string;
  href: string;
  external?: boolean;
  enabled: boolean;
  description?: string;
  repo?: {
    owner: string;
    name: string;
  };
  previewImage?: string;
  summaryHint?: string;
};

export const projectLinks: ProjectLink[] = [
  {
    title: "Open Order",
    href: "https://openorder.knit.nz",
    enabled: true,
    external: true,
    description: "Procedural search and civic Parliamentary infrastructure.",
    repo: {
      owner: "KNIT-NZ",
      name: "open-order",
    },
    previewImage: "/project-previews/open-order.png",
    summaryHint: "Launched April 2026",
  },
  {
    title: "Authority-Aware AI",
    href: "/authority-aware-ai",
    enabled: true,
    external: false,
    description: "Open specifications and verification infrastructure for AI systems reasoning over institutional authority.",
    repo: {
      owner: "KNIT-NZ",
      name: "authority-aware-ai",
    },
    summaryHint: "Specification published",
  },
  {
    title: "Civic Brain",
    href: "https://tbd.knit.nz",
    enabled: false,
    external: true,
    description: "Integrated policy mapping infrastructure.",
  },
  {
    title: "Liquid Policy Shop",
    href: "https://tbd.knit.nz",
    enabled: false,
    external: true,
    description:
      "Public, blockchain-backed platform for the collaborative development, refinement, and critique of laws and policies.",
  },
];