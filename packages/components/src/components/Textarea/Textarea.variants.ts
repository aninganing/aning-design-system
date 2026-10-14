import { cva } from 'class-variance-authority';
import styles from './Textarea.module.css';

export const textarea = cva(styles.field, {
  variants: {
    state: {
      default: '',
      error: styles.stateError,
    },
    autoResize: {
      true: styles.autoResize,
      false: '',
    },
  },
  defaultVariants: {
    state: 'default',
    autoResize: false,
  },
});
