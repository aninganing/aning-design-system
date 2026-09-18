import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { button } from './Button.variants';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * 버튼의 시각적 스타일.
   * - `primary`: 화면당 하나의 주요 액션(폼 제출 등)에 사용한다.
   * - `secondary`: 보조 액션, 또는 Dialog/Popover의 취소 버튼처럼 부차적인 액션에 사용한다.
   * - `danger`: 삭제처럼 되돌리기 어려운 파괴적 액션에만 사용한다.
   * @default 'primary'
   */
  variant?: VariantProps<typeof button>['variant'];
  /**
   * 버튼 높이/패딩/폰트 크기 프리셋.
   * @default 'md'
   */
  size?: VariantProps<typeof button>['size'];
  /**
   * 로딩 스피너 상태를 표시하고 클릭을 막는다. `disabled`와 달리 진행 중인 비동기 액션에 사용하며,
   * 스크린 리더에는 `aria-busy`로 전달된다.
   * @default false
   */
  isLoading?: boolean;
}
