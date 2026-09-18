import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

const coreAndComponentSources = [
  'tokens/core/**/*.json',
  'tokens/component/**/*.json',
];

export default {
  source: [...coreAndComponentSources, 'tokens/semantic/light.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    cssLight: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      preprocessors: ['tokens-studio'],
      source: [...coreAndComponentSources, 'tokens/semantic/light.json'],
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables-light.css',
          format: 'css/variables',
          options: { selector: ':root, [data-theme="light"]' },
        },
      ],
    },
    cssDark: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      preprocessors: ['tokens-studio'],
      source: [...coreAndComponentSources, 'tokens/semantic/dark.json'],
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables-dark.css',
          format: 'css/variables',
          options: { selector: '[data-theme="dark"]' },
        },
      ],
    },
    js: {
      transformGroup: 'tokens-studio',
      transforms: ['name/camel'],
      preprocessors: ['tokens-studio'],
      source: [...coreAndComponentSources, 'tokens/semantic/light.json'],
      buildPath: 'build/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
  },
};
