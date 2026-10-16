# @aninganing/react

## 0.4.1

### Patch Changes

- Updated dependencies [1acab23]
  - @aninganing/tokens@0.3.1

## 0.4.0

### Minor Changes

- bb5dc63: Radio·RadioGroup 컴포넌트 추가. 네이티브 radio 기반으로 같은 `name`을 공유해 방향키 이동·폼 제출을 브라우저가 처리하고, `RadioGroup`(`fieldset` + `legend`, `role="radiogroup"`)이 `value`/`defaultValue`/`onValueChange`, `orientation`, `required`를 관리한다. `radio.*` 컴포넌트 토큰 추가.
- 4f4950c: Switch 컴포넌트 추가 (`<button role="switch" aria-checked>`, `label`·`description`, `checked`/`defaultChecked`/`onCheckedChange`, `size` sm/md). 라벨은 `<label htmlFor>`로 연결해 눌러도 토글되고, 설명은 이름에 섞이지 않게 `aria-describedby`로 연결한다. semantic 토큰 `color.control.thumb`(두 테마 흰색)과 `switch.*` 컴포넌트 토큰 추가.
- af0e65f: Textarea 컴포넌트 추가 (`error`, `description`, `height`(기본 96px, 손잡이로 크기 조절 불가), `maxLength` 카운터·`showCount`, `autoResize`·`maxRows`). 카운터는 `aria-describedby`로 연결하고 한도에 닿았을 때만 live 영역으로 알린다. `textarea.*` 컴포넌트 토큰은 `input.*` 토큰을 참조해 Input과 함께 바뀐다.
- c2fca99: Tooltip 컴포넌트 추가 (Radix Tooltip 기반). `content`, `side`, `align`, `delay`(기본 300ms), `open`/`defaultOpen`/`onOpenChange`. 두 테마 모두 반전 면(bg-inverse + text-inverse), 5px 화살표, 최대 너비 240px. hover·포커스로 열리고 Esc로 닫히며 트리거의 `aria-describedby`로 연결된다. `@radix-ui/react-tooltip`(1.2.16 고정)을 dependencies에 추가하고 `tooltip.*` 컴포넌트 토큰을 추가했다.

### Patch Changes

- 50e322d: Checkbox 수정 두 가지.

  - 접근 가능한 이름에 `description`이 섞이던 문제. `<label>`이 설명까지 감싸 이름이 "라벨 + 설명"이 되고 설명이 `aria-describedby`로 한 번 더 읽혔다. 입력 요소를 `aria-labelledby`로 라벨 글자에만 연결한다.
  - 체크 상자 크기를 테두리 포함 23px로 명시(`box-sizing: border-box`). 지금까지는 `box-sizing`이 지정되지 않아 앱이 전역 reset(`@aninganing/react/reset.css`)을 쓰면 20px, 안 쓰면 23px로 앱마다 크기가 달랐다. 보이는 모양은 reset 없이 쓰던 기존 모양과 같다.

- Updated dependencies [bb5dc63]
- Updated dependencies [4f4950c]
- Updated dependencies [af0e65f]
- Updated dependencies [c2fca99]
  - @aninganing/tokens@0.3.0

## 0.3.0

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

- Updated dependencies [581c378]
- Updated dependencies [6c98d4d]
- Updated dependencies [01437b0]
- Updated dependencies [78a5f66]
- Updated dependencies [e0711b7]
- Updated dependencies [0d6ee66]
- Updated dependencies [19891c1]
  - @aninganing/tokens@0.2.0

## 0.2.0

### Minor Changes

- 6f0eca6: 다른 앱에서 쓰기 쉽도록 패키지 구성 정리.

  - **Breaking (0.x)**: 전역 reset을 `style.css`에서 분리. 기존처럼 `body`/`button`/`box-sizing` 전역 스타일이 필요하면 `@aninganing/react/reset.css`를 추가로 import한다.
  - 각 컴포넌트가 reset 없이도 box-sizing, 디자인 시스템 글꼴, `prefers-reduced-motion` 처리를 스스로 적용.
  - 쓰지 않는 의존성(`@aninganing/icons`, `@aninganing/utils`, `@radix-ui/react-dialog`) 제거, `clsx`/`class-variance-authority`는 번들하지 않고 의존성으로 설치.
  - 설치·인증·사용법 README 추가. 컴포넌트가 디자인 시스템 글꼴(Pretendard)을 쓰지만 글꼴 파일은 포함하지 않으므로, 앱에서 Pretendard를 불러와야 한다(README 참고).

- 60e58c5: React 19 전용으로 전환 (peerDependencies `react`/`react-dom` `>=19`).

  - **Breaking (0.x)**: React 18 앱에서는 더 이상 쓸 수 없다. React 18 앱은 이전 버전을 계속 쓴다.
  - 컴포넌트(`Button`, `Input`, `IconBase`, `CheckIcon`)가 `forwardRef` 대신 React 19의 `ref` prop을 쓴다. 사용하는 쪽 코드(`<Button ref={ref} />`)는 그대로다.
  - props 타입이 `ComponentPropsWithoutRef<'tag'>`에서 `ComponentProps<'tag'>`로 바뀌어 `ref`가 props 타입에 포함된다.
  - `mergeRefs`(`@aninganing/utils`)가 React 19 ref cleanup을 지원한다: 콜백 ref가 반환한 정리 함수를 분리 시 호출하고, 정리 함수가 없는 콜백은 기존처럼 `null`로 호출한다.

## 0.1.0

### Minor Changes

- eb21386: Input 컴포넌트 추가 (size 프리셋, error 상태, leading/trailing 아이콘·텍스트 슬롯 지원). Input용 `input.adornment`/`input.gap` 컴포넌트 토큰 추가.

### Patch Changes

- Updated dependencies [eb21386]
  - @aninganing/tokens@0.1.0

## 0.0.1

### Patch Changes

- Updated dependencies [a38eab8]
  - @aninganing/tokens@0.0.1
