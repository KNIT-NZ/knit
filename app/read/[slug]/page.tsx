import Link from "next/link";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import TocOverlay from "@/components/TocOverlay";
import { getAdjacentSections, getSectionBySlug, getSectionSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getSectionSlugs().map((slug) => ({ slug }));
}

export default async function ReadPage({
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
      <TopBar
        centerLabel={section.part || section.title}
        rightSlot={<TocOverlay currentSlug={slug} />}
      />

      <main className="readingShell">
        <article className="readingArticle readingArticleCentered">
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
                <Link href={`/read/${prev.slug}`} className="navPrev">
                  ← {prev.title}
                </Link>
              ) : null}
            </div>
            <div>
              {next ? (
                <Link href={`/read/${next.slug}`} className="navNext">
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