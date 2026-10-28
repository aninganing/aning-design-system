import { cva } from 'class-variance-authority';
import styles from './Toast.module.css';

// 토스트 자체에는 variant가 없다 — 성공·실패를 색으로 나누지 않고 문구로 전달한다.
export const toastViewport = cva(styles.viewport);
