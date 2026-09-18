import baseConfig from '@aning/eslint-config';

export default [
  ...baseConfig,
  {
    ignores: ['storybook-static/**'],
  },
];
