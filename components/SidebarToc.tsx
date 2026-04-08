"use client";

import Link from "next/link";
import { manifest } from "@/content/manifest";
import { clsx } from "clsx";

export default function SidebarToc({ currentSlug }: { currentSlug: string }) {
  return (
    <aside className="sidebarToc">
      <div className="sidebarTocInner">
        <div className="sidebarLabel">Contents</div>
        <nav>
          {manifest
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <Link
                key={item.slug}
                href={`/read/${item.slug}`}
                className={clsx("tocItem", {
                  active: item.slug === currentSlug,
                })}
              >
                <span className="tocPart">{item.part}</span>
                <span className="tocTitle">{item.title}</span>
              </Link>
            ))}
        </nav>
      </div>
    </aside>
  );
}