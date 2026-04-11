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
  mobileLogoSrc = "/logo-square.png",
  mobileLogoAlt = "KNIT",
}: {
  topLabel?: string;
  bottomLabel?: string;
  currentSlug?: string;
  progressParts?: ProgressPart[];
  rightSlot?: React.ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  mobileLogoSrc?: string;
  mobileLogoAlt?: string;
}) {
  const isReadingBar = Boolean(currentSlug);

  return (
    <header className={`topBar${isReadingBar ? " isReadingBar" : ""}`}>
      <div className="topBarInner">
        <div className="topBarLeft">
          <Link href="/" className="brand brandDesktop" aria-label="KNIT home">
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

          {isReadingBar ? (
            <Link href="/" className="brand brandMobile" aria-label="KNIT home">
              <img
                src={mobileLogoSrc}
                alt={mobileLogoAlt}
                width={512}
                height={512}
                className="brandLogoSquare"
                decoding="async"
                fetchPriority="high"
              />
            </Link>
          ) : null}
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