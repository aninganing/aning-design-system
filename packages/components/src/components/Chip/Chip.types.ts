import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { chip } from './Chip.variants';

interface ChipOwnProps {
  /**
   * 칩 높이 프리셋. `sm` 28px(적용된 필터 목록), `md` 32px(필터 선택).
   * @default 'md'
   */
  size?: VariantProps<typeof chip>['size'];
  /**
   * 선택 상태. 토글형에서는 `aria-pressed`로 이어진다. 상태는 칩이 들고 있지 않으므로(controlled) 바뀐
   * 값은 `onSelectedChange`로 받아 직접 반영한다 — 필터 값은 URL에 두어 공유·뒤로가기와 맞추는 것을 권장한다.
   * 지정하지 않으면 토글이 아닌 일반 버튼으로 동작한다(`aria-pressed` 없음).
   */
  selected?: boolean;
}

export interface ToggleChipProps extends ChipOwnProps, ComponentProps<'button'> {
  /**
   * 칩을 눌렀을 때 바뀔 선택 값(`!selected`)으로 호출된다. `selected`를 지정했을 때만 호출된다.
   */
  onSelectedChange?: (selected: boolean) => void;
  onRemove?: undefined;
  removeLabel?: undefined;
}

export interface RemovableChipProps extends ChipOwnProps, ComponentProps<'span'> {
  /**
   * 지정하면 제거형이 된다: 칩 끝에 × 버튼이 붙고, 그 버튼을 누르면 호출된다. 칩 자체는 누를 수 없다.
   */
  onRemove: () => void;
  /**
   * × 버튼의 접근 가능한 이름. 기본값은 칩 글자 + " 제거"(예: "성수동 제거"). 칩 내용이 글자가 아니면 반드시
   * 지정한다.
   */
  removeLabel?: string;
  onSelectedChange?: undefined;
}

export type ChipProps = ToggleChipProps | RemovableChipProps;
