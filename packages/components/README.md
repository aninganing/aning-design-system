# @aninganing/react

aning 디자인 시스템의 React 컴포넌트 라이브러리. 사내 전용으로 **GitHub Packages(비공개)**에
배포된다.

## 요구 사항

- React / React DOM **18 이상**
- ESM을 지원하는 번들러 (Vite, Next.js, webpack 5 등) — CommonJS 빌드는 제공하지 않는다
- CSS import를 처리할 수 있는 번들러 설정 (Vite·Next.js는 기본 지원)

## 설치

### 1. 레지스트리 설정

`@aninganing` 스코프 패키지는 GitHub Packages에서 받는다. 사용하는 앱의 루트에 `.npmrc`를 추가한다
(토큰은 여기에 넣지 않는다 — 이 파일은 커밋된다).

```ini
@aninganing:registry=https://npm.pkg.github.com
```

### 2. 인증

GitHub Packages는 **설치할 때도 인증이 필요**하다.

- **로컬 개발**: GitHub에서 `read:packages` 권한이 있는 Personal Access Token(classic)을 만들고,
  **사용자 홈**의 `~/.npmrc`에 추가한다.

  ```ini
  //npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxx
  ```

- **CI (GitHub Actions)**: 패키지 관리자가 패키지 설정 → *Manage Actions access*에 해당 앱 저장소를
  추가해야 한다. 그다음 워크플로에서 `GITHUB_TOKEN`으로 인증한다.

  ```yaml
  permissions:
    contents: read
    packages: read

  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        registry-url: https://npm.pkg.github.com
        scope: '@aninganing'
    - run: npm ci # pnpm/yarn을 쓰면 해당 설치 명령으로 바꾼다
      env:
        NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  ```

### 3. 패키지 설치

```bash
pnpm add @aninganing/react
# npm install @aninganing/react
```

## 사용법

### 스타일 불러오기 (필수)

JS 번들은 CSS를 자동으로 불러오지 않는다. 앱 진입점에서 **한 번** import한다. 디자인 토큰(CSS 변수)과
모든 컴포넌트 스타일이 이 파일 하나에 들어 있다.

```ts
// main.tsx (Vite) 또는 app/layout.tsx (Next.js App Router)
import '@aninganing/react/style.css';
```

### 글꼴 불러오기 (필수)

컴포넌트는 `Pretendard` 글꼴을 쓰도록 지정되어 있지만, **글꼴 파일은 패키지에 포함되어 있지 않다.**
불러오지 않으면 시스템 글꼴(`-apple-system`, `sans-serif`)로 대체된다. 이미 Pretendard를 쓰는 앱이라면
이 단계는 건너뛴다.

**CDN** — `index.html`(Next.js는 `app/layout.tsx`의 `<head>`)에 추가:

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard-dynamic-subset.css"
/>
```

**직접 호스팅** — 외부 CDN을 쓸 수 없는 환경이면 npm 패키지로 설치해 번들에 포함한다:

```bash
pnpm add pretendard
```

```ts
import 'pretendard/dist/web/static/pretendard-dynamic-subset.css';
```

두 방법 모두 dynamic subset이라 화면에 쓰인 글자가 속한 조각만 내려받는다. 가변 폰트
(`pretendard/dist/web/variable/...`)는 글꼴 이름이 `Pretendard Variable`이라 토큰과 맞지 않으므로 static
버전을 쓴다.

### 전역 reset (선택)

`body` 배경·글꼴·여백, `box-sizing`, 기본 `button` 스타일, `prefers-reduced-motion` 전역 처리를 포함한
reset은 **앱 전체 스타일을 바꾸므로 기본으로 포함되지 않는다.** 새로 만드는 앱처럼 디자인 시스템이
페이지 전체를 책임질 때만 추가한다. reset은 토큰 변수를 쓰므로 `style.css`와 함께 import한다.

```ts
import '@aninganing/react/style.css';
import '@aninganing/react/reset.css';
```

reset 없이도 컴포넌트 자체의 `box-sizing`, 글꼴, 모션 감소 처리는 각 컴포넌트가 스스로 보장한다.

### 컴포넌트

```tsx
import { Button, Input } from '@aninganing/react';

export function SearchForm() {
  return (
    <form>
      <Input placeholder="검색어" aria-label="검색어" />
      <Button variant="primary">검색</Button>
    </form>
  );
}
```

각 컴포넌트의 props와 예시는 Storybook을 참고한다.

### 다크 테마

테마는 `data-theme` 속성으로 전환한다. OS 설정(`prefers-color-scheme`)을 자동으로 따르지 않으므로,
따라가게 하려면 앱에서 속성을 설정한다.

```html
<html data-theme="dark">
```

```ts
const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.dataset.theme = dark ? 'dark' : 'light';
```

속성이 없으면 light 테마가 적용된다.

### 스타일 커스터마이징

- 모든 컴포넌트는 `className`/`style`을 받는다. 내부 클래스명은 CSS Modules 해시라 직접 겨냥하지 않는다.
- 색상·간격 등을 앱 단위로 바꾸려면 CSS 변수를 덮어쓴다 (예: `:root { --button-radius: 9999px; }`).
  변수 목록은 `@aninganing/tokens`를 참고한다.

## 알아둘 점

- **Next.js App Router**: 현재 컴포넌트는 서버 컴포넌트에서 바로 렌더링할 수 있다. `onClick` 같은
  이벤트 핸들러를 넘길 때는 일반 규칙대로 그 부모를 클라이언트 컴포넌트(`'use client'`)로 만든다.
- **버전**: Changesets로 관리한다. 0.x 동안에는 minor 버전에서도 동작이 바뀔 수 있으니 CHANGELOG를
  확인하고 올린다.
