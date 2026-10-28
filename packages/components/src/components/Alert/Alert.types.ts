import type { ComponentProps, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { alert } from './Alert.variants';

export interface AlertProps extends Omit<ComponentProps<'div'>, 'title' | 'children'> {
  /**
   * 안내의 성격.
   * - `info`: 기본. 좌석 홀드 시간처럼 알고 있어야 할 진행 정보.
   * - `neutral`: 환불 규정 같은 참고 정보.
   * - `danger`: 선택한 회차 마감처럼 사용자가 다시 골라야 하는 문제.
   * @default 'info'
   */
  tone?: VariantProps<typeof alert>['tone'];
  /** 핵심 문장. 아이콘은 장식이라 의미는 제목이 전부 전달해야 한다. */
  title: ReactNode;
  /** 제목 아래 보충 설명. */
  description?: ReactNode;
  /**
   * 왼쪽 아이콘. 지정하지 않으면 tone별 기본 아이콘을 쓰고, `null`이면 아이콘 없이 그린다. 항상 `aria-hidden`이다.
   */
  icon?: ReactNode;
  /** 오른쪽 슬롯. Button `size="sm"`이나 링크. */
  action?: ReactNode;
  /**
   * 화면에 나중에 나타날 때 스크린 리더에 알리는 방식.
   * - `off`: 기본. 처음부터 화면에 있는 안내는 live 영역이 아니다.
   * - `polite`: `role="status"`. 폴링 결과 같은 info·neutral 안내.
   * - `assertive`: `role="alert"`. 바로 알아야 하는 danger 안내.
   * @default 'off'
   */
  live?: 'off' | 'polite' | 'assertive';
}
