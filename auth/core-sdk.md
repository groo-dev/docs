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

#### getUser

Fetch the current user, forwarding a cookie for server-side usage or relying on the browser's own credentialed cookie when called client-side:

```typescript
const user = await client.getUser(cookie)
// Returns: User | null
```

Called in a browser, this issues a credentialed cross-origin `GET /v1/auth/me` (`credentials: 'include'`). The accounts API only grants that request CORS access from an origin registered as a redirect URI on one of the workspace's applications — an unregistered origin gets no `Access-Control-Allow-Origin` header, and the browser blocks the response before your code ever sees it. `PATCH /v1/auth/me` (profile updates) is not exposed cross-origin at all; only `GET` is.

`getUser` catches its own request failure and returns `null` rather than throwing. This means a consumer calling it from an origin that isn't registered sees the same `null` result as a genuinely signed-out user — there is no error to distinguish "not authenticated" from "not allowed to ask." If `getUser()` unexpectedly always returns `null` for a signed-in user, check that the calling origin is registered as a redirect URI before assuming the session itself is the problem.

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
