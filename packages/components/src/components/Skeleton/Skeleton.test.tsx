import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('is hidden from assistive technology', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies width and height, treating numbers as px', () => {
    const { container } = render(<Skeleton shape="rect" width={240} height="50%" />);
    expect(container.firstElementChild).toHaveStyle({ width: '240px', height: '50%' });
  });

  it('renders the requested number of text lines', () => {
    const { container } = render(<Skeleton lines={3} width="80%" />);
    const wrapper = container.firstElementChild!;
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
    expect(wrapper).toHaveStyle({ width: '80%' });
    expect(wrapper.children).toHaveLength(3);
  });

  it('ignores lines for non-text shapes', () => {
    const { container } = render(<Skeleton shape="circle" width={40} lines={3} />);
    expect(container.firstElementChild!.children).toHaveLength(0);
  });

  it('forwards ref to the span element', () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(<Skeleton ref={ref} />);
    expect(ref.current).toBe(container.firstElementChild);
  });

  it('has no accessibility violations inside a busy region', async () => {
    const { container } = render(
      <section aria-busy="true" aria-label="클래스 목록 불러오는 중">
        <Skeleton shape="rect" height={120} />
        <Skeleton lines={2} />
        <Skeleton shape="circle" width={40} />
      </section>,
    );
    expect(screen.getByRole('region', { name: '클래스 목록 불러오는 중' })).toHaveAttribute('aria-busy', 'true');
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
