# Getting Started

Set up authentication on your backend with Hono.

## Installation

```bash
npm install @groo.dev/auth-server
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

## Environment Variables

### wrangler.toml

```toml
name = "my-app"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
ACCOUNTS_URL = "https://accounts.groo.dev"
CLIENT_ID = "app_xxx"

# For secrets: npx wrangler secret put CLIENT_SECRET
```

### .dev.vars (local development)

```bash
ACCOUNTS_URL=https://accounts.groo.dev
CLIENT_ID=app_xxx
CLIENT_SECRET=your-secret
```

## Complete Example

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

// 1. Initialize groo (must be first!)
app.use('*', hono.init)

// 2. Mount auth routes
app.route('/v1', hono.routes)

// 3. Protected routes
app.get('/v1/me', hono.middleware, (c) => {
  const user = c.get('user')
  return c.json({ user })
})

// 4. Optional auth routes
app.get('/v1/public', hono.optionalMiddleware, (c) => {
  const user = c.get('user')
  return c.json({
    message: user ? `Hello ${user.email}` : 'Hello Guest'
  })
})

export default app
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
