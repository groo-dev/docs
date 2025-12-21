---
title: auth-server - Server-Side Authentication SDK
sidebar_label: Overview
description: Server-side authentication for Hono and Cloudflare Workers. Session validation middleware, API token auth, and user data management.
keywords: [Hono middleware, server authentication, Cloudflare Workers auth, session validation, API tokens]
---

# auth-server

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

## Requirements

- A registered application at accounts.groo.dev
- Client ID and Client Secret
- Hono (or use `grooAuth` directly for other frameworks)
