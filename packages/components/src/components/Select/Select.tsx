import * as RadixSelect from '@radix-ui/react-select';
import clsx from 'clsx';
import { select } from './Select.variants';
import styles from './Select.module.css';
import type { SelectProps } from './Select.types';

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M13.5 4.5L6 12L2.5 8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Select = ({
  ref,
  className,
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  size,
  invalid = false,
  required = false,
  disabled,
  name,
  open,
  onOpenChange,
  'aria-invalid': ariaInvalid,
  ...props
}: SelectProps) => (
  <RadixSelect.Root
    value={value}
    defaultValue={defaultValue}
    onValueChange={onValueChange}
    required={required}
    disabled={disabled}
    name={name}
    open={open}
    onOpenChange={onOpenChange}
  >
    {/* id·aria-*·className은 실제로 포커스를 받는 트리거로 간다 — Field.Control이 얹는 연결도 여기로 온다 */}
    <RadixSelect.Trigger
      ref={ref}
      className={clsx(select({ size }), className)}
      aria-invalid={invalid || ariaInvalid || undefined}
      aria-required={required || undefined}
      {...props}
    >
      <span className={styles.value}>
        <RadixSelect.Value placeholder={placeholder} />
      </span>
      <RadixSelect.Icon className={styles.icon}>
        <ChevronIcon />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
    <RadixSelect.Portal>
      <RadixSelect.Content className={styles.content} position="popper" sideOffset={4} collisionPadding={8}>
        <RadixSelect.Viewport className={styles.viewport}>
          {options.map((option) => (
            <RadixSelect.Item
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={styles.item}
            >
              <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              <RadixSelect.ItemIndicator className={styles.indicator}>
                <CheckIcon />
              </RadixSelect.ItemIndicator>
            </RadixSelect.Item>
          ))}
        </RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  </RadixSelect.Root>
);
