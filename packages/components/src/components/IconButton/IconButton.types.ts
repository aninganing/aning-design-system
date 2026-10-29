import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { iconButton } from './IconButton.variants';

export interface IconButtonProps extends Omit<ComponentProps<'button'>, 'aria-label' | 'aria-pressed'> {
  /**
   * 버튼의 접근 가능한 이름. 아이콘만으로는 이름이 없으므로 필수다. 토글형(`pressed`)에서도 상태에 따라
   * 바꾸지 않는다(예: "찜하기" 유지) — 켜짐 여부는 `aria-pressed`가 전달한다.
   */
  'aria-label': string;
  /**
   * 버튼의 시각적 스타일.
   * - `ghost`: 기본. 배경 없이 hover 때만 면이 생긴다. 헤더의 뒤로 가기·공유 등.
   * - `outline`: 조작 요소 기준(3:1) 테두리. 달력의 이전·다음 달처럼 경계가 보여야 할 때.
   * - `overlay`: 사진 위에 올리는 원형 면 + 그림자. 보통 `shape="round"`와 함께 쓴다.
   * @default 'ghost'
   */
  variant?: VariantProps<typeof iconButton>['variant'];
  /**
   * 버튼 크기 프리셋. `sm` 32px(아이콘 16px, 터치 영역 44px) · `md` 40px(20px) · `lg` 48px(24px).
   * @default 'md'
   */
  size?: VariantProps<typeof iconButton>['size'];
  /**
   * 모서리 모양. `square`는 `radius-md`, `round`는 원형.
   * @default 'square'
   */
  shape?: VariantProps<typeof iconButton>['shape'];
  /**
   * 켜짐 상태(찜 등). 지정하면 토글 버튼이 되어 `aria-pressed`로 이어지고, 켜지면 아이콘이 accent 색이 된다.
   * 상태는 버튼이 들고 있지 않으므로(controlled) 바뀐 값은 `onPressedChange`로 받아 반영한다.
   * 지정하지 않으면 일반 버튼으로 동작한다(`aria-pressed` 없음).
   */
  pressed?: boolean;
  /**
   * 버튼을 눌렀을 때 바뀔 값(`!pressed`)으로 호출된다. `pressed`를 지정했을 때만 호출된다.
   */
  onPressedChange?: (pressed: boolean) => void;
}
