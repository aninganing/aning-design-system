import { readFileSync, writeFileSync } from 'node:fs';
import StyleDictionary from 'style-dictionary';
import config from './style-dictionary.config.mjs';

const sd = new StyleDictionary(config);

await sd.buildAllPlatforms();

const light = readFileSync(new URL('./build/css/variables-light.css', import.meta.url), 'utf8');
const dark = readFileSync(new URL('./build/css/variables-dark.css', import.meta.url), 'utf8');

writeFileSync(
  new URL('./build/css/variables.css', import.meta.url),
  `${light}\n${dark}\n`,
);

console.log('Built @aninganing/tokens: build/css/variables.css, build/js/tokens.js');
