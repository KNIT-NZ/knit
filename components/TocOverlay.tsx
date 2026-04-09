// components/TocOverlay.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { manifest } from "@/content/manifest";
import { clsx } from "clsx";

export default function TocOverlay({
  currentSlug,
}: {
  currentSlug?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const grouped = useMemo(() => {
    const sorted = [...manifest].sort((a, b) => a.order - b.order);
    const map = new Map<string, typeof sorted>();

    for (const item of sorted) {
      const key = item.part || "";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }

    return Array.from(map.entries());
  }, []);

  return (
    <>
      <button
        type="button"
        className="menuButton"
        onClick={() => setOpen(true)}
        aria-label="Open table of contents"
      >
        <Menu size={18} />
      </button>

      <div className={clsx("tocOverlay", { open })}>
        <div className="tocOverlayBackdrop" onClick={() => setOpen(false)} />

        <div className="tocOverlayPanel">
          <div className="tocOverlayHeader">
            <div className="tocOverlayTitle">Contents</div>
            <button
              type="button"
              className="menuButton"
              onClick={() => setOpen(false)}
              aria-label="Close table of contents"
            >
              <X size={18} />
            </button>
          </div>

          <div className="tocOverlayBody">
            {grouped.map(([part, items], index) => (
              <section key={`${part}-${index}`} className="tocOverlaySection">
                {part ? <div className="tocOverlayPart">{part}</div> : null}

                <div className="tocOverlayList">
                  {items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      className={clsx("tocOverlayItem", {
                        active: item.slug === currentSlug,
                      })}
                      onClick={() => setOpen(false)}
                    >
                      <span className="tocOverlayItemTitle">{item.title}</span>
                      {item.description ? (
                        <span className="tocOverlayItemDescription">
                          {item.description}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}