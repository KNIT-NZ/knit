import React from "react";

export function FootnoteRef({ id }: { id: string }) {
  return (
    <sup className="footnoteRef">
      <a href={`#fn-${id}`} id={`fnref-${id}`}>
        [{id}]
      </a>
    </sup>
  );
}

export function Footnotes({
  items,
}: {
  items: { id: string; children: React.ReactNode }[];
}) {
  return (
    <section className="footnotesSection">
      <h2>Notes</h2>
      <ol className="footnotesList">
        {items.map((item) => (
          <li key={item.id} id={`fn-${item.id}`}>
            <div>{item.children}</div>
            <a href={`#fnref-${item.id}`} className="footnoteBacklink">
              ↩
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}