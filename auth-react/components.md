---
title: auth-react Components
sidebar_label: Components
description: Pre-built React authentication components. LoginButton, LogoutButton for auth actions, and RequireAuth for protecting routes.
keywords: [LoginButton, LogoutButton, RequireAuth, protected routes, React auth components]
---

# Components

Pre-built React components for authentication.

## LoginButton

Links to the login URL:

```tsx
import { LoginButton } from '@groo.dev/auth-react'

function Header() {
  return (
    <nav>
      <LoginButton>Sign In</LoginButton>
    </nav>
  )
}
```

With custom styling:

```tsx
<LoginButton className="btn btn-primary">
  Get Started
</LoginButton>
```

## LogoutButton

Links to the logout URL:

```tsx
import { LogoutButton } from '@groo.dev/auth-react'

function Header() {
  return (
    <nav>
      <LogoutButton>Sign Out</LogoutButton>
    </nav>
  )
}
```

## RequireAuth

Protects content by only rendering children when authenticated:

```tsx
import { RequireAuth } from '@groo.dev/auth-react'

function Dashboard() {
  return (
    <RequireAuth fallback={<div>Loading...</div>}>
      <DashboardContent />
    </RequireAuth>
  )
}
```

With redirect to login:

```tsx
<RequireAuth redirectTo="/login">
  <ProtectedContent />
</RequireAuth>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Content to show when authenticated |
| `fallback` | `ReactNode` | Content to show while loading or unauthenticated |
| `redirectTo` | `string` | URL to redirect to if not authenticated |

## Complete Example

```tsx
import { useAuth, LoginButton, LogoutButton, RequireAuth } from '@groo.dev/auth-react'

function App() {
  const { user, isLoading, error } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <header>
        <h1>My App</h1>
        {user ? (
          <div>
            <span>Hello, {user.name || user.email}</span>
            <LogoutButton>Sign Out</LogoutButton>
          </div>
        ) : (
          <LoginButton>Sign In</LoginButton>
        )}
      </header>

      <main>
        <RequireAuth fallback={<p>Please sign in to continue</p>}>
          <Dashboard user={user} />
        </RequireAuth>
      </main>
    </div>
  )
}
```
