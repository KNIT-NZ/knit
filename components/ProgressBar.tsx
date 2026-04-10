// components/ProgressBar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

export type ProgressPart = {
  part: string;
  slugs: string[];
  weight: number;
};

export default function ProgressBar({
  currentSlug,
  parts,
}: {
  currentSlug?: string;
  parts?: ProgressPart[];
}) {
  const [pageProgress, setPageProgress] = useState(0);

  useEffect(() => {
    if (!currentSlug || !parts?.length) return;

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
  }, [currentSlug, parts]);

  const computed = useMemo(() => {
    if (!currentSlug || !parts?.length) return null;

    const totalWeight = parts.reduce((sum, part) => sum + part.weight, 0) || 1;

    return parts.map((part) => {
      const currentIndex = part.slugs.findIndex((slug) => slug === currentSlug);

      let fill = 0;

      if (currentIndex === -1) {
        const currentPartIndex = parts.findIndex((p) => p.slugs.includes(currentSlug));
        const thisPartIndex = parts.findIndex((p) => p.part === part.part);

        if (thisPartIndex < currentPartIndex) {
          fill = 1;
        }
      } else {
        const sectionFraction = 1 / part.slugs.length;
        fill = currentIndex * sectionFraction + pageProgress * sectionFraction;
      }

      return {
        ...part,
        widthPercent: (part.weight / totalWeight) * 100,
        fill: Math.min(1, fill),
      };
    });
  }, [currentSlug, parts, pageProgress]);

  if (!currentSlug || !computed?.length) return null;

  return (
    <div className="bookProgress" aria-hidden="true">
      {computed.map((part) => (
        <div
          key={part.part}
          className="bookProgressSegment"
          style={{ width: `${part.widthPercent}%` }}
        >
          <div
            className="bookProgressSegmentFill"
            style={{ transform: `scaleX(${part.fill})` }}
          />
        </div>
      ))}
    </div>
  );
}