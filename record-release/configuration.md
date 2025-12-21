---
title: record-release Configuration Reference
sidebar_label: Configuration
description: Complete reference for record-release inputs and outputs. Configure tokens, versions, environments, artifacts, and release options.
keywords: [record-release config, GitHub Action inputs, release outputs, workflow permissions]
---

# Configuration

Complete reference for record-release inputs and outputs.

## Inputs

### Authentication

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `token` | Groo Ops API token | Yes* | - |
| `secret-key` | Private key for decrypting secrets | No | - |
| `api-url` | Ops API base URL | No | `https://ops.groo.dev/v1` |
| `github-token` | GitHub token for releases | No | `${{ github.token }}` |

\* Not required for upload-only or config-only modes.

### Versioning

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `environment` | Target environment (production, staging, development) | No | - |
| `version` | Explicit version to record (e.g., `1.2.3`) | No | - |
| `bump` | Version bump type (major, minor, patch) | No | `patch` |
| `get-version` | Query current version without recording | No | `false` |
| `dry-run` | Enable multi-job mode (init phase) | No | `false` |

### GitHub Release

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `skip-github-release` | Skip creating GitHub release | No | `false` |
| `release-prefix` | Tag prefix for monorepos (e.g., `api` → `api-v1.0.0`) | No | - |
| `body` | Inline release notes | No | - |
| `body-file` | Path to release notes file | No | - |
| `artifacts` | Glob patterns for release assets (one per line) | No | - |
| `draft` | Create as draft release | No | `false` |
| `prerelease` | Mark as prerelease | No | `false` |

### Metadata

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `commit-hash` | Git commit SHA | No | `${{ github.sha }}` |
| `commit-message` | Commit message | No | From event |
| `deployed-by` | Deployer identifier | No | `github-actions` |

## Outputs

### Version Info

| Output | Description |
|--------|-------------|
| `version` | The version that was/will be recorded |
| `id` | Deployment record ID |

### Get-Version Mode

Available when using `get-version: true`:

| Output | Description |
|--------|-------------|
| `deployed-at` | Deployment timestamp |
| `commit-hash` | Commit hash of the deployment |

### Config Values

When using `secret-key`, all config values are available with the `config.` prefix:

| Output | Description |
|--------|-------------|
| `config.<KEY>` | Value of the config variable/secret |

Example:
```yaml
- uses: groo-dev/record-release@v1
  id: release
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    secret-key: ${{ secrets.OPS_SECRET_KEY }}
    environment: production

- run: echo ${{ steps.release.outputs.config.API_KEY }}
```

## Permissions

Your workflow needs these permissions:

```yaml
permissions:
  contents: write  # For creating GitHub releases and tags
```

## Operational Modes

The action automatically determines its mode based on inputs:

| Mode | Inputs | Behavior |
|------|--------|----------|
| **Single-job** | `token` + `environment` | Get version → build → record + release |
| **Init** | `token` + `environment` + `dry-run: true` | Get version, save session |
| **Finalize** | `token` (session exists) | Download session, record + release |
| **Config-only** | `secret-key` (session exists) | Decrypt and expose config |
| **Upload-only** | `artifacts` only | Upload artifacts for later jobs |
| **Get-version** | `token` + `get-version: true` | Query without recording |
| **Explicit** | `token` + `version` | Record specific version immediately |

## Environment Variables

These environment variables are set during the action:

| Variable | Description |
|----------|-------------|
| `RECORD_RELEASE_VERSION` | The recorded version |
| `RECORD_RELEASE_ID` | Deployment record ID |
