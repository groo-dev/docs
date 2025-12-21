---
title: Groo Auth - Privacy-First Authentication
sidebar_label: Overview
description: Secure authentication system for modern apps. React hooks, Hono middleware, and shared utilities for client and server authentication.
keywords: [authentication SDK, React auth, Hono middleware, auth provider, user authentication]
---

# Groo Auth

A privacy-first authentication system for modern applications.

## Overview

Groo Auth is a collection of packages that work together to provide secure, seamless authentication across your stack:

| Package | Purpose |
|---------|---------|
| [auth-core](./core-sdk) | Shared types, utilities, and token handling |
| [auth-react](./react-sdk) | React hooks and components (`useAuth`, `AuthProvider`) |
| [auth-server](./server-sdk) | Server-side middleware for Hono |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   auth-react                         │   │
│  │   useAuth() · AuthProvider · ProtectedRoute         │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   auth-core                          │   │
│  │   Types · Token handling · Shared utilities          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                        Server                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  auth-server                         │   │
│  │   Hono middleware · Session validation · API auth    │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   auth-core                          │   │
│  │   Types · Token handling · Shared utilities          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Install packages

```bash
# Client
npm install @groo.dev/auth-core @groo.dev/auth-react

# Server
npm install @groo.dev/auth-core @groo.dev/auth-server
```

### 2. Set up the server

```typescript
import { Hono } from 'hono'
import { authMiddleware } from '@groo.dev/auth-server'

const app = new Hono()

app.use('/*', authMiddleware())

app.get('/api/me', (c) => {
  const user = c.get('user')
  return c.json(user)
})
```

### 3. Set up the client

```tsx
import { AuthProvider, useAuth } from '@groo.dev/auth-react'

function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  )
}

function Dashboard() {
  const { user, isAuthenticated, login, logout } = useAuth()

  if (!isAuthenticated) {
    return <button onClick={login}>Sign in</button>
  }

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Sign out</button>
    </div>
  )
}
```

## Which package do I need?

| Building... | You need |
|-------------|----------|
| React app with auth | `auth-core` + `auth-react` |
| Hono API with auth | `auth-core` + `auth-server` |
| Full-stack app | All three packages |
| Custom integration | Start with `auth-core` |

## Next Steps

- [Core SDK](./core-sdk) - Types and utilities
- [React SDK](./react-sdk) - React integration
- [Server SDK](./server-sdk) - Server middleware
- [API Reference](./api-reference) - Complete API reference
