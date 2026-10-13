import type { Ref, RefCallback } from 'react';

/**
 * 여러 ref를 하나의 ref 콜백으로 합친다.
 *
 * React 19의 ref cleanup을 지원한다: 합쳐진 콜백은 항상 정리 함수를 반환하므로 React는 분리 시
 * `null`로 다시 호출하지 않고 이 정리 함수를 부른다. 그 안에서 각 ref를 다음처럼 정리한다.
 * - 정리 함수를 반환한 콜백 ref → 그 정리 함수를 호출
 * - 정리 함수가 없는 콜백 ref → 기존 동작대로 `null`로 호출
 * - 객체 ref → `current`를 `null`로 초기화
 */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (value) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === 'function') {
        const cleanup = ref(value);
        return typeof cleanup === 'function' ? cleanup : () => ref(null);
      }
      if (ref) {
        ref.current = value;
        return () => {
          ref.current = null;
        };
      }
      return undefined;
    });

    return () => {
      for (const cleanup of cleanups) cleanup?.();
    };
  };
}
