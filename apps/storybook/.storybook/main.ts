import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dirName = dirname(fileURLToPath(import.meta.url));

// pnpm 모노레포에서 애드온·프레임워크를 이 앱의 node_modules 기준으로 정확히 찾기 위한 Storybook 권장 방식
const getAbsolutePath = (value: string): string =>
  dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    join(dirName, '../../../packages/components/src/**/*.stories.@(ts|tsx)'),
  ],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-themes'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
};

export default config;
