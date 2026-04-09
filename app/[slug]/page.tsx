import Link from "next/link";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import TocOverlay from "@/components/TocOverlay";
import ScrollToTopOnPathChange from "@/components/ScrollToTopOnPathChange";
import { getAdjacentSections, getSectionBySlug, getSectionSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getSectionSlugs().map((slug) => ({ slug }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getSectionBySlug(slug);

  if (!section) notFound();

  const { prev, next } = getAdjacentSections(slug);
  const MDXContent = (await import(`@/content/sections/${slug}.mdx`)).default;

  return (
    <>
      <ScrollToTopOnPathChange />

      <TopBar
        topLabel={section.part || undefined}
        bottomLabel={section.title}
        currentSlug={slug}
        rightSlot={<TocOverlay currentSlug={slug} />}
      />

      <main className="readingShell">
        <article className="readingArticleCentered">
          <header className="readingHeader">
            <h1>{section.title}</h1>
            {section.description ? (
              <p className="sectionDescription">{section.description}</p>
            ) : null}
          </header>

          <div className="proseShell">
            <MDXContent />
          </div>

          <footer className="readingFooter">
            <div>
              {prev ? (
                <Link href={`/${prev.slug}`} scroll className="navPrev">
                  ← {prev.title}
                </Link>
              ) : null}
            </div>
            <div>
              {next ? (
                <Link href={`/${next.slug}`} scroll className="navNext">
                  {next.title} →
                </Link>
              ) : null}
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}