# Hooks

React hooks for accessing authentication state.

## useAuth

The primary hook for accessing authentication state and URLs:

```tsx
import { useAuth } from '@groo.dev/auth-react'

function Profile() {
  const { user, isLoading, error, loginUrl, logoutUrl, refetch } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <a href={loginUrl}>Sign In</a>

  return (
    <div>
      <h1>Welcome, {user.name || user.email}!</h1>
      <a href={logoutUrl}>Sign Out</a>
    </div>
  )
}
```

### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `user` | `User \| null` | Current authenticated user |
| `isLoading` | `boolean` | Whether auth state is loading |
| `error` | `Error \| null` | Error if auth fetch failed |
| `loginUrl` | `string` | Generated login URL |
| `logoutUrl` | `string` | Generated logout URL |
| `refetch` | `() => Promise<void>` | Manually refetch user data |

## useUser

Alternative hook that returns only user data (without URLs):

```tsx
import { useUser } from '@groo.dev/auth-react'

function Avatar() {
  const { user, isLoading, error } = useUser()

  if (isLoading || !user) return null

  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
    </div>
  )
}
```

## Manual Refetch

Refetch user data after an action:

```tsx
function UpdateProfile() {
  const { refetch } = useAuth()

  async function handleUpdate() {
    await updateProfileAPI()
    await refetch() // Refresh user data
  }

  return <button onClick={handleUpdate}>Update</button>
}
```

## User Object

```typescript
interface User {
  id: string
  email: string | null
  phone: string | null
  name: string | null
  role: string
}
```
