import clsx from 'clsx';
import { alert } from './Alert.variants';
import styles from './Alert.module.css';
import type { AlertProps } from './Alert.types';

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

const DangerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="13.5" r="1" fill="currentColor" />
  </svg>
);

const defaultIcons = {
  info: <InfoIcon />,
  neutral: <InfoIcon />,
  danger: <DangerIcon />,
};

const liveRoles = {
  off: undefined,
  polite: 'status',
  assertive: 'alert',
} as const;

export const Alert = ({
  ref,
  className,
  tone,
  title,
  description,
  icon,
  action,
  live = 'off',
  ...props
}: AlertProps) => {
  const shownIcon = icon === undefined ? defaultIcons[tone ?? 'info'] : icon;

  return (
    <div ref={ref} role={liveRoles[live]} className={clsx(alert({ tone }), className)} {...props}>
      {shownIcon != null && (
        <span className={styles.icon} aria-hidden="true">
          {shownIcon}
        </span>
      )}
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {description != null && <p className={styles.description}>{description}</p>}
      </div>
      {action != null && <div className={styles.action}>{action}</div>}
    </div>
  );
};
