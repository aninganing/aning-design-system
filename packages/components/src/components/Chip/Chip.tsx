import clsx from 'clsx';
import { chip } from './Chip.variants';
import styles from './Chip.module.css';
import type { ChipProps, RemovableChipProps } from './Chip.types';

const isRemovable = (props: ChipProps): props is RemovableChipProps => props.onRemove !== undefined;

const RemoveIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Chip = (props: ChipProps) => {
  if (isRemovable(props)) {
    const { ref, className, size, selected, onRemove, removeLabel, children, ...rest } = props;
    const label = removeLabel ?? (typeof children === 'string' ? `${children} 제거` : '제거');

    return (
      <span
        ref={ref}
        className={clsx(chip({ size, selected: Boolean(selected) }), styles.removable, className)}
        {...rest}
      >
        {children}
        <button type="button" className={styles.remove} aria-label={label} onClick={onRemove}>
          <RemoveIcon />
        </button>
      </span>
    );
  }

  const { ref, className, size, selected, onSelectedChange, onClick, type = 'button', ...rest } = props;

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(chip({ size, selected: Boolean(selected) }), styles.toggle, className)}
      aria-pressed={selected}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && selected !== undefined) onSelectedChange?.(!selected);
      }}
      {...rest}
    />
  );
};
