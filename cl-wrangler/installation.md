---
title: Installing cl-wrangler
sidebar_label: Installation
description: Install cl-wrangler via Homebrew, npm, pip, or from releases. Enable shell completions for Zsh, Bash, and Fish.
keywords: [cl-wrangler install, Homebrew install, npm install, shell completions]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

Choose your preferred installation method.

## Homebrew (macOS/Linux)

```bash
brew install groo-dev/tap/cl
```

## npm

```bash
npm install -g @groo.dev/cl-wrangler
```

## pip

```bash
pip install cl-wrangler
```

## From Releases

Download the latest binary from [GitHub Releases](https://github.com/groo-dev/cl-wrangler/releases):

<Tabs>
  <TabItem value="macos-arm" label="macOS (Apple Silicon)" default>

```bash
curl -L https://github.com/groo-dev/cl-wrangler/releases/latest/download/cl_darwin_arm64.tar.gz | tar xz
sudo mv cl /usr/local/bin/
```

  </TabItem>
  <TabItem value="macos-intel" label="macOS (Intel)">

```bash
curl -L https://github.com/groo-dev/cl-wrangler/releases/latest/download/cl_darwin_amd64.tar.gz | tar xz
sudo mv cl /usr/local/bin/
```

  </TabItem>
  <TabItem value="linux" label="Linux (amd64)">

```bash
curl -L https://github.com/groo-dev/cl-wrangler/releases/latest/download/cl_linux_amd64.tar.gz | tar xz
sudo mv cl /usr/local/bin/
```

  </TabItem>
</Tabs>

## From Source

```bash
git clone https://github.com/groo-dev/cl-wrangler.git
cd cl-wrangler/cli
go build -o cl
sudo mv cl /usr/local/bin/
```

## Shell Completions

Enable tab completion for your shell:

<Tabs>
  <TabItem value="zsh" label="Zsh" default>

```bash
# Add to ~/.zshrc
eval "$(cl completion zsh)"

# Or generate to file
cl completion zsh > "${fpath[1]}/_cl"
```

  </TabItem>
  <TabItem value="bash" label="Bash">

```bash
# Add to ~/.bashrc
eval "$(cl completion bash)"
```

  </TabItem>
  <TabItem value="fish" label="Fish">

```bash
cl completion fish | source
```

  </TabItem>
</Tabs>
