# Getting Started

`cl` is a CLI tool to easily switch between multiple Cloudflare/Wrangler accounts.

## How It Works

1. Wrangler stores authentication at `~/.wrangler/config/default.toml`
2. `cl` saves copies of this file for each account
3. When switching, `cl` copies the saved config back
4. Before switching, any token updates are saved automatically

That's it! No complex setup, no environment variables to manage.

## Quick Start

```bash
# Install (choose one)
brew install groo-dev/tap/cl     # Homebrew
npm install -g @groo.dev/cl-wrangler  # npm
pip install cl-wrangler          # pip

# Save your current account
cl add

# Switch between accounts
cl switch
```

## Workflow Example

```bash
# Start with your personal account logged in
wrangler login
cl add  # Saves as "PersonalAccount"

# Add work account
wrangler login  # Login to work account
cl add  # Saves as "WorkAccount"

# Now switch between them
cl switch personal  # Switch to personal
cl switch work      # Switch to work

# Or use the interactive menu
cl switch
```
