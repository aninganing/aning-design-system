import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { badge } from './Badge.variants';

export interface BadgeProps extends ComponentProps<'span'> {
  /**
   * 라벨의 의미와 색.
   * - `neutral`: 소요 시간, 카테고리 같은 속성.
   * - `accent`: 신규·할인처럼 눈에 띄어야 하는 정보.
   * - `success`: 예약 확정처럼 완료·정상 상태. 초록 점과 함께 표시된다.
   * - `danger`: 마감 임박처럼 주의가 필요한 상태.
   * @default 'neutral'
   */
  tone?: VariantProps<typeof badge>['tone'];
  /**
   * 라벨 높이 프리셋. `sm` 18px, `md` 22px.
   * @default 'md'
   */
  size?: VariantProps<typeof badge>['size'];
}
