"use client";

import { useEffect, useMemo, useState } from "react";
import { manifest } from "@/content/manifest";

export default function ProgressBar({ currentSlug }: { currentSlug?: string }) {
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

  const ordered = useMemo(
    () => [...manifest].sort((a, b) => a.order - b.order),
    [],
  );

  if (!currentSlug) return null;

  const currentIndex = ordered.findIndex((item) => item.slug === currentSlug);
  if (currentIndex === -1) return null;

  return (
    <div
      className="bookProgress"
      aria-hidden="true"
      style={{ ["--progress-segments" as any]: ordered.length }}
    >
      {ordered.map((item, index) => {
        let fill = 0;

        if (index < currentIndex) fill = 1;
        if (index === currentIndex) fill = pageProgress;

        return (
          <div key={item.slug} className="bookProgressSegment">
            <div
              className="bookProgressSegmentFill"
              style={{ transform: `scaleX(${fill})` }}
            />
          </div>
        );
      })}
    </div>
  );
}
