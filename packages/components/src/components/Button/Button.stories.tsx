import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
사용자의 액션을 트리거하는 기본 버튼 컴포넌트. 색상/간격/폰트는 전부
\`@aning/tokens\`의 \`button.*\` 컴포넌트 토큰(라이트/다크 겸용)을 통해 소비하므로,
스타일을 바꾸려면 컴포넌트 코드가 아니라 토큰을 먼저 확인한다.

### 언제 어떤 variant를 쓰나
- **primary** — 화면/폼당 하나의 주요 액션에만 사용한다. 한 화면에 여러 개를 두지 않는다.
- **secondary** — 취소, 보조 액션 등 primary를 보완하는 액션에 사용한다.
- **danger** — 삭제처럼 되돌리기 어려운 파괴적 액션 전용. 확인 다이얼로그와 함께 쓰는 것을 권장한다.

### 접근성
- 네이티브 \`<button>\` 엘리먼트를 렌더링하므로 별도 ARIA role이 필요 없다.
- \`isLoading\`은 \`disabled\`와 \`aria-busy\`를 함께 설정해 스크린 리더에 진행 상태를 알린다.
- 포커스 링은 \`--color-border-focus\` 토큰 기반의 공용 \`focusRing\` 스타일을 쓴다 — 커스텀 포커스
  스타일을 임의로 덮어쓰지 않는다.
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: '버튼의 시각적 스타일. 위 "언제 어떤 variant를 쓰나" 참고.',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼 높이/패딩/폰트 크기 프리셋.',
      table: { defaultValue: { summary: 'md' } },
    },
    isLoading: {
      control: 'boolean',
      description: '로딩 스피너 상태. 클릭을 막고 `aria-busy`를 설정한다.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: '네이티브 disabled 상태. 진행 중인 액션이 아니라 아예 불가능한 액션에 사용한다.',
    },
  },
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
  parameters: {
    docs: { description: { story: '화면당 하나만 두는 주요 액션 버튼.' } },
  },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
  parameters: {
    docs: { description: { story: 'Primary를 보완하는 보조 액션. 예: 취소, 뒤로가기.' } },
  },
};

export const Danger: Story = {
  args: { variant: 'danger' },
  parameters: {
    docs: {
      description: { story: '삭제 등 파괴적 액션 전용. 확인 다이얼로그 없이 단독으로 쓰지 않는다.' },
    },
  },
};

export const Loading: Story = {
  args: { isLoading: true },
  parameters: {
    docs: {
      description: {
        story: '비동기 액션 진행 중 상태. 클릭이 막히고 `aria-busy="true"`가 설정된다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story: '현재 화면 상태에서 아예 수행할 수 없는 액션. 로딩과 달리 다시 활성화될 기약이 없을 때 쓴다.',
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: { description: { story: '세 가지 크기 프리셋을 한 화면에서 비교.' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
      <Button {...args} size="lg" />
    </div>
  ),
};
