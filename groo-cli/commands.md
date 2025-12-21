---
title: Groo CLI Commands
sidebar_label: Commands
description: Complete reference for groo CLI commands. dev, logs, status, restart, stop, list, and open commands for managing dev servers.
keywords: [groo commands, dev servers, service management, monorepo dev command]
---

# Commands

## dev

Start dev servers interactively.

```bash
groo dev
```

The `dev` command discovers all services in your monorepo with `dev` scripts and presents an interactive selection menu. Selected services are started in parallel with color-coded output.

**Features:**
- Automatically discovers services with `dev` scripts in `package.json`
- Shows running status based on port detection
- Auto-selects services that aren't currently running
- Color-coded output for each service

## logs

View logs for running services.

```bash
groo logs [-f] [-n <lines>]
```

| Option | Description |
|--------|-------------|
| `-f, --follow` | Follow log output (like `tail -f`) |
| `-n <lines>` | Number of lines to show (default: 10) |

Shows logs for services running in the current project. Supports selecting specific services when multiple are running.

## status

Show status of services in the current project.

```bash
groo status
```

Displays which services are currently running in the project, including their PIDs and ports.

## restart

Restart running services.

```bash
groo restart
```

## stop

Stop all services in the current project.

```bash
groo stop
```

## list

List all projects with running services.

```bash
groo list
```

## open

Open a service URL in your browser.

```bash
groo open <service>
```
