---
title: Personal Access Tokens (PAT)
sidebar_label: Personal Access Tokens
description: Create and use Personal Access Tokens for API authentication. Use PATs for CI/CD pipelines, automation scripts, and programmatic access.
keywords: [personal access tokens, PAT, API authentication, CI/CD, automation]
---

# Personal Access Tokens

Personal Access Tokens (PATs) allow you to authenticate with Groo APIs without a browser session. Use PATs for:

- CI/CD pipelines (GitHub Actions, etc.)
- Automation scripts
- CLI tools
- Programmatic API access

## Creating a PAT

1. Go to [accounts.groo.dev](https://accounts.groo.dev)
2. Click your profile menu → **Settings**
3. Navigate to **Personal Access Tokens**
4. Click **Create Token**
5. Enter a name (e.g., "GitHub Actions", "Build Script")
6. Optionally set an expiration date
7. Click **Create**
8. **Copy the token immediately** - it won't be shown again

:::warning Save Your Token
The token is only shown once. Store it securely before closing the dialog.
:::

## Token Format

PAT tokens start with `groo_pat_` followed by a 64-character hex string:

```
groo_pat_23e370cfd3e455284bcb61f17bd71acd529b0d2c608680a5b40c97138bfec183
```

## Using PATs

### In Environment Variables

Store your PAT in an environment variable:

```bash
export GROO_PAT=groo_pat_xxx...
```

### In GitHub Actions

Add your PAT as a repository secret:

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `GROO_PAT`
4. Value: Your PAT token
5. Click **Add secret**

Use it in your workflow:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Fetch data from API
        run: |
          curl https://api.example.com/v1/data \
            -H "Cookie: session=${{ secrets.GROO_PAT }}"
```

### In API Requests

PATs work the same as session cookies. Pass the token in the `session` cookie:

```bash
curl https://api.example.com/v1/me \
  -H "Cookie: session=groo_pat_xxx..."
```

Or using fetch:

```typescript
const response = await fetch('https://api.example.com/v1/me', {
  headers: {
    Cookie: `session=${process.env.GROO_PAT}`,
  },
})
```

## PATs vs Application API Tokens

| Feature | Personal Access Token | Application API Token |
|---------|----------------------|----------------------|
| Created by | User | Application owner |
| Scope | User's permissions across all apps | Single application |
| Use case | User automation, scripts | M2M, webhooks, CI/CD |
| Location | Account Settings | Application Tokens tab |
| Format | `groo_pat_xxx` | `groo_xxx` |

**Use PAT when:**
- You need to act as yourself across multiple applications
- Running personal scripts or CLI tools
- Accessing user-specific data

**Use Application API Token when:**
- Building service-to-service integrations
- Recording deployments (record-release)
- Processing webhooks

## Managing Tokens

### View Tokens

Go to **Account Settings** → **Personal Access Tokens** to see all your tokens.

Each token shows:
- Name
- Last 4 characters (for identification)
- Created date
- Last used date
- Expiration status

### Revoke a Token

1. Go to **Account Settings** → **Personal Access Tokens**
2. Find the token to revoke
3. Click **Revoke**
4. Confirm the action

Revoked tokens are immediately invalidated.

## Best Practices

1. **Use descriptive names:** Name tokens by their purpose (e.g., "GitHub Actions - docs build")

2. **Set expiration dates:** Use short-lived tokens when possible

3. **Rotate regularly:** Replace long-lived tokens periodically

4. **One token per use case:** Create separate tokens for different scripts/pipelines

5. **Never commit tokens:** Use environment variables or secrets managers

6. **Revoke unused tokens:** Delete tokens you no longer need

## Example: Fetching Versions in CI

This example fetches application versions during a docs build:

```yaml
name: Build Docs

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build
        run: npm run build
        env:
          GROO_PAT: ${{ secrets.GROO_PAT }}
```

The build script uses the PAT to fetch versions:

```typescript
const response = await fetch('https://ops.groo.dev/v1/versions', {
  headers: {
    Cookie: `session=${process.env.GROO_PAT}`,
  },
})
const { versions } = await response.json()
```
