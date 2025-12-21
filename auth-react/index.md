---
title: auth-react - React Authentication SDK
sidebar_label: Overview
description: React components and hooks for authentication. AuthProvider, useAuth hook, LoginButton, LogoutButton, and RequireAuth components.
keywords: [React authentication, useAuth hook, AuthProvider, React auth components, login button]
---

# auth-react

React components and hooks for adding authentication to your frontend application.

## Features

- `AuthProvider` - Context provider for authentication state
- `useAuth` / `useUser` - Hooks for accessing user data
- `LoginButton` / `LogoutButton` - Pre-built authentication buttons
- `RequireAuth` - Component for protecting routes

## Installation

```bash
npm install @groo.dev/auth-react
```

## Quick Start

```tsx
import { AuthProvider, useAuth, LoginButton, LogoutButton } from '@groo.dev/auth-react'

// 1. Wrap your app
function App() {
  return (
    <AuthProvider
      baseUrl="http://localhost:8787"
      clientId="your-client-id"
      redirectUri="http://localhost:3000"
    >
      <YourApp />
    </AuthProvider>
  )
}

// 2. Use in components
function Header() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>

  return user ? (
    <>
      <span>Welcome, {user.name}</span>
      <LogoutButton>Sign Out</LogoutButton>
    </>
  ) : (
    <LoginButton>Sign In</LoginButton>
  )
}
```

## Requirements

- A backend API with `@groo.dev/auth-server` that handles session validation
- A registered application at accounts.groo.dev
