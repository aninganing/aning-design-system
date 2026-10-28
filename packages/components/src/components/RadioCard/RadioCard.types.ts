import type { ComponentProps, ReactNode } from 'react';

export interface RadioCardProps
  extends Omit<ComponentProps<'input'>, 'type' | 'children' | 'value' | 'name' | 'title'> {
  /**
   * 이 선택지의 값. 선택되면 RadioGroup의 `onValueChange`로 전달되고, 폼 제출 시 전송된다.
   */
  value: string;
  /**
   * 카드 제목(예: "10월 30일 (목) 14:00"). 라디오의 접근 가능한 이름이 된다.
   */
  title: ReactNode;
  /**
   * 제목 아래 보충 설명(예: "2시간 · 성수 공방"). `aria-describedby`로 연결된다.
   */
  description?: ReactNode;
  /**
   * 오른쪽 슬롯. 잔여석 Badge, 가격 등. `aria-describedby`로 연결된다.
   */
  aside?: ReactNode;
  /**
   * 골라 둔 항목을 더는 고를 수 없게 된 상태(예: 선택한 회차가 마감). danger 테두리로만 표시한다 — radio 역할은
   * `aria-invalid`를 지원하지 않으므로, 이유를 카드 밖(Alert 등)에 글자로 쓰고 그 id를 `aria-describedby`로 연결한다.
   * @default false
   */
  invalid?: boolean;
}
