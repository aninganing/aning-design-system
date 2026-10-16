---
"@aninganing/tokens": patch
---

Input·Textarea 필드 테두리 대비 개선. `input.border.default`를 `color.border.default`(gray-200 / 다크 gray-700, 배경 대비 1.27:1 / 1.91:1)에서 조작 요소 경계용 `color.border.control`(gray-500, 4.83:1 / 4.12:1)로 바꿔 WCAG 1.4.11 기준(3:1)을 넘는다. `textarea.border.default`는 이 토큰을 참조해 함께 바뀐다.
