import { cva } from 'class-variance-authority';
import styles from './Chip.module.css';

export const chip = cva(styles.base, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
    },
    selected: {
      true: styles.selected,
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    selected: false,
  },
});
