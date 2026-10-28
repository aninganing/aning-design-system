import type { ComponentProps, ReactNode } from 'react';

export interface ToastAction {
  /** 버튼 글자(예: "되돌리기"). */
  label: string;
  /** 누르면 호출된다. 토스트는 이어서 닫힌다. */
  onClick: () => void;
  /**
   * 스크린 리더용 대체 안내. 토스트는 사라지므로 같은 일을 다른 곳에서 하는 방법을 적는다
   * (예: "찜 목록은 마이페이지에서 볼 수 있어요"). 지정하지 않으면 `label`.
   */
  altText?: string;
}

export interface ToastOptions {
  /** 방금 일어난 일을 알리는 한 문장. 성공·실패는 색이 아니라 문구로 전달한다. */
  message: ReactNode;
  /** 앞쪽 아이콘. `currentColor`로 그려지고 `aria-hidden`이다. */
  icon?: ReactNode;
  /** 오른쪽 액션 버튼 하나. */
  action?: ToastAction;
  /**
   * 떠 있는 시간(ms). 마우스를 올리거나 포커스가 들어가면 멈춘다.
   * @default 5000 (action이 있으면 8000)
   */
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
  open: boolean;
}

export interface ToasterProps extends Omit<ComponentProps<'ol'>, 'children'> {
  /**
   * 화면 아래에서 더 띄울 거리. 하단 고정 CTA가 있는 화면에서 CTA 높이만큼 준다(예: `72`, `'4.5rem'`).
   * 숫자는 px. 기본 간격(`toast.offset`)과 안전 영역 위에 더해진다.
   * @default 0
   */
  offset?: number | string;
  /**
   * 토스트 영역의 이름. 스크린 리더가 F8로 이동할 때 "알림 (F8)"처럼 읽는다.
   * @default '알림'
   */
  label?: string;
}
