import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../Field';
import { Select } from './Select';

const classOptions = [
  { value: 'pottery', label: '도자기 원데이' },
  { value: 'baking', label: '베이킹 클래스' },
  { value: 'drawing', label: '드로잉 클래스' },
  { value: 'perfume', label: '향수 만들기' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
정해진 목록에서 하나를 고르는 드롭다운. 호스트의 클래스 선택, 정렬 기준, 지역 같은 짧은 목록에 쓴다. Radix Select 위에
\`@aninganing/tokens\`의 \`select.*\` 컴포넌트 토큰으로 모양만 입혔다.

### 사용 기준
- 항목이 2~3개뿐이면 펼쳐서 보여주는 \`RadioGroup\`이 낫다. 검색이 필요할 만큼 길면 Select가 아니라 Combobox(추후)를 쓴다.
- 트리거의 높이·테두리·포커스·에러·비활성 표현은 \`Input\`과 같다. 같은 폼 안에서 \`size\`를 맞춘다.
- 라벨·도움말·에러는 \`Field\`로 붙인다. \`Field.Control\`이 얹는 \`id\`·\`aria-*\`는 트리거로 간다.
- 항목 값으로 빈 문자열(\`''\`)은 쓸 수 없다. 빈 값은 "선택 안 함"을 뜻하고 그때 \`placeholder\`가 보인다.

### 접근성
- 트리거는 \`role="combobox"\`, 목록은 \`listbox\`/\`option\`이다. Enter·Space·↓로 열고, 화살표·Home·End·글자 입력으로
  이동하며, Esc로 닫으면 트리거로 포커스가 돌아온다(Radix).
- 목록 안의 현재 항목은 배경(\`bg.muted\`)과 왼쪽 accent 막대로 표시하고, 고른 항목에는 체크 표시가 붙는다.
- \`name\`을 주면 숨긴 네이티브 select가 함께 렌더링되어 일반 폼 제출(\`FormData\`)과 \`required\` 검증이 동작한다.
- 모바일에서도 OS 피커가 아니라 이 목록이 뜬다(네이티브 select와의 차이).
        `.trim(),
      },
    },
  },
  argTypes: {
    options: {
      control: false,
      description: '고를 항목 목록 `{ value, label, disabled? }[]`.',
    },
    value: { control: false, description: '선택 값(controlled). 선택 안 함은 `\'\'`.' },
    defaultValue: { control: 'text', description: '처음 선택 값(uncontrolled).' },
    onValueChange: { description: '다른 항목을 골랐을 때 그 값으로 호출된다.' },
    placeholder: { control: 'text', description: '값이 없을 때 트리거에 보이는 안내 문구.' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '트리거 크기. Input과 같은 32 · 40 · 48px.',
      table: { defaultValue: { summary: 'md' } },
    },
    invalid: {
      control: 'boolean',
      description: '에러 상태. danger 테두리 + `aria-invalid`. `Field.Root`의 `invalid`로도 같은 상태가 된다.',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: '필수 입력. `aria-required`, `name`이 있으면 브라우저 검증까지.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: '비활성. 열리지 않고 포커스에서 빠진다.',
      table: { defaultValue: { summary: 'false' } },
    },
    name: { control: 'text', description: '폼 제출 시 쓰일 이름.' },
  },
  args: {
    'aria-label': '클래스',
    options: classOptions,
    placeholder: '클래스를 선택해 주세요',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: '값이 없는 처음 상태. 트리거에 placeholder가 보인다.' } },
  },
};

export const WithValue: Story = {
  args: { defaultValue: 'baking' },
  parameters: {
    docs: { description: { story: '값이 정해진 상태. 열면 고른 항목에 체크 표시가 붙어 있다.' } },
  },
};

export const InField: Story = {
  parameters: {
    docs: {
      description: {
        story: '`Field`로 라벨·도움말을 붙인 예시. 라벨을 누르면 트리거로 포커스가 간다.',
      },
    },
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <Field.Root required>
        <Field.Label>운영할 클래스</Field.Label>
        <Field.Control>
          <Select {...args} aria-label={undefined} value={value} onValueChange={setValue} />
        </Field.Control>
        <Field.Helper>회차를 추가할 클래스를 골라 주세요</Field.Helper>
      </Field.Root>
    );
  },
};

export const Invalid: Story = {
  parameters: {
    docs: {
      description: { story: '검증에 실패한 상태. `Field.Root`의 `invalid`가 트리거 테두리와 설명으로 이어진다.' },
    },
  },
  render: (args) => (
    <Field.Root required invalid>
      <Field.Label>운영할 클래스</Field.Label>
      <Field.Control>
        <Select {...args} aria-label={undefined} />
      </Field.Control>
      <Field.Error>클래스를 선택해 주세요</Field.Error>
    </Field.Root>
  ),
};

export const DisabledOption: Story = {
  args: {
    options: [
      { value: 'latest', label: '최신순' },
      { value: 'popular', label: '인기순' },
      { value: 'distance', label: '가까운 순 (위치 권한 필요)', disabled: true },
    ],
    defaultValue: 'latest',
    'aria-label': '정렬 기준',
  },
  parameters: {
    docs: {
      description: {
        story: '지금은 고를 수 없는 항목. 목록에는 보이지만 키보드 이동에서 건너뛴다. 이유를 글자로 함께 적는다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'pottery' },
  parameters: {
    docs: { description: { story: '지금 바꿀 수 없는 선택. 예: 예약이 있는 회차의 클래스.' } },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: { description: { story: 'Input과 같은 세 가지 높이 비교.' } },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Select {...args} size="sm" />
      <Select {...args} size="md" />
      <Select {...args} size="lg" />
    </div>
  ),
};

// 열린 Select는 페이지 스크롤과 바깥 클릭을 잠그므로(Radix modal 동작) Docs 페이지에서 빼고 단독 스토리로만 둔다.
export const Open: Story = {
  tags: ['!autodocs'],
  args: { defaultValue: 'baking', open: true },
  parameters: {
    docs: {
      description: { story: '목록이 열린 모양을 고정해서 보여준다. 실제로는 `open`을 주지 않는다.' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 240 }}>
        <Story />
      </div>
    ),
  ],
};
