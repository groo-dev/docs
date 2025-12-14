# Prerequisites

Before using record-release, you need to set up your application in the Groo Ops Dashboard.

## What You Need

1. **A Groo Ops account** - Access to [ops.groo.dev](https://ops.groo.dev)
2. **A registered application** - Your app must be registered in the dashboard
3. **An API token** - A token with write permissions for recording deployments

## Setup Steps

1. [Register your application](/record-release/prerequisites/register-app) in the Ops dashboard
2. [Create an API token](/record-release/prerequisites/create-token) with write permissions
3. Add the token as a GitHub secret (`OPS_API_TOKEN`)

Once complete, you can use the action in your workflows.
