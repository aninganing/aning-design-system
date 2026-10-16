import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Checkbox, CheckboxGroup } from './Checkbox';

describe('Checkbox', () => {
  it('renders a native checkbox labelled by its label', () => {
    render(<Checkbox label="공예" />);
    const el = screen.getByRole('checkbox', { name: '공예' });
    expect(el).not.toBeChecked();
  });

  it('toggles uncontrolled and reports the new value', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="공예" defaultChecked onCheckedChange={onCheckedChange} />);
    const el = screen.getByRole('checkbox');
    expect(el).toBeChecked();

    fireEvent.click(screen.getByText('공예'));
    expect(el).not.toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('sets the indeterminate DOM property and exposes it as mixed', () => {
    const { rerender } = render(<Checkbox label="전체 선택" indeterminate />);
    const el = screen.getByRole<HTMLInputElement>('checkbox');
    expect(el.indeterminate).toBe(true);
    expect(el).toBePartiallyChecked();

    rerender(<Checkbox label="전체 선택" indeterminate={false} />);
    expect(el.indeterminate).toBe(false);
  });

  it('names by the label only and links the description with aria-describedby', () => {
    render(<Checkbox label="마케팅 알림" description="이벤트 소식을 받는다" />);
    const el = screen.getByRole('checkbox');
    // 설명이 이름에도 섞이면 스크린 리더가 같은 내용을 두 번 읽는다
    expect(el).toHaveAccessibleName('마케팅 알림');
    expect(el).toHaveAccessibleDescription('이벤트 소식을 받는다');
  });

  it('does not toggle when disabled', async () => {
    // fireEvent는 비활성 요소에도 이벤트를 강제로 보내므로, 실제 사용자 동작을 흉내 내는 user-event로 확인한다
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="마감된 클래스 포함" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByText('마감된 클래스 포함'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('toggles with the Space key', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="공예" />);
    await user.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} label="공예" />);
    expect(ref.current).toBe(screen.getByRole('checkbox'));
  });

  it('groups checkboxes under a legend', () => {
    render(
      <CheckboxGroup legend="클래스 유형">
        <Checkbox label="공예" />
        <Checkbox label="요리·베이킹" />
      </CheckboxGroup>,
    );
    expect(screen.getByRole('group', { name: '클래스 유형' })).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CheckboxGroup legend="클래스 유형">
        <Checkbox label="공예" defaultChecked />
        <Checkbox label="전체 선택" description="일부만 선택된 상태" indeterminate />
        <Checkbox label="마감된 클래스 포함" disabled />
      </CheckboxGroup>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
