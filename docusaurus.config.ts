import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const siteVersion = process.env.SITE_VERSION || 'dev';

const config: Config = {
  title: 'Groo Docs',
  tagline: 'Developer tools and authentication SDKs',
  favicon: 'img/favicon.svg',
  customFields: {
    siteVersion,
  },

  future: {
    v4: true,
  },

  url: 'https://docs.groo.dev',
  baseUrl: '/',

  organizationName: 'groo-dev',
  projectName: 'docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        // Disable default docs - we use multi-instance
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    // Groo AI sidebar
    [
      '@groo.dev/ai-docusaurus',
      {
        projectId: process.env.GROO_AI_PROJECT_ID,
        apiUrl: process.env.GROO_AI_API_URL,
        auth: {
          accountsUrl: process.env.GROO_ACCOUNTS_BASE_URL,
          clientId: process.env.GROO_AI_CLIENT_ID,
        },
      },
    ],
  ],

  plugins: [
    // Local search
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        indexBlog: false,
      },
    ],
    // Tools
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'groo-cli',
        path: 'groo-cli',
        routeBasePath: 'groo-cli',
        sidebarPath: './sidebars/groo-cli.ts',
        versions: {
          current: {
            label: '0.0.7',
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'record-release',
        path: 'record-release',
        routeBasePath: 'record-release',
        sidebarPath: './sidebars/record-release.ts',
        versions: {
          current: {
            label: '1.0.5',
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cl-wrangler',
        path: 'cl-wrangler',
        routeBasePath: 'cl-wrangler',
        sidebarPath: './sidebars/cl-wrangler.ts',
        versions: {
          current: {
            label: '0.2.1',
          },
        },
      },
    ],
    // Auth SDKs
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'auth',
        path: 'auth',
        routeBasePath: 'auth',
        sidebarPath: './sidebars/auth.ts',
      },
    ],
    // AI
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ai',
        path: 'ai',
        routeBasePath: 'ai',
        sidebarPath: './sidebars/ai.ts',
      },
    ],
  ],

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: 'groo, documentation, developer tools, authentication, SDK, CLI, React, Hono',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'author',
        content: 'Groo',
      },
    },
  ],

  themeConfig: {
    image: 'img/groo-social-card.png',
    metadata: [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'og:type', content: 'website' },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Groo Docs',
      logo: {
        alt: 'Groo Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Groo AI',
          position: 'left',
          items: [
            { to: '/ai', label: 'Overview' },
            { to: '/ai/getting-started', label: 'Getting Started' },
            { to: '/ai/react-sdk', label: 'ai-react' },
            { to: '/ai/core-sdk', label: 'ai-core' },
            { to: '/ai/docusaurus-plugin', label: 'ai-docusaurus' },
            { to: '/ai/api-reference', label: 'API Reference' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Tools',
          position: 'left',
          items: [
            { to: '/groo-cli', label: 'Groo CLI' },
            { to: '/record-release', label: 'record-release' },
            { to: '/cl-wrangler', label: 'cl-wrangler' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Auth SDKs',
          position: 'left',
          items: [
            { to: '/auth', label: 'Overview' },
            { to: '/auth/core-sdk', label: 'auth-core' },
            { to: '/auth/react-sdk', label: 'auth-react' },
            { to: '/auth/server-sdk', label: 'auth-server' },
          ],
        },
        {
          href: 'https://github.com/groo-dev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      logo: {
        alt: 'Groo',
        src: 'img/logo.svg',
        href: '/',
        width: 32,
        height: 32,
      },
      links: [
        {
          title: 'Groo AI',
          items: [
            { label: 'Overview', to: '/ai' },
            { label: 'Getting Started', to: '/ai/getting-started' },
            { label: 'ai-react', to: '/ai/react-sdk' },
            { label: 'ai-core', to: '/ai/core-sdk' },
            { label: 'ai-docusaurus', to: '/ai/docusaurus-plugin' },
            { label: 'API Reference', to: '/ai/api-reference' },
          ],
        },
        {
          title: 'Tools',
          items: [
            { label: 'Groo CLI', to: '/groo-cli' },
            { label: 'record-release', to: '/record-release' },
            { label: 'cl-wrangler', to: '/cl-wrangler' },
          ],
        },
        {
          title: 'Auth SDKs',
          items: [
            { label: 'Overview', to: '/auth' },
            { label: 'auth-core', to: '/auth/core-sdk' },
            { label: 'auth-react', to: '/auth/react-sdk' },
            { label: 'auth-server', to: '/auth/server-sdk' },
          ],
        },
        {
          title: 'Links',
          items: [
            { label: 'Groo Home', href: 'https://groo.dev' },
            { label: 'GitHub', href: 'https://github.com/groo-dev' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Groo. All rights reserved. v${siteVersion}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'toml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
