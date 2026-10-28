import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { NumberStepper } from './NumberStepper';

const meta: Meta<typeof NumberStepper> = {
  title: 'Components/NumberStepper',
  component: NumberStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
−, + 버튼으로 작은 정수를 한 단계씩 바꾸는 컨트롤. 예약 인원처럼 범위가 좁고 보통 1~2 단계만 바꾸는 값에 쓴다.
\`@aninganing/tokens\`의 \`number-stepper.*\` 컴포넌트 토큰을 소비한다.

### 사용 기준
- 범위가 넓거나(예: 금액) 원하는 값을 바로 넣어야 하면 \`Input type="number"\`를 쓴다. 이 컨트롤은 직접 입력을 받지 않는다.
- \`max\`가 바깥 데이터(잔여석)라 줄어들 수 있으면, 값이 넘칠 때 \`max\`로 맞추고 \`onClamp\`로 알린다. "남은 자리가 2석이라
  인원을 2명으로 바꿨어요" 같은 안내 문구는 화면이 정한다.
- 값이 막힌 이유("이 회차는 최대 4명")는 도움말 글자로 함께 보여 주고 \`aria-describedby\`로 그룹에 연결한다.
- 같은 화면의 다른 조작 요소와 높이를 맞춰 \`size\`를 고른다(\`sm\` 32px · \`md\` 40px).

### 접근성
- 전체는 \`role="group"\`이고 \`label\`이 그룹 이름이 된다. 버튼 이름은 "\`label\` 줄이기"·"\`label\` 늘리기"다.
- 값은 \`<output aria-live="polite">\`라 버튼을 누르면 바뀐 숫자가 읽힌다.
- 한계에 닿은 버튼은 \`disabled\`로 포커스에서 빠진다. 그 버튼을 눌러 한계에 닿았다면 포커스는 반대쪽 버튼으로 옮겨 가서
  키보드 사용자가 위치를 잃지 않는다.
- 화살표 키로 값을 바꾸는 WAI-ARIA \`spinbutton\` 방식은 아직 없다. 키보드로 직접 바꿀 일이 생기면 그때 확장한다.
        `.trim(),
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: '그룹 이름. 버튼 이름 "~ 줄이기"·"~ 늘리기"에도 쓰인다.' },
    value: { control: false, description: '현재 값(controlled).' },
    defaultValue: {
      control: 'number',
      description: '처음 값(uncontrolled).',
      table: { defaultValue: { summary: 'min' } },
    },
    onValueChange: { description: '버튼으로 바뀌었을 때, 또는 범위에 맞춰졌을 때 새 값으로 호출된다.' },
    min: { control: 'number', description: '가장 작은 값.', table: { defaultValue: { summary: '1' } } },
    max: { control: 'number', description: '가장 큰 값(예: 잔여석). 없으면 제한 없음.' },
    step: { control: 'number', description: '한 번에 바뀌는 양.', table: { defaultValue: { summary: '1' } } },
    onClamp: { description: '값이 `min`·`max`로 맞춰졌을 때 맞춘 값으로 호출된다.' },
    disabled: {
      control: 'boolean',
      description: '전체 비활성. 두 버튼 모두 포커스에서 빠진다.',
      table: { defaultValue: { summary: 'false' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: '버튼 크기. `sm` 32px(터치 영역 44px) · `md` 40px.',
      table: { defaultValue: { summary: 'md' } },
    },
  },
  args: {
    label: '인원',
    defaultValue: 2,
    max: 6,
  },
};

export default meta;
type Story = StoryObj<typeof NumberStepper>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: '예약 인원 선택. 1명부터 6명까지.' } },
  },
};

export const AtMin: Story = {
  args: { defaultValue: 1 },
  parameters: {
    docs: { description: { story: '가장 작은 값에 닿은 상태. − 버튼만 비활성된다.' } },
  },
};

export const AtMax: Story = {
  args: { defaultValue: 6 },
  parameters: {
    docs: { description: { story: '가장 큰 값에 닿은 상태. + 버튼만 비활성된다.' } },
  },
};

export const WithHelper: Story = {
  args: { max: 4, defaultValue: 4 },
  parameters: {
    docs: {
      description: {
        story: '값이 막힌 이유를 도움말로 보여 주는 예시. 도움말은 `aria-describedby`로 그룹에 연결한다.',
      },
    },
  },
  render: function Render(args) {
    const hintId = useId();
    return (
      <div style={{ display: 'grid', gap: 'var(--space-2)', justifyItems: 'start' }}>
        <NumberStepper {...args} aria-describedby={hintId} />
        <p id={hintId} style={{ margin: 0, color: 'var(--color-text-subtle)', fontSize: 'var(--font-size-100)' }}>
          이 회차는 최대 4명까지 예약할 수 있어요
        </p>
      </div>
    );
  },
};

export const Clamp: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '잔여석이 줄어 `max`가 현재 값보다 작아진 경우. 값이 `max`로 맞춰지고 `onClamp`가 호출되어 화면이 안내 문구를 띄운다. "잔여석 줄이기"를 눌러 확인한다.',
      },
    },
  },
  render: function Render() {
    const [count, setCount] = useState(4);
    const [seats, setSeats] = useState(6);
    const [notice, setNotice] = useState('');
    return (
      <div style={{ display: 'grid', gap: 'var(--space-3)', justifyItems: 'start' }}>
        <NumberStepper
          label="인원"
          value={count}
          max={seats}
          onValueChange={(next) => {
            setCount(next);
            setNotice('');
          }}
          onClamp={(next) => setNotice(`남은 자리가 ${next}석이라 인원을 ${next}명으로 바꿨어요`)}
        />
        <p role="status" style={{ margin: 0, minHeight: '1.5em', fontSize: 'var(--font-size-100)' }}>
          {notice}
        </p>
        <Button variant="secondary" size="sm" disabled={seats <= 1} onClick={() => setSeats((s) => s - 1)}>
          잔여석 줄이기 (지금 {seats}석)
        </Button>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: { description: { story: '지금 바꿀 수 없는 상태. 예: 결제가 진행 중인 예약.' } },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: { description: { story: '두 가지 버튼 크기 비교. 값 글자 크기는 같다.' } },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--space-4)', justifyItems: 'start' }}>
      <NumberStepper {...args} size="sm" />
      <NumberStepper {...args} size="md" />
    </div>
  ),
};
