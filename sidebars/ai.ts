import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  sidebar: [
    'index',
    'getting-started',
    'dashboard',
    {
      type: 'category',
      label: 'SDKs',
      items: [
        'react-sdk',
        'core-sdk',
        'docusaurus-plugin',
      ],
    },
    'api-reference',
  ],
};

export default sidebars;
