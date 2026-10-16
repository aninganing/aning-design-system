---
"@aninganing/react": minor
"@aninganing/tokens": minor
---

Tooltip 컴포넌트 추가 (Radix Tooltip 기반). `content`, `side`, `align`, `delay`(기본 300ms), `open`/`defaultOpen`/`onOpenChange`. 두 테마 모두 반전 면(bg-inverse + text-inverse), 5px 화살표, 최대 너비 240px. hover·포커스로 열리고 Esc로 닫히며 트리거의 `aria-describedby`로 연결된다. `@radix-ui/react-tooltip`(1.2.16 고정)을 dependencies에 추가하고 `tooltip.*` 컴포넌트 토큰을 추가했다.
