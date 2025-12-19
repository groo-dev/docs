# Core SDK

Low-level client library for Groo AI chat and search APIs with `@groo.dev/ai-core`.

:::tip
For React applications, use [`@groo.dev/ai-react`](/ai/react-sdk) instead. The Core SDK is for non-React environments or advanced use cases.
:::

## Installation

```bash
npm install @groo.dev/ai-core
```

## Quick Start

```typescript
import { createGrooClient } from '@groo.dev/ai-core'

const groo = createGrooClient('your-project-id')

// Chat with streaming
const stream = await groo.chat.chat.completions.create({
  model: 'anthropic/claude-sonnet-4-20250514',
  messages: [{ role: 'user', content: 'What is authentication?' }],
  stream: true,
})

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '')
}

// Search
const results = await groo.search('how to get started')
console.log(results)
```

## Clients

### createGrooClient

Creates a combined client with both chat and search capabilities.

```typescript
import { createGrooClient } from '@groo.dev/ai-core'

const groo = createGrooClient('project-id', {
  apiUrl: 'https://ai.groo.dev', // optional
})

// Chat (OpenAI-compatible)
groo.chat.chat.completions.create({...})

// Search
groo.search('query', { limit: 5 })
```

### createChatClient

Creates an OpenAI-compatible chat client.

```typescript
import { createChatClient } from '@groo.dev/ai-core'

const chat = createChatClient('project-id')

const response = await chat.chat.completions.create({
  model: 'anthropic/claude-sonnet-4-20250514',
  messages: [
    { role: 'user', content: 'Explain authentication' }
  ],
})

console.log(response.choices[0].message.content)
```

#### Streaming

```typescript
const stream = await chat.chat.completions.create({
  model: 'anthropic/claude-sonnet-4-20250514',
  messages: [{ role: 'user', content: 'Hello!' }],
  stream: true,
})

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content
  if (content) {
    process.stdout.write(content)
  }
}
```

### createSearchClient

Creates a semantic search client.

```typescript
import { createSearchClient } from '@groo.dev/ai-core'

const search = createSearchClient('project-id')

const results = await search.search('how to authenticate users', {
  limit: 10,
})

results.forEach((result) => {
  console.log(`${result.title}: ${result.url}`)
  console.log(`  ${result.snippet}`)
})
```

## Options

All client functions accept an optional options object:

```typescript
interface ClientOptions {
  apiUrl?: string  // Default: 'https://ai.groo.dev'
}
```

Example:

```typescript
const groo = createGrooClient('project-id', {
  apiUrl: 'https://custom-api.example.com',
})
```

## Types

```typescript
interface SearchOptions {
  limit?: number  // Max results to return
}

interface SearchResult {
  title: string   // Document title
  url: string     // Document URL
  snippet: string // Matching text snippet
  score: number   // Relevance score
}

interface SearchClient {
  search(query: string, options?: SearchOptions): Promise<SearchResult[]>
}

interface GrooClient {
  chat: OpenAI           // OpenAI-compatible client
  search: SearchClient['search']  // Search function
}
```

## Authentication

The SDK uses cookie-based authentication. Requests automatically include credentials, so users must be authenticated via Groo accounts.

For browser usage:

```typescript
const chat = createChatClient('project-id')
// Requests include credentials automatically
```

## Examples

### Node.js CLI

```typescript
import { createGrooClient } from '@groo.dev/ai-core'
import * as readline from 'readline'

const groo = createGrooClient('project-id')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function chat(question: string) {
  const stream = await groo.chat.chat.completions.create({
    model: 'anthropic/claude-sonnet-4-20250514',
    messages: [{ role: 'user', content: question }],
    stream: true,
  })

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }
  console.log()
}

rl.question('Ask a question: ', async (answer) => {
  await chat(answer)
  rl.close()
})
```

### Search with Results

```typescript
import { createSearchClient } from '@groo.dev/ai-core'

async function searchDocs(query: string) {
  const search = createSearchClient('project-id')
  const results = await search.search(query, { limit: 5 })

  if (results.length === 0) {
    console.log('No results found')
    return
  }

  console.log(`Found ${results.length} results:\n`)
  results.forEach((result, i) => {
    console.log(`${i + 1}. ${result.title}`)
    console.log(`   ${result.url}`)
    console.log(`   ${result.snippet}\n`)
  })
}

searchDocs('getting started')
```
