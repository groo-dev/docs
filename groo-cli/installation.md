---
title: Installing Groo CLI
description: Install Groo CLI via Homebrew or from source. Quick setup for managing monorepo dev servers.
keywords: [Groo CLI install, Homebrew install, Rust CLI, dev server tool]
---

# Installation

## Homebrew (Recommended)

```bash
brew install groo-dev/tap/groo
```

## From Source

Requires Rust toolchain:

```bash
git clone https://github.com/groo-dev/cli
cd cli
cargo install --path .
```

## Verify Installation

```bash
groo --version
```
