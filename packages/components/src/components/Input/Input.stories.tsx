import type { Meta, StoryObj } from '@storybook/react';
import { CheckIcon, IconBase } from '@aninganing/icons';
import { Input } from './Input';

// 아이콘 패키지에 아직 검색 아이콘이 없어 스토리 전용으로 IconBase 위에 그린다.
const SearchIcon = () => (
  <IconBase>
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </IconBase>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
텍스트 입력을 받는 기본 폼 컨트롤. 색상/간격/폰트는 \`@aninganing/tokens\`의 \`input.*\` 컴포넌트
토큰을 통해 소비한다.

### 사용 기준
- 라벨이 시각적으로 없다면 반드시 \`aria-label\`이나 \`aria-labelledby\`를 지정한다.
- 에러 메시지 자체는 이 컴포넌트가 렌더링하지 않는다 — 별도 헬퍼 텍스트 요소와 \`error\` prop을
  함께 쓴다.

### 접근성
- 네이티브 \`<input>\`을 렌더링하므로 별도 ARIA role이 필요 없다.
- \`error\`가 true면 \`aria-invalid="true"\`가 자동으로 설정된다.

### leading / trailing
- 입력 필드 앞뒤에 아이콘이나 텍스트(접두/접미어, 단위)를 붙일 수 있다. 테두리는 바깥 래퍼가
  그리므로 이 요소들은 입력창 안쪽에 놓인 것처럼 보인다.
- \`className\`/\`style\`은 래퍼에, 나머지 props와 \`ref\`는 내부 \`<input>\`에 적용된다.
- 장식용 아이콘은 \`aria-hidden\`으로 숨긴다 (\`@aninganing/icons\`는 기본값이 \`aria-hidden\`).
  \`https://\`처럼 의미가 있는 텍스트라면 라벨에도 그 의미를 반영한다.
        `.trim(),
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '입력창 높이/패딩/폰트 크기 프리셋.',
      table: { defaultValue: { summary: 'md' } },
    },
    error: {
      control: 'boolean',
      description: '에러 상태. 테두리 색상이 바뀌고 aria-invalid가 설정된다.',
      table: { defaultValue: { summary: 'false' } },
    },
    leading: {
      control: false,
      description: '입력 필드 앞에 붙는 아이콘/텍스트.',
    },
    trailing: {
      control: false,
      description: '입력 필드 뒤에 붙는 아이콘/텍스트.',
    },
  },
  args: {
    placeholder: '입력하세요',
    'aria-label': 'Example input',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: '기본 상태.' } },
  },
};

export const ErrorState: Story = {
  name: 'Error',
  args: { error: true },
  parameters: {
    docs: { description: { story: '유효성 검증 실패 등 에러 상태.' } },
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: { description: { story: '입력 불가능한 상태.' } },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: { description: { story: '세 가지 크기 프리셋을 한 화면에서 비교.' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 240 }}>
      <Input {...args} size="sm" />
      <Input {...args} size="md" />
      <Input {...args} size="lg" />
    </div>
  ),
};

export const WithLeadingIcon: Story = {
  args: { leading: <SearchIcon />, placeholder: '검색', 'aria-label': '검색' },
  parameters: {
    docs: { description: { story: '앞에 장식용 아이콘을 붙인 검색 입력창.' } },
  },
};

export const WithTrailingIcon: Story = {
  args: { trailing: <CheckIcon />, defaultValue: 'aning', 'aria-label': '사용자 이름' },
  parameters: {
    docs: { description: { story: '뒤에 상태 아이콘(사용 가능 표시 등)을 붙인 입력창.' } },
  },
};

export const WithText: Story = {
  parameters: {
    docs: {
      description: { story: '접두어(`https://`)와 단위(`원`, `kg`) 같은 텍스트를 붙인 예시.' },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
      <Input {...args} leading="https://" placeholder="example.com" aria-label="웹사이트 주소" />
      <Input {...args} trailing="원" placeholder="0" inputMode="numeric" aria-label="금액" />
      <Input
        {...args}
        leading="₩"
        trailing="/ 월"
        placeholder="0"
        inputMode="numeric"
        aria-label="월 구독료"
      />
    </div>
  ),
};

export const AdornmentSizes: Story = {
  parameters: {
    docs: { description: { story: 'leading/trailing이 붙은 상태에서 세 가지 크기 비교.' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 240 }}>
      <Input {...args} size="sm" leading={<SearchIcon />} trailing="kg" />
      <Input {...args} size="md" leading={<SearchIcon />} trailing="kg" />
      <Input {...args} size="lg" leading={<SearchIcon />} trailing="kg" />
    </div>
  ),
};

export const AdornmentStates: Story = {
  parameters: {
    docs: { description: { story: 'leading/trailing과 error·disabled 상태의 조합.' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 240 }}>
      <Input {...args} error leading={<SearchIcon />} />
      <Input {...args} disabled leading={<SearchIcon />} trailing="kg" />
    </div>
  ),
};
