import { cva } from 'class-variance-authority';
import styles from './Spinner.module.css';

export const spinner = cva(styles.base, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
    tone: {
      current: styles.toneCurrent,
      accent: styles.toneAccent,
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'current',
  },
});
