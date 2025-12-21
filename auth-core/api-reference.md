---
title: auth-core API Reference
sidebar_label: API Reference
description: AuthClient API documentation with methods for session validation, login URL generation, and logout handling.
keywords: [AuthClient API, validateSession, getLoginUrl, auth API reference]
---

# API Reference

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
