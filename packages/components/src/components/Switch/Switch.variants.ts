import { cva } from 'class-variance-authority';
import styles from './Switch.module.css';

export const switchTrack = cva(styles.track, {
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
