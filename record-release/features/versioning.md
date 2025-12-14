# Versioning

record-release supports semantic version bumping and explicit version specification.

## Version Bumping

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

## Explicit Version

Specify an exact version:

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    version: 2.0.0
```

## Get Current Version

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
