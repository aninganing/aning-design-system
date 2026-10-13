---
"@aninganing/react": minor
"@aninganing/tokens": minor
---

Checkbox·CheckboxGroup 컴포넌트 추가. 네이티브 체크박스를 숨기고 그리는 방식으로 `label`, `description`(`aria-describedby`), `indeterminate`, `onCheckedChange`를 지원하고, `CheckboxGroup`은 `fieldset` + `legend`로 묶는다.

- 조작 요소 경계용 semantic 토큰 `color.border.control`(gray-500, 두 테마 3:1 이상)과 `checkbox.*` 컴포넌트 토큰 추가.
- 번들 맨 위에 `'use client'` 지시문을 붙여 Next.js App Router 등 React Server Components 환경에서 컴포넌트가 클라이언트 컴포넌트로 다뤄지도록 했다. 이벤트 핸들러를 내부에서 만드는 Chip·Checkbox를 서버 컴포넌트에서 렌더링할 때 나던 문제를 막는다.
- `@aninganing/utils`를 다시 dependencies에 추가(`mergeRefs` 사용).
