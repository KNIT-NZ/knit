export type ProjectLink = {
  title: string;
  href: string;
  enabled: boolean;
  external?: boolean;
  description?: string;
};

export const projectLinks: ProjectLink[] = [
  {
    title: "Open Order",
    href: "https://openorder.knit.nz",
    enabled: true,
    external: true,
    description: "Procedural search and civic Parliamentary infrastructure.",
  },
  {
    title: "Civic Brain",
    href: "https://tbd.knit.nz",
    enabled: false,
    external: true,
    description: "Psychometric civic engagement engine.",
  },
  {
    title: "Projects",
    href: "/projects",
    enabled: true,
    external: false,
    description: "Overview of the ecosystem.",
  },
  {
    title: "Archive",
    href: "/archive",
    enabled: false,
    external: false,
    description: "Future publications and supporting material.",
  },
];