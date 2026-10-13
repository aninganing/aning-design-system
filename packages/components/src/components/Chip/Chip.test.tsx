import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Chip } from './Chip';

describe('Chip', () => {
  describe('toggle', () => {
    it('renders a button that reflects selection with aria-pressed', () => {
      const { rerender } = render(<Chip selected={false}>공예</Chip>);
      const el = screen.getByRole('button', { name: '공예' });
      expect(el).toHaveAttribute('aria-pressed', 'false');

      rerender(<Chip selected>공예</Chip>);
      expect(el).toHaveAttribute('aria-pressed', 'true');
    });

    it('calls onSelectedChange with the toggled value', () => {
      const onSelectedChange = vi.fn();
      render(
        <Chip selected={false} onSelectedChange={onSelectedChange}>
          요리
        </Chip>,
      );
      fireEvent.click(screen.getByRole('button'));
      expect(onSelectedChange).toHaveBeenCalledWith(true);
    });

    it('acts as a plain button without aria-pressed when selected is not given', () => {
      const onClick = vi.fn();
      const onSelectedChange = vi.fn();
      render(
        <Chip onClick={onClick} onSelectedChange={onSelectedChange}>
          전체 보기
        </Chip>,
      );
      const el = screen.getByRole('button');
      expect(el).not.toHaveAttribute('aria-pressed');
      fireEvent.click(el);
      expect(onClick).toHaveBeenCalledOnce();
      expect(onSelectedChange).not.toHaveBeenCalled();
    });

    it('does not toggle when disabled', () => {
      const onSelectedChange = vi.fn();
      render(
        <Chip selected={false} disabled onSelectedChange={onSelectedChange}>
          운동
        </Chip>,
      );
      fireEvent.click(screen.getByRole('button'));
      expect(onSelectedChange).not.toHaveBeenCalled();
    });

    it('forwards ref to the button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Chip ref={ref}>공예</Chip>);
      expect(ref.current).toBe(screen.getByRole('button'));
    });
  });

  describe('removable', () => {
    it('renders the label with a separate, labelled remove button', () => {
      const onRemove = vi.fn();
      render(<Chip onRemove={onRemove}>성수동</Chip>);
      expect(screen.getAllByRole('button')).toHaveLength(1);
      fireEvent.click(screen.getByRole('button', { name: '성수동 제거' }));
      expect(onRemove).toHaveBeenCalledOnce();
    });

    it('uses removeLabel for the remove button when given', () => {
      render(
        <Chip onRemove={() => {}} removeLabel="성수동 필터 제거">
          성수동
        </Chip>,
      );
      expect(screen.getByRole('button', { name: '성수동 필터 제거' })).toBeInTheDocument();
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        <Chip selected>공예</Chip>
        <Chip selected={false}>요리</Chip>
        <Chip size="sm" selected onRemove={() => {}}>
          성수동
        </Chip>
      </div>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
