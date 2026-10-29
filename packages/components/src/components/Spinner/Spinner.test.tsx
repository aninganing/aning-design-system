import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a status region with the default label', () => {
    render(<Spinner delay={0} />);
    expect(screen.getByRole('status')).toHaveTextContent('불러오는 중');
  });

  it('uses the given label', () => {
    render(<Spinner delay={0} label="결제 확인 중" />);
    expect(screen.getByRole('status')).toHaveTextContent('결제 확인 중');
  });

  it('keeps the status region empty until the delay passes', () => {
    vi.useFakeTimers();
    render(<Spinner />);
    const status = screen.getByRole('status');
    expect(status).toBeEmptyDOMElement();

    act(() => vi.advanceTimersByTime(299));
    expect(status).toBeEmptyDOMElement();

    act(() => vi.advanceTimersByTime(1));
    expect(status).toHaveTextContent('불러오는 중');
  });

  it('never draws when unmounted before the delay', () => {
    vi.useFakeTimers();
    const { unmount } = render(<Spinner />);
    unmount();
    expect(() => act(() => vi.advanceTimersByTime(300))).not.toThrow();
  });

  it('forwards ref to the status element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} delay={0} />);
    expect(ref.current).toBe(screen.getByRole('status'));
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Spinner delay={0} tone="accent" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
