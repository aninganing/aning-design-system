import { cva } from 'class-variance-authority';
import styles from './RadioCard.module.css';

// 선택·비활성·포커스는 네이티브 input의 :checked / :disabled / :focus-visible을 :has()로 읽어 카드에 그리고,
// 앱이 정하는 invalid만 variant로 둔다.
export const radioCard = cva(styles.base, {
  variants: {
    invalid: {
      true: styles.invalid,
      false: null,
    },
  },
  defaultVariants: {
    invalid: false,
  },
});
