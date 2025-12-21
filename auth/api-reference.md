---
title: Groo Auth API Reference
sidebar_label: API Reference
description: Complete API reference for Groo Auth SDK. Types, exports, and method signatures for auth-core, auth-react, and auth-server.
keywords: [auth API, AuthClient, useAuth, GrooHonoMiddleware, TypeScript types]
---

# API Reference

Quick reference for all Groo Auth SDK exports.

## auth-core

```typescript
import { AuthClient } from '@groo.dev/auth-core'
import type { User, ConsentedUser, AuthConfig, UseAuthReturn } from '@groo.dev/auth-core'
```

### Types

```typescript
interface User {
  id: string
  email: string | null
  phone: string | null
  name: string | null
  role: string
}

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

interface AuthConfig {
  clientId: string
  clientSecret?: string
  baseUrl?: string
  cookieName?: string
}
```

### AuthClient

```typescript
const client = new AuthClient(config: AuthConfig)

client.validateSession(cookie: string): Promise<ConsentedUser | null>
client.getLoginUrl(redirectUri: string): string
client.getLogoutUrl(redirectUri: string): string
```

## auth-react

```typescript
import {
  AuthProvider,
  useAuth,
  useUser,
  LoginButton,
  LogoutButton,
  RequireAuth
} from '@groo.dev/auth-react'
```

### AuthProvider

```tsx
<AuthProvider
  baseUrl={string}      // Required - Your API URL
  clientId={string}     // Required - Your client ID
  redirectUri={string}  // Required - Redirect after auth
>
  {children}
</AuthProvider>
```

### Hooks

```typescript
function useAuth(): {
  user: User | null
  isLoading: boolean
  error: Error | null
  loginUrl: string
  logoutUrl: string
  refetch: () => Promise<void>
}

function useUser(): {
  user: User | null
  isLoading: boolean
  error: Error | null
}
```

### Components

```tsx
<LoginButton className?: string>{children}</LoginButton>
<LogoutButton className?: string>{children}</LogoutButton>
<RequireAuth fallback?: ReactNode redirectTo?: string>{children}</RequireAuth>
```

## auth-server

```typescript
import { grooAuth } from '@groo.dev/auth-server'
import { GrooHonoMiddleware } from '@groo.dev/auth-server/hono'
```

### grooAuth

```typescript
const groo = grooAuth({
  clientId: string,
  clientSecret: string,
  baseUrl?: string,
  cookieName?: string,
})

groo.validateSession(cookie: string): Promise<ConsentedUser | null>
groo.getTokens(): Promise<ApiToken[]>
groo.createToken(options): Promise<{ token: ApiToken; secret: string }>
groo.revokeToken(tokenId: string): Promise<void>
groo.getAppData(userId: string): Promise<Record<string, unknown>>
groo.setAppData(userId: string, data: Record<string, unknown>): Promise<void>
```

### GrooHonoMiddleware

```typescript
const hono = new GrooHonoMiddleware<Env>((env) => grooAuth({...}))

hono.init           // Initialize context (must be first)
hono.middleware     // Require authentication (401 if not)
hono.optionalMiddleware  // Optional authentication
hono.apiTokenMiddleware  // API token authentication
hono.routes         // Pre-built routes (/__auth/me)
```

### Context Variables

| Variable | Type | Middleware |
|----------|------|------------|
| `groo` | `GrooAuth` | `init` |
| `user` | `ConsentedUser \| null` | `middleware`, `optionalMiddleware` |
| `apiToken` | `ApiTokenInfo` | `apiTokenMiddleware` |

### Types

```typescript
interface ApiToken {
  id: string
  name: string
  description: string | null
  createdAt: string
  expiresAt: string | null
  lastUsedAt: string | null
}

interface ApiTokenInfo {
  active: boolean
  application_name: string
  token_name: string
  app_data: Record<string, unknown>
}
```

## URL Formats

**Login URL:**
```
{accountsUrl}/login?client_id={clientId}&redirect_uri={currentPageUrl}
```

**Logout URL:**
```
{accountsUrl}/v1/auth/logout?redirect_uri={origin}
```
