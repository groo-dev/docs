# Examples

Common workflow patterns for record-release.

## Basic Deploy

```yaml
name: Deploy
on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: groo-dev/record-release@v1
        id: release
        with:
          token: ${{ secrets.OPS_API_TOKEN }}
          environment: production
          bump: patch

      - run: npm ci && npm run build
      - run: npm run deploy
```

## Staging + Production

```yaml
name: Deploy

on:
  push:
    branches:
      - main      # → production
      - develop   # → staging

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: groo-dev/record-release@v1
        with:
          token: ${{ secrets.OPS_API_TOKEN }}
          environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
          bump: ${{ github.ref == 'refs/heads/main' && 'minor' || 'patch' }}
          prerelease: ${{ github.ref != 'refs/heads/main' }}
```

## Monorepo

```yaml
name: Deploy API

on:
  push:
    branches: [main]
    paths: ['api/**']

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: groo-dev/record-release@v1
        with:
          token: ${{ secrets.OPS_API_TOKEN }}
          environment: production
          bump: patch
          release-prefix: api  # Tags: api-v1.0.0, api-v1.0.1, etc.
```

## With Changelog

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    bump: minor
    body-file: CHANGELOG.md
```
