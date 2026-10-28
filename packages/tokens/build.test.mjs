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

// 컴포넌트 그림자 토큰을 `$type: "other"`로 두면 참조한 값을 문자열로 받아 다시 계산해 버린다.
// 그림자를 참조하는 토큰은 `boxShadow` 타입이어야 core 값과 같게 나온다.
test('컴포넌트 그림자 토큰이 참조한 core 그림자 값과 같다', () => {
  const css = read('./build/css/variables-light.css');
  const expected = {
    'dialog-shadow': 'shadow-md',
    'card-shadow-elevated': 'shadow-sm',
    'card-shadow-hover': 'shadow-md',
    'tabs-pill-shadow': 'shadow-sm',
    'switch-thumb-shadow': 'shadow-sm',
    'tooltip-shadow': 'shadow-md',
    'icon-button-shadow-overlay': 'shadow-sm',
    'select-content-shadow': 'shadow-md',
    'toast-shadow': 'shadow-md',
  };
  for (const [name, core] of Object.entries(expected)) {
    assert.equal(cssVar(css, name), cssVar(css, core), name);
  }
});
