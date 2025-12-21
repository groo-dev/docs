import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const siteVersion = process.env.SITE_VERSION || 'dev';

// Map of application IDs to local identifiers
const APP_ID_MAP: Record<string, string> = {
  'dd39c80f-595b-4893-ad5c-388682663e42': 'groo-cli',
  '4e6983c4-166a-4790-939b-f841c2f5478d': 'record-release',
  '262a04e2-f8d8-4ad6-9306-75b1ac8e1c63': 'cl-wrangler',
  '303b2004-cfbf-438b-af7f-81cae6e1edbc': 'auth-core',
  '628da7c8-86a2-459d-82cd-4cd769108edb': 'auth-react',
  '598f34a4-bbcb-43e4-add0-9c949e620caa': 'auth-server',
  'cd3f75c2-22fb-458d-a845-fe2e409c7e61': 'ai-react',
  '55cb16c6-1eda-4c03-8949-04d5d59a4385': 'ai-core',
  '5c962a5e-ae00-40c9-9e07-137bcb8bb2be': 'ai-docusaurus',
  '40a6af66-231b-4203-bb54-5a718136f2a3': 'ai-api',
};

type Versions = Record<string, string>;

const DEFAULT_VERSIONS: Versions = {
  'groo-cli': '0.0.0',
  'record-release': '0.0.0',
  'cl-wrangler': '0.0.0',
  'auth-core': '0.0.0',
  'auth-react': '0.0.0',
  'auth-server': '0.0.0',
  'ai-react': '0.0.0',
  'ai-core': '0.0.0',
  'ai-docusaurus': '0.0.0',
  'ai-api': '0.0.0',
};

async function fetchVersions(): Promise<Versions> {
  const pat = process.env.GROO_PAT;

  if (!pat) {
    console.log('[versions] GROO_PAT not set, using defaults');
    return DEFAULT_VERSIONS;
  }

  try {
    const response = await fetch('https://ops.groo.dev/v1/versions', {
      headers: {
        accept: 'application/json',
        cookie: `session=${pat}`,
      },
    });

    if (!response.ok) {
      console.error(`[versions] Failed to fetch: ${response.status}`);
      return DEFAULT_VERSIONS;
    }

    const data = await response.json();
    const versions: Versions = { ...DEFAULT_VERSIONS };

    for (const item of data.versions) {
      const appId = item.application.id;
      const localName = APP_ID_MAP[appId];
      if (localName && item.production) {
        versions[localName] = item.production.version;
      }
    }

    console.log('[versions] Fetched:', versions);
    return versions;
  } catch (error) {
    console.error('[versions] Error:', error);
    return DEFAULT_VERSIONS;
  }
}

export default async function createConfig(): Promise<Config> {
  const versions = await fetchVersions();

  return {
    title: 'Groo Docs',
    tagline: 'Developer tools and authentication SDKs',
    favicon: 'img/favicon.svg',
    customFields: {
      siteVersion,
      versions,
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
              label: versions['groo-cli'],
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
              label: versions['record-release'],
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
              label: versions['cl-wrangler'],
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
}
