import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
여러 항목을 독립적으로 고르는 선택 컨트롤. 검색 필터 시트의 다중 선택, 약관 동의에 쓴다. 색상은
\`@aninganing/tokens\`의 \`checkbox.*\` 컴포넌트 토큰을 소비한다.

### 언제 쓰나
- 여러 개를 동시에 고를 때. 하나만 고르면 Radio를 쓴다.
- 저장·제출 버튼을 눌러야 반영되는 폼. 누르는 즉시 적용되는 설정은 Switch를 쓴다.
- 검색 결과 위의 빠른 필터처럼 가로로 늘어놓는 선택은 Chip이 더 적합하다.

### 상태 관리
네이티브 \`<input type="checkbox">\`라 \`defaultChecked\`(uncontrolled)와 \`checked\` + \`onCheckedChange\`
(controlled)를 모두 쓸 수 있다. 폼 제출 시 \`name\`/\`value\`도 그대로 전송된다.

### 접근성
- 네이티브 체크박스를 시각적으로만 숨기고 옆 요소로 그린다. 키보드(Space), 폼 제출, 스크린 리더 동작은 네이티브
  그대로다.
- \`label\`이 체크박스의 이름이 되고, 라벨을 눌러도 토글된다. \`description\`은 \`aria-describedby\`로 연결된다.
- \`indeterminate\`는 스크린 리더에 "혼합(mixed)"으로 전달된다.
- 해제 상태 테두리는 \`color-border-control\`(gray-500)이다. 흰 배경 대비 4.8:1로, 조작 요소 경계 기준(3:1)을
  두 테마 모두 넘는다. \`color-border-default\`(1.3:1)는 조작 요소 경계에 쓰지 않는다.
- 여러 체크박스는 \`CheckboxGroup\`(\`fieldset\` + \`legend\`)으로 묶어 무엇을 고르는지 알린다.
        `.trim(),
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: '체크박스 옆 라벨. 체크박스의 접근 가능한 이름이 된다.' },
    description: {
      control: 'text',
      description: '라벨 아래 보충 설명. `aria-describedby`로 연결된다.',
    },
    indeterminate: {
      control: 'boolean',
      description: '일부만 선택된 상태. "전체 선택" 체크박스에 쓴다.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: '고를 수 없는 항목.',
    },
    defaultChecked: {
      control: 'boolean',
      description: '처음 체크 상태(uncontrolled).',
    },
  },
  args: {
    label: '공예',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: '기본 체크박스. 라벨을 눌러도 토글된다.' } },
  },
};

export const Checked: Story = {
  args: { defaultChecked: true },
  parameters: {
    docs: { description: { story: '선택된 상태. accent 채움 + 반전색 체크.' } },
  },
};

export const WithDescription: Story = {
  args: { label: '마케팅 알림 받기', description: '새 클래스와 할인 소식을 알림으로 받는다' },
  parameters: {
    docs: {
      description: { story: '라벨만으로 부족할 때 설명을 붙인다. 스크린 리더에는 설명으로 함께 읽힌다.' },
    },
  },
};

export const Indeterminate: Story = {
  args: { label: '전체 선택', indeterminate: true },
  parameters: {
    docs: { description: { story: '하위 항목이 일부만 선택된 "전체 선택" 체크박스. 체크 대신 가로줄.' } },
  },
};

export const Disabled: Story = {
  args: { label: '마감된 클래스 포함', disabled: true },
  parameters: {
    docs: { description: { story: '지금은 고를 수 없는 항목. 박스와 라벨이 함께 흐려진다.' } },
  },
};

const SelectAllDemo = () => {
  const options = ['공예', '요리·베이킹', '운동', '음악'];
  const [selected, setSelected] = useState<string[]>(['공예']);
  const all = selected.length === options.length;
  const some = selected.length > 0 && !all;

  return (
    <CheckboxGroup legend="클래스 유형">
      <Checkbox
        label="전체 선택"
        checked={all}
        indeterminate={some}
        onCheckedChange={() => setSelected(all ? [] : options)}
      />
      {options.map((option) => (
        <Checkbox
          key={option}
          label={option}
          checked={selected.includes(option)}
          onCheckedChange={(on) =>
            setSelected((prev) => (on ? [...prev, option] : prev.filter((item) => item !== option)))
          }
        />
      ))}
    </CheckboxGroup>
  );
};

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`CheckboxGroup`으로 묶은 필터 예시. "전체 선택"은 하위 항목이 일부만 선택되면 indeterminate가 되고, 누르면 모두 선택/해제된다.',
      },
    },
  },
  render: () => <SelectAllDemo />,
};
