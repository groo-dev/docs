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
