import type { ComponentProps, ReactNode } from 'react';

export interface TextareaProps extends Omit<ComponentProps<'textarea'>, 'children'> {
  /**
   * 에러 상태. 테두리가 danger 색으로 바뀌고 `aria-invalid="true"`가 설정된다. Input과 같은 이름이다.
   * 에러 메시지는 `description`이나 별도 텍스트로 보여준다.
   * @default false
   */
  error?: boolean;
  /**
   * 입력창 아래 왼쪽의 도움말. 예: "호스트에게 그대로 전달돼요". `aria-describedby`로 연결된다.
   */
  description?: ReactNode;
  /**
   * 입력창 높이. 숫자는 px, 문자열은 CSS 값(`'8rem'`). 사용자가 손잡이로 높이를 바꿀 수는 없고, 내용이 넘치면
   * 스크롤된다. `autoResize`와 함께 쓰면 이 높이가 최소 높이가 된다.
   * @default 96
   */
  height?: number | string;
  /**
   * 내용에 맞춰 높이를 늘린다. `height`가 최소 높이, `maxRows`가 최대 높이가 된다.
   * @default false
   */
  autoResize?: boolean;
  /**
   * `autoResize`일 때 늘어날 최대 줄 수. 넘으면 스크롤된다. 지정하지 않으면 제한 없이 늘어난다.
   */
  maxRows?: number;
  /**
   * `maxLength`가 있을 때 오른쪽 아래에 "22 / 200" 카운터를 보여줄지.
   * @default true
   */
  showCount?: boolean;
}
