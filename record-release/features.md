---
title: record-release Features
sidebar_label: Features
description: Semantic versioning, release artifacts, and GitHub releases with record-release. Version bumping, artifact uploads, and release notes.
keywords: [semantic versioning, release artifacts, GitHub releases, version bumping]
---

# Features

## Versioning

record-release supports semantic version bumping and explicit version specification.

### Version Bumping

Automatically increment from the last deployed version:

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    bump: patch  # or: minor, major
```

| Bump | Example |
|------|---------|
| `patch` | 1.0.0 → 1.0.1 |
| `minor` | 1.0.0 → 1.1.0 |
| `major` | 1.0.0 → 2.0.0 |

### Explicit Version

Specify an exact version:

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    version: 2.0.0
```

### Get Current Version

Query the current deployed version without recording:

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    get-version: true
```

Outputs:
- `version`: Current version
- `deployed-at`: Deployment timestamp
- `commit-hash`: Commit hash

## Release Artifacts

Upload build artifacts to your GitHub releases.

### Single Job

Specify glob patterns to include in the release:

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    bump: patch
    artifacts: |
      dist/*.zip
      dist/*.tar.gz
```

### Multi-Job Workflows

Artifacts are automatically transferred between jobs:

```yaml
jobs:
  build:
    steps:
      - name: Build
        run: npm run build  # Creates dist/app.zip

      - uses: groo-dev/record-release@v1
        with:
          token: ${{ secrets.OPS_API_TOKEN }}
          environment: production
          dry-run: true
          artifacts: dist/*.zip  # Uploaded to GitHub artifacts

  deploy:
    needs: build
    steps:
      - uses: groo-dev/record-release@v1
        with:
          token: ${{ secrets.OPS_API_TOKEN }}
          # Automatically downloads and attaches artifacts from build job
```

### Parallel Build Jobs

For parallel builds, use upload-only mode:

```yaml
jobs:
  build-linux:
    steps:
      - run: npm run build:linux
      - uses: groo-dev/record-release@v1
        with:
          artifacts: dist/linux-*.tar.gz

  build-windows:
    steps:
      - run: npm run build:windows
      - uses: groo-dev/record-release@v1
        with:
          artifacts: dist/windows-*.zip

  finalize:
    needs: [build-linux, build-windows]
    steps:
      - uses: groo-dev/record-release@v1
        with:
          token: ${{ secrets.OPS_API_TOKEN }}
          # Collects and deduplicates artifacts from all jobs
```

## GitHub Releases

record-release can automatically create GitHub releases with your deployments.

### Basic Usage

GitHub releases are created automatically when recording a deployment:

```yaml
permissions:
  contents: write  # Required

- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    bump: patch
```

### Custom Release Notes

Inline notes:

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    bump: patch
    body: |
      ## What's New
      - Feature A
      - Bug fix B
```

From a file:

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    bump: patch
    body-file: CHANGELOG.md
```

### Draft and Prerelease

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: staging
    bump: patch
    draft: true      # Create as draft
    prerelease: true # Mark as prerelease
```

### Tag Prefix (Monorepos)

For monorepos, use a tag prefix to namespace versions:

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    bump: patch
    release-prefix: api  # Creates tags like api-v1.0.0
```
