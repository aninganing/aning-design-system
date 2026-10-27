import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Field } from './Field';

const meta: Meta<typeof Field.Root> = {
  title: 'Components/Field',
  component: Field.Root,
  subcomponents: {
    'Field.Label': Field.Label,
    'Field.Control': Field.Control,
    'Field.Helper': Field.Helper,
    'Field.Error': Field.Error,
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
라벨, 헬퍼 텍스트, 에러 메시지를 입력 컨트롤 하나와 묶는 래퍼. \`Input\`, \`Textarea\`, 네이티브 \`<select>\`가 모두 이 안에
들어가 같은 간격과 연결 규칙을 쓴다. 색은 \`@aninganing/tokens\`의 \`field.*\` 컴포넌트 토큰을 소비한다.

### 구성
- **\`Field.Root\`** — \`required\` · \`optional\` · \`invalid\` · \`fullWidth\`. id를 만들어 아래 조각들에 내려준다.
- **\`Field.Label\`** — 컨트롤과 \`for\`로 연결된 라벨. 필수면 \`*\`, 선택이면 "(선택)"이 붙는다.
- **\`Field.Control\`** — 자식 컨트롤 하나에 \`id\`, \`aria-describedby\`, \`aria-invalid\`, \`required\`를 얹는다. 컨트롤에 \`id\`를
  직접 주지 않는다.
- **\`Field.Helper\`** — 도움말. 에러가 보이는 동안에는 숨는다.
- **\`Field.Error\`** — \`invalid\`일 때만 보이는 에러 메시지. 내용이 비어 있으면 그리지 않는다.

### 사용 기준
- 필드 사이 간격은 폼 쪽에서 \`space-4\`로 준다. Field는 자기 안쪽 간격(\`space-1\`)만 갖는다.
- 기본 최대 너비는 320px이다. 모달·사이드 패널처럼 폭이 정해진 곳에서는 \`fullWidth\`로 푼다.
- \`Textarea\`를 넣을 때는 \`Field.Helper\` 대신 Textarea의 \`description\`을 쓴다 — 글자 수 카운터와 같은 줄에 놓이고,
  설명 연결은 Textarea가 맡는다. \`Field.Error\`는 그대로 쓴다.

### 접근성
- 라벨은 \`label[for]\`로, 헬퍼·에러는 \`aria-describedby\`로 컨트롤에 연결된다. 보이는 것만 연결한다.
- 필수 표시 \`*\`는 스크린 리더에 숨기고, 대신 컨트롤의 네이티브 \`required\`가 "필수"로 읽힌다.
- 에러 메시지는 live 영역이 아니다. 제출에 실패하면 첫 에러 필드로 포커스를 옮겨 설명으로 읽히게 한다(React Hook Form의
  \`shouldFocusError\` 기본값).
        `.trim(),
      },
    },
  },
  argTypes: {
    required: {
      control: 'boolean',
      description: '필수 입력. 라벨에 `*`(스크린 리더에는 숨김), 컨트롤에 `required`.',
      table: { defaultValue: { summary: 'false' } },
    },
    optional: {
      control: 'boolean',
      description: '선택 입력. 라벨에 "(선택)". `required`와 함께 쓰지 않는다.',
      table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
      control: 'boolean',
      description: '에러 상태. `Field.Error`가 보이고 헬퍼는 숨으며 컨트롤에 `aria-invalid`가 걸린다.',
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: '기본 최대 너비(320px)를 풀고 부모 너비를 채운다.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>예약자 이름</Field.Label>
      <Field.Control>
        <Input placeholder="홍길동" />
      </Field.Control>
      <Field.Helper>실명으로 입력해 주세요</Field.Helper>
      <Field.Error>이름을 입력해 주세요</Field.Error>
    </Field.Root>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Field.Root>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: '라벨 + 입력 + 도움말의 기본 조합.' } },
  },
};

export const Required: Story = {
  args: { required: true },
  parameters: {
    docs: {
      description: {
        story: '필수 입력. `*`는 눈으로만 보이고, 스크린 리더는 컨트롤의 `required`로 "필수"를 읽는다.',
      },
    },
  },
};

export const Optional: Story = {
  args: { optional: true },
  parameters: {
    docs: {
      description: { story: '대부분이 필수인 폼에서 예외인 항목. 라벨에 "(선택)"이 붙는다.' },
    },
  },
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>요청 사항</Field.Label>
      <Field.Control>
        <Input />
      </Field.Control>
    </Field.Root>
  ),
};

export const Invalid: Story = {
  args: { required: true, invalid: true },
  parameters: {
    docs: {
      description: {
        story: '검증에 실패한 상태. 헬퍼 대신 에러 메시지가 보이고, 컨트롤이 에러 테두리가 되며 설명으로 에러를 읽는다.',
      },
    },
  },
};

export const WithTextarea: Story = {
  args: { optional: true },
  parameters: {
    docs: {
      description: {
        story:
          'Textarea를 넣은 예시. 도움말은 `Field.Helper` 대신 Textarea의 `description`으로 둬서 글자 수 카운터와 한 줄에 놓는다. 라벨·필수·에러는 Field가 맡는다.',
      },
    },
  },
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>호스트에게 남길 말</Field.Label>
      <Field.Control>
        <Textarea maxLength={200} placeholder="알레르기, 준비물 문의 등" description="호스트에게 그대로 전달돼요" />
      </Field.Control>
      <Field.Error>200자 이내로 입력해 주세요</Field.Error>
    </Field.Root>
  ),
};

export const WithNativeSelect: Story = {
  args: { required: true },
  parameters: {
    docs: {
      description: {
        story:
          '네이티브 `<select>`도 `Field.Control`로 연결된다. 스타일이 입혀진 `Select` 컴포넌트는 따로 추가될 예정이다.',
      },
    },
  },
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>지역</Field.Label>
      <Field.Control>
        <select defaultValue="">
          <option value="" disabled>
            지역을 선택해 주세요
          </option>
          <option value="seongsu">성수</option>
          <option value="hapjeong">합정</option>
        </select>
      </Field.Control>
    </Field.Root>
  ),
};

export const FormExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '예약자 정보 폼 예시. 필드 사이 간격은 폼이 `space-4`로 준다. 비워 둔 채 "다음"을 누르면 에러가 보이고 첫 에러 필드로 포커스가 간다.',
      },
    },
  },
  render: function Render() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const nameInvalid = submitted && name.trim() === '';
    const phoneInvalid = submitted && phone.trim() === '';

    return (
      <form
        noValidate
        style={{ display: 'grid', gap: 'var(--space-4)', maxWidth: 320 }}
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          const form = event.currentTarget;
          // 첫 에러 필드로 포커스(React Hook Form의 shouldFocusError와 같은 동작)
          requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
        }}
      >
        <Field.Root required invalid={nameInvalid}>
          <Field.Label>예약자 이름</Field.Label>
          <Field.Control>
            <Input value={name} onChange={(event) => setName(event.target.value)} />
          </Field.Control>
          <Field.Helper>실명으로 입력해 주세요</Field.Helper>
          <Field.Error>이름을 입력해 주세요</Field.Error>
        </Field.Root>
        <Field.Root required invalid={phoneInvalid}>
          <Field.Label>연락처</Field.Label>
          <Field.Control>
            <Input type="tel" inputMode="numeric" value={phone} onChange={(event) => setPhone(event.target.value)} />
          </Field.Control>
          <Field.Helper>예약 안내 문자를 보내드려요</Field.Helper>
          <Field.Error>연락처를 입력해 주세요</Field.Error>
        </Field.Root>
        <Field.Root optional>
          <Field.Label>요청 사항</Field.Label>
          <Field.Control>
            <Textarea maxLength={200} />
          </Field.Control>
        </Field.Root>
        <Button type="submit">다음</Button>
      </form>
    );
  },
};
