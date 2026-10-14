import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders a switch named by its label only, with the description linked', () => {
    render(<Switch label="예약 확정 알림" description="수업 하루 전 알림을 받는다" />);
    const el = screen.getByRole('switch');
    expect(el).toHaveAccessibleName('예약 확정 알림');
    expect(el).toHaveAccessibleDescription('수업 하루 전 알림을 받는다');
    expect(el).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles uncontrolled and reports the new value', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="마케팅 정보 수신" defaultChecked onCheckedChange={onCheckedChange} />);
    const el = screen.getByRole('switch');
    expect(el).toHaveAttribute('aria-checked', 'true');

    await user.click(el);
    expect(el).toHaveAttribute('aria-checked', 'false');
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('toggles when the label is clicked', async () => {
    const user = userEvent.setup();
    render(<Switch label="예약 확정 알림" />);
    await user.click(screen.getByText('예약 확정 알림'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles with Space and Enter', async () => {
    const user = userEvent.setup();
    render(<Switch label="예약 확정 알림" />);
    await user.tab();
    expect(screen.getByRole('switch')).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('follows the controlled value', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    const { rerender } = render(
      <Switch label="알림" checked={false} onCheckedChange={onCheckedChange} />,
    );
    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    // 부모가 값을 바꾸기 전까지는 그대로다
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    rerender(<Switch label="알림" checked onCheckedChange={onCheckedChange} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="알림" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('forwards ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Switch ref={ref} label="알림" />);
    expect(ref.current).toBe(screen.getByRole('switch'));
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        <Switch label="예약 확정 알림" description="수업 하루 전 알림을 받는다" defaultChecked />
        <Switch label="마케팅 정보 수신" size="sm" />
      </div>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
