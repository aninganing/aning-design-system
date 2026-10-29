import { useEffect, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import * as RadixToast from '@radix-ui/react-toast';
import clsx from 'clsx';
import {
  dismiss,
  getActiveToaster,
  getItems,
  registerToaster,
  show,
  subscribe,
  subscribeToasters,
} from './toastStore';
import { toastViewport } from './Toast.variants';
import styles from './Toast.module.css';
import type { ToasterProps, ToastOptions } from './Toast.types';

const DEFAULT_DURATION = 5000;
const ACTION_DURATION = 8000;

/**
 * 토스트를 띄운다. 앱 루트에 `<Toaster />`가 있어야 보인다. 닫을 때 쓸 id를 돌려준다.
 */
export const toast = Object.assign((options: ToastOptions) => show(options), {
  /** 띄운 토스트를 바로 닫는다. */
  dismiss,
});

export const Toaster = ({ ref, className, style, offset = 0, label = '알림', ...props }: ToasterProps) => {
  const [key] = useState(() => Symbol('toaster'));
  useEffect(() => registerToaster(key), [key]);
  const active = useSyncExternalStore(subscribeToasters, getActiveToaster, () => undefined) === key;
  const items = useSyncExternalStore(subscribe, getItems, getItems);

  if (!active) return null;

  return (
    <RadixToast.Provider label={label} swipeDirection="down">
      {items.map((item) => (
        <RadixToast.Root
          key={item.id}
          className={styles.toast}
          open={item.open}
          duration={item.duration ?? (item.action ? ACTION_DURATION : DEFAULT_DURATION)}
          onOpenChange={(open) => {
            if (!open) dismiss(item.id);
          }}
        >
          {item.icon != null && (
            <span className={styles.icon} aria-hidden="true">
              {item.icon}
            </span>
          )}
          <RadixToast.Description className={styles.message}>{item.message}</RadixToast.Description>
          {item.action && (
            <RadixToast.Action
              className={styles.action}
              altText={item.action.altText ?? item.action.label}
              onClick={item.action.onClick}
            >
              {item.action.label}
            </RadixToast.Action>
          )}
        </RadixToast.Root>
      ))}
      {/* body로 포털 — Toaster가 transform이 걸린 요소(Storybook Docs 미리보기 등) 안에 있어도 fixed가 화면 기준이 되게.
          active는 마운트 뒤에만 true라 서버 렌더링에서는 여기까지 오지 않는다. */}
      {createPortal(
        <RadixToast.Viewport
          ref={ref}
          label={`${label} ({hotkey})`}
          className={clsx(toastViewport(), className)}
          // 하단 고정 CTA 높이처럼 화면마다 다른 값이라 변수로만 넘기고 계산은 CSS가 한다
          style={
            {
              '--toast-viewport-offset': typeof offset === 'number' ? `${offset}px` : offset,
              ...style,
            } as CSSProperties
          }
          {...props}
        />,
        document.body,
      )}
    </RadixToast.Provider>
  );
};
