import { readFileSync, writeFileSync } from 'node:fs';
import StyleDictionary from 'style-dictionary';
import { createConfig, themes } from './style-dictionary.config.mjs';

for (const theme of themes) {
  const sd = new StyleDictionary(createConfig(theme));
  await sd.buildAllPlatforms();
}

const css = themes.map((theme) =>
  readFileSync(new URL(`./build/css/variables-${theme}.css`, import.meta.url), 'utf8'),
);

writeFileSync(new URL('./build/css/variables.css', import.meta.url), `${css.join('\n')}\n`);

console.log('Built @aninganing/tokens: build/css/variables.css, build/js/tokens.js');
