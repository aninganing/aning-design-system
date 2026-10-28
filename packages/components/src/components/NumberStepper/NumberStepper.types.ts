import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { numberStepper } from './NumberStepper.variants';

export interface NumberStepperProps
  extends Omit<ComponentProps<'div'>, 'aria-label' | 'children' | 'defaultValue' | 'onChange'> {
  /**
   * 그룹 이름(예: "인원"). 그룹의 `aria-label`이 되고, 버튼 이름 "인원 줄이기"·"인원 늘리기"에도 쓰인다.
   * 화면에 따로 라벨이 보이더라도 넘긴다.
   */
  label: string;
  /** 현재 값(controlled). 바뀐 값은 `onValueChange`로 받아 반영한다. */
  value?: number;
  /**
   * 처음 값(uncontrolled). `value`를 쓰지 않을 때만 쓴다.
   * @default min
   */
  defaultValue?: number;
  /** −·+ 버튼으로 값이 바뀌었을 때, 그리고 `max`·`min`이 바뀌어 값이 범위 안으로 맞춰졌을 때 새 값으로 호출된다. */
  onValueChange?: (value: number) => void;
  /**
   * 가장 작은 값. 여기에 닿으면 − 버튼이 비활성된다.
   * @default 1
   */
  min?: number;
  /** 가장 큰 값(예: 잔여석). 여기에 닿으면 + 버튼이 비활성된다. 지정하지 않으면 제한이 없다. */
  max?: number;
  /**
   * 한 번 누를 때 바뀌는 양.
   * @default 1
   */
  step?: number;
  /**
   * 값이 범위를 벗어나 `min`·`max`로 맞춰졌을 때 맞춘 값으로 호출된다. 잔여석이 줄어 인원이 깎인 것처럼 사용자가
   * 누르지 않았는데 값이 바뀐 경우를 알리는 데 쓴다. 안내 문구는 화면이 정한다.
   */
  onClamp?: (value: number) => void;
  /**
   * 전체 비활성. 두 버튼이 모두 비활성된다.
   * @default false
   */
  disabled?: boolean;
  /**
   * 버튼 크기. `sm` 32px(터치 영역 44px) · `md` 40px.
   * @default 'md'
   */
  size?: VariantProps<typeof numberStepper>['size'];
}
