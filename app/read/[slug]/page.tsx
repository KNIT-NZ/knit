import Link from "next/link";
import { notFound } from "next/navigation";
import SidebarToc from "@/components/SidebarToc";
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
    <main className="readingPage">
      <SidebarToc currentSlug={slug} />

      <article className="readingArticle">
        <header className="readingHeader">
          {section.part && <div className="sectionEyebrow">{section.part}</div>}
          <h1>{section.title}</h1>
          {section.description && (
            <p className="sectionDescription">{section.description}</p>
          )}
        </header>

        <div className="proseShell">
          <MDXContent />
        </div>

        <footer className="readingFooter">
          <div>
            {prev && (
              <Link href={`/read/${prev.slug}`} className="navPrev">
                ← {prev.title}
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link href={`/read/${next.slug}`} className="navNext">
                {next.title} →
              </Link>
            )}
          </div>
        </footer>
      </article>
    </main>
  );
}