import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  subcomponents: { Radio },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
여러 선택지 중 하나만 고르는 컨트롤. 예약 시간대, 결제 수단 선택에 쓴다. \`RadioGroup\` 안에 \`Radio\`를 둔다.
색상은 \`@aninganing/tokens\`의 \`radio.*\` 컴포넌트 토큰을 소비한다.

### 언제 쓰나
- 선택지 중 **하나만** 고를 때. 여러 개를 고르면 Checkbox를 쓴다.
- 선택지가 2~5개 정도로 적고, 한눈에 비교해야 할 때. 많으면 Select가 낫다.
- \`description\`으로 잔여석처럼 고르는 데 필요한 정보를 붙인다.

### 상태 관리
\`RadioGroup\`에 \`defaultValue\`(uncontrolled) 또는 \`value\` + \`onValueChange\`(controlled)를 준다. 안의 radio는
같은 \`name\`(지정하지 않으면 자동 생성)을 공유해 폼 제출 시 선택 값이 전송된다.

### 접근성
- 네이티브 \`<input type="radio">\`를 시각적으로만 숨기고 옆 요소로 그린다. 같은 \`name\`이라 그룹 안에서
  **방향키로 이동하며 선택**되고(비활성 선택지는 건너뜀), Tab 키로는 그룹에 한 번만 들어간다.
- \`RadioGroup\`은 \`fieldset\` + \`legend\`이고 \`role="radiogroup"\`으로 알린다. legend가 그룹 이름이 된다.
- 해제 상태 테두리는 Checkbox와 같은 \`color-border-control\`(두 테마 3:1 이상)이다.
        `.trim(),
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '선택지 배치 방향.',
      table: { defaultValue: { summary: 'vertical' } },
    },
    disabled: {
      control: 'boolean',
      description: '그룹 전체를 비활성화한다(fieldset disabled).',
    },
    required: {
      control: 'boolean',
      description: '폼 제출 전에 하나를 반드시 고르게 한다.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    legend: '시간 선택',
    defaultValue: '10',
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '예약 시간 선택. description으로 잔여석을 붙이고, 마감된 시간은 비활성화한다.',
      },
    },
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="10" label="10:00 – 12:00" description="잔여 3석" />
      <Radio value="14" label="14:00 – 16:00" description="잔여 1석" />
      <Radio value="19" label="19:00 – 21:00" description="마감" disabled />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  args: { legend: '결제 수단', defaultValue: 'card', orientation: 'horizontal' },
  parameters: {
    docs: { description: { story: '선택지가 짧을 때 가로로 늘어놓는다. 방향키 동작은 같다.' } },
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="card" label="카드" />
      <Radio value="transfer" label="계좌이체" />
      <Radio value="kakaopay" label="카카오페이" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: { description: { story: '그룹 전체를 고를 수 없는 상태. 예: 예약이 마감된 클래스.' } },
  },
  render: Default.render,
};

const ControlledDemo = () => {
  const [time, setTime] = useState('14');
  return (
    <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
      <RadioGroup legend="시간 선택" value={time} onValueChange={setTime}>
        <Radio value="10" label="10:00 – 12:00" description="잔여 3석" />
        <Radio value="14" label="14:00 – 16:00" description="잔여 1석" />
      </RadioGroup>
      <p style={{ margin: 0, fontSize: 'var(--font-size-100)' }}>선택한 시간: {time}시</p>
    </div>
  );
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: { story: '`value` + `onValueChange`로 선택 값을 밖에서 관리하는 예시.' },
    },
  },
  render: () => <ControlledDemo />,
};
