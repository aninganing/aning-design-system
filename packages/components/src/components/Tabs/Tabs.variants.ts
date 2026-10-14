import { cva } from 'class-variance-authority';
import styles from './Tabs.module.css';

// variant는 루트에 클래스로 붙이고, List·Tab의 모양은 CSS에서 `.variantX .list` 같은 하위 선택자로 바꾼다.
// 하위 컴포넌트마다 variant를 다시 넘기지 않아도 되게 하기 위함.
export const tabs = cva(styles.root, {
  variants: {
    variant: {
      line: styles.variantLine,
      pill: styles.variantPill,
    },
  },
  defaultVariants: {
    variant: 'line',
  },
});
