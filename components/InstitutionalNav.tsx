import Link from "next/link";

type Destination = "projects" | "publications";

export default function InstitutionalNav({ active }: { active?: Destination }) {
  return (
    <nav className="institutionalNav" aria-label="Institutional navigation">
      <Link href="/projects" aria-current={active === "projects" ? "page" : undefined}>
        Projects
      </Link>
      <Link href="/publications" aria-current={active === "publications" ? "page" : undefined}>
        Publications
      </Link>
    </nav>
  );
}
