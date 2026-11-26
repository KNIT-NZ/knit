export const publicationSeries = [
  "KNIT Working Drafts",
  "KNIT Working Papers",
  "KNIT Technical Reports",
] as const;

export type PublicationSeries = (typeof publicationSeries)[number];

export type PublicationAuthor = {
  name: string;
  affiliation: string;
  orcid?: string;
};

export type Publication = {
  slug: string;
  identifier: string;
  series: PublicationSeries;
  title: string;
  summary: string;
  authors: readonly PublicationAuthor[];
  datePublished: string;
  version: string;
  status: string;
  reviewStatus: string;
  doi: string;
  repositoryUrl: string;
  versionedTextUrl: string;
  contributionUrl: string;
  licence: { label: string; url: string };
  project: { title: string; href: string };
};

export const publications: readonly Publication[] = [
  {
    slug: "wd-0000",
    identifier: "KNIT WD-0000",
    series: "KNIT Working Drafts",
    title: "Authority-Aware AI",
    summary:
      "A specification for advisory AI systems reasoning over bounded, declared corpora of institutional texts. It establishes seventeen requirements and a framework for assessing textual integrity, source admissibility, semantic fidelity and evidential sufficiency.",
    authors: [
      { name: "Brendan McBryde", affiliation: "KNIT", orcid: "0009-0004-0425-7214" },
    ],
    datePublished: "2026-11-26",
    version: "0.6.1",
    status: "Public working draft",
    reviewStatus: "Not peer reviewed; not a standard",
    doi: "10.5281/zenodo.24546015",
    repositoryUrl: "https://github.com/KNIT-NZ/authority-aware-ai",
    versionedTextUrl: "https://github.com/KNIT-NZ/authority-aware-ai/blob/v0.6.1/SPECIFICATION.md",
    contributionUrl: "https://github.com/KNIT-NZ/authority-aware-ai/blob/v0.6.1/CONTRIBUTING.md",
    licence: { label: "Specification: CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" },
    project: { title: "Authority-Aware AI", href: "/authority-aware-ai" },
  },
];

export function publicationDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function publicationDoiUrl(publication: Publication): string {
  return `https://doi.org/${publication.doi}`;
}

export function publicationHref(publication: Publication): string {
  return `/publications#${publication.slug}`;
}

export function publicationsForProject(href: string): Publication[] {
  return publications.filter((publication) => publication.project.href === href);
}
