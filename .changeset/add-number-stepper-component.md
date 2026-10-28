---
"@aninganing/react": minor
"@aninganing/tokens": minor
---

NumberStepper 컴포넌트 추가. −·+ 원형 버튼과 가운데 값으로 작은 정수를 한 단계씩 바꾼다. `label`(그룹 이름, 버튼 이름 "~ 줄이기"·"~ 늘리기"), `value`/`defaultValue`/`onValueChange`, `min`(기본 1)·`max`·`step`(기본 1), `onClamp`(`max`·`min`이 바뀌어 값이 범위로 맞춰졌을 때), `disabled`, `size`(sm 32px·md 40px). `role="group"` + `<output aria-live="polite">` 방식이고, 한계에 닿아 비활성된 버튼의 포커스는 반대쪽 버튼으로 옮긴다. `number-stepper.*` 컴포넌트 토큰을 추가했다.
