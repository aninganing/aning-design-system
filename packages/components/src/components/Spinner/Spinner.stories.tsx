import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
끝나는 시점을 알 수 없는 짧은 대기를 나타내는 회전 표시. 결제 확인 중, 제출 중에 쓴다. 색은
\`@aninganing/tokens\`의 \`spinner.*\` 컴포넌트 토큰을 소비한다.

### 언제 쓰나
- 목록·카드처럼 **레이아웃이 정해진 로딩은 \`Skeleton\`**을 쓴다. Spinner는 무엇이 나올지 모르는 짧은 대기에 쓴다.
- 결제 확인처럼 길어질 수 있는 대기는 Spinner만 두지 말고, 경과에 따라 화면 문구를 바꾼다.

### tone
- **current** — 기본. 부모 글자색을 따른다. 버튼·문단 안에 넣을 때.
- **accent** — 페이지 가운데 단독으로 둘 때 강조색. 다크 테마는 한 단계 밝은 blue로 대비를 맞춘다.

### 접근성
- 감싸는 요소가 \`role="status"\`이고, 회전 원은 \`aria-hidden\`, 상태는 화면에 보이지 않는 \`label\` 문구로 읽힌다.
- \`delay\`(기본 300ms) 동안은 status 영역만 두고 아무것도 그리지 않는다. 빠르게 끝나는 대기에서 깜빡임과 불필요한
  읽기를 막는다.
- 모션 감소 설정에서는 멈추지 않고 **느리게(2.4초) 돈다.** 멈춘 고리는 화면이 멈춘 것처럼 보이기 때문이다.
        `.trim(),
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '회전 원 크기. sm 16px · md 24px · lg 32px.',
      table: { defaultValue: { summary: 'md' } },
    },
    tone: {
      control: 'select',
      options: ['current', 'accent'],
      description: '색. 위 "tone" 참고.',
      table: { defaultValue: { summary: 'current' } },
    },
    label: {
      control: 'text',
      description: '스크린 리더가 읽는 문구(화면에는 숨김). 무엇을 기다리는지 적는다.',
      table: { defaultValue: { summary: '불러오는 중' } },
    },
    delay: {
      control: 'number',
      description: '이 시간(ms)이 지나야 그린다. 0이면 바로 그린다.',
      table: { defaultValue: { summary: '300' } },
    },
  },
  args: {
    delay: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: '부모 글자색을 따르는 기본 모양.' } },
  },
};

export const Accent: Story = {
  args: { tone: 'accent', size: 'lg', label: '결제 확인 중' },
  parameters: {
    docs: {
      description: { story: '페이지 가운데 단독으로 두는 대기 표시. 결제 확인 화면 등.' },
    },
  },
};

export const InText: Story = {
  args: { size: 'sm', label: '잔여석 확인 중' },
  parameters: {
    docs: {
      description: {
        story: '문장 옆에 붙인 예시. `current` 톤이라 주변 글자색(여기서는 보조 텍스트색)을 따른다.',
      },
    },
  },
  render: (args) => (
    <p
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        margin: 0,
        color: 'var(--color-text-subtle)',
      }}
    >
      <Spinner {...args} />
      잔여석을 확인하고 있어요
    </p>
  ),
};

export const Delayed: Story = {
  args: { delay: 1000 },
  parameters: {
    docs: {
      description: {
        story:
          '`delay`가 지나야 나타난다(여기서는 1초). 그보다 빨리 끝나는 대기는 아무것도 그리지 않는다. 다시 보려면 스토리를 새로고침한다.',
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: { description: { story: '세 가지 크기 비교.' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </div>
  ),
};
