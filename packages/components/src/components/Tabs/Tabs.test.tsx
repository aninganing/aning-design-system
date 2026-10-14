import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Tabs } from './Tabs';
import type { TabsProps } from './Tabs.types';

const ClassTabs = (props: Partial<TabsProps>) => (
  <Tabs defaultValue="intro" {...props}>
    <Tabs.List aria-label="클래스 상세">
      <Tabs.Tab value="intro">소개</Tabs.Tab>
      <Tabs.Tab value="curriculum">커리큘럼</Tabs.Tab>
      <Tabs.Tab value="reviews" count={1280}>
        후기
      </Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="intro">흙을 만지며 나만의 머그컵을 빚어요.</Tabs.Panel>
    <Tabs.Panel value="curriculum">흙 반죽, 물레 성형, 손잡이 붙이기 순서로 진행해요.</Tabs.Panel>
    <Tabs.Panel value="reviews">선생님이 꼼꼼하게 봐주셨어요.</Tabs.Panel>
  </Tabs>
);

describe('Tabs', () => {
  it('renders tablist, tabs and the selected panel with linked ARIA', () => {
    render(<ClassTabs />);
    expect(screen.getByRole('tablist', { name: '클래스 상세' })).toBeInTheDocument();
    const tab = screen.getByRole('tab', { name: '소개' });
    expect(tab).toHaveAttribute('aria-selected', 'true');
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveTextContent('흙을 만지며');
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    expect(tab).toHaveAttribute('aria-controls', panel.id);
  });

  it('renders the count as part of the tab name', () => {
    render(<ClassTabs />);
    expect(screen.getByRole('tab', { name: '후기 1,280' })).toBeInTheDocument();
  });

  it('keeps only the selected tab in the tab order (roving tabindex)', async () => {
    const user = userEvent.setup();
    render(<ClassTabs />);
    await user.tab();
    expect(screen.getByRole('tab', { name: '소개' })).toHaveFocus();
    await user.tab();
    // 다음 Tab은 다른 탭이 아니라 패널로 간다
    expect(screen.getByRole('tabpanel')).toHaveFocus();
  });

  it('moves and selects with arrow keys, Home and End (automatic)', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ClassTabs onValueChange={onValueChange} />);
    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: '커리큘럼' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: '커리큘럼' })).toHaveAttribute('aria-selected', 'true');
    expect(onValueChange).toHaveBeenLastCalledWith('curriculum');

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: '후기 1,280' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    // 끝에서 처음으로 순환한다
    expect(screen.getByRole('tab', { name: '소개' })).toHaveFocus();
    await user.keyboard('{End}{Home}');
    expect(screen.getByRole('tab', { name: '소개' })).toHaveFocus();
  });

  it('only moves focus with arrow keys in manual activation', async () => {
    const user = userEvent.setup();
    render(<ClassTabs activation="manual" />);
    await user.tab();
    await user.keyboard('{ArrowRight}');
    const tab = screen.getByRole('tab', { name: '커리큘럼' });
    expect(tab).toHaveFocus();
    expect(tab).toHaveAttribute('aria-selected', 'false');

    await user.keyboard('{Enter}');
    expect(tab).toHaveAttribute('aria-selected', 'true');
  });

  it('selects a tab on click', async () => {
    const user = userEvent.setup();
    render(<ClassTabs />);
    await user.click(screen.getByRole('tab', { name: '커리큘럼' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('물레 성형');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ClassTabs />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
