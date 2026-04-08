import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { manifest } from "@/content/manifest";

export default function HomePage() {
  const sections = [...manifest].sort((a, b) => a.order - b.order);

  return (
    <main className="homePage">
      <section className="hero">
        <div className="eyebrow">KNIT</div>
        <h1>
          A living doctrine for decentralised, real-time democratic infrastructure.
        </h1>
        <p className="heroText">
          KNIT is the narrative and constitutional layer of a broader ecosystem:
          a place to explain the democratic vision, legitimise the work, and route
          readers into the projects being built on the subdomains.
        </p>

        <div className="heroActions">
          <Link href="/read/preamble" className="primaryLink">
            Start Reading
          </Link>
          <Link href="/projects" className="secondaryLink">
            View Projects
          </Link>
        </div>

        <SearchBox />
      </section>

      <section className="contentsSection">
        <div className="sectionLabel">Contents</div>
        <div className="contentsList">
          {sections.map((item) => (
            <Link key={item.slug} href={`/read/${item.slug}`} className="contentsRow">
              <div className="contentsMeta">{item.part}</div>
              <div>
                <div className="contentsTitle">{item.title}</div>
                {item.description && (
                  <div className="contentsDescription">{item.description}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}