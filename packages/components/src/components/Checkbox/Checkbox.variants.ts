import { cva } from 'class-variance-authority';
import styles from './Checkbox.module.css';

// Checkbox는 크기·모양 variant가 없다(박스 20px 고정). 다른 컴포넌트와 같은 방식으로 클래스를 조합하려고
// cva를 두되, 상태 표현은 네이티브 input의 :checked / :indeterminate / :disabled 선택자가 맡는다.
export const checkbox = cva(styles.root);
