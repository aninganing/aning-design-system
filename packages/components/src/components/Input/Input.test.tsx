import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Input } from './Input';

describe('Input', () => {
  it('renders with a placeholder', () => {
    render(<Input placeholder="이메일" aria-label="이메일" />);
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
  });

  it('calls onChange when typed into', () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} aria-label="이름" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('sets aria-invalid when error is true', () => {
    render(<Input error aria-label="이메일" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders leading and trailing content around the input', () => {
    render(<Input leading="https://" trailing={<span>kg</span>} aria-label="값" />);
    expect(screen.getByText('https://')).toBeInTheDocument();
    expect(screen.getByText('kg')).toBeInTheDocument();
  });

  it('forwards ref to the input and className to the wrapper', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} className="custom" leading="@" aria-label="아이디" />);
    const input = screen.getByRole('textbox');
    expect(ref.current).toBe(input);
    expect(input).not.toHaveClass('custom');
    expect(input.parentElement).toHaveClass('custom');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Input aria-label="검색" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations with leading/trailing', async () => {
    const { container } = render(
      <Input
        aria-label="검색"
        leading={
          <svg aria-hidden="true" width="16" height="16">
            <circle cx="8" cy="8" r="4" />
          </svg>
        }
        trailing="kg"
      />,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
