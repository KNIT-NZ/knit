// components/TocOverlay.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { manifest } from "@/content/manifest";
import { clsx } from "clsx";

type ManifestItem = (typeof manifest)[number];

type PartGroup = {
  part: string;
  items: ManifestItem[];
};

export default function TocOverlay({ currentSlug }: { currentSlug?: string }) {
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

  const groups = useMemo<PartGroup[]>(() => {
    const sorted = [...manifest].sort((a, b) => a.order - b.order);
    const map = new Map<string, ManifestItem[]>();

    for (const item of sorted) {
      const key = item.part || "Untitled";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }

    return Array.from(map.entries()).map(([part, items]) => ({
      part,
      items,
    }));
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

      <div className={clsx("tocOverlay", { open })} aria-hidden={!open}>
        <button
          type="button"
          className="tocOverlayBackdrop"
          onClick={() => setOpen(false)}
          aria-label="Close table of contents"
        />

        <aside
          className="tocOverlayPanel"
          role="dialog"
          aria-modal="true"
          aria-label="Table of contents"
        >
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
            <div className="tocOverlayNav">
              {groups.map((group, groupIndex) => {
                const firstItem = group.items[0];
                const partIsActive = group.items.some(
                  (item) => item.slug === currentSlug,
                );

                return (
                  <section
                    key={`${group.part}-${groupIndex}`}
                    className="tocOverlayGroup"
                  >
                    <a
                      href={`/${firstItem.slug}`}
                      className={clsx("tocOverlayGroupHeading", {
                        active: partIsActive,
                      })}
                      onClick={() => {
                        setOpen(false);
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur();
                        }
                      }}
                    >
                      <span className="tocOverlayGroupIndex">
                        {groupIndex + 1}
                      </span>
                      <span className="tocOverlayGroupTitle">{group.part}</span>
                      <span className="tocOverlayGroupIcon">
                        <ArrowUpRight size={14} />
                      </span>
                    </a>

                    <nav className="tocOverlayList">
                      {group.items.map((item) => (
                        <a
                          key={item.slug}
                          href={`/${item.slug}`}
                          className={clsx("tocOverlayItem", {
                            active: item.slug === currentSlug,
                          })}
                          onClick={() => {
                            setOpen(false);
                            if (document.activeElement instanceof HTMLElement) {
                              document.activeElement.blur();
                            }
                          }}
                        >
                          <span className="tocOverlayItemTitle">
                            {item.title}
                          </span>

                          <span className="tocOverlayItemIcon">
                            <ArrowUpRight size={14} />
                          </span>
                        </a>
                      ))}
                    </nav>
                  </section>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
