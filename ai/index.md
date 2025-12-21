---
title: Groo AI - AI Assistant for Documentation
sidebar_label: Overview
description: Add an AI-powered chat assistant to your documentation. Hybrid search, RAG chat with citations, React SDK, and OpenAI-compatible API.
keywords: [AI documentation, RAG chat, hybrid search, documentation assistant, AI SDK]
---

# Groo AI

Add an AI assistant to your documentation that answers questions with accurate, cited responses.

## What is Groo AI?

Groo AI indexes your documentation from GitHub and provides:

- **Semantic Search** - Find relevant content based on meaning, not just keywords
- **RAG Chat** - AI answers with inline source citations
- **React SDK** - Drop-in chat widget for your website
- **OpenAI-Compatible API** - Use any OpenAI SDK client

## How It Works

```
Your Docs (GitHub) → Index → Vector Database → AI Chat with Sources
```

1. **Connect** your GitHub repository
2. **Index** your documentation (triggered on new tags)
3. **Integrate** the chat widget or API into your site
4. **Users ask questions** and get answers with source links

## Quick Example

```tsx
import { AIProvider, GrooChat } from '@groo.dev/ai-react'

function App() {
  return (
    <AIProvider
      projectId="your-project-id"
      auth={{
        accountsUrl: 'https://accounts.groo.dev',
        clientId: 'your-client-id',
      }}
    >
      <GrooChat />
    </AIProvider>
  )
}
```

Users get responses like:

> To set up authentication, [install the auth-react package](https://docs.example.com/auth) and [wrap your app with AuthProvider](https://docs.example.com/provider).
>
> **Sources:**
> - [Getting Started](https://docs.example.com/auth)
> - [AuthProvider](https://docs.example.com/provider)

## Features

| Feature | Description |
|---------|-------------|
| GitHub Integration | Index from public or private repos |
| Tag-Based Updates | Automatically detect new releases |
| Framework Detection | Auto-configure for Docusaurus, VitePress, etc. |
| OpenAI Compatible | Works with any OpenAI SDK |
| Streaming Responses | Real-time chat experience |
| Source Citations | Every answer includes links to docs |

## Getting Started

1. [Create a project](/ai/getting-started) in the Groo AI dashboard
2. Connect your GitHub repository
3. Wait for indexing to complete
4. Integrate using one of our SDKs:
   - [React SDK](/ai/react-sdk) - Components and hooks for React apps
   - [Docusaurus Plugin](/ai/docusaurus-plugin) - Drop-in sidebar for Docusaurus sites
   - [Core SDK](/ai/core-sdk) - Low-level client for any JavaScript environment
   - [REST API](/ai/api-reference) - Direct API access
