import '@testing-library/jest-dom/vitest';

// jsdom에는 ResizeObserver가 없다. Radix Tooltip(Popper)이 위치 계산에 쓰므로 빈 구현을 둔다.
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
