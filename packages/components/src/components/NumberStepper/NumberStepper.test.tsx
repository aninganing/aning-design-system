import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { NumberStepper } from './NumberStepper';

describe('NumberStepper', () => {
  it('renders a named group with labelled buttons and the value', () => {
    render(<NumberStepper label="인원" defaultValue={2} />);
    expect(screen.getByRole('group', { name: '인원' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '인원 줄이기' })).toHaveAttribute('type', 'button');
    expect(screen.getByRole('button', { name: '인원 늘리기' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('2');
  });

  it('starts at min when no value is given', () => {
    render(<NumberStepper label="인원" min={1} />);
    expect(screen.getByRole('status')).toHaveTextContent('1');
    expect(screen.getByRole('button', { name: '인원 줄이기' })).toBeDisabled();
  });

  it('changes the value by step and calls onValueChange', () => {
    const onValueChange = vi.fn();
    render(<NumberStepper label="인원" defaultValue={2} step={2} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole('button', { name: '인원 늘리기' }));
    expect(onValueChange).toHaveBeenLastCalledWith(4);
    expect(screen.getByRole('status')).toHaveTextContent('4');
    fireEvent.click(screen.getByRole('button', { name: '인원 줄이기' }));
    expect(onValueChange).toHaveBeenLastCalledWith(2);
  });

  it('does not change by itself when controlled', () => {
    const onValueChange = vi.fn();
    render(<NumberStepper label="인원" value={3} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole('button', { name: '인원 늘리기' }));
    expect(onValueChange).toHaveBeenCalledWith(4);
    expect(screen.getByRole('status')).toHaveTextContent('3');
  });

  it('disables the button at the limit and moves focus to the other one', () => {
    render(<NumberStepper label="인원" defaultValue={1} max={2} />);
    const increment = screen.getByRole('button', { name: '인원 늘리기' });
    increment.focus();
    fireEvent.click(increment);
    expect(increment).toBeDisabled();
    expect(screen.getByRole('button', { name: '인원 줄이기' })).toHaveFocus();
  });

  it('clamps the value to a lowered max and calls onClamp', () => {
    const onValueChange = vi.fn();
    const onClamp = vi.fn();
    const { rerender } = render(
      <NumberStepper label="인원" defaultValue={4} max={6} onValueChange={onValueChange} onClamp={onClamp} />,
    );
    expect(onClamp).not.toHaveBeenCalled();

    rerender(<NumberStepper label="인원" defaultValue={4} max={2} onValueChange={onValueChange} onClamp={onClamp} />);
    expect(screen.getByRole('status')).toHaveTextContent('2');
    expect(onValueChange).toHaveBeenCalledWith(2);
    expect(onClamp).toHaveBeenCalledOnce();
    expect(onClamp).toHaveBeenCalledWith(2);
  });

  it('disables both buttons when disabled', () => {
    render(<NumberStepper label="인원" defaultValue={2} disabled />);
    expect(screen.getByRole('button', { name: '인원 줄이기' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '인원 늘리기' })).toBeDisabled();
  });

  it('forwards ref to the group element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<NumberStepper ref={ref} label="인원" />);
    expect(ref.current).toBe(screen.getByRole('group'));
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <>
        <NumberStepper label="인원" defaultValue={2} max={4} aria-describedby="hint" />
        <p id="hint">이 회차는 최대 4명까지 예약할 수 있어요</p>
      </>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
