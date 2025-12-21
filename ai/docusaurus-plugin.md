---
title: Docusaurus Plugin - @groo.dev/ai-docusaurus
sidebar_label: Docusaurus Plugin
description: Add an AI-powered sidebar to your Docusaurus docs site with search and chat. Drop-in installation with minimal configuration.
keywords: [Docusaurus plugin, AI sidebar, documentation chat, Docusaurus AI, docs search]
---

# Docusaurus Plugin

Add an AI-powered sidebar to your Docusaurus documentation site with `@groo.dev/ai-docusaurus`.

## Installation

```bash
npm install @groo.dev/ai-docusaurus
```

## Setup

Add the plugin to your `docusaurus.config.js`:

```js
module.exports = {
  plugins: [
    [
      '@groo.dev/ai-docusaurus',
      {
        projectId: 'your-project-id',
        auth: {
          accountsUrl: 'https://accounts.groo.dev',
          clientId: 'your-client-id',
        },
      },
    ],
  ],
}
```

That's it! Your docs site now has an AI sidebar with search and chat.

## Configuration

### Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `projectId` | `string` | Yes | Your Groo AI project ID |
| `apiUrl` | `string` | No | Custom API URL (default: `https://ai.groo.dev`) |
| `auth.accountsUrl` | `string` | Yes | Groo accounts URL for authentication |
| `auth.clientId` | `string` | Yes | Your OAuth client ID |

### Example with Custom API URL

```js
module.exports = {
  plugins: [
    [
      '@groo.dev/ai-docusaurus',
      {
        projectId: 'proj_abc123',
        apiUrl: 'https://custom-ai.example.com',
        auth: {
          accountsUrl: 'https://accounts.groo.dev',
          clientId: 'client_xyz',
        },
      },
    ],
  ],
}
```

## Features

The plugin adds a sidebar to your documentation with:

- **Search Tab** - Semantic search across your indexed documentation
- **Chat Tab** - AI chat with streaming responses and source citations
- **Authentication** - Users sign in with their Groo account
- **Responsive Design** - Works with Docusaurus themes

## How It Works

1. The plugin wraps your Docusaurus site with the `AIProvider`
2. A sidebar is added to every page with search and chat tabs
3. Users must sign in to use the AI features
4. The AI uses your indexed documentation to answer questions

## Styling

The plugin includes default styles. You can customize the appearance by overriding CSS classes:

```css
/* Sidebar layout */
.groo-layout { }
.groo-main { }
.groo-sidebar { }

/* Tabs */
.groo-tabs { }
.groo-tab { }
.groo-tab-active { }

/* Content */
.groo-sidebar-content { }
.groo-loading { }
.groo-login-prompt { }
.groo-login-button { }
```

### Example: Custom Sidebar Width

```css
/* In your custom.css */
.groo-sidebar {
  width: 350px;
}

.groo-main {
  margin-right: 350px;
}
```

## Requirements

- Docusaurus 3.0 or later
- React 18.0 or later
- A Groo AI project with indexed documentation

## Getting Your Credentials

1. Go to the [Groo AI Dashboard](https://ai.groo.dev)
2. Create a project and connect your GitHub repository
3. Wait for indexing to complete
4. Copy your project ID from the project settings
5. Create an OAuth client in [Groo Accounts](https://accounts.groo.dev)
6. Use the client ID in your configuration

## Troubleshooting

### "Missing projectId or auth configuration"

Ensure all required options are provided in `docusaurus.config.js`:

```js
{
  projectId: 'your-project-id',  // Required
  auth: {
    accountsUrl: 'https://accounts.groo.dev',  // Required
    clientId: 'your-client-id',  // Required
  },
}
```

### Sidebar not appearing

Make sure the plugin is correctly added to the `plugins` array in your config. The plugin name must be `'@groo.dev/ai-docusaurus'`.

### Authentication issues

- Verify your `clientId` is correct
- Check that your OAuth redirect URIs include your docs site URL
- Ensure cookies are enabled in the browser
