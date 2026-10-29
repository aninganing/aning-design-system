import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { RadioGroup } from '../Radio';
import type { RadioGroupProps } from '../Radio';
import { RadioCard } from './RadioCard';

const SessionGroup = (props: Partial<RadioGroupProps>) => (
  <RadioGroup legend="회차 선택" {...props}>
    <RadioCard value="a" title="10월 30일 (목) 14:00" description="2시간 · 성수 공방" aside="잔여 3석" />
    <RadioCard value="b" title="10월 31일 (금) 19:00" description="2시간 · 성수 공방" aside="잔여 1석" />
    <RadioCard value="c" title="11월 1일 (토) 11:00" description="2시간 · 성수 공방" aside="마감" disabled />
  </RadioGroup>
);

describe('RadioCard', () => {
  it('renders native radios in the group, named by the title only', () => {
    render(<SessionGroup />);
    expect(screen.getByRole('radiogroup', { name: '회차 선택' })).toBeInTheDocument();
    const radio = screen.getByRole('radio', { name: '10월 30일 (목) 14:00' });
    expect(radio).toHaveAccessibleName('10월 30일 (목) 14:00');
    expect(radio).toHaveAccessibleDescription('2시간 · 성수 공방 잔여 3석');
  });

  it('selects when anywhere on the card is clicked and calls onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<SessionGroup onValueChange={onValueChange} />);
    await user.click(screen.getByText('잔여 1석'));
    expect(onValueChange).toHaveBeenCalledWith('b');
    expect(screen.getByRole('radio', { name: '10월 31일 (금) 19:00' })).toBeChecked();
  });

  it('moves selection with arrow keys and skips disabled cards', async () => {
    const user = userEvent.setup();
    render(<SessionGroup defaultValue="b" />);
    screen.getByRole('radio', { name: '10월 31일 (금) 19:00' }).focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: '10월 30일 (목) 14:00' })).toBeChecked();
  });

  it('does not select a disabled card', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<SessionGroup onValueChange={onValueChange} />);
    await user.click(screen.getByText('11월 1일 (토) 11:00'));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('radio', { name: '11월 1일 (토) 11:00' })).toBeDisabled();
  });

  it('links the invalid reason outside the card through aria-describedby', () => {
    render(
      <>
        <p id="reason">선택한 회차가 마감됐어요</p>
        <RadioGroup legend="회차 선택" defaultValue="a">
          <RadioCard value="a" title="10월 30일 (목) 14:00" description="2시간" invalid aria-describedby="reason" />
        </RadioGroup>
      </>,
    );
    const radio = screen.getByRole('radio');
    expect(radio).not.toHaveAttribute('aria-invalid');
    expect(radio).toHaveAccessibleDescription('2시간 선택한 회차가 마감됐어요');
  });

  it('forwards ref to the native input', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <RadioGroup legend="회차 선택">
        <RadioCard ref={ref} value="a" title="10월 30일 (목) 14:00" />
      </RadioGroup>,
    );
    expect(ref.current).toBe(screen.getByRole('radio'));
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SessionGroup defaultValue="a" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
