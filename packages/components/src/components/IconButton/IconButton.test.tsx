import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { CheckIcon } from '@aninganing/icons';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders a button named by aria-label', () => {
    render(
      <IconButton aria-label="공유하기">
        <CheckIcon />
      </IconButton>,
    );
    const el = screen.getByRole('button', { name: '공유하기' });
    expect(el).toHaveAttribute('type', 'button');
    expect(el).not.toHaveAttribute('aria-pressed');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(
      <IconButton aria-label="뒤로 가기" onClick={onClick}>
        <CheckIcon />
      </IconButton>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('reflects pressed with aria-pressed and keeps the same name', () => {
    const { rerender } = render(
      <IconButton aria-label="찜하기" pressed={false}>
        <CheckIcon />
      </IconButton>,
    );
    const el = screen.getByRole('button', { name: '찜하기' });
    expect(el).toHaveAttribute('aria-pressed', 'false');

    rerender(
      <IconButton aria-label="찜하기" pressed>
        <CheckIcon />
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: '찜하기' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onPressedChange with the toggled value', () => {
    const onPressedChange = vi.fn();
    render(
      <IconButton aria-label="찜하기" pressed onPressedChange={onPressedChange}>
        <CheckIcon />
      </IconButton>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onPressedChange).toHaveBeenCalledWith(false);
  });

  it('does not call onPressedChange when pressed is not given', () => {
    const onPressedChange = vi.fn();
    render(
      <IconButton aria-label="새로고침" onPressedChange={onPressedChange}>
        <CheckIcon />
      </IconButton>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onPressedChange).not.toHaveBeenCalled();
  });

  it('does not toggle when disabled', () => {
    const onPressedChange = vi.fn();
    render(
      <IconButton aria-label="찜하기" pressed={false} disabled onPressedChange={onPressedChange}>
        <CheckIcon />
      </IconButton>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onPressedChange).not.toHaveBeenCalled();
  });

  it('forwards ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <IconButton ref={ref} aria-label="공유하기">
        <CheckIcon />
      </IconButton>,
    );
    expect(ref.current).toBe(screen.getByRole('button'));
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        <IconButton aria-label="공유하기">
          <CheckIcon />
        </IconButton>
        <IconButton aria-label="찜하기" variant="overlay" shape="round" pressed>
          <CheckIcon />
        </IconButton>
      </div>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
