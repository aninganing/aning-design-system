import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Field } from './Field';

describe('Field', () => {
  it('connects the label to the control', () => {
    render(
      <Field.Root>
        <Field.Label>예약자 이름</Field.Label>
        <Field.Control>
          <Input />
        </Field.Control>
      </Field.Root>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleName('예약자 이름');
  });

  it('describes the control with the helper text', () => {
    render(
      <Field.Root>
        <Field.Label>예약자 이름</Field.Label>
        <Field.Control>
          <Input />
        </Field.Control>
        <Field.Helper>실명으로 입력해 주세요</Field.Helper>
      </Field.Root>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('실명으로 입력해 주세요');
  });

  it('shows the error instead of the helper and marks the control invalid', () => {
    const { rerender } = render(
      <Field.Root invalid={false}>
        <Field.Label>연락처</Field.Label>
        <Field.Control>
          <Input />
        </Field.Control>
        <Field.Helper>예약 안내 문자를 보내드려요</Field.Helper>
        <Field.Error>연락처를 입력해 주세요</Field.Error>
      </Field.Root>,
    );
    const control = screen.getByRole('textbox');
    expect(control).not.toHaveAttribute('aria-invalid');
    expect(screen.queryByText('연락처를 입력해 주세요')).not.toBeInTheDocument();

    rerender(
      <Field.Root invalid>
        <Field.Label>연락처</Field.Label>
        <Field.Control>
          <Input />
        </Field.Control>
        <Field.Helper>예약 안내 문자를 보내드려요</Field.Helper>
        <Field.Error>연락처를 입력해 주세요</Field.Error>
      </Field.Root>,
    );
    expect(control).toHaveAttribute('aria-invalid', 'true');
    expect(control).toHaveAccessibleDescription('연락처를 입력해 주세요');
    expect(screen.queryByText('예약 안내 문자를 보내드려요')).not.toBeInTheDocument();
  });

  it('keeps the helper when invalid without an error message', () => {
    render(
      <Field.Root invalid>
        <Field.Label>연락처</Field.Label>
        <Field.Control>
          <Input />
        </Field.Control>
        <Field.Helper>예약 안내 문자를 보내드려요</Field.Helper>
        <Field.Error>{undefined}</Field.Error>
      </Field.Root>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('예약 안내 문자를 보내드려요');
  });

  it('marks required with a hidden asterisk and native required', () => {
    render(
      <Field.Root required>
        <Field.Label>예약자 이름</Field.Label>
        <Field.Control>
          <Input />
        </Field.Control>
      </Field.Root>,
    );
    const control = screen.getByRole('textbox');
    expect(control).toBeRequired();
    expect(control).toHaveAccessibleName('예약자 이름');
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows an optional mark', () => {
    render(
      <Field.Root optional>
        <Field.Label>요청 사항</Field.Label>
        <Field.Control>
          <Input />
        </Field.Control>
      </Field.Root>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleName('요청 사항 (선택)');
  });

  it('merges its error with the control’s own description (Textarea)', () => {
    render(
      <Field.Root invalid>
        <Field.Label>요청 사항</Field.Label>
        <Field.Control>
          <Textarea maxLength={200} description="호스트에게 그대로 전달돼요" />
        </Field.Control>
        <Field.Error>200자 이내로 입력해 주세요</Field.Error>
      </Field.Root>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
      '호스트에게 그대로 전달돼요 0 / 200 200자 이내로 입력해 주세요',
    );
  });

  it('works with a native select', () => {
    render(
      <Field.Root required>
        <Field.Label>지역</Field.Label>
        <Field.Control>
          <select>
            <option value="">선택</option>
            <option value="seoul">서울</option>
          </select>
        </Field.Control>
      </Field.Root>,
    );
    const select = screen.getByRole('combobox', { name: '지역' });
    expect(select).toBeRequired();
  });

  it('throws when a part is used outside Field.Root', () => {
    expect(() => render(<Field.Label>이름</Field.Label>)).toThrow('Field.Root');
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <Field.Root ref={ref}>
        <Field.Label>이름</Field.Label>
        <Field.Control>
          <Input />
        </Field.Control>
      </Field.Root>,
    );
    expect(ref.current).toBe(container.firstChild);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Field.Root required invalid>
        <Field.Label>연락처</Field.Label>
        <Field.Control>
          <Input />
        </Field.Control>
        <Field.Helper>예약 안내 문자를 보내드려요</Field.Helper>
        <Field.Error>연락처를 입력해 주세요</Field.Error>
      </Field.Root>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
