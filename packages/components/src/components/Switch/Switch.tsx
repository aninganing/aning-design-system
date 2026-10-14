import { useId } from 'react';
import clsx from 'clsx';
import { useControllableState } from '@aninganing/utils';
import { switchTrack } from './Switch.variants';
import styles from './Switch.module.css';
import type { SwitchProps } from './Switch.types';

export const Switch = ({
  ref,
  className,
  style,
  id,
  label,
  description,
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  size,
  onClick,
  'aria-describedby': describedBy,
  ...props
}: SwitchProps) => {
  const autoId = useId();
  const descriptionId = useId();
  const switchId = id ?? autoId;
  const [checked, setChecked] = useControllableState({
    value: checkedProp,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <div className={clsx(styles.root, className)} style={style}>
      <span className={styles.text}>
        {/* button은 label을 붙일 수 있는 요소라, 라벨을 누르면 스위치가 눌리고 라벨 글자가 이름이 된다.
            설명은 label 밖에 두어 이름에 섞이지 않게 한다 */}
        <label htmlFor={switchId} className={styles.label}>
          {label}
        </label>
        {description != null && (
          <span id={descriptionId} className={styles.description}>
            {description}
          </span>
        )}
      </span>
      <button
        ref={ref}
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={clsx(description != null && descriptionId, describedBy) || undefined}
        className={switchTrack({ size })}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setChecked(!checked);
        }}
        {...props}
      />
    </div>
  );
};
