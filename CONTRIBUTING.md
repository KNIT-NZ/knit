# Contributing to KNIT website

Contributions are welcome through [issues](https://github.com/KNIT-NZ/knit/issues) and pull requests. For substantial changes, discuss the purpose, scope and design before implementation. Keep changes focused and explain their expected effect.

## Development

Use a supported Node.js version compatible with the project (the initial CI baseline is Node.js 24) and npm. Install locked dependencies with `npm ci`. Consult the README, package scripts and repository configuration for project-specific instructions. Use local or synthetic data and appropriate test credentials; do not use production credentials, live databases or real user queries in tests or submissions. Never commit environment files, tokens, private logs or other secrets.

Before submitting a pull request, run the applicable checks defined in `.github/workflows/ci.yml`. Explain what was tested, what was not tested and any remaining limitations. Include appropriate regression coverage or reproducible evidence for behavioural changes. Keep dependency and lockfile changes intentional.

## Rights and attribution

Only submit material you have the right to contribute. Original software contributions are governed by the [Apache License 2.0](LICENSE), including its contribution terms, unless explicitly agreed otherwise. See [LICENSE-SCOPE.md](LICENSE-SCOPE.md) for separately governed material. Preserve required third-party notices and attribution. Do not submit protected content, personal data or culturally significant material without appropriate permissions. Disclose relevant provenance and licence obligations, including for tool-assisted contributions; contributors remain responsible for reviewing their submissions.

Be constructive and respectful. Use [SECURITY.md](SECURITY.md) for sensitive vulnerability reports.

## Editorial content

Changes to published essays, research and project descriptions require particular attention to accuracy, provenance, editorial intent and applicable rights. Do not assume the software licence applies to editorial material or branding.
