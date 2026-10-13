// Foundations MDX 문서에서 쓰는 헬퍼.
// MDX 안에 JSX를 반환하는 `export const`를 두면 VS Code MDX 확장이 파싱하지 못해
// ("Unexpected `ExpressionStatement` in code") 별도 파일로 분리했다.
import type { ReactNode } from 'react';
import * as tokens from '@aninganing/tokens';

/** 이름이 `prefix`로 시작하는 토큰 JS 상수 목록 */
export const byPrefix = (prefix: string) =>
  Object.entries(tokens).filter(([name]) => name.startsWith(prefix));

/** JS 상수 이름(`cardShadowHover`)을 CSS 변수 이름(`--card-shadow-hover`)으로 바꾼다 */
export const toCssVar = (name: string) =>
  `--${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;

export const Label = ({ children }: { children: ReactNode }) => (
  <code style={{ fontSize: 12, color: 'var(--color-text-subtle)' }}>{children}</code>
);

export const RadiusSwatch = ({ name, value, note }: { name: string; value: string; note?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
    <div
      style={{
        flex: 'none',
        width: 120,
        height: 72,
        borderRadius: `var(${toCssVar(name)})`,
        border: '2px solid var(--color-accent-default)',
        background: 'var(--color-accent-subtle)',
      }}
    />
    <div style={{ display: 'grid', gap: 4 }}>
      <code style={{ fontSize: 13 }}>
        {name} · {toCssVar(name)}
      </code>
      <code style={{ fontSize: 12, color: 'var(--color-text-subtle)' }}>{value}</code>
      {note && <span style={{ fontSize: 13 }}>{note}</span>}
    </div>
  </div>
);

export const ShadowSwatch =({ name, value, note }: { name: string; value: string; note?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
    <div
      style={{
        flex: 'none',
        width: 160,
        height: 96,
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-bg-default)',
        boxShadow: `var(${toCssVar(name)})`,
      }}
    />
    <div style={{ display: 'grid', gap: 4 }}>
      <code style={{ fontSize: 13 }}>
        {name} · {toCssVar(name)}
      </code>
      <code style={{ fontSize: 12, color: 'var(--color-text-subtle)' }}>{value}</code>
      {note && <span style={{ fontSize: 13 }}>{note}</span>}
    </div>
  </div>
);
