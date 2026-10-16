import type { ComponentProps, ReactElement, ReactNode } from 'react';
import type * as RadixTooltip from '@radix-ui/react-tooltip';

export interface TooltipProps
  extends Omit<ComponentProps<typeof RadixTooltip.Content>, 'content' | 'children' | 'asChild'> {
  /**
   * 툴팁에 띄울 짧은 보충 설명. 트리거의 `aria-describedby`로 연결된다.
   * 꼭 필요한 정보(환불 규정 등)는 툴팁에만 두지 말고 본문에도 적는다 — 터치 기기에는 hover가 없다.
   */
  content: ReactNode;
  /**
   * 툴팁을 여는 트리거 요소 하나. 포커스할 수 있고 `ref`를 받는 요소여야 한다(예: `<button>`, `Button`).
   * 아이콘만 있는 버튼이라면 툴팁과 별개로 `aria-label`로 이름을 준다 — 툴팁은 이름이 아니라 설명이다.
   */
  children: ReactElement;
  /**
   * 트리거 기준으로 툴팁을 띄울 방향. 공간이 부족하면 반대쪽으로 자동으로 뒤집힌다.
   * @default 'top'
   */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * `side` 방향에서의 정렬.
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * 마우스를 올린 뒤 열리기까지 기다리는 시간(ms). 포커스로 열 때는 바로 열린다.
   * @default 300
   */
  delay?: number;
  /**
   * 열림 상태(controlled).
   */
  open?: boolean;
  /**
   * 처음 열림 상태(uncontrolled).
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * 열림 상태가 바뀔 때 호출된다.
   */
  onOpenChange?: (open: boolean) => void;
}
