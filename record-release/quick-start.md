---
title: Quick Start with record-release
sidebar_label: Quick Start
description: Get started with record-release GitHub Action. Single job and multi-job workflow examples for automatic release recording.
keywords: [quick start, GitHub Actions deploy, automatic release, workflow examples]
---

# Quick Start

Choose the workflow pattern that fits your CI/CD setup.

## Single Job Workflow

The simplest way to use record-release. The action automatically records the release after your job completes successfully.

```yaml
name: Deploy

on:
  push:
    branches: [main]

permissions:
  contents: write  # Required for creating GitHub releases

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Record release
        id: release
        uses: groo-dev/record-release@v1
        with:
          token: ${{ secrets.OPS_API_TOKEN }}
          environment: production
          bump: patch

      - name: Build
        run: |
          echo "Building version ${{ steps.release.outputs.version }}"
          npm version ${{ steps.release.outputs.version }} --no-git-tag-version
          npm run build

      - name: Deploy
        run: |
          # Your deploy commands here

      # Release is automatically recorded after job succeeds!
```

### How It Works

1. Action runs at the start of your job
2. Queries the next version from Ops Dashboard
3. Outputs the version for use in build steps
4. Registers a post-job hook
5. After job success, records the deployment and creates GitHub release

## Multi-Job Workflow

For workflows with separate build and deploy jobs. Session and artifacts are automatically transferred between jobs.

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.release.outputs.version }}
    steps:
      - uses: actions/checkout@v4

      - name: Get version
        id: release
        uses: groo-dev/record-release@v1
        with:
          token: ${{ secrets.OPS_API_TOKEN }}
          environment: production
          dry-run: true
          artifacts: dist/*.zip

      - name: Build
        run: npm run build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: echo "Deploying version ${{ needs.build.outputs.version }}"

      - name: Finalize release
        uses: groo-dev/record-release@v1
        with:
          token: ${{ secrets.OPS_API_TOKEN }}
```

### How It Works

1. **Init job** (`dry-run: true`): Gets version, saves session to GitHub artifacts
2. **Build job**: Creates build artifacts
3. **Finalize job** (token only): Downloads session, records deployment, uploads artifacts to release
