---
title: record-release - GitHub Action for Release Management
sidebar_label: Overview
description: Record deployments and releases to Groo Ops Dashboard. Automatic GitHub releases, version bumping, and multi-job workflow support.
keywords: [GitHub Action, release management, deployment tracking, version control, CI/CD]
---

# record-release

A GitHub Action to record deployments and releases to Groo Ops Dashboard.

## Features

- Record releases to Groo Ops Dashboard
- Automatically create GitHub releases
- Support for single-job and multi-job workflows
- Semantic version bumping (major, minor, patch)
- Upload release artifacts
- Custom release notes (inline or from file)
- Draft and prerelease support

## Quick Example

```yaml
- name: Record release
  id: release
  uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    bump: patch

- name: Build
  run: npm run build --version=${{ steps.release.outputs.version }}
```

## Prerequisites

Before using this action, you need:
1. A registered application in the Groo Ops Dashboard
2. An API token with write permissions

See [Prerequisites](./prerequisites) for setup instructions.
