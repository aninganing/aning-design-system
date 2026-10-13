import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Card } from './Card';

const ClassCard = ({ onClick }: { onClick?: () => void }) => (
  <Card interactive>
    <Card.Media badge={<span>마감 임박</span>}>
      <img src="data:," alt="" />
    </Card.Media>
    <Card.Body>
      <Card.Title>
        <a href="/classes/1" onClick={onClick}>
          성수 도자기 원데이클래스
        </a>
      </Card.Title>
      <p>성수동 · 2시간 · 최대 6명</p>
    </Card.Body>
  </Card>
);

describe('Card', () => {
  it('renders an article with a heading, media badge and body content', () => {
    render(<ClassCard />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: '성수 도자기 원데이클래스' })).toBeInTheDocument();
    expect(screen.getByText('마감 임박')).toBeInTheDocument();
    expect(screen.getByText('성수동 · 2시간 · 최대 6명')).toBeInTheDocument();
  });

  it('renders the title at the requested heading level', () => {
    render(
      <Card>
        <Card.Body>
          <Card.Title as="h2">제목</Card.Title>
        </Card.Body>
      </Card>,
    );
    expect(screen.getByRole('heading', { level: 2, name: '제목' })).toBeInTheDocument();
  });

  it('exposes a single link named by the title only', () => {
    const onClick = vi.fn();
    render(<ClassCard onClick={onClick} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName('성수 도자기 원데이클래스');
    fireEvent.click(links[0]!);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('forwards ref to the article element', () => {
    const ref = createRef<HTMLElement>();
    render(<Card ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('article'));
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ClassCard />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
