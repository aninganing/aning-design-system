import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

// 스토리 전용 아이콘 버튼 (원형, 물음표)
const HelpButton = (props: { 'aria-label': string }) => (
  <button
    type="button"
    {...props}
    style={{
      display: 'inline-grid',
      placeItems: 'center',
      width: 32,
      height: 32,
      padding: 0,
      border: '1px solid var(--color-border-default)',
      borderRadius: '50%',
      background: 'var(--color-bg-default)',
      color: 'var(--color-text-subtle)',
      font: 'inherit',
      fontWeight: 600,
      cursor: 'pointer',
    }}
  >
    ?
  </button>
);

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
요소에 마우스를 올리거나 포커스했을 때 짧은 보충 설명을 띄운다. 환불 규정 아이콘, 아이콘 버튼 설명에 쓴다.
색상은 \`@aninganing/tokens\`의 \`tooltip.*\` 컴포넌트 토큰을 소비하며, 두 테마 모두 반전 면이라 배경과
확실히 구분된다.

열림·닫힘, 위치 계산(공간이 부족하면 반대쪽으로 뒤집기), 포털, 키보드 처리는
[Radix Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip)에 맡긴다.

### 사용 기준
- 짧은 **보충** 설명에만 쓴다. 링크·버튼처럼 누를 수 있는 내용은 넣지 않는다.
- 터치 기기에는 hover가 없으므로, 꼭 필요한 정보(환불 규정 등)는 툴팁에만 두지 말고 본문에도 적는다.
- 트리거는 포커스할 수 있는 요소 하나여야 한다(\`<button>\`, \`Button\` 등).

### 접근성
- hover뿐 아니라 키보드 포커스로도 열리고(지연 없이), Esc로 닫힌다.
- 툴팁 내용은 \`role="tooltip"\`으로 트리거의 \`aria-describedby\`에 연결된다 — 이름이 아니라 **설명**이다.
  아이콘만 있는 버튼은 툴팁과 별개로 \`aria-label\`로 이름을 준다.
        `.trim(),
      },
    },
  },
  argTypes: {
    content: { control: 'text', description: '툴팁에 띄울 짧은 보충 설명.' },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: '트리거 기준 방향. 공간이 부족하면 자동으로 뒤집힌다.',
      table: { defaultValue: { summary: 'top' } },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '`side` 방향에서의 정렬.',
      table: { defaultValue: { summary: 'center' } },
    },
    delay: {
      control: 'number',
      description: '마우스를 올린 뒤 열리기까지 기다리는 시간(ms).',
      table: { defaultValue: { summary: '300' } },
    },
  },
  args: {
    content: '클래스 3일 전까지 전액 환불돼요.',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 64 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const IconButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '아이콘 버튼 설명. 버튼 이름은 `aria-label`("환불 규정")로, 툴팁은 설명으로 읽힌다. 마우스를 올리거나 Tab으로 포커스해 본다.',
      },
    },
  },
  render: (args) => (
    <Tooltip {...args}>
      <HelpButton aria-label="환불 규정" />
    </Tooltip>
  ),
};

export const OnButton: Story = {
  args: { content: '당일 취소는 환불되지 않아요.' },
  parameters: {
    docs: { description: { story: '텍스트 버튼에 보충 설명을 붙인 예시. `Button`을 그대로 트리거로 쓴다.' } },
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary" size="sm">
        환불 규정
      </Button>
    </Tooltip>
  ),
};

export const Sides: Story = {
  parameters: {
    docs: { description: { story: '네 방향. 화면 가장자리에서는 공간이 있는 쪽으로 뒤집힌다.' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side} {...args} side={side} content={side}>
          <HelpButton aria-label={`${side} 방향 예시`} />
        </Tooltip>
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    content: '수업 3일 전까지는 전액, 2일 전까지는 50% 환불돼요. 당일 취소와 노쇼는 환불되지 않아요.',
  },
  parameters: {
    docs: { description: { story: '긴 설명은 최대 너비 240px에서 줄바꿈된다. 이보다 길면 본문에 적는다.' } },
  },
  render: IconButton.render,
};

export const AlwaysOpen: Story = {
  args: { open: true },
  parameters: {
    docs: { description: { story: '`open`으로 열린 상태를 고정한 모습(디자인 확인용).' } },
  },
  render: IconButton.render,
};
