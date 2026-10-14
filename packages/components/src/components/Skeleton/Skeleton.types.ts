import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { skeleton } from './Skeleton.variants';

export interface SkeletonProps extends Omit<ComponentProps<'span'>, 'children'> {
  /**
   * 자리를 잡을 요소의 모양.
   * - `text`: 글자 한 줄. 높이는 본문 글자 크기, 너비는 부모 너비(줄이려면 `width`).
   * - `rect`: 이미지·카드 미디어 같은 면. `height`나 `aspect-ratio`(`className`/`style`)로 높이를 준다.
   * - `circle`: 아바타 같은 원. `width`만 주면 같은 높이의 원이 된다.
   * @default 'text'
   */
  shape?: VariantProps<typeof skeleton>['shape'];
  /**
   * 너비. 숫자는 px, 문자열은 CSS 값(`'60%'`, `'12rem'`). 실제 콘텐츠와 비슷한 너비를 줘서 레이아웃 이동을 막는다.
   */
  width?: number | string;
  /**
   * 높이. 숫자는 px, 문자열은 CSS 값.
   */
  height?: number | string;
  /**
   * `shape="text"`일 때 줄 수. 2 이상이면 줄 사이 간격을 두고 마지막 줄을 60% 너비로 짧게 그린다.
   * @default 1
   */
  lines?: number;
}
