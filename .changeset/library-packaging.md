---
"@aninganing/react": minor
---

다른 앱에서 쓰기 쉽도록 패키지 구성 정리.

- **Breaking (0.x)**: 전역 reset을 `style.css`에서 분리. 기존처럼 `body`/`button`/`box-sizing` 전역 스타일이 필요하면 `@aninganing/react/reset.css`를 추가로 import한다.
- 각 컴포넌트가 reset 없이도 box-sizing, 디자인 시스템 글꼴, `prefers-reduced-motion` 처리를 스스로 적용.
- 쓰지 않는 의존성(`@aninganing/icons`, `@aninganing/utils`, `@radix-ui/react-dialog`) 제거, `clsx`/`class-variance-authority`는 번들하지 않고 의존성으로 설치.
- 설치·인증·사용법 README 추가. 컴포넌트가 디자인 시스템 글꼴(Pretendard)을 쓰지만 글꼴 파일은 포함하지 않으므로, 앱에서 Pretendard를 불러와야 한다(README 참고).
