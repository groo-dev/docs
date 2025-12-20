---
title: groo logs Command
description: View and follow logs for running services with groo logs. Tail logs with -f flag and control output lines.
keywords: [groo logs, view service logs, tail logs, log management, dev logs]
---

# logs

View logs for running services.

## Usage

```bash
groo logs [-f] [-n <lines>]
```

## Options

| Option | Description |
|--------|-------------|
| `-f, --follow` | Follow log output (like `tail -f`) |
| `-n <lines>` | Number of lines to show (default: 10) |

## Description

Shows logs for services running in the current project. Supports selecting specific services when multiple are running.
