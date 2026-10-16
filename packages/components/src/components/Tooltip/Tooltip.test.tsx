import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Tooltip } from './Tooltip';

const RefundTip = (props: { delay?: number; onOpenChange?: (open: boolean) => void; open?: boolean }) => (
  <Tooltip content="클래스 3일 전까지 전액 환불돼요." {...props}>
    <button type="button" aria-label="환불 규정">
      ?
    </button>
  </Tooltip>
);

describe('Tooltip', () => {
  it('opens on keyboard focus and describes the trigger', async () => {
    const user = userEvent.setup();
    render(<RefundTip />);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    await user.tab();
    const tip = await screen.findByRole('tooltip');
    expect(tip).toHaveTextContent('클래스 3일 전까지 전액 환불돼요.');
    // 툴팁은 이름이 아니라 설명이다
    const trigger = screen.getByRole('button', { name: '환불 규정' });
    expect(trigger).toHaveAccessibleDescription('클래스 3일 전까지 전액 환불돼요.');
  });

  it('closes with Escape', async () => {
    const user = userEvent.setup();
    render(<RefundTip />);
    await user.tab();
    await screen.findByRole('tooltip');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('opens on hover', async () => {
    // 닫힘은 Escape 테스트로 확인한다. 마우스를 뗄 때 Radix는 트리거→툴팁 사이 유예 영역을 좌표로 계산하는데,
    // jsdom에는 레이아웃 좌표가 없어 unhover로는 닫힘을 재현할 수 없다.
    const user = userEvent.setup();
    render(<RefundTip delay={0} />);
    await user.hover(screen.getByRole('button'));
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  it('reports open state changes and follows the controlled value', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(<RefundTip open={false} onOpenChange={onOpenChange} />);
    await user.tab();
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    rerender(<RefundTip open onOpenChange={onOpenChange} />);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  it('has no accessibility violations while open', async () => {
    const { baseElement } = render(<RefundTip open />);
    await screen.findByRole('tooltip');
    // 툴팁은 포털로 body 끝에 붙어 랜드마크 밖에 있다. 포털 오버레이에 해당하는 region 규칙만 끄고 검사한다.
    const results = await axe(baseElement, { rules: { region: { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });
});
