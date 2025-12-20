---
title: Hono Middleware for Authentication
description: GrooHonoMiddleware for protecting routes. Required, optional, and API token authentication with session validation.
keywords: [Hono middleware, route protection, session middleware, apiTokenMiddleware, optionalMiddleware]
---

# Hono Middleware

Use `GrooHonoMiddleware` to protect routes and validate user authentication.

## Middleware Types

### 1. init - Initialize Context

**Must be called first** - adds `grooAuth` instance to context:

```typescript
app.use('*', hono.init)

// Now available in all routes:
const groo = c.get('groo')  // GrooAuth instance
```

### 2. middleware - Require Authentication

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

### 3. optionalMiddleware - Optional Authentication

Adds user to context but doesn't require authentication:

```typescript
app.get('/v1/public', hono.optionalMiddleware, (c) => {
  const user = c.get('user')  // May be null

  return c.json({
    message: user ? `Hello ${user.name}` : 'Hello Guest'
  })
})
```

### 4. apiTokenMiddleware - API Token Authentication

For machine-to-machine authentication:

```typescript
app.post('/v1/webhook', hono.apiTokenMiddleware, (c) => {
  const token = c.get('apiToken')
  return c.json({ received: true })
})
```

## ConsentedUser Type

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
