import '@testing-library/jest-dom/vitest';

// jsdom에는 ResizeObserver가 없다. Radix Tooltip(Popper)이 위치 계산에 쓰므로 빈 구현을 둔다.
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// jsdom에는 포인터 캡처와 scrollIntoView가 없다. Radix Select가 목록을 열고 선택 항목으로 스크롤할 때 쓴다.
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
}
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
