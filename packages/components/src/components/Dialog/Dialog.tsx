import { Children, createContext, isValidElement, useContext, useRef } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { IconButton } from '../IconButton';
import { dialog, dialogFooter } from './Dialog.variants';
import styles from './Dialog.module.css';
import type { DialogFooterProps, DialogProps } from './Dialog.types';

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DialogVariantContext = createContext<DialogProps['variant']>('center');

const DialogRoot = ({
  ref,
  className,
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  variant,
  dismissible = true,
  initialFocus,
  closeLabel = '닫기',
  children,
  ...props
}: DialogProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  // Footer는 본문 스크롤 영역 밖 아래에 고정한다 — 시트에서 긴 목록을 내려도 버튼이 보이게
  const items = Children.toArray(children);
  const footer = items.filter((child) => isValidElement(child) && child.type === DialogFooter);
  const body = items.filter((child) => !footer.includes(child));
  const preventIfLocked = (event: Event) => {
    if (!dismissible) event.preventDefault();
  };

  return (
    <RadixDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger != null && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content
          ref={ref}
          className={clsx(dialog({ variant }), className)}
          // 설명이 없으면 Radix가 기본으로 거는 aria-describedby를 지운다
          {...(description == null && { 'aria-describedby': undefined })}
          onOpenAutoFocus={(event) => {
            // Radix 기본(첫 포커스 요소 = 닫기 버튼) 대신 제목이나 initialFocus로 보낸다
            event.preventDefault();
            (initialFocus?.current ?? titleRef.current)?.focus();
          }}
          onEscapeKeyDown={preventIfLocked}
          onPointerDownOutside={preventIfLocked}
          onInteractOutside={preventIfLocked}
          {...props}
        >
          {variant === 'sheet' && <div className={styles.handle} aria-hidden="true" />}
          <div className={styles.header}>
            <RadixDialog.Title ref={titleRef} className={styles.title} tabIndex={-1}>
              {title}
            </RadixDialog.Title>
            {description != null && (
              <RadixDialog.Description className={styles.description}>{description}</RadixDialog.Description>
            )}
          </div>
          {body.length > 0 && <div className={styles.body}>{body}</div>}
          <DialogVariantContext value={variant ?? 'center'}>{footer}</DialogVariantContext>
          {dismissible && (
            <RadixDialog.Close asChild>
              <IconButton aria-label={closeLabel} size="sm" className={styles.close}>
                <CloseIcon />
              </IconButton>
            </RadixDialog.Close>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

const DialogFooter = ({ ref, className, layout, ...props }: DialogFooterProps) => {
  const variant = useContext(DialogVariantContext);
  return (
    <div
      ref={ref}
      className={clsx(dialogFooter({ layout: layout ?? (variant === 'sheet' ? 'stretch' : 'end') }), className)}
      {...props}
    />
  );
};

export const Dialog = Object.assign(DialogRoot, {
  /** 버튼 영역. `center`는 오른쪽 정렬, `sheet`는 버튼이 너비를 나눠 채운다. */
  Footer: DialogFooter,
});
