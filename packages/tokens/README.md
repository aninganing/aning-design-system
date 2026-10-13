# @aninganing/tokens

aning 디자인 시스템의 디자인 토큰. Figma Tokens Studio → Style Dictionary로 생성한 CSS 변수와 JS 상수를
제공한다. 사내 전용으로 **GitHub Packages(비공개)**에 배포된다.

> `@aninganing/react`를 쓴다면 이 패키지를 따로 설치할 필요가 없다 — 토큰 CSS 변수가
> `@aninganing/react/style.css`에 이미 포함되어 있다. 컴포넌트 없이 토큰만 쓰는 경우(다른 UI 스택,
> 이메일 템플릿, 차트 색상 등)에 사용한다.

## 설치

레지스트리·인증 설정은 [`@aninganing/react` README](../components/README.md#설치)와 같다.

```bash
pnpm add @aninganing/tokens
```

## 사용법

### CSS 변수

```ts
import '@aninganing/tokens/css'; // light + dark ([data-theme="dark"]) 모두 포함
```

```css
.card {
  background: var(--color-bg-default);
  color: var(--color-text-default);
  padding: var(--space-4);
}
```

테마별 파일만 필요하면 `@aninganing/tokens/css/light`, `@aninganing/tokens/css/dark`를 쓴다.

### JS 상수

```ts
import { colorBlue500, space4 } from '@aninganing/tokens';
```

JS 상수는 테마와 무관한 고정 값이다. 테마에 따라 바뀌어야 하는 값은 CSS 변수를 쓴다.

## 토큰 계층

- **core** — 원시 값 (`--color-blue-500`, `--space-4`)
- **semantic** — 의미 기반, 테마에 따라 바뀜 (`--color-bg-default`, `--color-text-subtle`)
- **component** — 컴포넌트 전용 (`--button-*`, `--input-*`)

앱에서는 가능하면 **semantic** 토큰을 쓴다. core 값은 테마 전환에 반응하지 않는다.
