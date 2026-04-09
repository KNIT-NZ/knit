"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = useMemo(() => {
    return [...manifest].sort((a, b) => a.order - b.order);
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

      <div
        className={clsx("tocOverlay", { open })}
        aria-hidden={!open}
      >
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
            <nav className="tocOverlayNav">
              {items.map((item, index) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className={clsx("tocOverlayItem", {
                    active: item.slug === currentSlug,
                  })}
                  onClick={() => setOpen(false)}
                >
                  <div className="tocOverlayItemLeft">
                    <span className="tocOverlayItemIndex">{index + 1}</span>
                    <span className="tocOverlayItemText">
                      {item.part ? (
                        <span className="tocOverlayItemPart">{item.part}</span>
                      ) : null}
                      <span className="tocOverlayItemTitle">{item.title}</span>
                      {item.description ? (
                        <span className="tocOverlayItemDescription">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                  </div>

                  <span className="tocOverlayItemIcon">
                    <ArrowUpRight size={15} />
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
}