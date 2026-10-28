import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge';
import { RadioGroup } from '../Radio';
import { RadioCard } from './RadioCard';

const meta: Meta<typeof RadioCard> = {
  title: 'Components/RadioCard',
  component: RadioCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
카드 전체가 눌리는 단일 선택 컨트롤. 회차 시간, 결제 수단처럼 선택지마다 부가 정보(설명, 잔여석)가 붙을 때 쓴다.
\`@aninganing/tokens\`의 \`radio-card.*\` 컴포넌트 토큰을 소비하고, 왼쪽 원은 \`Radio\`와 같은 23px다.

### 구성
- **\`RadioGroup\`** 안에 넣어 쓴다 — \`legend\`, \`value\`/\`defaultValue\`/\`onValueChange\`, \`name\`, \`required\`는 Radio와 같은
  그룹이 맡는다. 카드 전용 그룹은 따로 없다.
- **\`RadioCard\`** — \`value\`, \`title\`, \`description\`, \`aside\`(오른쪽 슬롯: Badge·가격 등), \`disabled\`, \`invalid\`.

### 사용 기준
- 선택지에 붙는 정보가 라벨 한 줄로 충분하면 \`Radio\`를 쓴다. 정보가 두세 줄이거나 오른쪽에 상태(잔여석)를 보여야 하면 RadioCard.
- \`invalid\`는 골라 둔 항목을 더는 고를 수 없게 된 경우(예: 고른 회차가 그사이 마감)에 쓴다. 테두리로만 표시되므로 이유는 카드 밖
  Alert에 글자로 쓰고 그 id를 카드의 \`aria-describedby\`로 연결한다(radio 역할은 \`aria-invalid\`를 지원하지 않는다).

### 접근성
- \`fieldset\` + \`legend\`(radiogroup) 안의 네이티브 \`input type="radio"\`다. 방향키로 선택이 옮겨 가고 비활성 카드는 건너뛴다.
- 라디오 이름은 \`title\`만이고, \`description\`과 \`aside\`는 \`aria-describedby\`로 읽힌다.
- 포커스 링은 원이 아니라 카드 바깥에 그린다.
- 잔여석처럼 화면에 있는 동안 바뀌는 값은 카드가 알리지 않는다. 알려야 하면 화면에서 \`aria-live\` 영역으로 한 번만 알린다
  (카드마다 live 영역을 두면 여러 개가 한꺼번에 읽힌다).
        `.trim(),
      },
    },
  },
  argTypes: {
    value: { control: false, description: '이 선택지의 값.' },
    title: { control: 'text', description: '카드 제목. 라디오의 이름이 된다.' },
    description: { control: 'text', description: '제목 아래 보충 설명. `aria-describedby`로 연결된다.' },
    aside: { control: false, description: '오른쪽 슬롯(Badge·가격 등). `aria-describedby`로 연결된다.' },
    invalid: {
      control: 'boolean',
      description: '골라 둔 항목을 더는 고를 수 없게 된 상태. danger 테두리로만 표시하고, 이유는 카드 밖 글자를 `aria-describedby`로 연결한다.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: '고를 수 없는 선택지. 방향키 이동에서도 빠진다.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    value: 'a',
    title: '10월 30일 (목) 14:00',
    description: '2시간 · 성수 공방',
    aside: <Badge tone="accent">잔여 3석</Badge>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <RadioGroup legend="회차 선택">
      <RadioCard {...args} />
    </RadioGroup>
  ),
};

export default meta;
type Story = StoryObj<typeof RadioCard>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: '고르기 전 카드 하나. 카드 어디를 눌러도 선택된다.' } },
  },
};

export const Selected: Story = {
  parameters: {
    docs: {
      description: {
        story: '선택된 카드. accent 면과 2px 테두리, 설명 글자는 면 위 대비를 위해 한 단계 진해진다.',
      },
    },
  },
  render: (args) => (
    <RadioGroup legend="회차 선택" defaultValue="a">
      <RadioCard {...args} />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, aside: <Badge>마감</Badge> },
  parameters: {
    docs: { description: { story: '고를 수 없는 선택지. 예: 마감된 회차. 이유를 aside나 설명 글자로 함께 보여 준다.' } },
  },
};

export const Invalid: Story = {
  args: { invalid: true, aside: <Badge tone="danger">마감</Badge> },
  parameters: {
    docs: {
      description: {
        story:
          '골라 둔 회차가 그사이 마감된 상태. 선택은 남겨 두고 danger 테두리로 표시한다. 이유는 카드 밖에 글자로 쓰고 `aria-describedby`로 카드에 연결한다(Alert가 생기면 Alert로 바꾼다).',
      },
    },
  },
  render: function Render(args) {
    const reasonId = useId();
    return (
      <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
        <p id={reasonId} style={{ margin: 0, color: 'var(--color-text-danger)', fontSize: 'var(--font-size-100)' }}>
          선택한 회차가 마감됐어요. 다른 회차를 골라 주세요.
        </p>
        <RadioGroup legend="회차 선택" defaultValue="a">
          <RadioCard {...args} aria-describedby={reasonId} />
        </RadioGroup>
      </div>
    );
  },
};

export const WithoutDescription: Story = {
  args: { description: undefined, title: '카카오페이', aside: undefined },
  parameters: {
    docs: { description: { story: '설명·aside 없이 제목만 있는 카드. 예: 결제 수단.' } },
  },
};

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story: '회차 선택 예시. 방향키로 선택이 옮겨 가고, 마감된 회차는 건너뛴다.',
      },
    },
  },
  render: function Render() {
    const [value, setValue] = useState('b');
    return (
      <RadioGroup legend="회차 선택" value={value} onValueChange={setValue}>
        <RadioCard
          value="a"
          title="10월 30일 (목) 14:00"
          description="2시간 · 성수 공방"
          aside={<Badge tone="accent">잔여 3석</Badge>}
        />
        <RadioCard
          value="b"
          title="10월 31일 (금) 19:00"
          description="2시간 · 성수 공방"
          aside={<Badge tone="danger">잔여 1석</Badge>}
        />
        <RadioCard
          value="c"
          title="11월 1일 (토) 11:00"
          description="2시간 · 성수 공방"
          aside={<Badge>마감</Badge>}
          disabled
        />
      </RadioGroup>
    );
  },
};
