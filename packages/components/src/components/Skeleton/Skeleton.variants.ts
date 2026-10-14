import { cva } from 'class-variance-authority';
import styles from './Skeleton.module.css';

export const skeleton = cva(styles.base, {
  variants: {
    shape: {
      text: styles.shapeText,
      rect: styles.shapeRect,
      circle: styles.shapeCircle,
    },
  },
  defaultVariants: {
    shape: 'text',
  },
});
