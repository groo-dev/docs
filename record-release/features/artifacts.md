---
title: Release Artifacts with record-release
description: Upload build artifacts to GitHub releases. Support for single job, multi-job workflows, and parallel builds.
keywords: [release artifacts, GitHub releases, build uploads, parallel builds]
---

# Release Artifacts

Upload build artifacts to your GitHub releases.

## Single Job

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

## Multi-Job Workflows

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

## Parallel Build Jobs

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
