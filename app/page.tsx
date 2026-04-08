import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TopBar from "@/components/TopBar";
import { manifest } from "@/content/manifest";

const projectLinks = [
  {
    title: "Open Order",
    href: "https://open-order.knit.nz",
    note: "Real-time participatory policy system",
    badge: "Live",
  },
  {
    title: "Swive",
    href: "https://swive.knit.nz",
    note: "Psychometric civic engagement engine",
  },
  {
    title: "Book",
    href: "/read/preamble",
    note: "Start with the doctrine",
  },
  {
    title: "Projects",
    href: "/projects",
    note: "See the ecosystem",
  },
];

export default function HomePage() {
  const grouped = groupManifest();

  return (
    <>
      <TopBar centerLabel="KNIT" />

      <main className="homeShell">
        <aside className="homeSidebar">
          <div className="homeSidebarCard">
            <div className="homeSidebarEyebrow">KNIT</div>
            <h1 className="homeTitle">A living doctrine for democratic infrastructure.</h1>
            <p className="homeIntro">
              KNIT is the narrative and constitutional layer of a broader ecosystem:
              a place to explain the democratic vision, legitimise the work, and route
              readers into the institutions being built on the subdomains.
            </p>
          </div>

          <div className="projectRail">
            {projectLinks.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="projectRailItem"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <div className="projectRailMain">
                  <span className="projectRailTitle">{item.title}</span>
                  <ArrowUpRight size={16} />
                </div>
                {item.badge ? <span className="projectBadge">{item.badge}</span> : null}
                <div className="projectRailNote">{item.note}</div>
              </a>
            ))}
          </div>
        </aside>

        <section className="homeMain">
          <div className="homeSectionHeader">
            <div className="sectionLabel">Contents</div>
            <div className="homeDescription">
              Read the living text section by section. Each page has its own canonical URL
              and sits within a larger sequence.
            </div>
          </div>

          <div className="tocGroups">
            {grouped.map(([part, items], index) => (
              <section key={part || index} className="tocGroup">
                <div className="tocGroupHeader">
                  <h2>
                    {index + 1}. {part || "Untitled"}
                  </h2>
                </div>

                <div className="tocGroupList">
                  {items.map((item) => (
                    <Link key={item.slug} href={`/read/${item.slug}`} className="tocRow">
                      <div className="tocRowIcon">
                        <ArrowUpRight size={16} />
                      </div>
                      <div className="tocRowBody">
                        <div className="tocRowTitle">{item.title}</div>
                        {item.description ? (
                          <div className="tocRowDescription">{item.description}</div>
                        ) : null}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function groupManifest() {
  const sorted = [...manifest].sort((a, b) => a.order - b.order);
  const grouped = new Map<string, typeof sorted>();

  for (const item of sorted) {
    const key = item.part || "";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(item);
  }

  return Array.from(grouped.entries());
}