---
"@aninganing/react": minor
"@aninganing/tokens": minor
---

RadioCard 컴포넌트 추가. 카드 전체가 눌리는 단일 선택 컨트롤로 `RadioGroup` 안에 넣어 쓴다. `value`, `title`(라디오 이름), `description`·`aside`(오른쪽 슬롯, `aria-describedby`로 연결), `disabled`, `invalid`(골라 둔 항목이 더는 고를 수 없게 된 상태, 테두리로만 표시하고 이유는 `aria-describedby`로 연결). 원은 Radio와 같은 23px이고 포커스 링은 카드 바깥에 그린다. `radio-card.*` 컴포넌트 토큰과, accent-subtle 면 위 보조 글자용 semantic 토큰 `color.text.on-accent-subtle`(라이트 gray-600 / 다크 gray-300)을 추가했다.
