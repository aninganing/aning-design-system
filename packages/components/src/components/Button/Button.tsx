import clsx from 'clsx';
import { button } from './Button.variants';
import type { ButtonProps } from './Button.types';

export const Button = ({
  ref,
  className,
  variant,
  size,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) => (
  <button
    ref={ref}
    className={clsx(button({ variant, size }), className)}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
    {...props}
  >
    {children}
  </button>
);
