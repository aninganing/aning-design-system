import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Field } from '../Field';
import { Select } from './Select';

const options = [
  { value: 'pottery', label: '도자기 원데이' },
  { value: 'baking', label: '베이킹 클래스' },
  { value: 'drawing', label: '드로잉 클래스', disabled: true },
];

describe('Select', () => {
  it('renders a combobox showing the placeholder', () => {
    render(<Select aria-label="클래스" options={options} placeholder="클래스를 선택해 주세요" />);
    const trigger = screen.getByRole('combobox', { name: '클래스' });
    expect(trigger).toHaveTextContent('클래스를 선택해 주세요');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens with the keyboard and selects an option', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Select aria-label="클래스" options={options} onValueChange={onValueChange} />);

    const trigger = screen.getByRole('combobox');
    trigger.focus();
    await user.keyboard('{Enter}');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '드로잉 클래스' })).toHaveAttribute('aria-disabled', 'true');

    await user.click(screen.getByRole('option', { name: '베이킹 클래스' }));
    expect(onValueChange).toHaveBeenCalledWith('baking');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent('베이킹 클래스');
    expect(trigger).toHaveFocus();
  });

  it('shows the label of a controlled value', () => {
    render(<Select aria-label="클래스" options={options} value="pottery" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('도자기 원데이');
  });

  it('marks invalid and required on the trigger', () => {
    render(<Select aria-label="클래스" options={options} invalid required />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAttribute('aria-required', 'true');
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Select aria-label="클래스" options={options} disabled />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('connects to Field (label, description, invalid, required)', () => {
    render(
      <Field.Root required invalid>
        <Field.Label>클래스</Field.Label>
        <Field.Control>
          <Select options={options} placeholder="클래스를 선택해 주세요" />
        </Field.Control>
        <Field.Error>클래스를 선택해 주세요</Field.Error>
      </Field.Root>,
    );
    const trigger = screen.getByRole('combobox', { name: '클래스' });
    expect(trigger).toHaveAccessibleDescription('클래스를 선택해 주세요');
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAttribute('aria-required', 'true');
  });

  it('submits its value with a name', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <form>
        <Select aria-label="클래스" name="classId" options={options} />
      </form>,
    );
    screen.getByRole('combobox').focus();
    await user.keyboard('{Enter}');
    await user.click(await screen.findByRole('option', { name: '도자기 원데이' }));
    const form = container.querySelector('form')!;
    expect(new FormData(form).get('classId')).toBe('pottery');
  });

  it('forwards ref to the trigger', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Select ref={ref} aria-label="클래스" options={options} />);
    expect(ref.current).toBe(screen.getByRole('combobox'));
  });

  it('has no accessibility violations when open', async () => {
    const user = userEvent.setup();
    render(<Select aria-label="클래스" options={options} defaultValue="pottery" />);
    screen.getByRole('combobox').focus();
    await user.keyboard('{Enter}');
    await screen.findByRole('listbox');
    // 포털로 body 끝에 붙는 목록이라 랜드마크 밖에 있는 것이 정상이다
    const results = await axe(document.body, { rules: { region: { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });
});
