---
title: record-release Features
sidebar_label: Features
description: Semantic versioning, release artifacts, GitHub releases, and encrypted secrets with record-release. Version bumping, artifact uploads, and secure config management.
keywords: [semantic versioning, release artifacts, GitHub releases, version bumping, encrypted secrets, config management]
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

## Secrets & Variables

Store environment-specific secrets and variables in the Groo Ops Dashboard with end-to-end encryption.

### How It Works

1. **Secrets are encrypted in your browser** before being sent to the server
2. **Each environment has its own encryption key** (production, staging, development)
3. **Only your workflow can decrypt** - the server never sees plaintext values
4. **Secrets are automatically masked** in GitHub Actions logs

### Setup

1. Go to [ops.groo.dev](https://ops.groo.dev) → Your Application → **Config**
2. Select an environment (e.g., Production)
3. Click **Enable Secrets**
4. **Copy the private key** - this is shown only once
5. Add the key as a GitHub secret (e.g., `OPS_SECRET_KEY_PRODUCTION`)

### Using Secrets in Workflows

Provide the `secret-key` input to decrypt secrets:

```yaml
- uses: groo-dev/record-release@v1
  id: release
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    secret-key: ${{ secrets.OPS_SECRET_KEY_PRODUCTION }}
    environment: production
    bump: patch

- name: Deploy
  run: npm publish
  env:
    NPM_TOKEN: ${{ steps.release.outputs.config.NPM_TOKEN }}
```

### Accessing Config Values

All config values (secrets and variables) are available as outputs with the `config.` prefix:

```yaml
steps:
  - uses: groo-dev/record-release@v1
    id: release
    with:
      token: ${{ secrets.OPS_API_TOKEN }}
      secret-key: ${{ secrets.OPS_SECRET_KEY }}
      environment: production

  - name: Use secrets
    run: |
      echo "Deploying to ${{ steps.release.outputs.config.DEPLOY_URL }}"
    env:
      API_KEY: ${{ steps.release.outputs.config.API_KEY }}
      DATABASE_URL: ${{ steps.release.outputs.config.DATABASE_URL }}
```

### Multi-Job Workflows with Secrets

In multi-job workflows, fetch secrets in the init job:

```yaml
jobs:
  init:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.release.outputs.version }}
      npm-token: ${{ steps.release.outputs.config.NPM_TOKEN }}
    steps:
      - uses: groo-dev/record-release@v1
        id: release
        with:
          token: ${{ secrets.OPS_API_TOKEN }}
          secret-key: ${{ secrets.OPS_SECRET_KEY }}
          environment: production
          dry-run: true

  build:
    needs: init
    runs-on: ubuntu-latest
    steps:
      - run: npm publish
        env:
          NPM_TOKEN: ${{ needs.init.outputs.npm-token }}

  finalize:
    needs: [init, build]
    runs-on: ubuntu-latest
    steps:
      - uses: groo-dev/record-release@v1
        with:
          token: ${{ secrets.OPS_API_TOKEN }}
```

### Variables vs Secrets

| Type | Encrypted | Use Case |
|------|-----------|----------|
| **Variables** | No | Public config like URLs, feature flags |
| **Secrets** | Yes | API keys, tokens, passwords |

Both are accessed the same way via `config.*` outputs.

### Security Notes

- Private keys are generated in your browser and never sent to the server
- Secrets use hybrid encryption (RSA-OAEP + AES-256-GCM)
- Each environment can have its own encryption key
- Decryption only happens in your GitHub Actions workflow
- Secrets are automatically masked in logs via `core.setSecret()`
