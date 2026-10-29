# @aninganing/tokens

## 0.4.0

### Minor Changes

- d1cbad4: Alert 컴포넌트 추가. 화면 안에 머무는 안내로 `tone`(info·neutral·danger), `title`, `description`, `icon`(tone별 기본 아이콘, 교체·`null`로 숨김), `action`(오른쪽 슬롯), `live`(off·polite·assertive → 없음·`role="status"`·`role="alert"`, 기본 off). danger는 면을 칠하지 않고 테두리와 아이콘으로 표시한다. `alert.*` 컴포넌트 토큰을 추가했다.
- 7cf390a: Dialog 컴포넌트 추가 (Radix Dialog 기반). `variant`(`center` 가운데 창 · `sheet` 아래에서 올라오는 시트), `trigger` 또는 `open`/`defaultOpen`/`onOpenChange`, `title`·`description`(창 이름·설명), `dismissible`(Esc·바깥 클릭·닫기 버튼, 기본 true), `initialFocus`(기본은 제목에 포커스), `closeLabel`. 버튼 영역 `Dialog.Footer`는 본문 스크롤 밖에 고정되고 `layout`(`end`·`stretch`, 시트 기본 stretch)을 갖는다. `@radix-ui/react-dialog`(1.1.23 고정)를 dependencies에 추가했다. `dialog.*` 토큰에 border·gap·title·description·text·handle을 추가했다. 창 테두리(`border.default`)는 다크에서 창이 오버레이에 덮인 페이지와 구분되게 한다.
- 9cf5ef5: Field 컴포넌트 추가(합성형). `Field.Root`(`required`·`optional`·`invalid`·`fullWidth`), `Field.Label`, `Field.Control`, `Field.Helper`, `Field.Error`. `Field.Control`이 자식 컨트롤에 `id`·`aria-describedby`·`aria-invalid`·`required`를 얹어 Input, Textarea, 네이티브 select와 연결한다. 에러가 보이는 동안 헬퍼는 숨고, 필수 표시 `*`는 스크린 리더에 숨긴다. Input·Textarea는 `aria-invalid="true"`만으로도 에러 테두리가 된다. `field.*` 컴포넌트 토큰을 추가했다.
- 31a7c1d: IconButton 컴포넌트 추가. `aria-label` 필수, `variant`(ghost·outline·overlay), `size`(sm 32px·md 40px·lg 48px, 아이콘 16·20·24px), `shape`(square·round), 토글형 `pressed`/`onPressedChange`(`aria-pressed`, 켜지면 accent 색). `sm`은 터치 영역을 44px까지 넓힌다. outline 테두리는 `color.border.control`을 쓴다. `icon-button.*` 컴포넌트 토큰을 추가했다.
- cd5013f: NumberStepper 컴포넌트 추가. −·+ 원형 버튼과 가운데 값으로 작은 정수를 한 단계씩 바꾼다. `label`(그룹 이름, 버튼 이름 "~ 줄이기"·"~ 늘리기"), `value`/`defaultValue`/`onValueChange`, `min`(기본 1)·`max`·`step`(기본 1), `onClamp`(`max`·`min`이 바뀌어 값이 범위로 맞춰졌을 때), `disabled`, `size`(sm 32px·md 40px). `role="group"` + `<output aria-live="polite">` 방식이고, 한계에 닿아 비활성된 버튼의 포커스는 반대쪽 버튼으로 옮긴다. `number-stepper.*` 컴포넌트 토큰을 추가했다.
- d2df095: RadioCard 컴포넌트 추가. 카드 전체가 눌리는 단일 선택 컨트롤로 `RadioGroup` 안에 넣어 쓴다. `value`, `title`(라디오 이름), `description`·`aside`(오른쪽 슬롯, `aria-describedby`로 연결), `disabled`, `invalid`(골라 둔 항목이 더는 고를 수 없게 된 상태, 테두리로만 표시하고 이유는 `aria-describedby`로 연결). 원은 Radio와 같은 23px이고 포커스 링은 카드 바깥에 그린다. `radio-card.*` 컴포넌트 토큰과, accent-subtle 면 위 보조 글자용 semantic 토큰 `color.text.on-accent-subtle`(라이트 gray-600 / 다크 gray-300)을 추가했다.
- 6088ee8: Select 컴포넌트 추가 (Radix Select 기반). `options`(`{ value, label, disabled? }[]`), `value`/`defaultValue`/`onValueChange`, `placeholder`, `size`(sm·md·lg, Input과 같은 단계), `invalid`, `required`, `disabled`, `name`(숨긴 네이티브 select로 폼 제출), `open`/`onOpenChange`. 트리거는 Input과 같은 테두리·포커스·에러 표현이고 `Field.Control`로 라벨·설명이 연결된다. `@radix-ui/react-select`(2.3.7 고정)를 dependencies에 추가하고 `select.*` 컴포넌트 토큰을 추가했다.
- 6c8e051: Spinner 컴포넌트 추가. `size`(sm 16px·md 24px·lg 32px), `tone`(current·accent), 스크린 리더용 `label`(기본 "불러오는 중"), `delay`(기본 300ms, 그 전에는 그리지 않음). `role="status"` 영역에 회전 원(aria-hidden)과 숨긴 문구를 둔다. 모션 감소 설정에서는 멈추지 않고 2.4초 주기로 느리게 돈다. `spinner.*` 컴포넌트 토큰을 추가했다.
- dbaa132: Toast 추가 (Radix Toast 기반). 앱 루트의 `<Toaster />`(`offset`, `label`)와 어디서든 부르는 `toast({ message, icon?, action?: { label, onClick, altText? }, duration? })` 함수, `toast.dismiss(id)`. 기본 5초(action이 있으면 8초), hover·포커스 중 멈춤, 최대 3개(넘치면 가장 오래된 것부터 닫힘), 아래로 스와이프해 닫기, 모션 감소 시 페이드만. Toaster가 여러 개 마운트돼도 하나만 그린다. `@radix-ui/react-toast`(1.2.23 고정)를 dependencies에 추가하고, `toast.*` 컴포넌트 토큰과 반전 면 위 액션 글자용 semantic 토큰 `color.text.accent-on-inverse`(라이트 blue-300 / 다크 blue-700)를 추가했다.

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
