import clsx from 'clsx';
import { iconButton } from './IconButton.variants';
import type { IconButtonProps } from './IconButton.types';

export const IconButton = ({
  ref,
  className,
  variant,
  size,
  shape,
  pressed,
  onPressedChange,
  onClick,
  type = 'button',
  ...props
}: IconButtonProps) => (
  <button
    ref={ref}
    type={type}
    className={clsx(iconButton({ variant, size, shape }), className)}
    aria-pressed={pressed}
    onClick={(event) => {
      onClick?.(event);
      if (!event.defaultPrevented && pressed !== undefined) onPressedChange?.(!pressed);
    }}
    {...props}
  />
);
