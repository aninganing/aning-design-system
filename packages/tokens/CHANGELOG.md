# @aninganing/tokens

## 0.3.1

### Patch Changes

- 1acab23: Input·Textarea 필드 테두리 대비 개선. `input.border.default`를 `color.border.default`(gray-200 / 다크 gray-700, 배경 대비 1.27:1 / 1.91:1)에서 조작 요소 경계용 `color.border.control`(gray-500, 4.83:1 / 4.12:1)로 바꿔 WCAG 1.4.11 기준(3:1)을 넘는다. `textarea.border.default`는 이 토큰을 참조해 함께 바뀐다.

## 0.3.0

### Minor Changes

- bb5dc63: Radio·RadioGroup 컴포넌트 추가. 네이티브 radio 기반으로 같은 `name`을 공유해 방향키 이동·폼 제출을 브라우저가 처리하고, `RadioGroup`(`fieldset` + `legend`, `role="radiogroup"`)이 `value`/`defaultValue`/`onValueChange`, `orientation`, `required`를 관리한다. `radio.*` 컴포넌트 토큰 추가.
- 4f4950c: Switch 컴포넌트 추가 (`<button role="switch" aria-checked>`, `label`·`description`, `checked`/`defaultChecked`/`onCheckedChange`, `size` sm/md). 라벨은 `<label htmlFor>`로 연결해 눌러도 토글되고, 설명은 이름에 섞이지 않게 `aria-describedby`로 연결한다. semantic 토큰 `color.control.thumb`(두 테마 흰색)과 `switch.*` 컴포넌트 토큰 추가.
- af0e65f: Textarea 컴포넌트 추가 (`error`, `description`, `height`(기본 96px, 손잡이로 크기 조절 불가), `maxLength` 카운터·`showCount`, `autoResize`·`maxRows`). 카운터는 `aria-describedby`로 연결하고 한도에 닿았을 때만 live 영역으로 알린다. `textarea.*` 컴포넌트 토큰은 `input.*` 토큰을 참조해 Input과 함께 바뀐다.
- c2fca99: Tooltip 컴포넌트 추가 (Radix Tooltip 기반). `content`, `side`, `align`, `delay`(기본 300ms), `open`/`defaultOpen`/`onOpenChange`. 두 테마 모두 반전 면(bg-inverse + text-inverse), 5px 화살표, 최대 너비 240px. hover·포커스로 열리고 Esc로 닫히며 트리거의 `aria-describedby`로 연결된다. `@radix-ui/react-tooltip`(1.2.16 고정)을 dependencies에 추가하고 `tooltip.*` 컴포넌트 토큰을 추가했다.

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
