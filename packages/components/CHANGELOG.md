# @aninganing/react

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
