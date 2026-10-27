import { cva } from 'class-variance-authority';
import styles from './Field.module.css';

export const field = cva(styles.base, {
  variants: {
    fullWidth: {
      true: styles.fullWidth,
      false: '',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});
