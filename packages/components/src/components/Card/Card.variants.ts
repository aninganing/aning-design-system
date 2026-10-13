import { cva } from 'class-variance-authority';
import styles from './Card.module.css';

export const card = cva(styles.base, {
  variants: {
    variant: {
      outlined: styles.variantOutlined,
      elevated: styles.variantElevated,
    },
    interactive: {
      true: styles.interactive,
      false: '',
    },
  },
  defaultVariants: {
    variant: 'outlined',
    interactive: false,
  },
});
