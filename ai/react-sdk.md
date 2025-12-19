# React SDK

Add AI chat and search to your React application with `@groo.dev/ai-react`.

## Installation

```bash
npm install @groo.dev/ai-react
```

## Quick Start

Wrap your app with `AIProvider` and use the components:

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

## AIProvider

The `AIProvider` component wraps your app and provides authentication and AI client context.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `projectId` | `string` | Yes | Your Groo AI project ID |
| `auth.accountsUrl` | `string` | Yes | Groo accounts URL |
| `auth.clientId` | `string` | Yes | Your OAuth client ID |
| `apiUrl` | `string` | No | Custom API URL (default: `https://ai.groo.dev`) |
| `queryClient` | `QueryClient` | No | Custom React Query client |

### Example

```tsx
import { AIProvider } from '@groo.dev/ai-react'

function App() {
  return (
    <AIProvider
      projectId="proj_abc123"
      apiUrl="https://ai.groo.dev"
      auth={{
        accountsUrl: 'https://accounts.groo.dev',
        clientId: 'client_xyz',
      }}
    >
      {children}
    </AIProvider>
  )
}
```

## Components

### GrooChat

A drop-in chat component with markdown rendering and streaming responses.

```tsx
import { GrooChat } from '@groo.dev/ai-react'

function ChatPage() {
  return <GrooChat />
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Ask a question...'` | Input placeholder text |
| `welcomeMessage` | `string` | `'How can I help you today?'` | Message shown when chat is empty |

#### Features

- Auto-scrolling message list
- Expandable textarea (auto-resize)
- Markdown rendering for responses
- Send/stop button toggle
- "New chat" option menu
- Error display

### Search

A search component for finding documentation.

```tsx
import { Search } from '@groo.dev/ai-react'

function SearchPage() {
  return <Search onResultClick={(url) => window.location.href = url} />
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Search documentation...'` | Input placeholder |
| `limit` | `number` | `10` | Max results to return |
| `onResultClick` | `(url: string) => void` | Opens in new tab | Result click handler |

## Hooks

### useChat

Build a custom chat UI with the `useChat` hook.

```tsx
import { useChat } from '@groo.dev/ai-react'

function CustomChat() {
  const { messages, isLoading, sendMessage, reset, stop } = useChat()

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i} className={msg.role}>
          {msg.content}
        </div>
      ))}

      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage(e.currentTarget.value)
            e.currentTarget.value = ''
          }
        }}
        disabled={isLoading}
      />

      {isLoading && <button onClick={stop}>Stop</button>}
      <button onClick={reset}>New Chat</button>
    </div>
  )
}
```

#### Return Value

```typescript
interface UseChatResult {
  messages: Message[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  sendMessage: (content: string) => void
  reset: () => void
  stop: () => void
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}
```

### useSearch

Search your indexed documentation.

```tsx
import { useSearch } from '@groo.dev/ai-react'

function CustomSearch() {
  const [query, setQuery] = useState('')
  const { results, isLoading, isError } = useSearch(query, { limit: 5 })

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {isLoading && <div>Searching...</div>}

      {results.map((result, i) => (
        <a key={i} href={result.url}>
          <h3>{result.title}</h3>
          <p>{result.snippet}</p>
        </a>
      ))}
    </div>
  )
}
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | `string` | Search query |
| `options.limit` | `number` | Max results (default: 10) |

#### Return Value

```typescript
interface UseSearchResult {
  results: SearchResult[]
  isLoading: boolean
  isError: boolean
  error: Error | null
}

interface SearchResult {
  title: string
  url: string
  snippet: string
  score: number
}
```

### useAuth

Access authentication state.

```tsx
import { useAuth } from '@groo.dev/ai-react'

function AuthStatus() {
  const { user, isLoading, login, logout } = useAuth()

  if (isLoading) return <div>Loading...</div>

  if (!user) {
    return <button onClick={login}>Sign in</button>
  }

  return (
    <div>
      Welcome, {user.name}
      <button onClick={logout}>Sign out</button>
    </div>
  )
}
```

### useAI

Access the underlying Groo client for advanced use cases.

```tsx
import { useAI } from '@groo.dev/ai-react'

function Advanced() {
  const { client, projectId } = useAI()

  // Use the OpenAI-compatible client directly
  const handleStream = async () => {
    const stream = await client.chat.chat.completions.create({
      model: 'anthropic/claude-sonnet-4-20250514',
      messages: [{ role: 'user', content: 'Hello!' }],
      stream: true,
    })

    for await (const chunk of stream) {
      console.log(chunk.choices[0]?.delta?.content)
    }
  }

  return <button onClick={handleStream}>Stream</button>
}
```

## Styling

Components use CSS classes you can customize:

```css
/* Chat container */
.groo-chat { }
.groo-chat-messages { }
.groo-chat-message { }
.groo-chat-message-user { }
.groo-chat-message-assistant { }
.groo-chat-input-wrapper { }
.groo-chat-textarea { }
.groo-chat-button { }
.groo-chat-welcome { }
.groo-chat-error { }

/* Search container */
.groo-search { }
.groo-search-form { }
.groo-search-input { }
.groo-search-button { }
.groo-search-results { }
.groo-search-result { }
.groo-search-result-title { }
.groo-search-result-snippet { }
```

## TypeScript

All types are exported:

```typescript
import type {
  AIProviderProps,
  GrooChatProps,
  SearchProps,
  UseChatResult,
  UseSearchResult,
  Message,
  SearchResult,
} from '@groo.dev/ai-react'
```

## Next.js

For Next.js apps, ensure components run on the client:

```tsx
'use client'

import { AIProvider, GrooChat } from '@groo.dev/ai-react'

export function DocsChat() {
  return (
    <AIProvider
      projectId={process.env.NEXT_PUBLIC_GROO_PROJECT_ID!}
      auth={{
        accountsUrl: 'https://accounts.groo.dev',
        clientId: process.env.NEXT_PUBLIC_GROO_CLIENT_ID!,
      }}
    >
      <GrooChat />
    </AIProvider>
  )
}
```
