// app/[slug]/page.tsx
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import TocOverlay from "@/components/TocOverlay";
import {
  getAdjacentSections,
  getProgressParts,
  getSectionBySlug,
  getSectionSlugs,
} from "@/lib/content";

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

  const { next } = getAdjacentSections(slug);
  const progressParts = getProgressParts();
  const MDXContent = (await import(`@/content/sections/${slug}.mdx`)).default;

  return (
    <>
      <TopBar
        topLabel={section.part || undefined}
        bottomLabel={section.title}
        currentSlug={slug}
        progressParts={progressParts}
        rightSlot={<TocOverlay currentSlug={slug} />}
      />

      <main className="readingShell">
        <article className="readingArticleCentered">
          <header className="readingHeader">
            <h1>{section.title}</h1>
          </header>

          <div className="proseShell">
            <MDXContent />
          </div>
        </article>
      </main>

      {next ? (
        <section className="nextSectionBar">
          <div className="nextSectionBarInner">
            <div className="nextSectionMeta">
              <div className="nextSectionLabel">Next Section:</div>
              <div className="nextSectionTitle">{next.title}</div>
            </div>

            <a href={`/${next.slug}`} className="nextSectionButton">
              <span>Next</span>
              <ChevronRight size={16} />
            </a>
          </div>
        </section>
      ) : null}
    </>
  );
}
