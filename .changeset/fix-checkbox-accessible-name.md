---
"@aninganing/react": patch
---

Checkbox의 접근 가능한 이름에 `description`이 섞이던 문제 수정. `<label>`이 설명까지 감싸 이름이 "라벨 + 설명"이 되고 설명이 `aria-describedby`로 한 번 더 읽혔다. 입력 요소를 `aria-labelledby`로 라벨 글자에만 연결한다.
