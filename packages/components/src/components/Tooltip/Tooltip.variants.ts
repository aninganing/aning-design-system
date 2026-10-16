import { cva } from 'class-variance-authority';
import styles from './Tooltip.module.css';

// 툴팁은 모양 variant가 없다. 위치(side·align)는 Radix가 계산해 data-side로 알려주고, CSS가 그 값으로
// 등장 방향만 바꾼다. 다른 컴포넌트와 같은 방식으로 클래스를 조합하려고 cva를 둔다.
export const tooltip = cva(styles.content);
