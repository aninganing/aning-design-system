# @aninganing/tokens

## 0.2.0

### Minor Changes

- 581c378: Badge 컴포넌트 추가 (`tone` neutral/accent/success/danger, `size` sm/md). `badge.*` 컴포넌트 토큰과 semantic 토큰 `color.text.accent`(다크 blue-300), `color.success.default` 추가.
- 6c98d4d: Card 컴포넌트 추가 (`Card.Media`·`Card.Body`·`Card.Title` 조합, `outlined`/`elevated` variant, `interactive` hover). 제목 링크 하나의 클릭 영역과 포커스 링을 카드 전체로 넓힌다. `card.*` 컴포넌트 토큰 추가.
- 01437b0: Checkbox·CheckboxGroup 컴포넌트 추가. 네이티브 체크박스를 숨기고 그리는 방식으로 `label`, `description`(`aria-describedby`), `indeterminate`, `onCheckedChange`를 지원하고, `CheckboxGroup`은 `fieldset` + `legend`로 묶는다.

  - 조작 요소 경계용 semantic 토큰 `color.border.control`(gray-500, 두 테마 3:1 이상)과 `checkbox.*` 컴포넌트 토큰 추가.
  - 번들 맨 위에 `'use client'` 지시문을 붙여 Next.js App Router 등 React Server Components 환경에서 컴포넌트가 클라이언트 컴포넌트로 다뤄지도록 했다. 이벤트 핸들러를 내부에서 만드는 Chip·Checkbox를 서버 컴포넌트에서 렌더링할 때 나던 문제를 막는다.
  - `@aninganing/utils`를 다시 dependencies에 추가(`mergeRefs` 사용).

- 78a5f66: Chip 컴포넌트 추가. 토글형(`selected` + `onSelectedChange`, `aria-pressed`)과 제거형(`onRemove`, 라벨이 붙은 × 버튼), `size` sm/md. 선택 상태는 controlled로만 관리한다. `chip.*` 컴포넌트 토큰 추가.
- e0711b7: Skeleton 컴포넌트 추가 (`shape` text/rect/circle, `width`, `height`, `lines`, 1.4초 shimmer, 모션 감소 시 정지, `aria-hidden`). semantic 토큰 `color.bg.muted`(라이트 gray-100, 다크 gray-800)·`color.bg.muted-highlight`와 `skeleton.*` 컴포넌트 토큰 추가.
- 0d6ee66: Tabs 컴포넌트 추가 (Radix Tabs 기반). `Tabs.List`·`Tabs.Tab`(`count`)·`Tabs.Panel` 조합, `variant` line/pill, `activation` automatic/manual, `value`/`defaultValue`/`onValueChange`. `tabs.*` 컴포넌트 토큰 추가. `@radix-ui/react-tabs`(1.1.21 고정)를 dependencies에 추가하고 번들에서 외부화했다.

### Patch Changes

- 19891c1: 다크 테마 토큰이 라이트 값으로 빌드되던 버그 수정.

  - `variables-dark.css`(`[data-theme="dark"]`)의 모든 값이 라이트 값과 같아 다크 테마가 적용되지 않았다. Style Dictionary가 플랫폼별 `source`를 무시해 dark 플랫폼도 `semantic/light.json`으로 빌드되던 문제로, 테마마다 따로 빌드하도록 고쳤다.
  - `shadow.md`(`0 4px 6px -1px`)가 `0 4px 5px`로 잘못 계산되던 문제 수정. 그림자 토큰을 Tokens Studio의 `boxShadow` 형식으로 바꿨다.

## 0.1.0

### Minor Changes

- eb21386: Input 컴포넌트 추가 (size 프리셋, error 상태, leading/trailing 아이콘·텍스트 슬롯 지원). Input용 `input.adornment`/`input.gap` 컴포넌트 토큰 추가.

## 0.0.1

### Patch Changes

- a38eab8: 릴리즈 파이프라인(버전업 → Version Packages PR → 배포) 동작 검증용 changeset. 실제 코드 변경 없음.
