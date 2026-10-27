import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { spinner } from './Spinner.variants';
import styles from './Spinner.module.css';
import type { SpinnerProps } from './Spinner.types';

export const Spinner = ({
  ref,
  className,
  size,
  tone,
  label = '불러오는 중',
  delay = 300,
  ...props
}: SpinnerProps) => {
  const [visible, setVisible] = useState(delay <= 0);

  useEffect(() => {
    if (delay <= 0) {
      setVisible(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // status 영역은 처음부터 두고 내용만 나중에 채운다 — 영역과 문구가 함께 생기면 읽히지 않는 스크린 리더가 있다.
  return (
    <span ref={ref} role="status" className={clsx(spinner({ size, tone }), className)} {...props}>
      {visible && (
        <>
          <span className={styles.circle} aria-hidden="true" />
          <span className={styles.label}>{label}</span>
        </>
      )}
    </span>
  );
};
