---
title: record-release Configuration Reference
sidebar_label: Configuration
description: Complete reference for record-release inputs and outputs. Configure tokens, versions, environments, artifacts, and release options.
keywords: [record-release config, GitHub Action inputs, release outputs, workflow permissions]
---

# Configuration

Complete reference for record-release inputs and outputs.

## Inputs

| Input | Description | Required |
|-------|-------------|----------|
| `token` | Groo Ops API token | Yes (except upload-only) |
| `environment` | Target environment (production, staging, development) | No |
| `version` | Explicit version to record | No |
| `bump` | Version bump type (major, minor, patch) | No |
| `dry-run` | Enable multi-job mode (init phase) | No |
| `get-version` | Query current version without recording | No |
| `release-prefix` | Tag prefix for monorepos | No |
| `body` | Inline release notes | No |
| `body-file` | Path to release notes file | No |
| `artifacts` | Glob patterns for release assets | No |
| `draft` | Create as draft release | No |
| `prerelease` | Mark as prerelease | No |

## Outputs

| Output | Description |
|--------|-------------|
| `version` | The version that was/will be recorded |
| `id` | Deployment record ID |
| `deployed-at` | Deployment timestamp (get-version mode) |
| `commit-hash` | Commit hash (get-version mode) |

## Permissions

Your workflow needs these permissions:

```yaml
permissions:
  contents: write  # For creating GitHub releases and tags
```
