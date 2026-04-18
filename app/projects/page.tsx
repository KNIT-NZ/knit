// app/projects/page.tsx
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import TopBar from "@/components/TopBar";
import ProjectRepoDisclosure from "@/components/ProjectRepoDisclosure";
import { projectLinks } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <TopBar topLabel="KNIT" bottomLabel="Projects" />

      <main className="standardPage">
        <div className="standardPageInner">
          <div className="sectionLabel">Projects</div>
          <h1>Live experiments.</h1>
          <p className="standardLead">
            Our projects are testing our ideas in public.
          </p>

          <div className="projectPageList">
            {projectLinks.map((item) => (
              <div
                key={item.title}
                className={`projectPageCardShell${item.enabled ? "" : " disabled"}`}
              >
                {item.enabled ? (
                  <div className="projectPageCard">
                    <div className="projectPageCardTop">
                      <h2>
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noreferrer" : undefined}
                          className="projectPageCardTitleLink"
                        >
                          {item.title}
                        </a>
                      </h2>

                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        className="projectPageCardIconLink"
                        aria-label={`Open ${item.title}`}
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    </div>

                    {item.description ? <p>{item.description}</p> : null}

                    {item.repo ? (
                      <ProjectRepoDisclosure
                        repo={item.repo}
                        previewUrl={item.previewUrl}
                        summaryHint={item.summaryHint}
                      />
                    ) : null}
                  </div>
                ) : (
                  <div
                    className="projectPageCard disabled"
                    aria-disabled="true"
                  >
                    <div className="projectPageCardTop">
                      <h2>{item.title}</h2>
                    </div>
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
