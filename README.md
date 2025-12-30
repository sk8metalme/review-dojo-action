# Review-Dojo Action

A GitHub Action for collecting PR review knowledge using AI-powered analysis.

## Overview

This action automatically collects knowledge from resolved PR review comments using Claude AI, and organizes them into a structured knowledge repository. It enables teams to build a searchable database of review insights that can be reused across projects.

## Features

- Automatically extracts knowledge from resolved PR review threads
- AI-powered categorization and summarization
- Skips private repositories (public repos only)
- Retry logic for reliability
- Organized by category and language

## Usage

### Prerequisites

1. **Secrets Required:**
   - `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude
   - `ORG_GITHUB_TOKEN`: GitHub token with `repo` and `read:org` permissions

2. **Knowledge Repository Setup:**
   - Create a public repository to store knowledge (e.g., `your-org/knowledge-repo`)
   - Initialize with category directories: `security/`, `performance/`, `readability/`, `design/`, `testing/`, `error-handling/`, `other/`

### Basic Example

```yaml
name: Collect Review Knowledge

on:
  repository_dispatch:
    types: [pr-merged]

jobs:
  collect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.KNOWLEDGE_REPO_TOKEN }}
          fetch-depth: 0

      - uses: sk8metalme/review-dojo-action@v1
        id: collect
        with:
          anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
          github-token: ${{ secrets.ORG_GITHUB_TOKEN }}
          pr-url: ${{ github.event.client_payload.pr_url }}
          repo-owner: ${{ github.event.client_payload.repo_owner }}
          repo-name: ${{ github.event.client_payload.repo_name }}
          pr-number: ${{ github.event.client_payload.pr_number }}

      - name: Commit and push changes
        if: steps.collect.outputs.knowledge-collected == 'true'
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add -A
          git commit -m "Add knowledge from ${{ github.event.client_payload.pr_url }}"
          git push
```

### Triggering from Source Repositories

In your source repositories, add this workflow to trigger knowledge collection when PRs are merged:

```yaml
name: Trigger Knowledge Collection

on:
  pull_request:
    types: [closed]

jobs:
  trigger:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.ORG_GITHUB_TOKEN }}
          repository: your-org/knowledge-repo
          event-type: pr-merged
          client-payload: |
            {
              "pr_url": "${{ github.event.pull_request.html_url }}",
              "repo_owner": "${{ github.repository_owner }}",
              "repo_name": "${{ github.event.repository.name }}",
              "pr_number": "${{ github.event.pull_request.number }}"
            }
```

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| `anthropic-api-key` | Yes | Anthropic API key for Claude Code |
| `github-token` | Yes | GitHub token for API access |
| `pr-url` | Yes | PR URL to analyze |
| `repo-owner` | Yes | Repository owner |
| `repo-name` | Yes | Repository name |
| `pr-number` | Yes | PR number |

## Outputs

| Output | Description |
|--------|-------------|
| `knowledge-collected` | Whether knowledge was collected (`true` or `false`) |
| `knowledge-file` | Path to the generated `knowledge.json` |

## How It Works

1. **Repository Check**: Verifies the repository is public (skips private repos)
2. **Thread Analysis**: Counts resolved review threads (skips if none found)
3. **AI Extraction**: Uses Claude to analyze review comments and extract knowledge
4. **Categorization**: Organizes knowledge by category (security, performance, etc.) and language (Java, Python, etc.)
5. **Markdown Generation**: Creates/updates markdown files in the knowledge repository

## Knowledge Structure

Knowledge is organized in the following directory structure:

```
knowledge-repo/
├── security/
│   ├── java.md
│   ├── python.md
│   └── nodejs.md
├── performance/
│   ├── java.md
│   └── nodejs.md
├── readability/
├── design/
├── testing/
├── error-handling/
└── other/
```

Each knowledge item includes:
- **Category**: Type of knowledge (security, performance, etc.)
- **Language**: Programming language
- **Severity**: Critical, warning, or info
- **Title**: Brief description
- **Summary**: Detailed explanation
- **Recommendation**: Best practice guidance
- **Code Example**: Before/after code snippets
- **PR Reference**: Link to source PR

## Limitations

- Only processes public repositories (private repos are skipped)
- Requires at least 1 resolved review thread
- Maximum 100 review threads per PR (GitHub API limitation)
- Requires Claude API access

## Troubleshooting

### No knowledge collected

- Check if the repository is public
- Verify there are resolved review threads in the PR
- Ensure `ANTHROPIC_API_KEY` is valid

### API rate limits

The action includes retry logic with exponential backoff. If you encounter rate limits frequently, consider:
- Reducing the frequency of PR merges
- Using a GitHub token with higher rate limits

## Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/sk8metalme/review-dojo-action.git
cd review-dojo-action
npm install
npm run build
```

### Architecture

This action includes its own TypeScript source code:

```text
src/
├── domain/           # Domain models (KnowledgeItem, Category, Language, etc.)
├── application/      # Use cases (ApplyKnowledgeUseCase)
│   ├── use-cases/    # Application use cases
│   └── ports/        # Port interfaces
├── infrastructure/   # Implementations (FileSystemKnowledgeRepository, MarkdownSerializer)
└── index.ts          # Entry point
```

### Build

The build process uses esbuild to create a single bundled file:

```bash
npm run build
# Outputs: dist/index.js (28KB)
```

### Testing Locally

```bash
# Create a sample knowledge.json
cat > knowledge.json << 'EOF'
{
  "knowledge_items": [
    {
      "category": "security",
      "language": "java",
      "severity": "critical",
      "title": "Test Knowledge",
      "summary": "Test summary",
      "recommendation": "Test recommendation"
    }
  ]
}
EOF

# Run the apply command
node dist/index.js knowledge.json
```

## License

MIT

## Related

- [Review-Dojo](https://github.com/sk8metalme/review-dojo): The main review knowledge system
- [Integration Guide](https://github.com/sk8metalme/review-dojo/blob/main/docs/integration-guide.md): Detailed setup instructions
