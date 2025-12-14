# GitHub Releases

record-release can automatically create GitHub releases with your deployments.

## Basic Usage

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

## Custom Release Notes

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

## Draft and Prerelease

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: staging
    bump: patch
    draft: true      # Create as draft
    prerelease: true # Mark as prerelease
```

## Tag Prefix (Monorepos)

For monorepos, use a tag prefix to namespace versions:

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    bump: patch
    release-prefix: api  # Creates tags like api-v1.0.0
```
