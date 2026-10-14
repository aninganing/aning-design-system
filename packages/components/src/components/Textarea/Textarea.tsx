import { useCallback, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { mergeRefs } from '@aninganing/utils';
import { textarea } from './Textarea.variants';
import styles from './Textarea.module.css';
import type { TextareaProps } from './Textarea.types';

const toCss = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

export const Textarea = ({
  ref,
  className,
  style,
  error = false,
  description,
  height = 96,
  autoResize = false,
  maxRows,
  maxLength,
  showCount = true,
  value,
  defaultValue,
  onChange,
  'aria-describedby': describedBy,
  ...props
}: TextareaProps) => {
  const innerRef = useRef<HTMLTextAreaElement>(null);
  const mergedRef = useMemo(() => mergeRefs(ref, innerRef), [ref]);
  const descriptionId = useId();
  const countId = useId();

  // controlled면 value에서, uncontrolled면 입력할 때마다 글자 수를 센다
  const [uncontrolledLength, setUncontrolledLength] = useState(() => String(defaultValue ?? '').length);
  const length = value !== undefined ? String(value).length : uncontrolledLength;
  const counted = maxLength !== undefined && showCount;
  const atLimit = maxLength !== undefined && length >= maxLength;

  const resize = useCallback(() => {
    const el = innerRef.current;
    if (!el || !autoResize) return;
    el.style.height = 'auto';
    const cs = getComputedStyle(el);
    const border = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
    let height = el.scrollHeight + border;
    if (maxRows) {
      const padding = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      const max = parseFloat(cs.lineHeight) * maxRows + padding + border;
      el.style.overflowY = height > max ? 'auto' : 'hidden';
      height = Math.min(height, max);
    }
    el.style.height = `${height}px`;
  }, [autoResize, maxRows]);

  // controlled 값이 바뀌거나 처음 그릴 때 높이를 맞춘다(uncontrolled 입력은 onChange에서 맞춘다)
  useLayoutEffect(() => {
    resize();
  }, [resize, value]);

  return (
    <div className={clsx(styles.root, className)} style={style}>
      <textarea
        ref={mergedRef}
        className={textarea({ state: error ? 'error' : 'default', autoResize })}
        // autoResize면 height는 최소 높이가 되고 실제 높이는 스크립트가 정한다
        style={autoResize ? { minHeight: toCss(height) } : { height: toCss(height) }}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        aria-invalid={error || undefined}
        aria-describedby={
          clsx(description != null && descriptionId, counted && countId, describedBy) || undefined
        }
        onChange={(event) => {
          onChange?.(event);
          if (value === undefined) setUncontrolledLength(event.target.value.length);
          resize();
        }}
        {...props}
      />
      {(description != null || counted) && (
        <div className={styles.foot}>
          {description != null && (
            <span id={descriptionId} className={styles.description}>
              {description}
            </span>
          )}
          {counted && (
            <span id={countId} className={clsx(styles.count, atLimit && styles.countLimit)}>
              {length} / {maxLength}
            </span>
          )}
        </div>
      )}
      {/* 카운터는 매 글자마다 읽히지 않도록 live가 아니고, 한도에 닿았을 때만 이 영역으로 알린다 */}
      {maxLength !== undefined && (
        <span className={styles.srOnly} aria-live="polite">
          {atLimit ? `최대 ${maxLength}자까지 입력할 수 있어요` : ''}
        </span>
      )}
    </div>
  );
};
