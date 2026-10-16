import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';
import type { ToggleChipProps } from './Chip.types';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
누르면 선택이 토글되는 알약형 컨트롤. 검색 필터와 적용된 필터 목록에 쓴다. 색상은 \`@aninganing/tokens\`의
\`chip.*\` 컴포넌트 토큰을 소비한다.

모서리는 \`radius-full\`이다. 표시용 라벨(Badge, \`radius-sm\`)과 모양으로 구분해 누를 수 있는 요소임을
알린다. 누를 필요가 없는 상태 표시에는 Badge를 쓴다.

### 두 가지 형태
- **토글형** — \`selected\` + \`onSelectedChange\`. 칩 자체가 \`<button aria-pressed>\`다. 필터 선택에 쓴다.
- **제거형** — \`onRemove\`를 주면 칩 끝에 × 버튼이 붙는다. 칩 자체는 누를 수 없고 × 버튼만 누를 수 있다.
  적용된 필터 목록에 쓴다.

### 상태는 밖에서 관리한다
칩은 선택 상태를 들고 있지 않는다(controlled). \`onSelectedChange\`로 받은 값을 직접 반영하고, 필터 값은
URL에 두어 공유·뒤로가기와 맞춘다. \`selected\`를 지정하지 않으면 토글이 아닌 일반 버튼으로 동작한다.

### 접근성
- 토글형은 \`aria-pressed\`로 선택 상태를 알린다. 선택은 색뿐 아니라 굵기·테두리로도 구분된다.
- 제거형은 칩 전체가 아니라 **× 버튼에** "성수동 제거" 같은 이름을 준다(기본값: 칩 글자 + " 제거").
  칩 내용이 글자가 아니면 \`removeLabel\`을 반드시 지정한다.
- × 버튼은 20px로 보이지만 누를 수 있는 영역은 칩 높이만큼 넓다.
- 필터 칩 묶음은 \`role="group"\`과 \`aria-label\`로 감싸 무엇을 고르는지 알린다.
        `.trim(),
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: '칩 높이 프리셋. `sm` 28px(적용된 필터 목록), `md` 32px(필터 선택).',
      table: { defaultValue: { summary: 'md' } },
    },
    selected: {
      control: 'boolean',
      description: '선택 상태. 토글형에서는 `aria-pressed`로 이어진다.',
    },
    disabled: {
      control: 'boolean',
      description: '선택할 수 없는 필터. 예: 해당 조건의 결과가 0개일 때.',
    },
  },
  args: {
    children: '공예',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// 칩은 상태를 들고 있지 않으므로(controlled) 스토리에서 상태를 대신 관리한다
const ToggleDemo = ({ selected: initial, ...args }: ToggleChipProps) => {
  const [selected, setSelected] = useState(Boolean(initial));
  return <Chip {...args} selected={selected} onSelectedChange={setSelected} />;
};

// Controls의 args는 토글형·제거형 합집합 타입이라, 토글형 데모에 넘길 때 좁혀준다
const asToggle = (args: Story['args']) => args as ToggleChipProps;

export const Toggle: Story = {
  args: { selected: false },
  parameters: {
    docs: { description: { story: '누를 때마다 선택이 바뀌는 토글형. 필터 하나를 켜고 끌 때 쓴다.' } },
  },
  render: (args) => <ToggleDemo {...asToggle(args)} />,
};

export const Selected: Story = {
  args: { selected: true },
  parameters: {
    docs: {
      description: {
        story: '선택된 상태. 연한 accent 바탕, accent 테두리·글자에 글자가 굵어진다. 다크 테마에서 글자는 blue-300.',
      },
    },
  },
  render: (args) => <ToggleDemo {...asToggle(args)} />,
};

export const Disabled: Story = {
  args: { selected: false, disabled: true },
  parameters: {
    docs: { description: { story: '지금은 고를 수 없는 필터. 결과가 0개인 조건 등.' } },
  },
};

const FilterGroupDemo = () => {
  const categories = ['공예', '요리', '운동', '음악'];
  const [selected, setSelected] = useState<string[]>(['공예']);
  const toggle = (name: string, on: boolean) =>
    setSelected((prev) => (on ? [...prev, name] : prev.filter((item) => item !== name)));

  return (
    <div role="group" aria-label="카테고리" style={{ display: 'flex', gap: 8 }}>
      {categories.map((name) => (
        <Chip key={name} selected={selected.includes(name)} onSelectedChange={(on) => toggle(name, on)}>
          {name}
        </Chip>
      ))}
    </div>
  );
};

export const FilterGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: '검색 필터 예시. 여러 개를 동시에 고를 수 있고, 묶음을 `role="group"` + `aria-label`로 감싼다.',
      },
    },
  },
  render: () => <FilterGroupDemo />,
};

const AppliedFiltersDemo = () => {
  const [filters, setFilters] = useState(['성수동', '주말', '2시간 이내']);
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', minHeight: 28 }}>
      {filters.map((name) => (
        <Chip
          key={name}
          size="sm"
          selected
          onRemove={() => setFilters((prev) => prev.filter((item) => item !== name))}
        >
          {name}
        </Chip>
      ))}
      {filters.length === 0 && <span style={{ fontSize: 'var(--font-size-100)' }}>적용된 필터 없음</span>}
    </div>
  );
};

export const Removable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '적용된 필터 목록 예시(제거형). × 버튼에만 "성수동 제거" 같은 이름이 붙고, 누르면 목록에서 빠진다.',
      },
    },
  },
  render: () => <AppliedFiltersDemo />,
};

export const Sizes: Story = {
  parameters: {
    docs: { description: { story: '`sm`은 적용된 필터 목록, `md`는 필터 선택 영역에 쓴다.' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <ToggleDemo {...asToggle(args)} size="sm" selected />
      <ToggleDemo {...asToggle(args)} size="md" selected />
      <ToggleDemo {...asToggle(args)} size="sm" />
      <ToggleDemo {...asToggle(args)} size="md" />
    </div>
  ),
};
