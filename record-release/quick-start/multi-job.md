---
title: Multi-Job Workflow with record-release
description: Build and deploy with separate jobs using record-release. Session and artifacts are automatically transferred between jobs.
keywords: [multi-job workflow, build deploy workflow, job artifacts, workflow orchestration]
---

# Multi-Job Workflow

For workflows with separate build and deploy jobs. Session and artifacts are automatically transferred between jobs.

## Example

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

## How It Works

1. **Init job** (`dry-run: true`): Gets version, saves session to GitHub artifacts
2. **Build job**: Creates build artifacts
3. **Finalize job** (token only): Downloads session, records deployment, uploads artifacts to release
