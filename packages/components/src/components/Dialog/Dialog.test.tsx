import { createRef, useRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Dialog } from './Dialog';
import type { DialogProps } from './Dialog.types';

const CancelDialog = (props: Partial<DialogProps>) => (
  <Dialog
    trigger={<button type="button">예약 취소</button>}
    title="예약을 취소할까요?"
    description="취소하면 좌석이 다른 분께 넘어가요."
    {...props}
  >
    <p>10월 30일 (목) 14:00 · 2명</p>
    <Dialog.Footer>
      <button type="button">돌아가기</button>
      <button type="button">취소하기</button>
    </Dialog.Footer>
  </Dialog>
);

describe('Dialog', () => {
  it('opens from the trigger as a modal dialog named by the title and described by the description', async () => {
    const user = userEvent.setup();
    render(<CancelDialog />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '예약 취소' }));
    const dialog = screen.getByRole('dialog', { name: '예약을 취소할까요?' });
    expect(dialog).toHaveAccessibleDescription('취소하면 좌석이 다른 분께 넘어가요.');
  });

  it('moves focus to the title when opened, not to the first button', async () => {
    const user = userEvent.setup();
    render(<CancelDialog />);
    await user.click(screen.getByRole('button', { name: '예약 취소' }));
    expect(screen.getByRole('heading', { name: '예약을 취소할까요?' })).toHaveFocus();
  });

  it('focuses initialFocus when given', async () => {
    const user = userEvent.setup();
    const Example = () => {
      const ref = useRef<HTMLButtonElement>(null);
      return (
        <Dialog trigger={<button type="button">열기</button>} title="필터" initialFocus={ref}>
          <button ref={ref} type="button">
            가까운 순
          </button>
        </Dialog>
      );
    };
    render(<Example />);
    await user.click(screen.getByRole('button', { name: '열기' }));
    expect(screen.getByRole('button', { name: '가까운 순' })).toHaveFocus();
  });

  it('closes with Escape and the close button and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<CancelDialog />);
    const trigger = screen.getByRole('button', { name: '예약 취소' });

    await user.click(trigger);
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: '닫기' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('cannot be dismissed by Escape and has no close button when dismissible is false', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<CancelDialog dismissible={false} defaultOpen onOpenChange={onOpenChange} />);
    expect(screen.queryByRole('button', { name: '닫기' })).not.toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('works controlled without a trigger', async () => {
    const user = userEvent.setup();
    const Example = () => {
      const [open, setOpen] = useState(true);
      return (
        <Dialog open={open} onOpenChange={setOpen} title="필터" variant="sheet">
          <p>내용</p>
        </Dialog>
      );
    };
    render(<Example />);
    expect(screen.getByRole('dialog', { name: '필터' })).not.toHaveAttribute('aria-describedby');
    await user.click(screen.getByRole('button', { name: '닫기' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('renders the footer after the scrolling body', () => {
    render(<CancelDialog defaultOpen />);
    const body = screen.getByText('10월 30일 (목) 14:00 · 2명').parentElement!;
    const footer = screen.getByRole('button', { name: '취소하기' }).parentElement!;
    expect(body).not.toContainElement(footer);
    expect(body.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('forwards ref to the dialog element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<CancelDialog ref={ref} defaultOpen />);
    expect(ref.current).toBe(screen.getByRole('dialog'));
  });

  it('has no accessibility violations', async () => {
    render(<CancelDialog defaultOpen />);
    const results = await axe(document.body, { rules: { region: { enabled: false } } });
    expect(results.violations).toHaveLength(0);
  });
});
