import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Radio, RadioGroup } from './Radio';
import type { RadioGroupProps } from './Radio.types';

const TimeGroup = (props: Partial<RadioGroupProps>) => (
  <RadioGroup legend="시간 선택" {...props}>
    <Radio value="10" label="10:00 – 12:00" description="잔여 3석" />
    <Radio value="14" label="14:00 – 16:00" description="잔여 1석" />
    <Radio value="19" label="19:00 – 21:00" description="마감" disabled />
  </RadioGroup>
);

describe('Radio', () => {
  it('renders a radiogroup named by its legend with native radios', () => {
    render(<TimeGroup />);
    expect(screen.getByRole('radiogroup', { name: '시간 선택' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('shares one name across the group so the browser treats them as a group', () => {
    render(<TimeGroup />);
    const [a, b] = screen.getAllByRole<HTMLInputElement>('radio');
    expect(a!.name).not.toBe('');
    expect(a!.name).toBe(b!.name);
  });

  it('uses the given name for form submission', () => {
    render(<TimeGroup name="time" />);
    expect(screen.getAllByRole<HTMLInputElement>('radio')[0]!.name).toBe('time');
  });

  it('selects uncontrolled and reports the value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TimeGroup defaultValue="10" onValueChange={onValueChange} />);
    expect(screen.getByRole('radio', { name: '10:00 – 12:00' })).toBeChecked();

    await user.click(screen.getByText('14:00 – 16:00'));
    expect(screen.getByRole('radio', { name: '14:00 – 16:00' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '10:00 – 12:00' })).not.toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('14');
  });

  it('follows the controlled value', () => {
    const { rerender } = render(<TimeGroup value="10" onValueChange={() => {}} />);
    expect(screen.getByRole('radio', { name: '10:00 – 12:00' })).toBeChecked();
    rerender(<TimeGroup value="14" onValueChange={() => {}} />);
    expect(screen.getByRole('radio', { name: '14:00 – 16:00' })).toBeChecked();
  });

  it('moves selection with arrow keys and skips disabled options', async () => {
    const user = userEvent.setup();
    render(<TimeGroup defaultValue="10" />);
    await user.tab();
    expect(screen.getByRole('radio', { name: '10:00 – 12:00' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: '14:00 – 16:00' })).toBeChecked();
    await user.keyboard('{ArrowDown}');
    // 19시(disabled)를 건너뛰고 처음으로 돌아간다
    expect(screen.getByRole('radio', { name: '10:00 – 12:00' })).toBeChecked();
  });

  it('names by the label only and links the description with aria-describedby', () => {
    render(<TimeGroup />);
    const el = screen.getAllByRole('radio')[0]!;
    expect(el).toHaveAccessibleName('10:00 – 12:00');
    expect(el).toHaveAccessibleDescription('잔여 3석');
  });

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <RadioGroup legend="결제 수단">
        <Radio ref={ref} value="card" label="카드" />
      </RadioGroup>,
    );
    expect(ref.current).toBe(screen.getByRole('radio'));
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<TimeGroup defaultValue="10" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
