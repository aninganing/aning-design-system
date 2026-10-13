import type { ComponentProps, ReactNode } from 'react';

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type' | 'children'> {
  /**
   * 체크박스 옆에 표시할 라벨. 라벨을 눌러도 체크가 토글된다.
   */
  label: ReactNode;
  /**
   * 라벨 아래 작은 글씨로 붙이는 보충 설명. 예: "일부만 선택된 상태", "선택 시 마케팅 알림을 받는다".
   * 스크린 리더에는 `aria-describedby`로 연결된다.
   */
  description?: ReactNode;
  /**
   * 일부만 선택된 상태. "전체 선택" 체크박스에서 하위 항목이 일부만 선택됐을 때 쓴다. 체크 대신 가로줄이
   * 표시되고 스크린 리더에는 "혼합(mixed)"으로 전달된다. 사용자가 누르면 네이티브 동작대로 indeterminate가
   * 풀리므로, 다음 상태는 `onCheckedChange`에서 직접 계산해 다시 넘긴다.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * 체크 상태가 바뀔 때 새 값으로 호출된다. `onChange`도 그대로 쓸 수 있다.
   */
  onCheckedChange?: (checked: boolean) => void;
}

export interface CheckboxGroupProps extends ComponentProps<'fieldset'> {
  /**
   * 묶음의 제목. `<legend>`로 렌더링되어 스크린 리더가 각 체크박스와 함께 읽는다.
   */
  legend: ReactNode;
}
