// lib/github.ts
type RepoRef = {
  owner: string;
  name: string;
};

export type RepoPreview = {
  fullName: string;
  description: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  pushedAt: string | null;
  defaultBranch: string;
  languages: Array<{ name: string; bytes: number; percent: number }>;
  readmeExcerpt: string | null;
};

const GITHUB_API = "https://api.github.com";

function getHeaders() {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function stripMarkdown(input: string) {
  return input
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`{1,3}[^`]+`{1,3}/g, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_{1,2}([^_]+)_{1,2}/g, "$1")
    .replace(/\r/g, "")
    .trim();
}

function makeExcerpt(raw: string, maxLength = 360) {
  const cleaned = stripMarkdown(raw)
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();

  if (!cleaned) return null;

  const paragraphs = cleaned
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => p.length > 80);

  const candidate = paragraphs[0] ?? cleaned;

  if (candidate.length <= maxLength) return candidate;

  const slice = candidate.slice(0, maxLength);
  const lastSentence = Math.max(
    slice.lastIndexOf(". "),
    slice.lastIndexOf("? "),
    slice.lastIndexOf("! ")
  );
  const lastBreak = Math.max(lastSentence, slice.lastIndexOf(" "));
  return `${slice.slice(0, lastBreak > 180 ? lastBreak : maxLength).trim()}…`;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error(`GitHub request failed: ${res.status} ${url}`);
  }

  return res.json();
}

export async function getRepoPreview(repo: RepoRef): Promise<RepoPreview | null> {
  try {
    const [repoData, languageData, readmeData] = await Promise.all([
      fetchJson<{
        full_name: string;
        description: string | null;
        stargazers_count: number;
        forks_count: number;
        open_issues_count: number;
        pushed_at: string | null;
        default_branch: string;
      }>(`${GITHUB_API}/repos/${repo.owner}/${repo.name}`),

      fetchJson<Record<string, number>>(
        `${GITHUB_API}/repos/${repo.owner}/${repo.name}/languages`
      ),

      fetch(`${GITHUB_API}/repos/${repo.owner}/${repo.name}/readme`, {
        headers: {
          ...getHeaders(),
          Accept: "application/vnd.github.raw+json",
        },
        next: { revalidate: 1800 },
      }).then(async (res) => (res.ok ? res.text() : null)),
    ]);

    const totalBytes = Object.values(languageData).reduce((sum, value) => sum + value, 0);

    const languages = Object.entries(languageData)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percent: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0,
      }))
      .sort((a, b) => b.bytes - a.bytes);

    return {
      fullName: repoData.full_name,
      description: repoData.description,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      openIssues: repoData.open_issues_count,
      pushedAt: repoData.pushed_at,
      defaultBranch: repoData.default_branch,
      languages,
      readmeExcerpt: readmeData ? makeExcerpt(readmeData) : null,
    };
  } catch {
    return null;
  }
}