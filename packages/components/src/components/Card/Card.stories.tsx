import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

// 스토리 전용 placeholder 이미지 (4:3, 외부 네트워크 없이 렌더링)
const placeholder = (from: string, to: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="4" height="3" fill="url(#g)"/></svg>`,
  )}`;

// Badge 컴포넌트가 생기기 전까지 쓰는 스토리 전용 뱃지
const StoryBadge = ({ children }: { children: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: 22,
      padding: '0 var(--space-2)',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--color-danger-default)',
      color: 'var(--color-text-inverse)',
      fontSize: 'var(--font-size-50)',
      fontWeight: 'var(--font-weight-medium)',
    }}
  >
    {children}
  </span>
);

const Meta_ = ({ children }: { children: string }) => (
  <p style={{ margin: 0, fontSize: 'var(--font-size-100)', color: 'var(--color-text-subtle)' }}>
    {children}
  </p>
);

const Price = ({ children }: { children: string }) => (
  <p
    style={{
      margin: 'var(--space-2) 0 0',
      fontSize: 'var(--font-size-300)',
      fontWeight: 'var(--font-weight-bold)',
      fontVariantNumeric: 'tabular-nums',
    }}
  >
    {children}
  </p>
);

// 스토리 안에서 링크를 눌러도 Storybook 화면이 이동하지 않게 막는다
const stay = (event: { preventDefault: () => void }) => event.preventDefault();

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
목록에서 항목 하나를 요약하는 카드. \`Card.Media\`(4:3 이미지 + 뱃지), \`Card.Body\`, \`Card.Title\`을 조합해
쓴다. 색상·간격·그림자는 \`@aninganing/tokens\`의 \`card.*\` 컴포넌트 토큰을 소비한다.

### 구성
\`\`\`tsx
<Card interactive>
  <Card.Media badge={<Badge>마감 임박</Badge>}>
    <img src={thumbnail} alt="" />
  </Card.Media>
  <Card.Body>
    <Card.Title>
      <a href="/classes/1">성수 도자기 원데이클래스</a>
    </Card.Title>
    <p>성수동 · 2시간 · 최대 6명</p>
  </Card.Body>
</Card>
\`\`\`
메타 정보·가격 같은 본문 내용은 \`Card.Body\` 안에 자유롭게 둔다.

### 언제 어떤 variant를 쓰나
- **outlined** — 기본값. 검색 결과처럼 카드가 많이 반복되는 목록.
- **elevated** — 추천·기획전처럼 카드가 적고 눈에 띄어야 하는 영역.
- **interactive** — 카드에 링크가 있을 때만 켠다. hover 시 그림자가 커진다.

### 접근성
- 카드를 통째로 \`<a>\`로 감싸지 않는다. 그러면 스크린 리더가 카드의 모든 텍스트를 링크 이름으로 읽는다.
  링크는 **\`Card.Title\` 안에 하나만** 두고, 그 링크의 클릭 영역을 CSS(\`::after\`)로 카드 전체로 넓힌다.
  Next.js의 \`<Link>\`도 \`<a>\`를 렌더링하므로 그대로 동작한다.
- 키보드 포커스 링은 링크 대신 카드 테두리에 그린다(\`:has(:focus-visible)\`).
- 카드 안에 찜하기 버튼처럼 **다른 인터랙티브 요소**를 넣으면 넓어진 링크 영역에 가려진다. 그 요소에
  \`position: relative; z-index: 1\`을 준다.
- 썸네일이 제목과 같은 정보를 전달하면 \`alt=""\`로 둔다(장식 이미지).
- \`Card.Title\`의 heading 레벨은 \`as\`로 페이지 구조에 맞춘다(기본 \`h3\`).
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'elevated'],
      description: '카드 면의 표현 방식. 위 "언제 어떤 variant를 쓰나" 참고.',
      table: { defaultValue: { summary: 'outlined' } },
    },
    interactive: {
      control: 'boolean',
      description: 'hover 시 그림자를 키운다. 카드에 `Card.Title` 링크가 있을 때만 켠다.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    variant: 'outlined',
    interactive: true,
    style: { width: 260 },
  },
  render: (args) => (
    <Card {...args}>
      <Card.Media badge={<StoryBadge>마감 임박</StoryBadge>}>
        <img src={placeholder('#e4e4e7', '#a1a1aa')} alt="" />
      </Card.Media>
      <Card.Body>
        <Card.Title>
          <a href="/classes/seongsu-pottery" onClick={stay}>
            성수 도자기 원데이클래스
          </a>
        </Card.Title>
        <Meta_>성수동 · 2시간 · 최대 6명</Meta_>
        <Price>45,000원</Price>
      </Card.Body>
    </Card>
  ),
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Outlined: Story = {
  args: { variant: 'outlined' },
  parameters: {
    docs: { description: { story: '기본 카드. 검색 결과처럼 카드가 많이 반복되는 목록에 쓴다.' } },
  },
};

export const Elevated: Story = {
  args: { variant: 'elevated' },
  parameters: {
    docs: {
      description: { story: '테두리 대신 그림자로 띄운 카드. 추천·기획전처럼 강조가 필요한 영역에 쓴다.' },
    },
  },
};

export const NonInteractive: Story = {
  args: { interactive: false },
  parameters: {
    docs: {
      description: {
        story:
          '링크 없이 정보만 보여주는 카드. hover 효과를 끄고, 제목도 링크 없이 텍스트로 둔다.',
      },
    },
  },
  render: (args) => (
    <Card {...args}>
      <Card.Body>
        <Card.Title>예약 정보</Card.Title>
        <Meta_>10월 18일(토) 14:00 · 성수 도자기 원데이클래스</Meta_>
        <Price>45,000원</Price>
      </Card.Body>
    </Card>
  ),
};

export const WithoutMedia: Story = {
  parameters: {
    docs: { description: { story: '썸네일이 없는 항목. `Card.Media`를 생략하면 본문만 남는다.' } },
  },
  render: (args) => (
    <Card {...args}>
      <Card.Body>
        <Card.Title>
          <a href="/classes/mangwon-vegan-baking" onClick={stay}>
            망원 비건 베이킹
          </a>
        </Card.Title>
        <Meta_>망원동 · 3시간 · 최대 8명</Meta_>
        <Price>58,000원</Price>
      </Card.Body>
    </Card>
  ),
};

export const List: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          '검색 결과 목록 예시. 목록 섹션 제목이 `h2`라 카드 제목은 기본값 `h3`를 그대로 쓴다. Tab으로 이동하면 카드마다 테두리에 포커스 링이 그려진다.',
      },
    },
  },
  render: (args) => (
    <section>
      <h2 style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--font-size-400)' }}>성수동 클래스</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
          maxWidth: 760,
        }}
      >
        {[
          ['성수 도자기 원데이클래스', '성수동 · 2시간 · 최대 6명', '45,000원', '#e4e4e7', '#a1a1aa'],
          ['가죽 카드지갑 만들기', '성수동 · 3시간 · 최대 4명', '62,000원', '#fafafa', '#d4d4d8'],
          ['플라워 센터피스', '성수동 · 2시간 · 최대 8명', '54,000원', '#dbeafe', '#93c5fd'],
        ].map(([title, info, price, from, to]) => (
          <Card key={title} {...args} style={undefined}>
            <Card.Media>
              <img src={placeholder(from!, to!)} alt="" />
            </Card.Media>
            <Card.Body>
              <Card.Title>
                <a href={`/classes/${encodeURIComponent(title!)}`} onClick={stay}>
                  {title}
                </a>
              </Card.Title>
              <Meta_>{info!}</Meta_>
              <Price>{price!}</Price>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  ),
};
