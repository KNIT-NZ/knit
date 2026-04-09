import { ArrowUpRight } from "lucide-react";
import TopBar from "@/components/TopBar";
import { projectLinks } from "@/content/projects";

export default function ProjectsPage() {
  return (
    <>
      <TopBar topLabel="KNIT" bottomLabel="Projects" />

      <main className="standardPage">
        <div className="standardPageInner">
          <div className="sectionLabel">Projects</div>
          <h1>Live institutions and experiments.</h1>
          <p className="standardLead">
            These projects are testing our ideas in public.
          </p>

          <div className="projectPageList">
            {projectLinks.map((item) =>
              item.enabled ? (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="projectPageCard"
                >
                  <div className="projectPageCardTop">
                    <h2>{item.title}</h2>
                    <ArrowUpRight size={18} />
                  </div>
                  {item.description ? <p>{item.description}</p> : null}
                </a>
              ) : (
                <div
                  key={item.title}
                  className="projectPageCard disabled"
                  aria-disabled="true"
                >
                  <div className="projectPageCardTop">
                    <h2>{item.title}</h2>
                  </div>
                  {item.description ? <p>{item.description}</p> : null}
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </>
  );
}