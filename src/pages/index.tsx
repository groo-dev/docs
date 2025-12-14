import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import styles from './index.module.css'

// Icons as components
const TerminalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const CloudIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const ServerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
)

type ProductCard = {
  title: string
  description: string
  link: string
  version: string
  icon: React.ReactNode
  color: 'teal' | 'purple'
}

const tools: ProductCard[] = [
  {
    title: 'Groo CLI',
    description: 'Development CLI for managing monorepo services. Run dev servers, view logs, and manage deployments.',
    link: '/groo-cli',
    version: '0.0.5',
    icon: <TerminalIcon />,
    color: 'teal',
  },
  {
    title: 'record-release',
    description: 'GitHub Action for recording releases. Track versions and manage deployments automatically.',
    link: '/record-release',
    version: '1.0.5',
    icon: <RocketIcon />,
    color: 'teal',
  },
  {
    title: 'cl-wrangler',
    description: 'Multi-account Cloudflare Wrangler. Switch between accounts without re-authenticating.',
    link: '/cl-wrangler',
    version: '0.1.16',
    icon: <CloudIcon />,
    color: 'teal',
  },
]

const authSdks: ProductCard[] = [
  {
    title: 'auth-core',
    description: 'Core authentication types and utilities shared across auth packages.',
    link: '/auth-core',
    version: '0.2.1',
    icon: <ShieldIcon />,
    color: 'purple',
  },
  {
    title: 'auth-react',
    description: 'React hooks and components for authentication. useAuth, AuthProvider, and more.',
    link: '/auth-react',
    version: '0.2.2',
    icon: <CodeIcon />,
    color: 'purple',
  },
  {
    title: 'auth-server',
    description: 'Server-side authentication for Hono. Session validation and API token support.',
    link: '/auth-server',
    version: '0.7.3',
    icon: <ServerIcon />,
    color: 'purple',
  },
]

function ProductCard({ title, description, link, version, icon, color }: ProductCard) {
  return (
    <Link to={link} className={`${styles.card} ${styles[color]}`}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3>{title}</h3>
          <span className={styles.version}>v{version}</span>
        </div>
        <p>{description}</p>
      </div>
    </Link>
  )
}

function ProductSection({
  title,
  subtitle,
  products
}: {
  title: string
  subtitle: string
  products: ProductCard[]
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </div>
    </section>
  )
}

export default function Home(): React.JSX.Element {
  return (
    <Layout title="Home" description="Developer documentation for Groo tools and SDKs">
      <div className={styles.wrapper}>
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>Documentation</div>
            <h1><span className={styles.gradient}>Groo</span> Docs</h1>
            <p>
              Guides and references for Groo's developer tools and SDKs.
            </p>
            <div className={styles.heroActions}>
              <Link to="/groo-cli" className={styles.primaryButton}>
                Get Started
              </Link>
              <Link to="https://github.com/groo-dev" className={styles.secondaryButton}>
                View on GitHub
              </Link>
            </div>
          </div>
          <div className={styles.heroPattern} />
        </header>

        <main className={styles.main}>
          <div className={styles.container}>
            <ProductSection
              title="Developer Tools"
              subtitle="CLI tools and automation for your development workflow"
              products={tools}
            />
            <ProductSection
              title="Authentication SDKs"
              subtitle="Secure, privacy-first auth for your applications"
              products={authSdks}
            />
          </div>
        </main>
      </div>
    </Layout>
  )
}
