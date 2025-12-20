---
title: groo dev Command
description: Start dev servers interactively with groo dev. Discover services, select which to run, and get color-coded parallel output.
keywords: [groo dev, start dev servers, interactive selection, monorepo dev command]
---

# dev

Start dev servers interactively.

## Usage

```bash
groo dev
```

## Description

The `dev` command discovers all services in your monorepo with `dev` scripts and presents an interactive selection menu. Selected services are started in parallel with color-coded output.

## Features

- Automatically discovers services with `dev` scripts in `package.json`
- Shows running status based on port detection
- Auto-selects services that aren't currently running
- Color-coded output for each service
