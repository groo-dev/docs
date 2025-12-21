---
title: auth-server - Server-Side Authentication SDK
sidebar_label: Server SDK
description: Server-side authentication for Hono and Cloudflare Workers. Session validation middleware, API token auth, and user data management.
keywords: [Hono middleware, server authentication, Cloudflare Workers auth, session validation, API tokens]
---

# Server SDK

Server-side SDK for handling authentication with Hono and Cloudflare Workers.

## Features

- `GrooHonoMiddleware` - Hono middleware for session validation
- `grooAuth` - Core authentication client
- Session-based authentication for users
- API token authentication for M2M
- User data management

## Installation

```bash
npm install @groo.dev/auth-server
```

## Quick Start

```typescript
import { Hono } from 'hono'
import { grooAuth } from '@groo.dev/auth-server'
import { GrooHonoMiddleware } from '@groo.dev/auth-server/hono'

type Env = {
  CLIENT_ID: string
  CLIENT_SECRET: string
  ACCOUNTS_URL: string
}

const hono = new GrooHonoMiddleware<Env>((env) => grooAuth({
  clientId: env.CLIENT_ID,
  clientSecret: env.CLIENT_SECRET,
  baseUrl: env.ACCOUNTS_URL,
}))

const app = new Hono<{ Bindings: Env }>()

// Initialize (must be first!)
app.use('*', hono.init)

// Mount auth routes (provides /v1/__auth/me)
app.route('/v1', hono.routes)

// Protected routes
app.get('/v1/me', hono.middleware, (c) => {
  const user = c.get('user')
  return c.json({ user })
})

export default app
```

## Setup with Hono

### 1. Initialize GrooHonoMiddleware

```typescript
import { Hono } from 'hono'
import { grooAuth } from '@groo.dev/auth-server'
import { GrooHonoMiddleware } from '@groo.dev/auth-server/hono'

type Env = {
  CLIENT_ID: string
  CLIENT_SECRET: string
  ACCOUNTS_URL: string
}

const hono = new GrooHonoMiddleware<Env>((env) => grooAuth({
  clientId: env.CLIENT_ID,
  clientSecret: env.CLIENT_SECRET,
  baseUrl: env.ACCOUNTS_URL,
}))

const app = new Hono<{ Bindings: Env }>()

// Initialize groo in context (must be first!)
app.use('*', hono.init)

// Mount auth routes (handles /v1/__auth/me)
app.route('/v1', hono.routes)
```

### 2. Configuration Options

```typescript
interface GrooAuthConfig {
  clientId: string          // Required
  clientSecret: string      // Required
  baseUrl?: string         // Default: 'https://accounts.groo.dev'
  cookieName?: string      // Default: 'session'
}
```

### Environment Variables

**wrangler.toml:**

```toml
name = "my-app"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
ACCOUNTS_URL = "https://accounts.groo.dev"
CLIENT_ID = "app_xxx"

# For secrets: npx wrangler secret put CLIENT_SECRET
```

**.dev.vars (local development):**

```bash
ACCOUNTS_URL=https://accounts.groo.dev
CLIENT_ID=app_xxx
CLIENT_SECRET=your-secret
```

## Hono Middleware

### init - Initialize Context

**Must be called first** - adds `grooAuth` instance to context:

```typescript
app.use('*', hono.init)

// Now available in all routes:
const groo = c.get('groo')  // GrooAuth instance
```

### middleware - Require Authentication

Validates session and requires authentication:

```typescript
app.get('/v1/me', hono.middleware, (c) => {
  const user = c.get('user')  // Always present (401 if not)
  return c.json({ user })
})
```

**Behavior:**
- Reads session cookie
- Validates session with accounts service
- Returns 401 if invalid or missing
- Sets `c.get('user')` to ConsentedUser

### optionalMiddleware - Optional Authentication

Adds user to context but doesn't require authentication:

```typescript
app.get('/v1/public', hono.optionalMiddleware, (c) => {
  const user = c.get('user')  // May be null

  return c.json({
    message: user ? `Hello ${user.name}` : 'Hello Guest'
  })
})
```

### apiTokenMiddleware - API Token Authentication

For machine-to-machine authentication:

```typescript
app.post('/v1/webhook', hono.apiTokenMiddleware, (c) => {
  const token = c.get('apiToken')
  return c.json({ received: true })
})
```

## API Tokens

Machine-to-machine (M2M) authentication for services like GitHub Actions, cron jobs, and webhooks.

### When to Use API Tokens

| Use Case | Auth Method |
|----------|-------------|
| Browser/frontend users | User session (`hono.middleware`) |
| GitHub Actions, CI/CD | API tokens (`hono.apiTokenMiddleware`) |
| Cron jobs, scheduled tasks | API tokens |
| Webhooks from external services | API tokens |
| Service-to-service calls | API tokens |

### Creating API Tokens

1. Go to [accounts.groo.dev](https://accounts.groo.dev)
2. Navigate to your application → **Tokens** tab
3. Click **Create Token**
4. Enter a name and optional description
5. Choose expiration
6. **Copy the token immediately** - it won't be shown again

### Calling Your API

**From GitHub Actions:**

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger deployment
        run: |
          curl -X POST https://api.myapp.com/v1/deploy \
            -H "Authorization: Bearer ${{ secrets.API_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{"version": "1.0.0"}'
```

**From Code:**

```typescript
const response = await fetch('https://api.myapp.com/v1/webhook', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ event: 'task_complete' }),
})
```

### Token Management

Programmatically manage tokens:

```typescript
const groo = c.get('groo')

// List all tokens
const tokens = await groo.getTokens()

// Create a new token
const { token, secret } = await groo.createToken({
  name: 'CI/CD Pipeline',
  description: 'For automated deployments',
  expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
})

// Revoke a token
await groo.revokeToken(tokenId)
```

## Non-Hono Frameworks

Use `grooAuth` directly:

```typescript
import { grooAuth } from '@groo.dev/auth-server'

const groo = grooAuth({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
})

// Validate session
const user = await groo.validateSession(sessionCookie)
```

## Complete Example

```typescript
const app = new Hono<{ Bindings: Env }>()

// 1. Initialize (required!)
app.use('*', hono.init)

// 2. Mount auth routes
app.route('/v1', hono.routes)

// 3. Public routes
app.get('/v1/health', (c) => c.json({ status: 'ok' }))

// 4. Optional auth routes
app.get('/v1/welcome', hono.optionalMiddleware, (c) => {
  const user = c.get('user')
  return c.json({
    message: user ? `Welcome back, ${user.email}!` : 'Welcome!'
  })
})

// 5. Protected routes
app.get('/v1/profile', hono.middleware, (c) => {
  const user = c.get('user')
  return c.json({ user })
})

// 6. API token routes
app.post('/v1/webhook', hono.apiTokenMiddleware, (c) => {
  const token = c.get('apiToken')
  return c.json({ received: true })
})
```

## Best Practices

1. **Always initialize first:**
   ```typescript
   app.use('*', hono.init)  // Must be first!
   ```

2. **Mount routes early:**
   ```typescript
   app.route('/v1', hono.routes)  // Provides /__auth/me
   ```

3. **Use specific paths for protection:**
   ```typescript
   // Good - specific paths
   app.use('/v1/admin/*', hono.middleware)

   // Avoid - too broad
   app.use('*', hono.middleware)
   ```

4. **Security for API tokens:**
   - Never expose tokens in client code
   - Use environment variables
   - Set appropriate expiration
   - Revoke unused tokens

## Requirements

- A registered application at accounts.groo.dev
- Client ID and Client Secret
- Hono (or use `grooAuth` directly for other frameworks)
