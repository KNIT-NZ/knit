"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { manifest } from "@/content/manifest";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return manifest
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.part?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.order - b.order);
  }, [query]);

  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Search sections"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="searchInput"
      />

      {query && (
        <div className="searchResults">
          {results.length > 0 ? (
            results.map((item) => (
              <Link key={item.slug} href={`/read/${item.slug}`} className="searchResult">
                <div className="searchResultTitle">{item.title}</div>
                {item.description && (
                  <div className="searchResultDescription">{item.description}</div>
                )}
              </Link>
            ))
          ) : (
            <div className="searchEmpty">No matching sections.</div>
          )}
        </div>
      )}
    </div>
  );
}