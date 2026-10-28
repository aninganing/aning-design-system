import { cva } from 'class-variance-authority';
import styles from './NumberStepper.module.css';

export const numberStepper = cva(styles.base, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
