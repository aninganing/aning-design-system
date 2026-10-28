---
"@aninganing/react": minor
"@aninganing/tokens": minor
---

Dialog 컴포넌트 추가 (Radix Dialog 기반). `variant`(`center` 가운데 창 · `sheet` 아래에서 올라오는 시트), `trigger` 또는 `open`/`defaultOpen`/`onOpenChange`, `title`·`description`(창 이름·설명), `dismissible`(Esc·바깥 클릭·닫기 버튼, 기본 true), `initialFocus`(기본은 제목에 포커스), `closeLabel`. 버튼 영역 `Dialog.Footer`는 본문 스크롤 밖에 고정되고 `layout`(`end`·`stretch`, 시트 기본 stretch)을 갖는다. `@radix-ui/react-dialog`(1.1.23 고정)를 dependencies에 추가했다. `dialog.*` 토큰에 border·gap·title·description·text·handle을 추가했다. 창 테두리(`border.default`)는 다크에서 창이 오버레이에 덮인 페이지와 구분되게 한다.
