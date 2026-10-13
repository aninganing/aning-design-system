import clsx from 'clsx';
import { input } from './Input.variants';
import styles from './Input.module.css';
import type { InputProps } from './Input.types';

export const Input = ({
  ref,
  className,
  style,
  size,
  error,
  disabled,
  leading,
  trailing,
  ...props
}: InputProps) => (
  <div
    className={clsx(input({ size, state: error ? 'error' : 'default' }), className)}
    style={style}
    data-disabled={disabled || undefined}
  >
    {leading != null && <span className={styles.adornment}>{leading}</span>}
    <input
      ref={ref}
      className={styles.field}
      disabled={disabled}
      aria-invalid={error || undefined}
      {...props}
    />
    {trailing != null && <span className={styles.adornment}>{trailing}</span>}
  </div>
);
