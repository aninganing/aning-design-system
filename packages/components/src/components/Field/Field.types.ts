import type { ComponentProps, ReactElement } from 'react';

export interface FieldRootProps extends ComponentProps<'div'> {
  /**
   * 필수 입력. `Field.Label` 옆에 `*`(스크린 리더에는 숨김)를 표시하고, 컨트롤에 네이티브 `required`를 건다.
   * @default false
   */
  required?: boolean;
  /**
   * 선택 입력. `Field.Label` 옆에 "(선택)"을 표시한다. 대부분이 필수인 폼에서 예외인 항목에만 쓴다.
   * `required`와 함께 쓰지 않는다.
   * @default false
   */
  optional?: boolean;
  /**
   * 에러 상태. `Field.Error`가 보이고(그동안 `Field.Helper`는 숨김) 컨트롤에 `aria-invalid="true"`가 걸려 에러 테두리가 된다.
   * @default false
   */
  invalid?: boolean;
  /**
   * 기본 최대 너비(320px)를 풀고 부모 너비를 채운다.
   * @default false
   */
  fullWidth?: boolean;
}

export type FieldLabelProps = Omit<ComponentProps<'label'>, 'htmlFor'>;

export interface FieldControlProps {
  /**
   * 입력 컨트롤 하나(`Input`, `Textarea`, 네이티브 `<select>` 등). `id`, `aria-describedby`, `aria-invalid`, `required`가
   * 이 요소에 얹힌다. `id`는 `Field.Root`가 만들므로 직접 주지 않는다.
   */
  children: ReactElement;
}

export type FieldHelperProps = ComponentProps<'p'>;

export type FieldErrorProps = ComponentProps<'p'>;
