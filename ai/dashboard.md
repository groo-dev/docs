---
title: Groo AI Dashboard Guide
description: Manage AI projects, view indexed files, test search and chat, and configure settings in the Groo AI dashboard.
keywords: [Groo AI dashboard, project management, documentation indexing, AI configuration]
---

# Dashboard Guide

The Groo AI dashboard lets you manage projects, view indexed files, and test your AI assistant.

## Projects List

The main page shows all your projects with:

- **Name** - Project identifier
- **Status** - Current indexing state
- **Update Badge** - Shows when a new version is available
- **Last Indexed** - When the project was last indexed

### Project Statuses

| Status | Description |
|--------|-------------|
| `pending` | Project created, not yet indexed |
| `queued` | Waiting to start indexing |
| `indexing` | Currently processing files |
| `ready` | Indexed and ready to use |
| `error` | Indexing failed |
| `deleting` | Being removed |

## Project Detail

Click a project to see its details, organized into tabs:

### Overview Tab

Shows project health at a glance:

- **Status Card** - Current status with actions
- **Stats** - Files indexed, last tag, last indexed time
- **Repository Info** - Connected repo details

**Actions:**
- **Check for Updates** - Manually check for new tags
- **Re-index** - Trigger a fresh index
- **Cancel** - Stop an in-progress indexing job

**Update Banner** - When a new tag is detected, you'll see a banner offering to update.

### Files Tab

Browse all indexed files:

- **File List** - All processed files with status
- **Indexed Count** - Total successful files
- **Failed Count** - Files that couldn't be processed

For each file:
- Click to view original content
- See chunk count (how many vectors)
- Retry failed files individually

**Batch Actions:**
- **Retry All Failed** - Re-process all failed files

### Retrieval Tab

Test semantic search:

1. Enter a search query
2. Click **Search**
3. View results ranked by relevance

Each result shows:
- **Title** - Document title
- **URL** - Link to source
- **Snippet** - Relevant excerpt
- **Score** - Similarity score (0-1)

### Chat Tab

Test the AI assistant:

1. Type a question
2. See streaming response
3. Responses include source citations

Features:
- Real-time streaming
- Markdown rendering
- Inline source links
- Clear chat button

### Settings Tab

Configure your project:

#### General
- **Project Name** - Display name

#### Content Source
- **Repository URL** - GitHub repository
- **Branch** - Branch to index (default: main)
- **Project Root** - Monorepo subfolder path
- **Content Path** - Documentation folder

#### Site Configuration
- **Site URL** - Your docs website URL
- **Public Path** - Static assets path
- **Framework** - Detected framework

#### Indexing
- **Content Type** - `Markdown Site` or `Raw Files`
- **Exclude Patterns** - Glob patterns to skip

#### Danger Zone
- **Delete Project** - Permanently remove project and all indexed data

## Git Connections

Manage GitHub App connections:

1. Go to **Connections** page
2. View connected GitHub accounts
3. Install app on new accounts
4. Remove connections

## Best Practices

### Content Path
Point to your actual documentation folder, not the repo root:
- Docusaurus: `docs/`
- VitePress: `docs/` or `guide/`
- MkDocs: `docs/`

### Site URL
Set your production documentation URL for accurate source links:
```
https://docs.example.com
```

### Exclude Patterns
Skip generated or irrelevant files:
```
**/node_modules/**
**/.git/**
**/dist/**
**/*.test.md
```

### Updating Content
1. Push a new tag to your repository
2. Groo AI detects the new tag via webhook
3. Dashboard shows "Update Available"
4. Click "Update" to re-index with new content
