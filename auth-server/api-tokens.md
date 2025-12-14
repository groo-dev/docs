# API Tokens

Machine-to-machine (M2M) authentication for services like GitHub Actions, cron jobs, and webhooks.

## When to Use API Tokens

| Use Case | Auth Method |
|----------|-------------|
| Browser/frontend users | User session (`hono.middleware`) |
| GitHub Actions, CI/CD | API tokens (`hono.apiTokenMiddleware`) |
| Cron jobs, scheduled tasks | API tokens |
| Webhooks from external services | API tokens |
| Service-to-service calls | API tokens |

## Creating API Tokens

1. Go to [accounts.groo.dev](https://accounts.groo.dev)
2. Navigate to your application → **Tokens** tab
3. Click **Create Token**
4. Enter a name and optional description
5. Choose expiration
6. **Copy the token immediately** - it won't be shown again

## Protecting Routes

Use `apiTokenMiddleware`:

```typescript
app.post('/v1/webhook', hono.apiTokenMiddleware, (c) => {
  const token = c.get('apiToken')
  console.log(`Request from: ${token.application_name}`)
  return c.json({ received: true })
})
```

## Calling Your API

### From GitHub Actions

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

### From Code

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

## Token Info

Access token details via `c.get('apiToken')`:

```typescript
app.post('/v1/webhook', hono.apiTokenMiddleware, (c) => {
  const token = c.get('apiToken')
  // {
  //   active: true,
  //   application_name: 'My App',
  //   token_name: 'GitHub Actions',
  //   app_data: { environment: 'production' },
  // }
  return c.json({ received: true })
})
```

## Token Management

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

## Security Best Practices

1. **Never expose tokens in client code**
2. **Use environment variables** - Store in CI/CD secrets
3. **Set appropriate expiration** - Rotate regularly
4. **Use descriptive names** - Makes auditing easier
5. **Revoke unused tokens** - Clean up old tokens
