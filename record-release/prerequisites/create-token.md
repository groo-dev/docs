---
title: Create an API Token for record-release
description: Create an API token to authenticate record-release with Groo Ops Dashboard. Add the token to GitHub secrets for secure access.
keywords: [API token, GitHub secrets, Groo Ops authentication, record-release token]
---

# Create an API Token

Create an API token to authenticate the record-release action with the Ops Dashboard.

## Steps

1. Go to [ops.groo.dev](https://ops.groo.dev)
2. Navigate to your application
3. Click **"Tokens"** tab
4. Click **"Create Token"**
5. Select permission level:
   - **Read**: Can only query version information
   - **Write**: Can record deployments and query versions
6. Copy the generated token (starts with `groo_`)

:::warning Save Your Token
The token is only shown once. Make sure to copy it before closing the dialog.
:::

## Add to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `OPS_API_TOKEN`
5. Value: Paste your token
6. Click **"Add secret"**

## Using the Token

Reference the secret in your workflow:

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    bump: patch
```
