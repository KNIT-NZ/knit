import Link from "next/link";

export default function ReadingLayout({
  title,
  children,
  prev,
  next,
}: {
  title: string;
  children: React.ReactNode;
  prev?: any;
  next?: any;
}) {
  return (
    <div className="reading">
      <header>
        <Link href="/">KNIT</Link>
      </header>

      <article>
        <h1>{title}</h1>
        <div className="content">{children}</div>
      </article>

      <footer className="nav">
        {prev && (
          <Link href={`/read/${prev.slug}`}>← {prev.title}</Link>
        )}
        {next && (
          <Link href={`/read/${next.slug}`}>{next.title} →</Link>
        )}
      </footer>
    </div>
  );
}