---
"@aninganing/react": patch
---

Checkbox 수정 두 가지.

- 접근 가능한 이름에 `description`이 섞이던 문제. `<label>`이 설명까지 감싸 이름이 "라벨 + 설명"이 되고 설명이 `aria-describedby`로 한 번 더 읽혔다. 입력 요소를 `aria-labelledby`로 라벨 글자에만 연결한다.
- 체크 상자 크기를 테두리 포함 23px로 명시(`box-sizing: border-box`). 지금까지는 `box-sizing`이 지정되지 않아 앱이 전역 reset(`@aninganing/react/reset.css`)을 쓰면 20px, 안 쓰면 23px로 앱마다 크기가 달랐다. 보이는 모양은 reset 없이 쓰던 기존 모양과 같다.
