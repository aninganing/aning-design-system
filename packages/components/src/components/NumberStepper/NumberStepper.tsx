import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { numberStepper } from './NumberStepper.variants';
import styles from './NumberStepper.module.css';
import type { NumberStepperProps } from './NumberStepper.types';

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const clamp = (value: number, min: number, max?: number) =>
  Math.max(min, max === undefined ? value : Math.min(value, max));

export const NumberStepper = ({
  ref,
  className,
  label,
  value,
  defaultValue,
  onValueChange,
  min = 1,
  max,
  step = 1,
  onClamp,
  disabled = false,
  size,
  ...props
}: NumberStepperProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? min);
  const current = value ?? internalValue;
  // 범위를 벗어난 값은 맞추기 전 한 번의 렌더에서도 보이지 않게 한다
  const shown = clamp(current, min, max);
  const decrementRef = useRef<HTMLButtonElement>(null);
  const incrementRef = useRef<HTMLButtonElement>(null);

  const commit = (next: number) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  // max(잔여석)·min이 바뀌어 값이 범위를 벗어나면 맞추고 알린다. 값이 범위 안이면 아무것도 하지 않으므로
  // 콜백이 렌더마다 새로 만들어져도 다시 호출되지 않는다.
  useEffect(() => {
    if (shown === current) return;
    if (value === undefined) setInternalValue(shown);
    onValueChange?.(shown);
    onClamp?.(shown);
  }, [shown, current, value, onValueChange, onClamp]);

  const canDecrement = !disabled && shown > min;
  const canIncrement = !disabled && (max === undefined || shown < max);

  // 한계에 닿은 버튼은 disabled로 포커스에서 빠진다 — 그 버튼에 있던 포커스가 body로 떨어지지 않게 반대쪽 버튼으로
  // 옮긴다. 반대쪽 버튼은 값이 바뀐 렌더 뒤에야 활성되므로 렌더가 끝난 다음에 옮긴다.
  const pressedRef = useRef<'decrement' | 'increment' | null>(null);

  useLayoutEffect(() => {
    const pressed = pressedRef.current;
    pressedRef.current = null;
    if (pressed === 'increment' && incrementRef.current?.disabled) decrementRef.current?.focus();
    if (pressed === 'decrement' && decrementRef.current?.disabled) incrementRef.current?.focus();
  });

  const change = (direction: -1 | 1) => {
    pressedRef.current = direction === 1 ? 'increment' : 'decrement';
    commit(clamp(shown + direction * step, min, max));
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={clsx(numberStepper({ size }), className)}
      {...props}
    >
      <button
        ref={decrementRef}
        type="button"
        className={styles.button}
        aria-label={`${label} 줄이기`}
        disabled={!canDecrement}
        onClick={() => change(-1)}
      >
        <MinusIcon />
      </button>
      <output className={styles.value} aria-live="polite">
        {shown}
      </output>
      <button
        ref={incrementRef}
        type="button"
        className={styles.button}
        aria-label={`${label} 늘리기`}
        disabled={!canIncrement}
        onClick={() => change(1)}
      >
        <PlusIcon />
      </button>
    </div>
  );
};
