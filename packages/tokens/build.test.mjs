import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// 테스트 전에 토큰을 새로 빌드한다 (build.mjs는 import 시 빌드를 실행한다).
await import('./build.mjs');

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const json = (path) => JSON.parse(read(path));

const cssVar = (css, name) => css.match(new RegExp(`--${name}: ([^;]+);`))?.[1];

// `{color.gray.950}` 같은 core 참조를 실제 값으로 푼다
const core = json('./tokens/core/color.json');
const resolve = (ref) =>
  ref
    .slice(1, -1)
    .split('.')
    .reduce((node, key) => node[key], core).$value;

for (const theme of ['light', 'dark']) {
  test(`${theme} CSS의 semantic 색이 semantic/${theme}.json 값과 같다`, () => {
    const css = read(`./build/css/variables-${theme}.css`);
    const semantic = json(`./tokens/semantic/${theme}.json`).color;

    for (const [group, tokens] of Object.entries(semantic)) {
      for (const [key, token] of Object.entries(tokens)) {
        const name = `color-${group}-${key}`;
        assert.equal(cssVar(css, name)?.toLowerCase(), resolve(token.$value).toLowerCase(), name);
      }
    }
  });
}

test('variables.css는 light와 dark 선택자를 모두 포함한다', () => {
  const css = read('./build/css/variables.css');
  assert.match(css, /:root, \[data-theme="light"\] \{/);
  assert.match(css, /\[data-theme="dark"\] \{/);
});

test('그림자 값의 음수 spread가 계산되지 않고 그대로 나온다', () => {
  const css = read('./build/css/variables-light.css');
  assert.equal(cssVar(css, 'shadow-md'), '0 4px 6px -1px rgba(0, 0, 0, 0.15)');
});
