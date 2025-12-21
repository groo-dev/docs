---
title: record-release Prerequisites
sidebar_label: Prerequisites
description: Set up your application in Groo Ops Dashboard before using record-release. Register your app and create an API token.
keywords: [record-release setup, Groo Ops setup, prerequisites, API token setup]
---

# Prerequisites

Before using record-release, you need to set up your application in the Groo Ops Dashboard.

## What You Need

1. **A Groo Ops account** - Access to [ops.groo.dev](https://ops.groo.dev)
2. **A registered application** - Your app must be registered in the dashboard
3. **An API token** - A token with write permissions for recording deployments

## Register Your Application

Register your application in the Groo Ops Dashboard to track deployments.

1. Go to [ops.groo.dev](https://ops.groo.dev)
2. Sign in with your Groo account
3. Click **"New Application"**
4. Enter your application details:
   - **Name**: A unique identifier (e.g., `my-app`)
   - **Description**: Optional description
5. Click **"Create"**

### Initial Versions (Optional)

When creating an application, you can optionally set initial versions for each environment:

- Production: e.g., `1.0.0`
- Staging: e.g., `0.5.0`

This is useful if you're migrating from another system and want to continue from an existing version number.

## Create an API Token

Create an API token to authenticate the record-release action with the Ops Dashboard.

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

## Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `OPS_API_TOKEN`
5. Value: Paste your token
6. Click **"Add secret"**

Reference the secret in your workflow:

```yaml
- uses: groo-dev/record-release@v1
  with:
    token: ${{ secrets.OPS_API_TOKEN }}
    environment: production
    bump: patch
```
