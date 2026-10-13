import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

const coreAndComponentSources = ['tokens/core/**/*.json', 'tokens/component/**/*.json'];

const selectors = {
  light: ':root, [data-theme="light"]',
  dark: '[data-theme="dark"]',
};

export const themes = Object.keys(selectors);

/**
 * 테마 하나를 빌드하는 Style Dictionary 설정.
 *
 * Style Dictionary는 `source`를 설정 최상위에서만 읽고 플랫폼별 `source`는 무시한다. 그래서 테마마다
 * 설정(= Style Dictionary 인스턴스)을 따로 만들어야 semantic 레이어가 테마별로 바뀐다. 한 설정에 플랫폼만
 * 나눠 두면 모든 플랫폼이 같은 semantic 파일로 빌드된다(다크가 라이트 값으로 나오던 버그).
 */
export function createConfig(theme) {
  const platforms = {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'build/css/',
      files: [
        {
          destination: `variables-${theme}.css`,
          format: 'css/variables',
          options: { selector: selectors[theme] },
        },
      ],
    },
  };

  // JS 상수는 테마와 무관한 기본값(light)만 낸다 — 테마별 값은 CSS 변수로 쓴다.
  if (theme === 'light') {
    platforms.js = {
      transformGroup: 'tokens-studio',
      transforms: ['name/camel'],
      buildPath: 'build/js/',
      files: [
        { destination: 'tokens.js', format: 'javascript/es6' },
        { destination: 'tokens.d.ts', format: 'typescript/es6-declarations' },
      ],
    };
  }

  return {
    source: [...coreAndComponentSources, `tokens/semantic/${theme}.json`],
    preprocessors: ['tokens-studio'],
    platforms,
  };
}
