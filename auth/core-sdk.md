---
title: auth-core - Core Types and Utilities
sidebar_label: Core SDK
description: Core TypeScript types and AuthClient class for Groo Auth SDK. Shared utilities for React and server authentication packages.
keywords: [auth-core, TypeScript types, AuthClient, authentication utilities, Groo Auth]
---

# Core SDK

Core types and utilities for the Groo Auth SDK.

## Installation

```bash
npm install @groo.dev/auth-core
```

:::note
This package is automatically included when you install `@groo.dev/auth-react` or `@groo.dev/auth-server`. You typically don't need to install it directly.
:::

## Overview

`auth-core` provides TypeScript types and the `AuthClient` class used by both the React and server packages. It ensures type consistency across your frontend and backend.

## When to Use Directly

You might import from `auth-core` directly when:

- You need type definitions without the full React or server package
- You're building custom integrations
- You need the `AuthClient` for custom authentication flows

## Types

### User

```typescript
interface User {
  id: string
  email: string | null
  phone: string | null
  name: string | null
  role: string
}
```

### ConsentedUser

User object with consent information (returned from session validation):

```typescript
interface ConsentedUser extends User {
  consent: {
    id: string
    userId: string
    applicationId: string
    consentedAt: string
    lastAccessedAt: string
    revokedAt: string | null
    appData: Record<string, unknown>
  }
}
```

### AuthConfig

Configuration for initializing the auth client:

```typescript
interface AuthConfig {
  clientId: string
  clientSecret?: string  // Required for server-side
  baseUrl?: string       // Default: 'https://accounts.groo.dev'
  cookieName?: string    // Default: 'session'
}
```

### UseAuthReturn

Return type from the `useAuth` hook:

```typescript
interface UseAuthReturn {
  user: User | null
  isLoading: boolean
  error: Error | null
  loginUrl: string
  logoutUrl: string
  refetch: () => Promise<void>
}
```

## AuthClient

The core authentication client for making requests to the accounts service.

### Constructor

```typescript
import { AuthClient } from '@groo.dev/auth-core'

const client = new AuthClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret', // Optional for client-side
  baseUrl: 'https://accounts.groo.dev',
})
```

### Methods

#### validateSession

Validate a session cookie and return the user:

```typescript
const user = await client.validateSession(sessionCookie)
// Returns: ConsentedUser | null
```

#### getLoginUrl

Generate a login URL:

```typescript
const url = client.getLoginUrl(redirectUri)
// Returns: string
```

#### getLogoutUrl

Generate a logout URL:

```typescript
const url = client.getLogoutUrl(redirectUri)
// Returns: string
```

## Exports

```typescript
// Types
export type { User, ConsentedUser, AuthConfig, UseAuthReturn }

// Client
export { AuthClient }
```
