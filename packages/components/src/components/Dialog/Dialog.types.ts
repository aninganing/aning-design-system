import type { ComponentProps, ReactNode, RefObject } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { dialog, dialogFooter } from './Dialog.variants';

export interface DialogProps extends Omit<ComponentProps<'div'>, 'title'> {
  /** 열림 여부(controlled). 바뀐 값은 `onOpenChange`로 받아 반영한다. */
  open?: boolean;
  /**
   * 처음 열림 여부(uncontrolled). `trigger`와 함께 쓴다.
   * @default false
   */
  defaultOpen?: boolean;
  /** 열리거나 닫힐 때 새 상태로 호출된다(Esc, 바깥 클릭, 닫기 버튼, trigger 포함). */
  onOpenChange?: (open: boolean) => void;
  /**
   * 누르면 창을 여는 버튼(Button 등 요소 하나). 주면 닫힐 때 포커스가 이 버튼으로 돌아온다.
   * 주지 않고 `open`으로 열어도 닫힐 때 포커스는 열기 전 요소로 돌아간다.
   */
  trigger?: ReactNode;
  /** 창 제목. `aria-labelledby`로 창의 이름이 된다. */
  title: ReactNode;
  /** 제목 아래 설명. `aria-describedby`로 연결된다. */
  description?: ReactNode;
  /**
   * 창 모양.
   * - `center`: 기본. 가운데 뜨는 확인·경고 창.
   * - `sheet`: 아래에서 올라오는 시트. 모바일 필터·선택 목록. 위쪽 모서리만 둥글고 최대 높이 85%에서 안쪽이 스크롤된다.
   * @default 'center'
   */
  variant?: VariantProps<typeof dialog>['variant'];
  /**
   * Esc·바깥 클릭·닫기(X) 버튼으로 닫을 수 있는지. 되돌릴 수 없는 작업의 확인 창처럼 반드시 버튼으로 골라야 하면 `false`.
   * @default true
   */
  dismissible?: boolean;
  /**
   * 열릴 때 포커스를 줄 요소. 지정하지 않으면 첫 버튼이 아니라 제목에 포커스가 가서, 스크린 리더가 제목부터 읽고 실수로
   * 확인 버튼을 누르지 않는다.
   */
  initialFocus?: RefObject<HTMLElement | null>;
  /**
   * 닫기(X) 버튼의 이름.
   * @default '닫기'
   */
  closeLabel?: string;
}

export interface DialogFooterProps extends ComponentProps<'div'> {
  /**
   * 버튼 배치.
   * - `end`: 오른쪽 정렬. `center` 창의 기본.
   * - `stretch`: 버튼이 너비를 나눠 채운다. `sheet`의 기본.
   */
  layout?: VariantProps<typeof dialogFooter>['layout'];
}
