# aning-design-system

React 디자인 시스템 모노레포.
pnpm workspaces + Turborepo로 구성되어 있으며, Figma Tokens → Style Dictionary → CSS Variables/CSS Modules → React 컴포넌트로 이어지는 파이프라인을 따른다.

## 패키지

| 패키지                | 설명                                                               |
| --------------------- | ------------------------------------------------------------------ |
| `packages/tokens`     | 디자인 토큰 소스(Figma Tokens Studio 포맷) + Style Dictionary 빌드 |
| `packages/icons`      | SVG 아이콘 React 컴포넌트                                          |
| `packages/utils`      | 공용 훅/유틸리티                                                   |
| `packages/components` | 컴포넌트 라이브러리 본체 (`@aninganing/react`)                          |
| `packages/config-*`   | ESLint / TypeScript / Stylelint 공유 설정                          |
| `apps/storybook`      | 컴포넌트 워크샵/문서                                               |

## 시작하기

```bash
pnpm install
pnpm build
pnpm storybook
```

## 디자인 토큰

`packages/tokens/tokens/**`는 현재 더미 값으로 채워져 있다. Figma에서 Tokens Studio 플러그인으로 실제 팔레트가 확정되면 GitHub 동기화를 통해 이 폴더에 직접 반영하고, `pnpm --filter @aninganing/tokens build`로 CSS 변수/타입드 상수를 재생성한다.

## 배포

패키지는 [Changesets](https://github.com/changesets/changesets)로 버저닝하고 GitHub Packages(비공개)에 배포한다. 변경 시 `pnpm changeset`으로 변경 의도를 기록한다.
