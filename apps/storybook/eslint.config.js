import baseConfig from '@aninganing/eslint-config';
import storybook from 'eslint-plugin-storybook';

export default [
  ...baseConfig,
  {
    ignores: ['storybook-static/**'],
  },
  ...storybook.configs['flat/recommended'],
];
