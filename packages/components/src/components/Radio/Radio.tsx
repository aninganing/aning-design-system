import { createContext, useContext, useId } from 'react';
import clsx from 'clsx';
import { useControllableState } from '@aninganing/utils';
import { radioGroup } from './Radio.variants';
import styles from './Radio.module.css';
import type { RadioGroupProps, RadioProps } from './Radio.types';

interface RadioGroupContextValue {
  name: string;
  value: string;
  required: boolean;
  select: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const RadioGroup = ({
  ref,
  className,
  legend,
  value: valueProp,
  defaultValue = '',
  onValueChange,
  name,
  orientation,
  required = false,
  children,
  ...props
}: RadioGroupProps) => {
  const autoName = useId();
  const legendId = useId();
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  return (
    <fieldset
      ref={ref}
      // fieldset의 기본 group 역할 대신 radiogroup으로 알리고, 이름은 legend로 명시적으로 연결한다
      role="radiogroup"
      aria-labelledby={legendId}
      aria-orientation={orientation ?? 'vertical'}
      aria-required={required || undefined}
      className={clsx(radioGroup({ orientation }), className)}
      {...props}
    >
      <legend id={legendId} className={styles.legend}>
        {legend}
      </legend>
      <RadioGroupContext value={{ name: name ?? autoName, value, required, select: setValue }}>
        <div className={styles.options}>{children}</div>
      </RadioGroupContext>
    </fieldset>
  );
};

export const Radio = ({
  ref,
  className,
  style,
  value,
  label,
  description,
  onChange,
  'aria-describedby': describedBy,
  'aria-labelledby': labelledBy,
  ...props
}: RadioProps) => {
  const group = useContext(RadioGroupContext);
  const labelId = useId();
  const descriptionId = useId();

  return (
    <label className={clsx(styles.root, className)} style={style}>
      <input
        ref={ref}
        type="radio"
        className={styles.input}
        name={group?.name}
        value={value}
        checked={group ? group.value === value : undefined}
        required={group?.required}
        // <label>이 설명까지 감싸고 있어 암묵적 이름에 설명이 섞이므로, 이름은 라벨 글자로만 명시한다
        aria-labelledby={labelledBy ?? labelId}
        aria-describedby={clsx(description != null && descriptionId, describedBy) || undefined}
        onChange={(event) => {
          onChange?.(event);
          if (event.target.checked) group?.select(value);
        }}
        {...props}
      />
      <span className={styles.circle} aria-hidden="true" />
      <span className={styles.text}>
        <span id={labelId}>{label}</span>
        {description != null && (
          <span id={descriptionId} className={styles.description}>
            {description}
          </span>
        )}
      </span>
    </label>
  );
};
