import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconBase } from '@aninganing/icons';
import { IconButton } from './IconButton';

// 아이콘 패키지에 아직 없는 아이콘이라 스토리 전용으로 IconBase 위에 그린다.
const ArrowLeftIcon = () => (
  <IconBase>
    <path
      d="M10 3L5 8l5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

const ArrowRightIcon = () => (
  <IconBase>
    <path
      d="M6 3l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
);

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <IconBase>
    <path
      d="M8 13.5S2 10 2 6a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 4-6 7.5-6 7.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill={filled ? 'currentColor' : 'none'}
    />
  </IconBase>
);

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
텍스트 없이 아이콘 하나로 동작을 나타내는 버튼. 뒤로 가기, 공유, 찜, 새로고침, 이전·다음 달 이동에 쓴다.
색상/반경/그림자는 \`@aninganing/tokens\`의 \`icon-button.*\` 컴포넌트 토큰을 소비한다.

### 언제 어떤 variant를 쓰나
- **ghost** — 기본. 헤더처럼 아이콘이 여러 개 나란히 놓이는 곳. hover 때만 면이 생긴다.
- **outline** — 달력의 이전·다음 달처럼 누를 수 있다는 경계가 보여야 할 때. 테두리는 조작 요소 기준(3:1)인
  \`color.border.control\`을 쓴다.
- **overlay** — 상세 이미지 위의 뒤로 가기·찜. 사진 위에서도 보이도록 면과 그림자를 깐다. 보통
  \`shape="round"\`와 함께 쓴다.

### 아이콘
- 아이콘은 \`children\`으로 넣는다. 크기는 \`size\`가 정한다(sm 16px · md 20px · lg 24px) — 아이콘의 \`size\`
  prop은 신경 쓰지 않아도 된다.
- 색은 \`currentColor\`로 그린 아이콘이어야 variant·pressed 색을 따른다.

### 접근성
- \`aria-label\`은 타입에서 필수다. 아이콘은 장식으로 숨긴다(\`@aninganing/icons\`는 기본이 \`aria-hidden\`).
- \`pressed\`를 주면 토글 버튼이 되어 \`aria-pressed\`로 이어진다. 라벨은 상태에 따라 바꾸지 않는다("찜하기" 유지).
- \`sm\`(32px)은 보이지 않는 영역으로 터치 영역을 44px까지 넓힌다. 버튼 사이 간격이 좁으면 영역이 겹칠 수 있으니
  나란히 둘 때는 \`space-2\` 이상 띄운다.
- 설명이 더 필요하면 \`Tooltip\`을 붙이되, 이름은 항상 \`aria-label\`이 맡는다.
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['ghost', 'outline', 'overlay'],
      description: '버튼의 시각적 스타일. 위 "언제 어떤 variant를 쓰나" 참고.',
      table: { defaultValue: { summary: 'ghost' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기. sm 32px · md 40px · lg 48px, 아이콘은 16 · 20 · 24px.',
      table: { defaultValue: { summary: 'md' } },
    },
    shape: {
      control: 'select',
      options: ['square', 'round'],
      description: '모서리 모양. `square`는 `radius-md`, `round`는 원형.',
      table: { defaultValue: { summary: 'square' } },
    },
    pressed: {
      control: 'boolean',
      description: '토글 버튼의 켜짐 상태. 지정하면 `aria-pressed`로 이어지고 아이콘이 accent 색이 된다.',
    },
    onPressedChange: {
      description: '눌렀을 때 바뀔 값(`!pressed`)으로 호출된다. `pressed`를 지정했을 때만 호출된다.',
    },
    'aria-label': {
      control: 'text',
      description: '버튼의 접근 가능한 이름. 필수.',
    },
    disabled: {
      control: 'boolean',
      description: '네이티브 disabled 상태. 포커스에서 빠지고 클릭되지 않는다.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    'aria-label': '뒤로 가기',
    children: <ArrowLeftIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Ghost: Story = {
  args: { variant: 'ghost' },
  parameters: {
    docs: { description: { story: '헤더의 뒤로 가기·공유처럼 아이콘이 나란히 놓이는 곳의 기본 스타일.' } },
  },
};

export const Outline: Story = {
  args: { variant: 'outline' },
  parameters: {
    docs: {
      description: { story: '경계가 보여야 하는 곳. 호스트 달력의 이전·다음 달 이동.' },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <IconButton {...args} aria-label="이전 달">
        <ArrowLeftIcon />
      </IconButton>
      <IconButton {...args} aria-label="다음 달">
        <ArrowRightIcon />
      </IconButton>
    </div>
  ),
};

export const Overlay: Story = {
  args: { variant: 'overlay', shape: 'round' },
  parameters: {
    docs: {
      description: {
        story: '상세 이미지 위의 뒤로 가기·찜. 회색 면은 사진 자리를 표시한 것이다.',
      },
    },
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: 280,
        height: 160,
        padding: 12,
        boxSizing: 'border-box',
        borderRadius: 12,
        background: 'var(--color-bg-muted)',
      }}
    >
      <IconButton {...args} aria-label="뒤로 가기">
        <ArrowLeftIcon />
      </IconButton>
      <IconButton {...args} aria-label="찜하기" pressed={false}>
        <HeartIcon />
      </IconButton>
    </div>
  ),
};

export const Pressed: Story = {
  args: { 'aria-label': '찜하기' },
  parameters: {
    docs: {
      description: {
        story:
          '찜처럼 켜고 끄는 버튼. 눌러 보면 `aria-pressed`가 바뀌고 아이콘이 accent 색으로 채워진다. 라벨은 "찜하기"로 유지된다.',
      },
    },
  },
  render: function Render(args) {
    const [pressed, setPressed] = useState(false);
    return (
      <IconButton {...args} pressed={pressed} onPressedChange={setPressed}>
        <HeartIcon filled={pressed} />
      </IconButton>
    );
  },
};

export const Disabled: Story = {
  args: { variant: 'outline', disabled: true, 'aria-label': '이전 달' },
  parameters: {
    docs: {
      description: { story: '지금 누를 수 없는 동작. 예: 달력이 첫 달에 있을 때 이전 달 버튼.' },
    },
  },
};

export const Sizes: Story = {
  args: { variant: 'outline' },
  parameters: {
    docs: {
      description: { story: '세 가지 크기 비교. sm은 보이는 크기는 32px이지만 터치 영역은 44px이다.' },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton {...args} size="sm" />
      <IconButton {...args} size="md" />
      <IconButton {...args} size="lg" />
    </div>
  ),
};

export const Shapes: Story = {
  args: { variant: 'outline' },
  parameters: {
    docs: { description: { story: '`square`(기본)와 `round` 비교.' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <IconButton {...args} shape="square" />
      <IconButton {...args} shape="round" />
    </div>
  ),
};
