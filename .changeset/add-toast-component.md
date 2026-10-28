---
"@aninganing/react": minor
"@aninganing/tokens": minor
---

Toast 추가 (Radix Toast 기반). 앱 루트의 `<Toaster />`(`offset`, `label`)와 어디서든 부르는 `toast({ message, icon?, action?: { label, onClick, altText? }, duration? })` 함수, `toast.dismiss(id)`. 기본 5초(action이 있으면 8초), hover·포커스 중 멈춤, 최대 3개(넘치면 가장 오래된 것부터 닫힘), 아래로 스와이프해 닫기, 모션 감소 시 페이드만. Toaster가 여러 개 마운트돼도 하나만 그린다. `@radix-ui/react-toast`(1.2.23 고정)를 dependencies에 추가하고, `toast.*` 컴포넌트 토큰과 반전 면 위 액션 글자용 semantic 토큰 `color.text.accent-on-inverse`(라이트 blue-300 / 다크 blue-700)를 추가했다.
