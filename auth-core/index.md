---
title: auth-core - Core Types and Utilities
sidebar_label: Overview
description: Core TypeScript types and AuthClient class for Groo Auth SDK. Shared utilities for React and server authentication packages.
keywords: [auth-core, TypeScript types, AuthClient, authentication utilities, Groo Auth]
---

# auth-core

Core types and utilities for the Groo Auth SDK.

## Installation

```bash
npm install @groo.dev/auth-core
```

:::note
This package is automatically included when you install `@groo.dev/auth-react` or `@groo.dev/auth-server`. You typically don't need to install it directly.
:::

## Overview

`auth-core` provides TypeScript types and the `AuthClient` class used by both the React and server packages. It ensures type consistency across your frontend and backend.

## When to Use Directly

You might import from `auth-core` directly when:

- You need type definitions without the full React or server package
- You're building custom integrations
- You need the `AuthClient` for custom authentication flows
