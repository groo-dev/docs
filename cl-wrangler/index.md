# cl-wrangler

Switch between multiple Cloudflare/Wrangler accounts in seconds.

## Why?

If you work with multiple Cloudflare accounts (personal projects, client work, different organizations), you know the pain of logging in and out of Wrangler. `cl` solves this by:

- Saving your Wrangler authentication configs
- Letting you switch between them instantly
- Auto-saving token updates before switching

## Quick Start

```bash
# Install
brew install groo-dev/tap/cl

# Save your current account
cl add

# Switch between accounts
cl switch
```

## Features

| Feature | Description |
|---------|-------------|
| **Quick Switch** | Switch between accounts with fuzzy matching |
| **Interactive Mode** | Browse and select from a menu |
| **Auto-Save** | Token updates are saved before switching |
| **One-Stop Menu** | Add, remove, and switch from a single command |
