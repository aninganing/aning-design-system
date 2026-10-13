import { useEffect, useId, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { mergeRefs } from '@aninganing/utils';
import { checkbox } from './Checkbox.variants';
import styles from './Checkbox.module.css';
import type { CheckboxGroupProps, CheckboxProps } from './Checkbox.types';

const CheckIcon = () => (
  <svg className={clsx(styles.icon, styles.iconCheck)} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 6.25L5 8.75L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DashIcon = () => (
  <svg className={clsx(styles.icon, styles.iconDash)} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 6H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Checkbox = ({
  ref,
  className,
  style,
  label,
  description,
  indeterminate = false,
  onCheckedChange,
  onChange,
  'aria-describedby': describedBy,
  ...props
}: CheckboxProps) => {
  const innerRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMemo(() => mergeRefs(ref, innerRef), [ref]);
  const descriptionId = useId();

  // indeterminate는 HTML 속성이 없는 DOM 프로퍼티라 렌더링 후 직접 설정한다
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={clsx(checkbox(), className)} style={style}>
      <input
        ref={mergedRef}
        type="checkbox"
        className={styles.input}
        aria-describedby={clsx(description != null && descriptionId, describedBy) || undefined}
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.target.checked);
        }}
        {...props}
      />
      <span className={styles.box} aria-hidden="true">
        <CheckIcon />
        <DashIcon />
      </span>
      <span className={styles.text}>
        {label}
        {description != null && (
          <span id={descriptionId} className={styles.description}>
            {description}
          </span>
        )}
      </span>
    </label>
  );
};

export const CheckboxGroup = ({ ref, className, legend, children, ...props }: CheckboxGroupProps) => (
  <fieldset ref={ref} className={clsx(styles.group, className)} {...props}>
    <legend className={styles.legend}>{legend}</legend>
    {children}
  </fieldset>
);
