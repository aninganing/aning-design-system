import clsx from 'clsx';
import { badge } from './Badge.variants';
import styles from './Badge.module.css';
import type { BadgeProps } from './Badge.types';

export const Badge = ({ ref, className, tone, size, children, ...props }: BadgeProps) => (
  <span ref={ref} className={clsx(badge({ tone, size }), className)} {...props}>
    {tone === 'success' && <span className={styles.dot} aria-hidden="true" />}
    {children}
  </span>
);
