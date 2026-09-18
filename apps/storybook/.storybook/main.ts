import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dirName = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    join(dirName, '../../../packages/components/src/**/*.stories.@(ts|tsx)'),
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
