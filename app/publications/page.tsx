import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import TopBar from "@/components/TopBar";
import InstitutionalNav from "@/components/InstitutionalNav";
import {
  publications, publicationSeries, publicationDate, publicationDoiUrl,
  publicationHref, type Publication,
} from "@/content/publications";

const description = "Research, specifications and technical reports from KNIT. Read and contribute through the public repositories, and cite archived versions using their DOIs.";

export const metadata: Metadata = {
  title: "Publications",
  description,
  alternates: { canonical: "https://www.knit.nz/publications" },
};

function PublicationCard({ publication }: { publication: Publication }) {
  const doiUrl = publicationDoiUrl(publication);
  return (
    <article id={publication.slug} className="projectPageCardShell publicationCard">
      <div className="projectPageCard">
        <div className="publicationEyebrow">{publication.identifier} · {publication.status}</div>
        <div className="projectPageCardTop">
          <h3><a className="projectPageCardTitleLink" href={publication.versionedTextUrl}>{publication.title}</a></h3>
          <a href={publication.versionedTextUrl} className="projectPageCardIconLink" aria-label={`Read ${publication.title} on GitHub`}>
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="publicationByline">
          {publication.authors.map((author, index) => (
            <span key={`${author.name}-${index}`}>
              {index > 0 ? "; " : ""}
              {author.orcid ? <a href={`https://orcid.org/${author.orcid}`} className="projectRepoMetaLink" aria-label={`${author.name}, ORCID profile`}>{author.name}</a> : author.name}
              {` · ${author.affiliation}`}
            </span>
          ))}
        </div>
        <div className="publicationMeta">
          Version {publication.version} · <time dateTime={publication.datePublished}>{publicationDate(publication.datePublished)}</time>
        </div>
        <p>{publication.summary}</p>
        <div className="publicationLinks">
          <a href={publication.versionedTextUrl} className="projectRepoMetaLink">Read on GitHub <ArrowUpRight size={13} /></a>
          <a href={publication.repositoryUrl} className="projectRepoMetaLink">Repository and discussion <ArrowUpRight size={13} /></a>
          <a href={publication.contributionUrl} className="projectRepoMetaLink">How to contribute <ArrowUpRight size={13} /></a>
          <a href={doiUrl} className="projectRepoMetaLink">Archived publication <ArrowUpRight size={13} /></a>
        </div>
        <div className="publicationMeta publicationCitation">
          DOI: <a href={doiUrl} className="projectRepoMetaLink">{publication.doi}</a>
        </div>
        <div className="publicationMeta">
          {publication.reviewStatus} · <a href={publication.licence.url} className="projectRepoMetaLink">{publication.licence.label}</a>
        </div>
        <div className="publicationMeta">
          Related project: <a href={publication.project.href} className="projectRepoMetaLink">{publication.project.title}</a>
        </div>
      </div>
    </article>
  );
}

export default function PublicationsPage() {
  const ordered = [...publications].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "KNIT Publications",
    itemListElement: ordered.map((publication, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TechArticle",
        "@id": publicationDoiUrl(publication),
        headline: `${publication.identifier} · ${publication.title}`,
        description: publication.summary,
        identifier: publication.doi,
        version: publication.version,
        datePublished: publication.datePublished,
        creativeWorkStatus: publication.status,
        author: publication.authors.map((author) => ({
          "@type": "Person", name: author.name,
          affiliation: { "@type": "Organization", name: author.affiliation },
          ...(author.orcid ? { sameAs: `https://orcid.org/${author.orcid}` } : {}),
        })),
        isPartOf: { "@type": "CreativeWorkSeries", name: publication.series },
        license: publication.licence.url,
        url: publicationDoiUrl(publication),
        mainEntityOfPage: `https://www.knit.nz${publicationHref(publication)}`,
      },
    })),
  };
  return (
    <>
      <TopBar topLabel="KNIT" bottomLabel="Publications" rightSlot={<InstitutionalNav active="publications" />} />
      <main className="standardPage">
        <div className="standardPageInner">
          <div className="sectionLabel">Publications</div>
          <h1>Working in the open.</h1>
          <p className="standardLead">
            Our research, specifications and technical reports develop the intellectual foundations of KNIT’s work. We publish to invite scrutiny, enable independent implementation and contribute to the development of democratic infrastructure.
          </p>
          <p className="publicationIntroduction">
            Read and contribute through the public repositories. Archived releases provide a permanent, citable record of each published version.
          </p>
          {publicationSeries.map((series) => {
            const entries = ordered.filter((publication) => publication.series === series);
            if (!entries.length) return null;
            return (
              <section key={series} className="publicationSeries">
                <h2 className="sectionLabel publicationSeriesHeading">{series}</h2>
                <div className="projectPageList publicationList">
                  {entries.map((publication) => <PublicationCard key={publication.slug} publication={publication} />)}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}
