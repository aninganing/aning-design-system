import { cva } from 'class-variance-authority';
import styles from './Input.module.css';

export const input = cva(styles.base, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
    state: {
      default: '',
      error: styles.stateError,
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'default',
  },
});
