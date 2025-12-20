---
title: Groo CLI - Dev Server Manager for Monorepos
description: Command-line tool for managing dev servers in monorepos. Service discovery, interactive selection, parallel execution, and log management.
keywords: [Groo CLI, monorepo dev servers, service discovery, parallel execution, dev tool]
---

# Groo CLI

Groo CLI is a command-line tool for managing dev servers in monorepos.

## Features

- **Service Discovery** - Automatically finds all services with `dev` scripts
- **Interactive Selection** - Multi-select UI for choosing which services to run
- **Port Detection** - Smart detection for Next.js, Vite, Wrangler and more
- **Parallel Execution** - Run multiple services with color-coded output
- **Log Management** - View and tail logs for running services

## Quick Start

```bash
# Install via Homebrew
brew install groo-dev/tap/groo

# Start dev servers interactively
groo dev
```

## Commands

| Command | Description |
|---------|-------------|
| `groo dev` | Start dev servers interactively |
| `groo logs` | View service logs |
| `groo status` | Show status of services |
| `groo restart` | Restart running services |
| `groo stop` | Stop all services |
| `groo list` | List all projects with running services |
| `groo open <service>` | Open service URL in browser |
