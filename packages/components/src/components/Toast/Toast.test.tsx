import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Toaster, toast } from './Toast';
import { resetToasts } from './toastStore';

afterEach(() => {
  act(() => resetToasts());
});

describe('Toast', () => {
  it('shows a toast in a named region when toast() is called', () => {
    render(<Toaster />);
    act(() => {
      toast({ message: '찜 목록에 담았어요' });
    });
    expect(screen.getByRole('region', { name: '알림 (F8)' })).toBeInTheDocument();
    expect(screen.getAllByText('찜 목록에 담았어요').length).toBeGreaterThan(0);
  });

  it('renders the action and closes after it is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Toaster />);
    act(() => {
      toast({ message: '찜 목록에서 뺐어요', action: { label: '되돌리기', onClick } });
    });
    await user.click(screen.getByRole('button', { name: '되돌리기' }));
    expect(onClick).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByRole('button', { name: '되돌리기' })).not.toBeInTheDocument());
  });

  it('does not move focus to the action button', () => {
    render(
      <>
        <input aria-label="검색" />
        <Toaster />
      </>,
    );
    const input = screen.getByRole('textbox', { name: '검색' });
    input.focus();
    act(() => {
      toast({ message: '인원을 2명으로 맞췄어요', action: { label: '확인', onClick: () => {} } });
    });
    expect(input).toHaveFocus();
  });

  it('keeps at most three toasts open, closing the oldest', async () => {
    render(<Toaster />);
    act(() => {
      ['하나', '둘', '셋', '넷'].forEach((message) => toast({ message }));
    });
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(3));
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(['둘', '셋', '넷']);
  });

  it('closes after the duration', () => {
    vi.useFakeTimers();
    try {
      render(<Toaster />);
      act(() => {
        toast({ message: '저장했어요', duration: 1000 });
      });
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      act(() => vi.advanceTimersByTime(1500));
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it('dismisses by id', async () => {
    render(<Toaster />);
    let id = '';
    act(() => {
      id = toast({ message: '업로드 중이에요' });
    });
    act(() => toast.dismiss(id));
    await waitFor(() => expect(screen.queryAllByRole('listitem')).toHaveLength(0));
  });

  it('renders toasts only once when several Toasters are mounted', () => {
    render(
      <>
        <Toaster />
        <Toaster />
      </>,
    );
    act(() => {
      toast({ message: '하나만' });
    });
    expect(screen.getAllByRole('region')).toHaveLength(1);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('portals the toast region to body so a transformed container does not move it', () => {
    render(
      <div style={{ transform: 'scale(1)' }}>
        <Toaster />
      </div>,
    );
    expect(screen.getByRole('region', { name: '알림 (F8)' }).parentElement).toBe(document.body);
  });

  it('forwards ref to the viewport list', () => {
    const ref = createRef<HTMLOListElement>();
    render(<Toaster ref={ref} />);
    expect(ref.current?.tagName).toBe('OL');
  });

  it('has no accessibility violations', async () => {
    render(<Toaster />);
    act(() => {
      toast({ message: '찜 목록에 담았어요', action: { label: '보기', onClick: () => {} } });
    });
    const results = await axe(document.body, { rules: { region: { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });
});
