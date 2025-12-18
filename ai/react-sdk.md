# React SDK

Add an AI chat widget to your React application.

## Installation

```bash
npm install @groo.dev/ai-react
```

## Quick Start

### Chat Component

Drop-in chat widget with floating button:

```tsx
import { Chat } from '@groo.dev/ai-react'

function App() {
  return (
    <Chat
      apiKey="your-api-key"
      title="Docs Assistant"
    />
  )
}
```

### useChat Hook

Build a custom chat UI:

```tsx
import { useChat } from '@groo.dev/ai-react'

function CustomChat() {
  const { messages, isLoading, sendMessage, clearMessages, stop } = useChat({
    apiKey: 'your-api-key',
  })

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.role}:</strong> {msg.content}
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
      <button onClick={clearMessages}>Clear</button>
    </div>
  )
}
```

## Chat Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | `string` | Required | Your API key |
| `baseUrl` | `string` | `https://ai.groo.dev/v1` | API base URL |
| `model` | `string` | `anthropic/claude-sonnet-4-20250514` | Model to use |
| `theme` | `'light' \| 'dark' \| 'system'` | `'system'` | Color theme |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Widget position |
| `placeholder` | `string` | `'Ask a question...'` | Input placeholder |
| `title` | `string` | `'AI Assistant'` | Header title |
| `defaultOpen` | `boolean` | `false` | Start with chat open |
| `onError` | `(error: Error) => void` | - | Error callback |

### Example: Custom Theme

```tsx
<Chat
  apiKey="your-api-key"
  theme="dark"
  position="bottom-left"
  title="Need help?"
  placeholder="Type your question..."
/>
```

### Example: Error Handling

```tsx
<Chat
  apiKey="your-api-key"
  onError={(error) => {
    console.error('Chat error:', error)
    // Show toast notification, etc.
  }}
/>
```

## useChat Hook

### Options

```typescript
interface UseChatOptions {
  apiKey: string
  baseUrl?: string  // Default: 'https://ai.groo.dev/v1'
  model?: string    // Default: 'anthropic/claude-sonnet-4-20250514'
  onError?: (error: Error) => void
}
```

### Return Value

```typescript
interface UseChatReturn {
  messages: Message[]
  isLoading: boolean
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
  stop: () => void
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}
```

### Full Example

```tsx
import { useChat } from '@groo.dev/ai-react'
import { useState } from 'react'

function ChatPage() {
  const [input, setInput] = useState('')
  const { messages, isLoading, sendMessage, clearMessages, stop } = useChat({
    apiKey: process.env.NEXT_PUBLIC_GROO_API_KEY!,
    onError: (error) => alert(error.message),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage(input)
      setInput('')
    }
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading}
        />
        {isLoading ? (
          <button type="button" onClick={stop}>Stop</button>
        ) : (
          <button type="submit">Send</button>
        )}
      </form>

      {messages.length > 0 && (
        <button onClick={clearMessages}>Clear Chat</button>
      )}
    </div>
  )
}
```

## Styling

### CSS Variables

The Chat component uses CSS variables for theming:

```css
/* Light theme (default) */
--groo-chat-bg: #ffffff;
--groo-chat-text: #1a1a1a;
--groo-chat-border: #e5e5e5;
--groo-chat-header-bg: #fafafa;
--groo-chat-muted: #666;
--groo-chat-primary: #0066cc;
--groo-chat-danger: #ef4444;
--groo-chat-user-bg: #0066cc;
--groo-chat-assistant-bg: #f5f5f5;

/* Dark theme */
--groo-chat-bg: #1a1a1a;
--groo-chat-text: #ffffff;
--groo-chat-border: #333;
--groo-chat-header-bg: #252525;
--groo-chat-muted: #999;
--groo-chat-primary: #3b82f6;
--groo-chat-user-bg: #3b82f6;
--groo-chat-assistant-bg: #252525;
```

### Custom Styling

Override styles by setting CSS variables in a parent element:

```css
.my-chat-wrapper {
  --groo-chat-primary: #8b5cf6;
  --groo-chat-user-bg: #8b5cf6;
}
```

```tsx
<div className="my-chat-wrapper">
  <Chat apiKey="your-api-key" />
</div>
```

## TypeScript

All types are exported:

```typescript
import type {
  ChatProps,
  UseChatOptions,
  UseChatReturn,
  Message,
} from '@groo.dev/ai-react'
```

## Next.js

For Next.js apps, ensure the component runs on the client:

```tsx
'use client'

import { Chat } from '@groo.dev/ai-react'

export function DocsChat() {
  return (
    <Chat
      apiKey={process.env.NEXT_PUBLIC_GROO_API_KEY!}
      title="Docs Assistant"
    />
  )
}
```

Then use in a page or layout:

```tsx
import { DocsChat } from '@/components/docs-chat'

export default function DocsLayout({ children }) {
  return (
    <>
      {children}
      <DocsChat />
    </>
  )
}
```
