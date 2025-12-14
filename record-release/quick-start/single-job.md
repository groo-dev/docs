# Single Job Workflow

The simplest way to use record-release. The action automatically records the release after your job completes successfully.

## Example

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

## How It Works

1. Action runs at the start of your job
2. Queries the next version from Ops Dashboard
3. Outputs the version for use in build steps
4. Registers a post-job hook
5. After job success, records the deployment and creates GitHub release
