import { cva } from 'class-variance-authority';
import styles from './Button.module.css';

export const button = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.variantPrimary,
      secondary: styles.variantSecondary,
      danger: styles.variantDanger,
    },
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
