---
"@aninganing/react": minor
"@aninganing/tokens": minor
---

Field 컴포넌트 추가(합성형). `Field.Root`(`required`·`optional`·`invalid`·`fullWidth`), `Field.Label`, `Field.Control`, `Field.Helper`, `Field.Error`. `Field.Control`이 자식 컨트롤에 `id`·`aria-describedby`·`aria-invalid`·`required`를 얹어 Input, Textarea, 네이티브 select와 연결한다. 에러가 보이는 동안 헬퍼는 숨고, 필수 표시 `*`는 스크린 리더에 숨긴다. Input·Textarea는 `aria-invalid="true"`만으로도 에러 테두리가 된다. `field.*` 컴포넌트 토큰을 추가했다.
