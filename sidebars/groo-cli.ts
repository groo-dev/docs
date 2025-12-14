import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  sidebar: [
    'index',
    'installation',
    {
      type: 'category',
      label: 'Commands',
      items: [
        'commands/dev',
        'commands/logs',
        'commands/status',
        'commands/other',
      ],
    },
    'configuration',
  ],
};

export default sidebars;
