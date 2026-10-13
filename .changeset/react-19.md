---
"@aninganing/react": minor
"@aninganing/icons": minor
"@aninganing/utils": minor
---

React 19 전용으로 전환 (peerDependencies `react`/`react-dom` `>=19`).

- **Breaking (0.x)**: React 18 앱에서는 더 이상 쓸 수 없다. React 18 앱은 이전 버전을 계속 쓴다.
- 컴포넌트(`Button`, `Input`, `IconBase`, `CheckIcon`)가 `forwardRef` 대신 React 19의 `ref` prop을 쓴다. 사용하는 쪽 코드(`<Button ref={ref} />`)는 그대로다.
- props 타입이 `ComponentPropsWithoutRef<'tag'>`에서 `ComponentProps<'tag'>`로 바뀌어 `ref`가 props 타입에 포함된다.
- `mergeRefs`(`@aninganing/utils`)가 React 19 ref cleanup을 지원한다: 콜백 ref가 반환한 정리 함수를 분리 시 호출하고, 정리 함수가 없는 콜백은 기존처럼 `null`로 호출한다.
