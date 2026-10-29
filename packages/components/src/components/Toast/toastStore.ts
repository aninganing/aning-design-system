import type { ToastItem, ToastOptions } from './Toast.types';

// 한 번에 보이는 토스트 수. 넘치면 가장 오래된 것부터 닫는다
const MAX_VISIBLE = 3;
// 닫힘 애니메이션이 끝난 뒤 목록에서 지운다
const REMOVE_DELAY = 300;

let items: ToastItem[] = [];
let count = 0;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());

const setItems = (next: ToastItem[]) => {
  items = next;
  emit();
};

export const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getItems = () => items;

export const dismiss = (id: string) => {
  if (!items.some((item) => item.id === id && item.open)) return;
  setItems(items.map((item) => (item.id === id ? { ...item, open: false } : item)));
  setTimeout(() => setItems(items.filter((item) => item.id !== id)), REMOVE_DELAY);
};

export const show = (options: ToastOptions) => {
  count += 1;
  const id = `toast-${count}`;
  setItems([...items, { ...options, id, open: true }]);
  const open = items.filter((item) => item.open);
  open.slice(0, Math.max(0, open.length - MAX_VISIBLE)).forEach((item) => dismiss(item.id));
  return id;
};

// Toaster가 여러 개 마운트돼도(Storybook Docs, 실수로 두 번 둔 앱) 먼저 마운트된 하나만 토스트를 그린다
let toasters: symbol[] = [];
const toasterListeners = new Set<() => void>();

export const registerToaster = (key: symbol) => {
  toasters = [...toasters, key];
  toasterListeners.forEach((listener) => listener());
  return () => {
    toasters = toasters.filter((other) => other !== key);
    toasterListeners.forEach((listener) => listener());
  };
};

export const subscribeToasters = (listener: () => void) => {
  toasterListeners.add(listener);
  return () => toasterListeners.delete(listener);
};

export const getActiveToaster = () => toasters[0];

/** 테스트에서 토스트 상태를 비운다 */
export const resetToasts = () => setItems([]);
