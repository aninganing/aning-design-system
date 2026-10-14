import type { ComponentProps, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { switchTrack } from './Switch.variants';

export interface SwitchProps
  extends Omit<ComponentProps<'button'>, 'type' | 'role' | 'value' | 'children' | 'onChange'> {
  /**
   * 왼쪽에 표시할 설정 이름. `<label>`로 스위치와 연결되어 이름이 되고, 눌러도 토글된다.
   */
  label: ReactNode;
  /**
   * 라벨 아래 보충 설명. 예: "수업 하루 전 알림을 받는다". `aria-describedby`로 연결된다.
   */
  description?: ReactNode;
  /**
   * 켜짐 상태(controlled). 바뀐 값은 `onCheckedChange`로 받아 반영한다.
   */
  checked?: boolean;
  /**
   * 처음 켜짐 상태(uncontrolled).
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * 켜짐 상태가 바뀔 때 새 값으로 호출된다. 스위치는 누르는 즉시 적용되는 설정이므로 여기서 바로 저장한다.
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * 트랙 높이 프리셋. `sm` 20px, `md` 26px.
   * @default 'md'
   */
  size?: VariantProps<typeof switchTrack>['size'];
}
