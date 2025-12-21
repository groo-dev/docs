---
title: auth-react - React Authentication SDK
sidebar_label: React SDK
description: React components and hooks for authentication. AuthProvider, useAuth hook, LoginButton, LogoutButton, and RequireAuth components.
keywords: [React authentication, useAuth hook, AuthProvider, React auth components, login button]
---

# React SDK

React components and hooks for adding authentication to your frontend application.

## Features

- `AuthProvider` - Context provider for authentication state
- `useAuth` / `useUser` - Hooks for accessing user data
- `LoginButton` / `LogoutButton` - Pre-built authentication buttons
- `RequireAuth` - Component for protecting routes

## Installation

```bash
npm install @groo.dev/auth-react
```

## Quick Start

```tsx
import { AuthProvider, useAuth, LoginButton, LogoutButton } from '@groo.dev/auth-react'

// 1. Wrap your app
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

// 2. Use in components
function Header() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>

  return user ? (
    <>
      <span>Welcome, {user.name}</span>
      <LogoutButton>Sign Out</LogoutButton>
    </>
  ) : (
    <LoginButton>Sign In</LoginButton>
  )
}
```

## AuthProvider Setup

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

### Next.js Setup

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

## Hooks

### useAuth

The primary hook for accessing authentication state and URLs:

```tsx
import { useAuth } from '@groo.dev/auth-react'

function Profile() {
  const { user, isLoading, error, loginUrl, logoutUrl, refetch } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <a href={loginUrl}>Sign In</a>

  return (
    <div>
      <h1>Welcome, {user.name || user.email}!</h1>
      <a href={logoutUrl}>Sign Out</a>
    </div>
  )
}
```

#### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `user` | `User \| null` | Current authenticated user |
| `isLoading` | `boolean` | Whether auth state is loading |
| `error` | `Error \| null` | Error if auth fetch failed |
| `loginUrl` | `string` | Generated login URL |
| `logoutUrl` | `string` | Generated logout URL |
| `refetch` | `() => Promise<void>` | Manually refetch user data |

### useUser

Alternative hook that returns only user data (without URLs):

```tsx
import { useUser } from '@groo.dev/auth-react'

function Avatar() {
  const { user, isLoading, error } = useUser()

  if (isLoading || !user) return null

  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
    </div>
  )
}
```

### Manual Refetch

Refetch user data after an action:

```tsx
function UpdateProfile() {
  const { refetch } = useAuth()

  async function handleUpdate() {
    await updateProfileAPI()
    await refetch() // Refresh user data
  }

  return <button onClick={handleUpdate}>Update</button>
}
```

## Components

### LoginButton

Links to the login URL:

```tsx
import { LoginButton } from '@groo.dev/auth-react'

function Header() {
  return (
    <nav>
      <LoginButton>Sign In</LoginButton>
    </nav>
  )
}
```

With custom styling:

```tsx
<LoginButton className="btn btn-primary">
  Get Started
</LoginButton>
```

### LogoutButton

Links to the logout URL:

```tsx
import { LogoutButton } from '@groo.dev/auth-react'

function Header() {
  return (
    <nav>
      <LogoutButton>Sign Out</LogoutButton>
    </nav>
  )
}
```

### RequireAuth

Protects content by only rendering children when authenticated:

```tsx
import { RequireAuth } from '@groo.dev/auth-react'

function Dashboard() {
  return (
    <RequireAuth fallback={<div>Loading...</div>}>
      <DashboardContent />
    </RequireAuth>
  )
}
```

With redirect to login:

```tsx
<RequireAuth redirectTo="/login">
  <ProtectedContent />
</RequireAuth>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Content to show when authenticated |
| `fallback` | `ReactNode` | Content to show while loading or unauthenticated |
| `redirectTo` | `string` | URL to redirect to if not authenticated |

## Complete Example

```tsx
import { useAuth, LoginButton, LogoutButton, RequireAuth } from '@groo.dev/auth-react'

function App() {
  const { user, isLoading, error } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <header>
        <h1>My App</h1>
        {user ? (
          <div>
            <span>Hello, {user.name || user.email}</span>
            <LogoutButton>Sign Out</LogoutButton>
          </div>
        ) : (
          <LoginButton>Sign In</LoginButton>
        )}
      </header>

      <main>
        <RequireAuth fallback={<p>Please sign in to continue</p>}>
          <Dashboard user={user} />
        </RequireAuth>
      </main>
    </div>
  )
}
```

## Requirements

- A backend API with `@groo.dev/auth-server` that handles session validation
- A registered application at accounts.groo.dev
