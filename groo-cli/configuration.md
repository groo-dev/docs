---
title: Groo CLI Configuration
sidebar_label: Configuration
description: Configure Groo CLI options and port detection for Next.js, Vite, and Wrangler. State directory and global settings.
keywords: [Groo CLI config, port detection, Next.js port, Vite config, Wrangler config]
---

# Configuration

## Global Options

| Option | Description |
|--------|-------------|
| `-w, --workdir <path>` | Set working directory |

## Port Detection

Groo CLI automatically detects ports for common frameworks:

- **Next.js**: Reads `-p` or `--port` flags, defaults to 3000
- **Vite**: Reads `vite.config.ts/js` for port configuration
- **Wrangler**: Reads `wrangler.jsonc` or `wrangler.toml`

## State Directory

Groo stores state in `~/.config/groo/` or `~/.groo/`:
- Process IDs for running services
- Log files per service
