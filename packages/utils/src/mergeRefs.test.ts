import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { mergeRefs } from './mergeRefs';

// React 19가 ref 콜백을 다루는 방식을 그대로 흉내 낸다: 붙을 때 엘리먼트로 호출하고,
// 반환된 정리 함수가 있으면 분리할 때 그것을 호출한다.
const attach = <T,>(ref: ReturnType<typeof mergeRefs<T>>, value: T) => {
  const cleanup = ref(value);
  return () => {
    if (typeof cleanup === 'function') cleanup();
    else ref(null);
  };
};

describe('mergeRefs', () => {
  it('assigns the value to object refs and callback refs', () => {
    const objectRef = createRef<string>();
    const callbackRef = vi.fn();
    attach(mergeRefs(objectRef, callbackRef), 'node');

    expect(objectRef.current).toBe('node');
    expect(callbackRef).toHaveBeenCalledWith('node');
  });

  it('resets object refs and calls plain callback refs with null on detach', () => {
    const objectRef = createRef<string>();
    const callbackRef = vi.fn();
    const detach = attach(mergeRefs(objectRef, callbackRef), 'node');

    detach();

    expect(objectRef.current).toBeNull();
    expect(callbackRef).toHaveBeenLastCalledWith(null);
  });

  it('runs the cleanup returned by a callback ref instead of calling it with null', () => {
    const cleanup = vi.fn();
    const callbackRef = vi.fn(() => cleanup);
    const detach = attach(mergeRefs(callbackRef), 'node');

    detach();

    expect(cleanup).toHaveBeenCalledOnce();
    expect(callbackRef).toHaveBeenCalledTimes(1);
    expect(callbackRef).not.toHaveBeenCalledWith(null);
  });

  it('ignores null and undefined refs', () => {
    const objectRef = createRef<string>();
    const detach = attach(mergeRefs(null, undefined, objectRef), 'node');

    expect(objectRef.current).toBe('node');
    expect(detach).not.toThrow();
  });
});
