---
title: Groo AI API Reference
sidebar_label: API Reference
description: OpenAI-compatible REST API for chat completions and hybrid search. Includes authentication, endpoints, error handling, and SDK examples.
keywords: [Groo AI API, OpenAI compatible API, chat completions, search API, REST API]
---

# API Reference

Groo AI provides an OpenAI-compatible API for chat and semantic search.

## Base URL

```
https://ai.groo.dev/v1
```

## Authentication

All API requests require an API token in the `Authorization` header:

```
Authorization: Bearer your-api-token
```

### Creating API Tokens

1. Go to [accounts.groo.dev](https://accounts.groo.dev)
2. Navigate to **API Tokens**
3. Create a token with your project ID:

```json
{
  "app_data": {
    "projectId": "your-project-id"
  }
}
```

:::warning Project ID Required
The `projectId` in `app_data` determines which project's indexed content is used. Without it, requests will fail.
:::

## Endpoints

### Chat Completions

Create an AI response based on your indexed documentation.

```
POST /v1/chat/completions
```

**Request Body:**

```json
{
  "model": "anthropic/claude-sonnet-4-20250514",
  "messages": [
    { "role": "user", "content": "How do I set up authentication?" }
  ],
  "stream": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `model` | string | No | Model identifier (default: `anthropic/claude-sonnet-4-20250514`) |
| `messages` | array | Yes | Array of message objects |
| `stream` | boolean | No | Enable streaming (default: `true`) |

**Response (streaming):**

```
data: {"choices":[{"delta":{"content":"To set"}}]}
data: {"choices":[{"delta":{"content":" up auth"}}]}
...
data: [DONE]
```

**Response (non-streaming):**

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "To set up authentication, [install the auth package](https://docs.example.com/auth)..."
      }
    }
  ]
}
```

### Semantic Search

Search your indexed documentation.

```
POST /v1/search
```

**Request Body:**

```json
{
  "query": "authentication setup",
  "limit": 10
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | Yes | Search query |
| `limit` | number | No | Max results (default: 10, max: 50) |

**Response:**

```json
{
  "results": [
    {
      "title": "Getting Started with Auth",
      "url": "https://docs.example.com/auth/getting-started",
      "snippet": "To set up authentication in your application...",
      "filePath": "docs/auth/getting-started.md",
      "score": 0.89
    }
  ]
}
```

## OpenAI SDK Compatibility

The chat endpoint is compatible with the OpenAI SDK:

### JavaScript/TypeScript

```typescript
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: 'your-groo-api-key',
  baseURL: 'https://ai.groo.dev/v1',
})

const stream = await client.chat.completions.create({
  model: 'anthropic/claude-sonnet-4-20250514',
  messages: [{ role: 'user', content: 'How do I authenticate?' }],
  stream: true,
})

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '')
}
```

### Python

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-groo-api-key",
    base_url="https://ai.groo.dev/v1"
)

stream = client.chat.completions.create(
    model="anthropic/claude-sonnet-4-20250514",
    messages=[{"role": "user", "content": "How do I authenticate?"}],
    stream=True
)

for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")
```

### curl

```bash
curl https://ai.groo.dev/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-4-20250514",
    "messages": [{"role": "user", "content": "How do I authenticate?"}],
    "stream": false
  }'
```

## Error Handling

### Error Response Format

```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 400 | Bad request (missing required fields) |
| 401 | Unauthorized (invalid or missing API token) |
| 404 | Project not found |
| 500 | Server error |

### Common Errors

**Invalid API token:**
```json
{
  "error": "Invalid API token - missing projectId in app_data"
}
```

**Project not indexed:**
```json
{
  "error": "Project not indexed yet"
}
```

## Rate Limits

- **Chat**: 60 requests per minute
- **Search**: 120 requests per minute

Exceeded limits return `429 Too Many Requests`.

## Models

Available models via Cloudflare AI Gateway:

| Model ID | Description |
|----------|-------------|
| `anthropic/claude-sonnet-4-20250514` | Claude Sonnet 4 (default) |
| `anthropic/claude-haiku-3-5-20241022` | Claude Haiku 3.5 (faster) |

## Best Practices

### Handling Streams

For streaming responses, parse Server-Sent Events (SSE):

```typescript
const response = await fetch('https://ai.groo.dev/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'anthropic/claude-sonnet-4-20250514',
    messages: [{ role: 'user', content: question }],
    stream: true,
  }),
})

const reader = response.body.getReader()
const decoder = new TextDecoder()

while (true) {
  const { done, value } = await reader.read()
  if (done) break

  const chunk = decoder.decode(value)
  const lines = chunk.split('\n')

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6)
      if (data === '[DONE]') break

      const parsed = JSON.parse(data)
      const content = parsed.choices?.[0]?.delta?.content
      if (content) {
        // Append to UI
      }
    }
  }
}
```

### Source Citations

Responses include markdown links to sources. Parse and display them appropriately:

```typescript
// Example response content:
// "To authenticate, [install the SDK](https://docs.example.com/sdk)..."

// Render with a markdown library like react-markdown
import ReactMarkdown from 'react-markdown'

<ReactMarkdown>{response.content}</ReactMarkdown>
```
