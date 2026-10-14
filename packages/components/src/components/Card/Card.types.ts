import type { ComponentProps, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { card } from './Card.variants';

export interface CardProps extends ComponentProps<'article'> {
  /**
   * 카드 면의 표현 방식.
   * - `outlined`: 테두리로 구분한다. 목록처럼 카드가 많이 반복되는 곳의 기본값.
   * - `elevated`: 테두리 대신 그림자로 띄운다. 추천·강조 영역처럼 카드가 적을 때 쓴다.
   * @default 'outlined'
   */
  variant?: VariantProps<typeof card>['variant'];
  /**
   * hover 시 그림자를 키워 누를 수 있는 카드임을 알린다. 카드 안에 `Card.Title` 링크가 있을 때만 켠다 —
   * 링크가 없는 카드에 켜면 눌리지 않는 요소가 눌릴 것처럼 보인다.
   * @default false
   */
  interactive?: VariantProps<typeof card>['interactive'];
}

export interface CardMediaProps extends ComponentProps<'div'> {
  /**
   * 미디어 좌상단에 겹쳐 표시할 요소. "마감 임박" 같은 상태 뱃지에 쓴다.
   */
  badge?: ReactNode;
}

export type CardBodyProps = ComponentProps<'div'>;

export interface CardTitleProps extends ComponentProps<'h3'> {
  /**
   * 제목의 heading 레벨. 페이지의 heading 구조에 맞춰 고른다 — 목록 섹션 제목이 `h2`라면 카드는 `h3`.
   * @default 'h3'
   */
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
