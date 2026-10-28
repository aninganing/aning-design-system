import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders title and description without a live role by default', () => {
    const { container } = render(<Alert title="좌석을 10분 동안 잡아 둘게요" description="시간 안에 결제해 주세요" />);
    expect(screen.getByText('좌석을 10분 동안 잡아 둘게요')).toBeInTheDocument();
    expect(screen.getByText('시간 안에 결제해 주세요')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(container.firstElementChild).not.toHaveAttribute('role');
  });

  it('maps live to status and alert roles', () => {
    const { rerender } = render(<Alert title="새 회차가 열렸어요" live="polite" />);
    expect(screen.getByRole('status')).toHaveTextContent('새 회차가 열렸어요');
    rerender(<Alert tone="danger" title="선택한 회차가 마감됐어요" live="assertive" />);
    expect(screen.getByRole('alert')).toHaveTextContent('선택한 회차가 마감됐어요');
  });

  it('hides the icon from assistive tech, and can replace or remove it', () => {
    const { container, rerender } = render(<Alert title="환불 규정" tone="neutral" />);
    expect(container.querySelector('[aria-hidden="true"] svg')).toBeInTheDocument();
    rerender(<Alert title="환불 규정" icon={<svg data-testid="custom" />} />);
    expect(screen.getByTestId('custom').parentElement).toHaveAttribute('aria-hidden', 'true');
    rerender(<Alert title="환불 규정" icon={null} />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('renders the action slot', () => {
    render(<Alert tone="danger" title="선택한 회차가 마감됐어요" action={<button type="button">다시 고르기</button>} />);
    expect(screen.getByRole('button', { name: '다시 고르기' })).toBeInTheDocument();
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Alert ref={ref} title="안내" />);
    expect(ref.current).toBe(container.firstElementChild);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <>
        <Alert title="좌석을 10분 동안 잡아 둘게요" description="시간 안에 결제해 주세요" />
        <Alert tone="neutral" title="환불 규정" description="클래스 3일 전까지 전액 환불돼요" />
        <Alert tone="danger" title="선택한 회차가 마감됐어요" live="assertive" action={<button type="button">다시 고르기</button>} />
      </>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
