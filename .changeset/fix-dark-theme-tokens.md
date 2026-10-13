---
"@aninganing/tokens": patch
---

다크 테마 토큰이 라이트 값으로 빌드되던 버그 수정.

- `variables-dark.css`(`[data-theme="dark"]`)의 모든 값이 라이트 값과 같아 다크 테마가 적용되지 않았다. Style Dictionary가 플랫폼별 `source`를 무시해 dark 플랫폼도 `semantic/light.json`으로 빌드되던 문제로, 테마마다 따로 빌드하도록 고쳤다.
- `shadow.md`(`0 4px 6px -1px`)가 `0 4px 5px`로 잘못 계산되던 문제 수정. 그림자 토큰을 Tokens Studio의 `boxShadow` 형식으로 바꿨다.
