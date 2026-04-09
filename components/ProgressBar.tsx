"use client";

import { useEffect, useMemo, useState } from "react";
import { manifest } from "@/content/manifest";

type PartGroup = {
  part: string;
  items: typeof manifest;
};

export default function ProgressBar({
  currentSlug,
}: {
  currentSlug?: string;
}) {
  const [pageProgress, setPageProgress] = useState(0);

  useEffect(() => {
    if (!currentSlug) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setPageProgress(Math.min(1, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [currentSlug]);

  const parts = useMemo<PartGroup[]>(() => {
    const sorted = [...manifest].sort((a, b) => a.order - b.order);
    const groups = new Map<string, typeof manifest>();

    for (const item of sorted) {
      const key = item.part || "Untitled";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(item);
    }

    return Array.from(groups.entries()).map(([part, items]) => ({
      part,
      items,
    }));
  }, []);

  if (!currentSlug) return null;

  return (
    <div
      className="bookProgress"
      aria-hidden="true"
      style={{ ["--progress-segments" as any]: parts.length }}
    >
      {parts.map((group) => {
        const currentIndex = group.items.findIndex((item) => item.slug === currentSlug);

        let fill = 0;

        if (currentIndex === -1) {
          const currentOrder = manifest.find((m) => m.slug === currentSlug)?.order ?? -1;
          const lastOrderInPart = group.items[group.items.length - 1]?.order ?? -1;
          if (lastOrderInPart < currentOrder) {
            fill = 1;
          }
        } else {
          const sectionFraction = 1 / group.items.length;
          fill = currentIndex * sectionFraction + pageProgress * sectionFraction;
        }

        return (
          <div key={group.part} className="bookProgressSegment">
            <div
              className="bookProgressSegmentFill"
              style={{ transform: `scaleX(${Math.min(1, fill)})` }}
            />
          </div>
        );
      })}
    </div>
  );
}