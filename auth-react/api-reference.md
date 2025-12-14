# API Reference

Complete reference for auth-react exports.

## AuthProvider

```tsx
<AuthProvider
  baseUrl={string}      // Required - Your API URL
  clientId={string}     // Required - Your client ID
  redirectUri={string}  // Required - Redirect after auth
>
  {children}
</AuthProvider>
```

## useAuth

```typescript
function useAuth(): {
  user: User | null
  isLoading: boolean
  error: Error | null
  loginUrl: string
  logoutUrl: string
  refetch: () => Promise<void>
}
```

## useUser

```typescript
function useUser(): {
  user: User | null
  isLoading: boolean
  error: Error | null
}
```

## LoginButton

```tsx
<LoginButton
  className?: string
  children: ReactNode
/>
```

## LogoutButton

```tsx
<LogoutButton
  className?: string
  children: ReactNode
/>
```

## RequireAuth

```tsx
<RequireAuth
  fallback?: ReactNode
  redirectTo?: string
>
  {children}
</RequireAuth>
```

## URL Formats

**Login URL:**
```
{accountsUrl}/login?client_id={clientId}&redirect_uri={currentPageUrl}
```

**Logout URL:**
```
{accountsUrl}/v1/auth/logout?redirect_uri={origin}
```
