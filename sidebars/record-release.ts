import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  sidebar: [
    'index',
    {
      type: 'category',
      label: 'Prerequisites',
      items: [
        'prerequisites/index',
        'prerequisites/register-app',
        'prerequisites/create-token',
      ],
    },
    {
      type: 'category',
      label: 'Quick Start',
      items: [
        'quick-start/single-job',
        'quick-start/multi-job',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/versioning',
        'features/github-releases',
        'features/artifacts',
      ],
    },
    'configuration',
    'examples',
  ],
};

export default sidebars;
