import { cva } from 'class-variance-authority';
import styles from './Radio.module.css';

// RadioGroup의 배치 방향만 variant로 둔다. 각 Radio의 상태 표현은 네이티브 input의
// :checked / :disabled / :focus-visible 선택자가 맡는다.
export const radioGroup = cva(styles.group, {
  variants: {
    orientation: {
      vertical: styles.vertical,
      horizontal: styles.horizontal,
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});
