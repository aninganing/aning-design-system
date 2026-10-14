import clsx from 'clsx';
import { skeleton } from './Skeleton.variants';
import styles from './Skeleton.module.css';
import type { SkeletonProps } from './Skeleton.types';

const toCss = (value: number | string | undefined) => (typeof value === 'number' ? `${value}px` : value);

export const Skeleton = ({
  ref,
  className,
  style,
  shape = 'text',
  width,
  height,
  lines = 1,
  ...props
}: SkeletonProps) => {
  const size = { width: toCss(width), height: toCss(height), ...style };

  if (shape === 'text' && lines > 1) {
    return (
      <span ref={ref} className={clsx(styles.lines, className)} style={size} aria-hidden="true" {...props}>
        {Array.from({ length: lines }, (_, index) => (
          <span key={index} className={skeleton({ shape })} />
        ))}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={clsx(skeleton({ shape }), className)}
      style={size}
      aria-hidden="true"
      {...props}
    />
  );
};
