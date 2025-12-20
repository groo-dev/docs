---
title: Getting Started with auth-react
description: Set up authentication in your React app. Install auth-react, configure AuthProvider, and integrate with Next.js or any React framework.
keywords: [React auth setup, AuthProvider setup, Next.js authentication, React auth guide]
---

# Getting Started

Set up authentication in your React application.

## Installation

```bash
npm install @groo.dev/auth-react
```

## Setup AuthProvider

Wrap your app with `AuthProvider`:

```tsx
import { AuthProvider } from '@groo.dev/auth-react'

function App() {
  return (
    <AuthProvider
      baseUrl="http://localhost:8787"
      clientId="your-client-id"
      redirectUri="http://localhost:3000"
    >
      <YourApp />
    </AuthProvider>
  )
}
```

### Configuration Options

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `baseUrl` | `string` | Yes | Your API's base URL (not accounts service) |
| `clientId` | `string` | Yes | Your application's client ID |
| `redirectUri` | `string` | Yes | Where to redirect after auth |

:::warning Important
The `baseUrl` should point to **your own API**, not the accounts service. The AuthProvider calls `GET /v1/__auth/me` on your API.
:::

## Next.js Setup

For Next.js, create a client component for the provider:

```tsx
// app/providers.tsx
'use client'

import { AuthProvider } from '@groo.dev/auth-react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider
      baseUrl={process.env.NEXT_PUBLIC_BASE_URL!}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}
      redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URI!}
    >
      {children}
    </AuthProvider>
  )
}
```

Then wrap your app in `layout.tsx`:

```tsx
// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

## Environment Variables

```bash
# .env
NEXT_PUBLIC_BASE_URL=http://localhost:8787
NEXT_PUBLIC_CLIENT_ID=your-client-id
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000
```

## How It Works

The `AuthProvider`:
1. Calls `GET /v1/__auth/me` on your API
2. Your API validates the session cookie and returns the user
3. Provides authentication state to all child components
4. Generates login/logout URLs with correct parameters
