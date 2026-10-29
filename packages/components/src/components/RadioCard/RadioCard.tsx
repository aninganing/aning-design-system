import { useContext, useId } from 'react';
import clsx from 'clsx';
import { RadioGroupContext } from '../Radio/RadioGroupContext';
import { radioCard } from './RadioCard.variants';
import styles from './RadioCard.module.css';
import type { RadioCardProps } from './RadioCard.types';

// RadioGroup 안에 넣어 쓴다 — fieldset·legend, 선택 값, 방향키 이동(같은 name의 네이티브 radio)은 RadioGroup이 맡는다.
export const RadioCard = ({
  ref,
  className,
  style,
  value,
  title,
  description,
  aside,
  invalid = false,
  onChange,
  'aria-describedby': describedBy,
  'aria-labelledby': labelledBy,
  ...props
}: RadioCardProps) => {
  const group = useContext(RadioGroupContext);
  const titleId = useId();
  const descriptionId = useId();
  const asideId = useId();

  return (
    <label className={clsx(radioCard({ invalid }), className)} style={style}>
      <input
        ref={ref}
        type="radio"
        className={styles.input}
        name={group?.name}
        value={value}
        checked={group ? group.value === value : undefined}
        required={group?.required}
        // <label>이 카드 전체를 감싸 암묵적 이름에 설명·aside가 섞이므로, 이름은 제목으로만 명시한다
        aria-labelledby={labelledBy ?? titleId}
        aria-describedby={
          clsx(description != null && descriptionId, aside != null && asideId, describedBy) || undefined
        }
        onChange={(event) => {
          onChange?.(event);
          if (event.target.checked) group?.select(value);
        }}
        {...props}
      />
      <span className={styles.circle} aria-hidden="true" />
      <span className={styles.text}>
        <span id={titleId} className={styles.title}>
          {title}
        </span>
        {description != null && (
          <span id={descriptionId} className={styles.description}>
            {description}
          </span>
        )}
      </span>
      {aside != null && (
        <span id={asideId} className={styles.aside}>
          {aside}
        </span>
      )}
    </label>
  );
};
