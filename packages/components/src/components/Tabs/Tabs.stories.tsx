import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
같은 맥락 안에서 콘텐츠 묶음을 전환하는 탭. 상세 페이지의 소개·커리큘럼·후기, 목록 정렬 전환에 쓴다.
\`Tabs\` 안에 \`Tabs.List\` > \`Tabs.Tab\`과 \`Tabs.Panel\`을 조합한다. 색상은 \`@aninganing/tokens\`의
\`tabs.*\` 컴포넌트 토큰을 소비한다.

탭 동작(방향키 이동, 활성화 방식, ARIA 연결)은 [Radix Tabs](https://www.radix-ui.com/primitives/docs/components/tabs)에
맡기고 모양만 입힌다.

### 언제 어떤 variant를 쓰나
- **line** — 소개·커리큘럼·후기처럼 **서로 다른 콘텐츠 섹션**을 바꿀 때. 선택 탭 아래 밑줄.
- **pill** — 추천순·가격순처럼 **같은 콘텐츠의 보기 방식**을 바꾸는 세그먼트. 패널 없이 목록 정렬만 바꿀 때도 쓴다.

### activation
- **automatic**(기본) — 방향키로 옮기면 바로 선택된다. 패널이 이미 그려져 있거나 가벼울 때.
- **manual** — 방향키로는 포커스만 옮기고 Enter·Space로 선택한다. 패널을 그리려면 요청이 필요할 때 방향키를
  누를 때마다 요청이 나가지 않게 한다.

### 접근성
- \`tablist\`·\`tab\`·\`tabpanel\` 역할과 \`aria-controls\`·\`aria-labelledby\` 연결은 Radix가 자동으로 붙인다.
- 선택된 탭만 Tab 키 순서에 들어간다(roving tabindex). 탭 사이는 좌우 방향키, 처음·끝은 Home·End로 이동하고
  끝에서 처음으로 순환한다.
- \`Tabs.List\`에 \`aria-label\`로 무엇을 바꾸는 탭인지 알린다(예: "클래스 상세", "정렬").
- 선택은 색뿐 아니라 굵기와 밑줄(line) 또는 떠오른 면(pill)으로도 구분된다.
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pill'],
      description: '탭 모양. 위 "언제 어떤 variant를 쓰나" 참고.',
      table: { defaultValue: { summary: 'line' } },
    },
    activation: {
      control: 'select',
      options: ['automatic', 'manual'],
      description: '방향키로 옮길 때 바로 선택할지.',
      table: { defaultValue: { summary: 'automatic' } },
    },
  },
  args: {
    variant: 'line',
    activation: 'automatic',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Line: Story = {
  parameters: {
    docs: {
      description: { story: '상세 페이지의 콘텐츠 섹션 전환. 개수는 `count`로 라벨 뒤에 붙인다.' },
    },
  },
  render: (args) => (
    <Tabs {...args} defaultValue="intro" style={{ maxWidth: 480 }}>
      <Tabs.List aria-label="클래스 상세">
        <Tabs.Tab value="intro">소개</Tabs.Tab>
        <Tabs.Tab value="curriculum">커리큘럼</Tabs.Tab>
        <Tabs.Tab value="reviews" count={128}>
          후기
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="intro">흙을 만지며 나만의 머그컵을 빚어요.</Tabs.Panel>
      <Tabs.Panel value="curriculum">흙 반죽, 물레 성형, 손잡이 붙이기 순서로 진행해요.</Tabs.Panel>
      <Tabs.Panel value="reviews">선생님이 꼼꼼하게 봐주셨어요.</Tabs.Panel>
    </Tabs>
  ),
};

const SortDemo = (args: Story['args']) => {
  const [sort, setSort] = useState('recommended');
  const labels: Record<string, string> = {
    recommended: '추천순',
    price: '가격순',
    distance: '가까운순',
  };
  return (
    <Tabs {...args} variant="pill" value={sort} onValueChange={setSort}>
      <Tabs.List aria-label="정렬">
        {Object.entries(labels).map(([value, label]) => (
          <Tabs.Tab key={value} value={value}>
            {label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <p style={{ margin: 'var(--space-3) 0 0', fontSize: 'var(--font-size-100)' }}>
        {labels[sort]}으로 정렬한 클래스 목록
      </p>
    </Tabs>
  );
};

export const Pill: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '목록 정렬 세그먼트(controlled). 패널 없이 `value`/`onValueChange`로 받은 값으로 목록을 다시 그린다.',
      },
    },
  },
  render: (args) => <SortDemo {...args} />,
};

export const ManualActivation: Story = {
  args: { activation: 'manual' },
  parameters: {
    docs: {
      description: {
        story: '방향키로는 포커스만 옮기고 Enter·Space로 선택한다. 패널마다 데이터를 불러와야 할 때.',
      },
    },
  },
  render: Line.render,
};

export const DisabledTab: Story = {
  parameters: {
    docs: {
      description: { story: '아직 열 수 없는 탭. 방향키 이동에서도 건너뛴다.' },
    },
  },
  render: (args) => (
    <Tabs {...args} defaultValue="intro" style={{ maxWidth: 480 }}>
      <Tabs.List aria-label="클래스 상세">
        <Tabs.Tab value="intro">소개</Tabs.Tab>
        <Tabs.Tab value="curriculum">커리큘럼</Tabs.Tab>
        <Tabs.Tab value="reviews" count={0} disabled>
          후기
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="intro">흙을 만지며 나만의 머그컵을 빚어요.</Tabs.Panel>
      <Tabs.Panel value="curriculum">흙 반죽, 물레 성형, 손잡이 붙이기 순서로 진행해요.</Tabs.Panel>
    </Tabs>
  ),
};
