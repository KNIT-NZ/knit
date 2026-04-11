// components/TopBar.tsx
import Link from "next/link";
import ProgressBar, { ProgressPart } from "@/components/ProgressBar";

export default function TopBar({
  topLabel,
  bottomLabel,
  currentSlug,
  progressParts,
  rightSlot,
  logoSrc = "/logo-horizontal.png",
  logoAlt = "KNIT",
}: {
  topLabel?: string;
  bottomLabel?: string;
  currentSlug?: string;
  progressParts?: ProgressPart[];
  rightSlot?: React.ReactNode;
  logoSrc?: string;
  logoAlt?: string;
}) {
  return (
    <header className="topBar">
      <div className="topBarInner">
        <div className="topBarLeft">
          <Link href="/" className="brand" aria-label="KNIT home">
            <img
              src={logoSrc}
              alt={logoAlt}
              width={1623}
              height={614}
              className="brandLogo"
              decoding="async"
              fetchPriority="high"
            />
          </Link>
        </div>

        <div className="topBarCenter">
          {topLabel ? <div className="topBarTopLabel">{topLabel}</div> : null}
          {bottomLabel ? (
            <div className="topBarBottomLabel">{bottomLabel}</div>
          ) : null}
          <ProgressBar currentSlug={currentSlug} parts={progressParts} />
        </div>

        <div className="topBarRight">{rightSlot}</div>
      </div>
    </header>
  );
}
