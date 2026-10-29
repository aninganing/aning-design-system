import { cva } from 'class-variance-authority';
import styles from './Dialog.module.css';

export const dialog = cva(styles.content, {
  variants: {
    variant: {
      center: styles.variantCenter,
      sheet: styles.variantSheet,
    },
  },
  defaultVariants: {
    variant: 'center',
  },
});

export const dialogFooter = cva(styles.footer, {
  variants: {
    layout: {
      end: styles.layoutEnd,
      stretch: styles.layoutStretch,
    },
  },
});
