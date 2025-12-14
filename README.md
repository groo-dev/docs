# Groo Docs

Documentation site for Groo developer tools and authentication SDKs.

**Live site:** [docs.groo.dev](https://docs.groo.dev)

## Documentation

| Project | Description |
|---------|-------------|
| [Groo CLI](/groo-cli) | Development CLI for managing monorepo services |
| [record-release](/record-release) | GitHub Action for recording releases |
| [cl-wrangler](/cl-wrangler) | Multi-account Cloudflare Wrangler |
| [auth-core](/auth-core) | Core authentication types and utilities |
| [auth-react](/auth-react) | React hooks and components for authentication |
| [auth-server](/auth-server) | Server-side authentication for Hono |

## Development

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run start
```

> Note: Search only works in production builds.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run serve
```

## Project Structure

```
docs/
├── groo-cli/          # Groo CLI documentation
├── record-release/    # record-release documentation
├── cl-wrangler/       # cl-wrangler documentation
├── auth-core/         # auth-core documentation
├── auth-react/        # auth-react documentation
├── auth-server/       # auth-server documentation
├── src/
│   ├── css/           # Custom styles
│   └── pages/         # Custom pages (homepage)
├── static/            # Static assets
├── sidebars/          # Sidebar configs for each project
└── docusaurus.config.ts
```

## License

MIT
