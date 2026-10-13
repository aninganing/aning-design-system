import type { ComponentProps, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { input } from './Input.variants';

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  /**
   * 입력창 높이/패딩/폰트 크기 프리셋. 네이티브 `<input>`의 문자 폭 `size` 속성을 이 이름으로
   * 대체한다 — 너비 조절은 CSS(`className`/`style`)로 한다. `className`/`style`은 테두리를 그리는
   * 바깥 래퍼에 적용되고, 나머지 props와 `ref`는 내부 `<input>`으로 전달된다.
   * @default 'md'
   */
  size?: VariantProps<typeof input>['size'];
  /**
   * 에러 상태. 테두리 색상이 danger 토큰으로 바뀌고 `aria-invalid="true"`가 자동 설정된다.
   * 에러 메시지 자체는 이 컴포넌트가 렌더링하지 않는다 — 별도 헬퍼 텍스트와 조합해서 쓴다.
   * @default false
   */
  error?: boolean;
  /**
   * 입력 필드 앞(왼쪽)에 붙는 요소 — 아이콘, 통화 기호, `https://` 같은 접두 텍스트 등.
   * 장식용 아이콘은 `aria-hidden`을 달고, 의미가 있는 텍스트라면 라벨에도 반영한다.
   */
  leading?: ReactNode;
  /**
   * 입력 필드 뒤(오른쪽)에 붙는 요소 — 단위(`kg`, `원`), 상태 아이콘, 지우기 버튼 등.
   */
  trailing?: ReactNode;
}
