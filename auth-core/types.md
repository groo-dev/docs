# Types

Core TypeScript types used across the Groo Auth SDK.

## User

```typescript
interface User {
  id: string
  email: string | null
  phone: string | null
  name: string | null
  role: string
}
```

## ConsentedUser

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

## AuthConfig

Configuration for initializing the auth client:

```typescript
interface AuthConfig {
  clientId: string
  clientSecret?: string  // Required for server-side
  baseUrl?: string       // Default: 'https://accounts.groo.dev'
  cookieName?: string    // Default: 'session'
}
```

## UseAuthReturn

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
