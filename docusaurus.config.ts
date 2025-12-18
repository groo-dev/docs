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
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'auth-core',
        path: 'auth-core',
        routeBasePath: 'auth-core',
        sidebarPath: './sidebars/auth-core.ts',
        versions: {
          current: {
            label: '0.2.2',
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'auth-react',
        path: 'auth-react',
        routeBasePath: 'auth-react',
        sidebarPath: './sidebars/auth-react.ts',
        versions: {
          current: {
            label: '0.2.3',
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'auth-server',
        path: 'auth-server',
        routeBasePath: 'auth-server',
        sidebarPath: './sidebars/auth-server.ts',
        versions: {
          current: {
            label: '0.7.4',
          },
        },
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
          to: '/ai',
          label: 'Groo AI',
          position: 'left',
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
            { to: '/auth-core', label: 'auth-core' },
            { to: '/auth-react', label: 'auth-react' },
            { to: '/auth-server', label: 'auth-server' },
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
            { label: 'React SDK', to: '/ai/react-sdk' },
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
            { label: 'auth-core', to: '/auth-core' },
            { label: 'auth-react', to: '/auth-react' },
            { label: 'auth-server', to: '/auth-server' },
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
