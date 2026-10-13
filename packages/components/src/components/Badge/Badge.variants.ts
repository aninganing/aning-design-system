import { cva } from 'class-variance-authority';
import styles from './Badge.module.css';

export const badge = cva(styles.base, {
  variants: {
    tone: {
      neutral: styles.toneNeutral,
      accent: styles.toneAccent,
      success: styles.toneSuccess,
      danger: styles.toneDanger,
    },
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
    },
  },
  defaultVariants: {
    tone: 'neutral',
    size: 'md',
  },
});
