import { cva } from 'class-variance-authority';
import styles from './IconButton.module.css';

export const iconButton = cva(styles.base, {
  variants: {
    variant: {
      ghost: styles.variantGhost,
      outline: styles.variantOutline,
      overlay: styles.variantOverlay,
    },
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
    shape: {
      square: styles.shapeSquare,
      round: styles.shapeRound,
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'md',
    shape: 'square',
  },
});
