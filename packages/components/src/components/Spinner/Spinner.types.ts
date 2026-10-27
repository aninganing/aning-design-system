import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { spinner } from './Spinner.variants';

export interface SpinnerProps extends Omit<ComponentProps<'span'>, 'children'> {
  /**
   * 회전 원 크기. `sm` 16px · `md` 24px · `lg` 32px(테두리 3px).
   * @default 'md'
   */
  size?: VariantProps<typeof spinner>['size'];
  /**
   * 색. `current`는 부모 글자색(`currentColor`)을 따르고, `accent`는 강조색(다크는 한 단계 밝은 blue)을 쓴다.
   * @default 'current'
   */
  tone?: VariantProps<typeof spinner>['tone'];
  /**
   * 스크린 리더가 읽는 문구. 화면에는 보이지 않는다. "결제 확인 중"처럼 무엇을 기다리는지 적는다.
   * @default '불러오는 중'
   */
  label?: string;
  /**
   * 이 시간(ms)이 지나야 회전 원과 문구를 그린다. 그보다 빨리 끝나는 대기는 아예 보이지 않아 깜빡임을 막는다.
   * `0`이면 바로 그린다.
   * @default 300
   */
  delay?: number;
}
