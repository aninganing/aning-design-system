import type { ComponentProps, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { radioGroup } from './Radio.variants';

export interface RadioGroupProps
  extends Omit<ComponentProps<'fieldset'>, 'onChange' | 'defaultValue' | 'name'> {
  /**
   * 묶음의 제목. `<legend>`로 렌더링되고 radiogroup의 접근 가능한 이름이 된다.
   */
  legend: ReactNode;
  /**
   * 선택된 값(controlled). 바뀐 값은 `onValueChange`로 받아 반영한다.
   */
  value?: string;
  /**
   * 처음 선택 값(uncontrolled). 지정하지 않으면 아무것도 선택되지 않은 상태로 시작한다.
   */
  defaultValue?: string;
  /**
   * 선택이 바뀔 때 새 값으로 호출된다.
   */
  onValueChange?: (value: string) => void;
  /**
   * 안의 radio들이 공유하는 `name`. 폼 제출 시 이 이름으로 선택 값이 전송된다. 지정하지 않으면 자동으로 만든다.
   */
  name?: string;
  /**
   * 선택지 배치 방향. 방향키는 두 방향 모두 위·아래·좌·우로 동작한다(네이티브 radio 동작).
   * @default 'vertical'
   */
  orientation?: VariantProps<typeof radioGroup>['orientation'];
  /**
   * 폼 제출 전에 하나를 반드시 고르게 한다.
   * @default false
   */
  required?: boolean;
}

export interface RadioProps extends Omit<ComponentProps<'input'>, 'type' | 'children' | 'value' | 'name'> {
  /**
   * 이 선택지의 값. 선택되면 RadioGroup의 `onValueChange`로 전달되고, 폼 제출 시 전송된다.
   */
  value: string;
  /**
   * 라디오 옆에 표시할 라벨. 라벨을 눌러도 선택된다.
   */
  label: ReactNode;
  /**
   * 라벨 아래 보충 설명. 예: 잔여 3석. `aria-describedby`로 연결된다.
   */
  description?: ReactNode;
}
