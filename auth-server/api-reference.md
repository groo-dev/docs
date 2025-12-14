# API Reference

Complete reference for auth-server exports.

## grooAuth

Core authentication client factory.

```typescript
import { grooAuth } from '@groo.dev/auth-server'

const groo = grooAuth({
  clientId: string,       // Required - Your application client ID
  clientSecret: string,   // Required - Your application client secret
  baseUrl?: string,       // Default: 'https://accounts.groo.dev'
  cookieName?: string,    // Default: 'session'
})
```

### Methods

#### validateSession

```typescript
groo.validateSession(sessionCookie: string): Promise<ConsentedUser | null>
```

Validates a session cookie and returns the user if valid.

#### getTokens

```typescript
groo.getTokens(): Promise<ApiToken[]>
```

Lists all API tokens for the application.

#### createToken

```typescript
groo.createToken(options: {
  name: string
  description?: string
  expiresAt?: Date
}): Promise<{ token: ApiToken; secret: string }>
```

Creates a new API token. **Save the secret immediately** - it won't be shown again.

#### revokeToken

```typescript
groo.revokeToken(tokenId: string): Promise<void>
```

Revokes an API token.

#### getAppData

```typescript
groo.getAppData(userId: string): Promise<Record<string, unknown>>
```

Gets app-specific data for a user.

#### setAppData

```typescript
groo.setAppData(userId: string, data: Record<string, unknown>): Promise<void>
```

Sets app-specific data for a user.

---

## GrooHonoMiddleware

Hono middleware class for authentication.

```typescript
import { GrooHonoMiddleware } from '@groo.dev/auth-server/hono'

const hono = new GrooHonoMiddleware<Env>((env) => grooAuth({
  clientId: env.CLIENT_ID,
  clientSecret: env.CLIENT_SECRET,
  baseUrl: env.ACCOUNTS_URL,
}))
```

### Properties

#### init

Initializes groo context. **Must be called first.**

```typescript
app.use('*', hono.init)
```

#### middleware

Requires authentication. Returns 401 if not authenticated.

```typescript
app.get('/protected', hono.middleware, handler)
```

#### optionalMiddleware

Adds user to context but doesn't require authentication.

```typescript
app.get('/public', hono.optionalMiddleware, handler)
```

#### apiTokenMiddleware

Validates API token from Authorization header.

```typescript
app.post('/webhook', hono.apiTokenMiddleware, handler)
```

#### routes

Pre-built auth routes. Provides `/__auth/me` endpoint.

```typescript
app.route('/v1', hono.routes)
```

---

## Types

### ConsentedUser

```typescript
interface ConsentedUser {
  id: string
  email: string | null
  phone: string | null
  name: string | null
  role: string
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

### ApiToken

```typescript
interface ApiToken {
  id: string
  name: string
  description: string | null
  createdAt: string
  expiresAt: string | null
  lastUsedAt: string | null
}
```

### ApiTokenInfo

Available via `c.get('apiToken')` in API token protected routes.

```typescript
interface ApiTokenInfo {
  active: boolean
  application_name: string
  token_name: string
  app_data: Record<string, unknown>
}
```

---

## Context Variables

Available in Hono route handlers via `c.get()`:

| Variable | Type | Middleware |
|----------|------|------------|
| `groo` | `GrooAuth` | `init` |
| `user` | `ConsentedUser \| null` | `middleware`, `optionalMiddleware` |
| `apiToken` | `ApiTokenInfo` | `apiTokenMiddleware` |
