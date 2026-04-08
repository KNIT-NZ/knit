import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";

export default function TopBar({
  centerLabel,
  rightSlot,
}: {
  centerLabel?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <header className="topBar">
      <div className="topBarInner">
        <div className="topBarLeft">
          <Link href="/" className="brand">
            <span className="brandMark" aria-hidden="true">
              ✦
            </span>
            <span className="brandText">KNIT</span>
          </Link>
        </div>

        <div className="topBarCenter">
          {centerLabel ? <div className="topBarLabel">{centerLabel}</div> : null}
          <ProgressBar />
        </div>

        <div className="topBarRight">{rightSlot}</div>
      </div>
    </header>
  );
}