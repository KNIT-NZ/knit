import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { getRepoPreview } from "@/lib/github";

type RepoRef = {
  owner: string;
  name: string;
};

type Props = {
  repo: RepoRef;
  previewImage?: string;
  projectHref?: string;
  summaryHint?: string;
  defaultOpen?: boolean;
};

function formatRelativeDate(dateString: string | null) {
  if (!dateString) return null;

  const now = new Date();
  const then = new Date(dateString);
  const diffMs = Math.abs(now.getTime() - then.getTime());
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Updated today";
  if (diffDays === 1) return "Updated yesterday";
  if (diffDays < 30) return `Updated ${diffDays} days ago`;
  if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
  return `Updated ${Math.floor(diffDays / 365)} years ago`;
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-NZ", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#5B8DEF",
  JavaScript: "#D9B44A",
  CSS: "#C97FB5",
  HTML: "#D88A72",
  PLpgSQL: "#6FAE8E",
  SQL: "#6FAE8E",
  Python: "#7C9C6B",
  Shell: "#8E8AAE",
  Bash: "#8E8AAE",
  MDX: "#C88C6A",
  Markdown: "#A59A8A",
  JSON: "#B59B6A",
};

const FALLBACK_LANGUAGE_COLORS = [
  "#5B8DEF",
  "#C97FB5",
  "#6FAE8E",
  "#D9B44A",
  "#8E8AAE",
  "#C88C6A",
];

function getLanguageColor(name: string, index: number) {
  return (
    LANGUAGE_COLORS[name] ??
    FALLBACK_LANGUAGE_COLORS[index % FALLBACK_LANGUAGE_COLORS.length]
  );
}

export default async function ProjectRepoDisclosure({
  repo,
  previewImage,
  projectHref,
  summaryHint = "Public GitHub repo",
  defaultOpen = false,
}: Props) {
  const preview = await getRepoPreview(repo);
  const repoUrl = `https://github.com/${repo.owner}/${repo.name}`;

  const topLanguages =
    preview?.languages.filter((lang) => lang.percent >= 0.5).slice(0, 4) ?? [];

  const updatedLabel = formatRelativeDate(preview?.pushedAt ?? null);

  return (
    <details className="projectRepoDisclosure" open={defaultOpen}>
      <summary className="projectRepoSummary">
        <span className="projectRepoSummaryLeft">
          <span>Project details</span>
        </span>

        <span className="projectRepoSummaryRight">
          <span className="projectRepoSummaryHint">{summaryHint}</span>
          <ChevronDown size={15} className="projectRepoSummaryChevron" />
        </span>
      </summary>

      <div
        className={`projectRepoPanel${
          previewImage ? " projectRepoPanelWithPreview" : ""
        }`}
      >
        <div className="projectRepoPanelMain">
          {preview ? (
            <>
              {preview.readmeExcerpt ? (
                <p className="projectRepoExcerpt">{preview.readmeExcerpt}</p>
              ) : null}

              <div className="projectRepoMetaGrid">
                <div className="projectRepoMetaItem">
                  <span className="projectRepoMetaLabel">Repository</span>
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="projectRepoMetaLink"
                  >
                    <span>{preview.fullName}</span>
                  </a>
                </div>

                <div className="projectRepoMetaItem">
                  <span className="projectRepoMetaLabel">
                    Repository activity
                  </span>
                  <span className="projectRepoMetaValue">
                    {formatCount(preview.stars)} stars ·{" "}
                    {formatCount(preview.forks)} forks ·{" "}
                    {formatCount(preview.openIssues)} open issues
                    {updatedLabel ? ` · ${updatedLabel}` : ""}
                  </span>
                </div>
              </div>

              {topLanguages.length ? (
                <div className="projectRepoLanguages">
                  <div className="projectRepoLanguageBar" aria-hidden="true">
                    {topLanguages.map((lang, index) => (
                      <span
                        key={lang.name}
                        className="projectRepoLanguageSegment"
                        style={{
                          width: `${lang.percent}%`,
                          backgroundColor: getLanguageColor(lang.name, index),
                        }}
                        title={`${lang.name} ${lang.percent.toFixed(1)}%`}
                      />
                    ))}
                  </div>

                  <div className="projectRepoLanguageList">
                    {topLanguages.map((lang, index) => (
                      <span
                        key={lang.name}
                        className="projectRepoLanguagePill"
                        style={{
                          backgroundColor: `${getLanguageColor(lang.name, index)}14`,
                          borderColor: `${getLanguageColor(lang.name, index)}33`,
                        }}
                      >
                        <span
                          className="projectRepoLanguageDot"
                          style={{
                            backgroundColor: getLanguageColor(lang.name, index),
                          }}
                        />
                        <span>
                          {lang.name} {Math.round(lang.percent)}%
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <p className="projectRepoExcerpt">
              Live repository details are not currently available for this
              project.
            </p>
          )}
        </div>

        {previewImage ? (
          <a
            href={projectHref ?? repoUrl}
            target="_blank"
            rel="noreferrer"
            className="projectSitePreviewLink"
            aria-label="Open project preview"
          >
            <div className="projectSitePreviewFrame">
              <Image
                src={previewImage}
                alt=""
                width={720}
                height={540}
                className="projectSitePreviewImage"
              />
            </div>
            <div className="projectSitePreviewCaption">Live preview</div>
          </a>
        ) : null}
      </div>
    </details>
  );
}