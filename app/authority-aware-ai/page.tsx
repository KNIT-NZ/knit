import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TopBar from "@/components/TopBar";
import InstitutionalNav from "@/components/InstitutionalNav";
import { publicationsForProject, publicationHref, publicationDoiUrl } from "@/content/publications";

const description = "Open specifications and verification infrastructure for AI systems reasoning over institutional authority.";

export const metadata: Metadata = {
  title: "Authority-Aware AI",
  description,
  alternates: { canonical: "https://www.knit.nz/authority-aware-ai" },
};

export default function AuthorityAwareAiPage() {
  const related = publicationsForProject("/authority-aware-ai");
  return (
    <>
      <TopBar topLabel="KNIT" bottomLabel="Authority-Aware AI" rightSlot={<InstitutionalNav />} />
      <main className="standardPage">
        <div className="standardPageInner">
          <div className="sectionLabel">Projects · Specification published</div>
          <h1>Authority-Aware AI</h1>
          <p className="standardLead">{description}</p>
          <div className="projectPageList">
            <section className="projectPageCardShell">
              <div className="projectPageCard institutionalProjectCopy">
                <h2>Authority and assurance</h2>
                <p>Authority-aware AI may reason about institutional authority but must not misrepresent, usurp, or silently assume it.</p>
                <p>Developed from the practical experience of building <a className="projectRepoMetaLink" href="https://openorder.knit.nz">Open Order</a>, the project investigates how advisory systems can preserve the meaning and scope of institutional rules, disclose the limits of their evidence, and make their interpretations open to challenge.</p>
                <p>The published working draft establishes the foundation. The proposed Conformance Suite and reusable components would make the requirements assessable and transferable beyond parliamentary procedure. Neither a completed suite nor general applicability is claimed.</p>
                <p>This work is intended to inform the development of <Link className="projectRepoMetaLink" href="/civic-brain">Civic Brain</Link>, while remaining independently useful to other developers and institutions.</p>
              </div>
            </section>
            <section className="projectPageCardShell">
              <div className="projectPageCard institutionalProjectCopy">
                <h2>Published work</h2>
                {related.map((publication) => (
                  <div key={publication.slug} className="publicationRelatedWork">
                    <a href={publicationHref(publication)} className="projectRepoMetaLink">{publication.identifier} · {publication.title} <ArrowUpRight size={13} /></a>
                    <p>{publication.status} · Version {publication.version}</p>
                    <div className="publicationLinks">
                      <a href={publication.versionedTextUrl} className="projectRepoMetaLink">Read on GitHub <ArrowUpRight size={13} /></a>
                      <a href={publication.repositoryUrl} className="projectRepoMetaLink">Repository and discussion <ArrowUpRight size={13} /></a>
                      <a href={publicationDoiUrl(publication)} className="projectRepoMetaLink">Archived publication <ArrowUpRight size={13} /></a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
