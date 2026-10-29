import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { select } from './Select.variants';

export interface SelectOption {
  /** 선택 값. 빈 문자열(`''`)은 "선택 안 함"을 뜻하므로 항목 값으로 쓸 수 없다. */
  value: string;
  /** 목록과 트리거에 보이는 글자. */
  label: string;
  /** 고를 수 없는 항목. 목록에는 보이지만 키보드 이동에서 건너뛴다. */
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<ComponentProps<'button'>, 'value' | 'defaultValue' | 'onChange' | 'children' | 'dir'> {
  /** 고를 항목 목록. */
  options: SelectOption[];
  /** 선택 값(controlled). 아무것도 고르지 않은 상태는 `''`. */
  value?: string;
  /** 처음 선택 값(uncontrolled). */
  defaultValue?: string;
  /** 다른 항목을 골랐을 때 그 값으로 호출된다. */
  onValueChange?: (value: string) => void;
  /** 값이 없을 때 트리거에 보이는 안내 문구. 예: "클래스를 선택해 주세요". */
  placeholder?: string;
  /**
   * 트리거 높이/패딩/폰트 크기 프리셋. Input과 같은 단계다.
   * @default 'md'
   */
  size?: VariantProps<typeof select>['size'];
  /**
   * 에러 상태. 테두리가 danger 색이 되고 `aria-invalid="true"`가 걸린다. `Field.Root`의 `invalid`로도 같은 상태가 된다.
   * @default false
   */
  invalid?: boolean;
  /**
   * 필수 입력. 폼 제출 시 값이 없으면 브라우저 검증에 걸린다(`name`이 있을 때 Radix가 숨긴 네이티브 select를 둔다).
   * @default false
   */
  required?: boolean;
  /** 폼 제출 시 쓰일 이름. 지정하면 숨긴 네이티브 select가 함께 렌더링되어 `FormData`에 값이 들어간다. */
  name?: string;
  /** 목록이 열렸는지(controlled). */
  open?: boolean;
  /** 목록이 열리거나 닫힐 때 호출된다. */
  onOpenChange?: (open: boolean) => void;
}
