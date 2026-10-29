import { cva } from 'class-variance-authority';
import styles from './Select.module.css';

export const select = cva(styles.trigger, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
