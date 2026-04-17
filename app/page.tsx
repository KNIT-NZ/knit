// app/page.tsx
import { ArrowUpRight } from "lucide-react";
import TopBar from "@/components/TopBar";
import { manifest } from "@/content/manifest";

const homeSidebarLinks = [
  {
    title: "Projects",
    href: "/projects",
    enabled: true,
    external: false,
  },
  {
    title: "Open Order",
    href: "https://openorder.knit.nz",
    enabled: true,
    external: true,
  },
  {
    title: "Civic Brain",
    href: "https://tbd.knit.nz",
    enabled: false,
    external: true,
  },
  {
    title: "Liquid Policy Shop",
    href: "https://tbd.knit.nz",
    enabled: false,
    external: true,
  },
  {
    title: "Archive",
    href: "/archive",
    enabled: false,
    external: false,
  },
];

export default function HomePage() {
  const grouped = groupManifest();

  return (
    <>
      <TopBar />

      <main className="homeShell">
        <aside className="homeSidebar">
          <div className="homeSidebarCard">
            <h1 className="homeTitle">
              Towards a digital-first New Zealand Government.
            </h1>
            <p className="homeIntro">
              KNIT is an intervention layer that sits between citizens and formal institutions, designed to incrementally rewire how policy input, deliberation, and decision-making occur.
            </p>
          </div>

          <div className="projectRail">
            {homeSidebarLinks.map((item) =>
              item.enabled ? (
                <a
                  key={item.title}
                  href={item.href}
                  className="projectRailItem"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                >
                  <span className="projectRailLabel">{item.title}</span>
                  <ArrowUpRight size={15} />
                </a>
              ) : (
                <div
                  key={item.title}
                  className="projectRailItem disabled"
                  aria-disabled="true"
                >
                  <span className="projectRailLabel">{item.title}</span>
                </div>
              ),
            )}
          </div>
        </aside>

        <section className="homeMain">
          <div className="homeSectionHeader">
            <div className="homeDescription">
              Read our plan for re-tooling the legislature section by section.
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
                    <a
                      key={item.slug}
                      href={`/${item.slug}`}
                      className="tocRow"
                    >
                      <div className="tocRowIcon">
                        <ArrowUpRight size={16} />
                      </div>
                      <div className="tocRowBody">
                        <div className="tocRowTitle">{item.title}</div>
                      </div>
                    </a>
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
