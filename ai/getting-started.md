# Getting Started

Set up Groo AI for your documentation in 5 minutes.

## Prerequisites

- A GitHub repository with documentation
- A Groo account at [accounts.groo.dev](https://accounts.groo.dev)

## 1. Create a Project

1. Go to the [Groo AI Dashboard](https://ai.groo.dev)
2. Click **New Project**
3. Enter a name for your project

## 2. Connect Your Repository

### Option A: Public Repository

Enter your repository URL directly:

```
https://github.com/your-org/your-docs
```

### Option B: Private Repository

1. Click **Connect GitHub**
2. Install the Groo GitHub App
3. Grant access to the repositories you want to index
4. Select your repository from the list

## 3. Configure Content Settings

| Setting | Description | Example |
|---------|-------------|---------|
| **Content Type** | How your docs are structured | `Markdown Site` or `Raw Files` |
| **Content Path** | Folder containing docs | `docs/` or `content/` |
| **Site URL** | Your documentation website | `https://docs.example.com` |
| **Exclude Patterns** | Files to skip | `**/node_modules/**` |

:::tip Framework Detection
Groo AI auto-detects common frameworks (Docusaurus, VitePress, etc.) and pre-fills sensible defaults.
:::

## 4. Trigger Indexing

1. Click **Create Project**
2. Groo AI will find the latest tag in your repository
3. Indexing starts automatically
4. Wait for status to show **Ready**

## 5. Test Your Setup

Once indexed, test in the dashboard:

1. Go to **Retrieval** tab - search for a topic
2. Go to **Chat** tab - ask a question

## 6. Integrate Into Your Site

### React SDK (Recommended)

```bash
npm install @groo.dev/ai-react
```

```tsx
import { Chat } from '@groo.dev/ai-react'

function App() {
  return <Chat apiKey="your-api-key" />
}
```

See [React SDK](/ai/react-sdk) for full documentation.

### REST API

Use the [API directly](/ai/api-reference) for custom integrations.

## Getting an API Key

1. Go to [accounts.groo.dev](https://accounts.groo.dev)
2. Navigate to **API Tokens**
3. Create a token with your project ID in `app_data`

```json
{
  "app_data": {
    "projectId": "your-project-id"
  }
}
```

## Keeping Docs Updated

Groo AI monitors your repository for new tags:

- **Automatic Detection**: Webhook notifies when a new tag is pushed
- **Manual Check**: Click "Check for Updates" in the dashboard
- **Re-index**: Click "Update" when a new version is available

## Next Steps

- [Dashboard Guide](/ai/dashboard) - Learn all dashboard features
- [React SDK](/ai/react-sdk) - Integrate chat into your site
- [API Reference](/ai/api-reference) - Build custom integrations
