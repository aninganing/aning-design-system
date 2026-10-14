import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a textbox and calls onChange when typed into', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea aria-label="요청사항" onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: '요청사항' }), '물레');
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole('textbox')).toHaveValue('물레');
  });

  it('shows and updates the counter, linked as a description', async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="요청사항" maxLength={10} defaultValue="안녕" description="호스트에게 전달돼요" />);
    const el = screen.getByRole('textbox');
    expect(screen.getByText('2 / 10')).toBeInTheDocument();
    expect(el).toHaveAccessibleDescription('호스트에게 전달돼요 2 / 10');

    await user.type(el, '하세요');
    expect(screen.getByText('5 / 10')).toBeInTheDocument();
  });

  it('counts the controlled value', () => {
    render(<Textarea aria-label="후기" maxLength={200} value="좋았어요" onChange={() => {}} />);
    expect(screen.getByText('4 / 200')).toBeInTheDocument();
  });

  it('announces only when the limit is reached', async () => {
    const user = userEvent.setup();
    const { container } = render(<Textarea aria-label="요청사항" maxLength={3} />);
    const live = container.querySelector('[aria-live="polite"]')!;
    await user.type(screen.getByRole('textbox'), '가나');
    expect(live).toHaveTextContent('');
    await user.type(screen.getByRole('textbox'), '다라');
    // maxLength로 4번째 글자는 들어가지 않는다
    expect(screen.getByRole('textbox')).toHaveValue('가나다');
    expect(live).toHaveTextContent('최대 3자까지 입력할 수 있어요');
  });

  it('hides the counter when showCount is false', () => {
    render(<Textarea aria-label="요청사항" maxLength={10} showCount={false} />);
    expect(screen.queryByText('0 / 10')).not.toBeInTheDocument();
  });

  it('sets aria-invalid when error is true', () => {
    render(<Textarea aria-label="요청사항" error />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('uses the height prop (96px by default) as a fixed height', () => {
    const { rerender } = render(<Textarea aria-label="요청사항" />);
    expect(screen.getByRole('textbox')).toHaveStyle({ height: '96px' });
    rerender(<Textarea aria-label="요청사항" height={160} />);
    expect(screen.getByRole('textbox')).toHaveStyle({ height: '160px' });
    rerender(<Textarea aria-label="요청사항" height="8rem" />);
    expect(screen.getByRole('textbox')).toHaveStyle({ height: '8rem' });
  });

  it('uses the height prop as the minimum height when autoResize is on', () => {
    render(<Textarea aria-label="후기" height={120} autoResize />);
    expect(screen.getByRole('textbox')).toHaveStyle({ minHeight: '120px' });
  });

  it('grows with content up to maxRows when autoResize is on', async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="후기" autoResize maxRows={3} />);
    const el = screen.getByRole<HTMLTextAreaElement>('textbox');
    // jsdom은 레이아웃을 계산하지 않으므로 줄 높이와 내용 높이를 직접 정한다
    el.style.lineHeight = '24px';
    el.style.padding = '8px 12px';
    el.style.borderWidth = '1px';
    el.style.borderStyle = 'solid';

    Object.defineProperty(el, 'scrollHeight', { configurable: true, value: 64 });
    await user.type(el, 'a');
    expect(el.style.height).toBe('66px');
    expect(el.style.overflowY).toBe('hidden');

    // 3줄(24 × 3) + 패딩 16 + 테두리 2 = 90px에서 멈추고 스크롤로 바뀐다
    Object.defineProperty(el, 'scrollHeight', { configurable: true, value: 200 });
    await user.type(el, 'b');
    expect(el.style.height).toBe('90px');
    expect(el.style.overflowY).toBe('auto');
  });

  it('forwards ref to the textarea and className to the wrapper', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} className="custom" aria-label="요청사항" />);
    const el = screen.getByRole('textbox');
    expect(ref.current).toBe(el);
    expect(el).not.toHaveClass('custom');
    expect(el.parentElement).toHaveClass('custom');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        <label htmlFor="req">요청사항</label>
        <Textarea id="req" maxLength={200} description="호스트에게 그대로 전달돼요" />
      </div>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
