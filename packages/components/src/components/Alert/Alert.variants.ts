import { cva } from 'class-variance-authority';
import styles from './Alert.module.css';

export const alert = cva(styles.base, {
  variants: {
    tone: {
      info: styles.toneInfo,
      neutral: styles.toneNeutral,
      danger: styles.toneDanger,
    },
  },
  defaultVariants: {
    tone: 'info',
  },
});
