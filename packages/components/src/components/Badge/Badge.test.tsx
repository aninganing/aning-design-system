import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its label', () => {
    render(<Badge>2시간</Badge>);
    expect(screen.getByText('2시간')).toBeInTheDocument();
  });

  it('adds a decorative dot only for the success tone', () => {
    const { container, rerender } = render(<Badge tone="success">예약 확정</Badge>);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
    // 점은 장식이라 접근 가능한 이름에 영향을 주지 않는다
    expect(screen.getByText('예약 확정')).toHaveTextContent(/^예약 확정$/);

    rerender(<Badge tone="danger">마감 임박</Badge>);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
  });

  it('is not focusable or interactive', () => {
    render(<Badge tone="accent">신규 오픈</Badge>);
    const el = screen.getByText('신규 오픈');
    expect(el.tagName).toBe('SPAN');
    expect(el).not.toHaveAttribute('tabindex');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('forwards ref to the span element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>원데이</Badge>);
    expect(ref.current).toBe(screen.getByText('원데이'));
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <p>
        <Badge>2시간</Badge>
        <Badge tone="accent">신규 오픈</Badge>
        <Badge tone="success">예약 확정</Badge>
        <Badge tone="danger">마감 임박</Badge>
      </p>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
