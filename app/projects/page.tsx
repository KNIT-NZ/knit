import TopBar from "@/components/TopBar";

export default function ProjectsPage() {
  return (
    <>
      <TopBar topLabel="KNIT" bottomLabel="Projects" />

      <main className="standardPage">
        <div className="standardPageInner">
          <div className="sectionLabel">Projects</div>
          <h1>Live institutions and experiments.</h1>
          <p className="standardLead">
            The main domain explains the doctrine. The subdomains test it in public.
          </p>

          <div className="projectPageList">
            <a
              href="https://openorder.knit.nz"
              target="_blank"
              rel="noreferrer"
              className="projectPageCard"
            >
              <h2>Open Order</h2>
              <p>Real-time participatory policy system.</p>
            </a>

            <a
              href="https://tbd.knit.nz"
              target="_blank"
              rel="noreferrer"
              className="projectPageCard"
            >
              <h2>Next</h2>
              <p>Civic brain.</p>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}