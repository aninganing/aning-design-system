import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
여러 줄 텍스트 입력. 예약 요청사항, 후기 작성에 쓴다. Input과 같은 필드 모양이며, \`textarea.*\` 컴포넌트
토큰은 \`input.*\` 토큰을 참조해 Input과 함께 바뀐다.

### 구성
- 입력창 아래 줄 왼쪽에 \`description\`(도움말), 오른쪽에 \`maxLength\` 카운터("22 / 200")를 둔다.
- 높이는 \`height\`(기본 96px)로 정한다. 사용자가 손잡이로 높이를 바꿀 수는 없고, 내용이 넘치면 스크롤된다.
- \`autoResize\`를 켜면 \`height\`가 최소 높이가 되어 내용에 맞춰 늘고, \`maxRows\`를 넘으면 스크롤된다.
- \`className\`/\`style\`은 바깥 래퍼에, 나머지 props와 \`ref\`는 \`<textarea>\`에 적용된다(Input과 같음).

### 접근성
- 라벨은 사용하는 쪽에서 \`<label htmlFor>\` 또는 \`aria-label\`로 붙인다.
- 도움말과 카운터는 \`aria-describedby\`로 연결된다.
- 카운터는 매 글자마다 읽히지 않도록 live 영역이 아니다. 한도에 닿았을 때만 화면에 보이지 않는 live 영역이
  "최대 N자까지 입력할 수 있어요"를 알린다.
- \`error\`면 \`aria-invalid="true"\`가 설정된다. 에러 메시지는 \`description\`이나 별도 텍스트로 보여준다.
        `.trim(),
      },
    },
  },
  argTypes: {
    error: {
      control: 'boolean',
      description: '에러 상태. 테두리 색상이 바뀌고 aria-invalid가 설정된다.',
      table: { defaultValue: { summary: 'false' } },
    },
    description: { control: 'text', description: '입력창 아래 왼쪽의 도움말.' },
    maxLength: { control: 'number', description: '최대 글자 수. 지정하면 카운터가 보인다.' },
    showCount: {
      control: 'boolean',
      description: '`maxLength`가 있을 때 카운터를 보여줄지.',
      table: { defaultValue: { summary: 'true' } },
    },
    height: {
      control: 'text',
      description: '입력창 높이. 숫자는 px, 문자열은 CSS 값. `autoResize`면 최소 높이.',
      table: { defaultValue: { summary: '96' } },
    },
    autoResize: {
      control: 'boolean',
      description: '내용에 맞춰 높이를 늘린다.',
      table: { defaultValue: { summary: 'false' } },
    },
    maxRows: { control: 'number', description: '`autoResize`일 때 최대 줄 수.' },
    disabled: { control: 'boolean', description: '입력 불가능한 상태.' },
  },
  args: {
    'aria-label': '요청사항',
    placeholder: '호스트에게 전할 요청사항을 적어주세요',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: '기본 상태. 높이 96px로 고정되고, 내용이 넘치면 스크롤된다.' } },
  },
};

export const WithCounter: Story = {
  args: {
    maxLength: 200,
    description: '호스트에게 그대로 전달돼요.',
    defaultValue: '왼손잡이라 물레 위치 조정이 필요해요.',
  },
  parameters: {
    docs: {
      description: {
        story: '도움말과 카운터를 한 줄에 둔다. 한도에 닿으면 카운터가 danger 색으로 바뀌고 한 번 안내된다.',
      },
    },
  },
};

export const AtLimit: Story = {
  args: { maxLength: 20, defaultValue: '이십 자를 꽉 채운 요청사항이에요 네' },
  parameters: {
    docs: { description: { story: '한도에 닿은 상태. 카운터가 danger 색으로 바뀐다.' } },
  },
};

export const Height: Story = {
  args: { height: 160, placeholder: '후기를 자세히 적어주세요' },
  parameters: {
    docs: { description: { story: '긴 글을 받을 때 `height`로 높이를 키운다. 손잡이로는 바꿀 수 없다.' } },
  },
};

export const AutoResize: Story = {
  args: { autoResize: true, maxRows: 6, placeholder: '여러 줄을 입력하면 96px부터 늘어나요 (최대 6줄)' },
  parameters: {
    docs: {
      description: { story: '후기처럼 길이를 예상하기 어려운 입력. 6줄까지 늘어나고 그 뒤로는 스크롤된다.' },
    },
  },
};

export const ErrorState: Story = {
  name: 'Error',
  args: { error: true, description: '요청사항을 10자 이상 적어주세요.' },
  parameters: {
    docs: { description: { story: '유효성 검증 실패. 에러 메시지는 description으로 함께 보여준다.' } },
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '예약이 확정되어 수정할 수 없어요.' },
  parameters: {
    docs: { description: { story: '입력 불가능한 상태.' } },
  },
};

const ControlledDemo = () => {
  const [review, setReview] = useState('');
  return (
    <Textarea
      aria-label="후기"
      placeholder="수업은 어떠셨나요?"
      value={review}
      onChange={(event) => setReview(event.target.value)}
      maxLength={300}
      autoResize
      maxRows={8}
      description={review.length < 10 ? '10자 이상 적어주세요.' : '좋아요!'}
    />
  );
};

export const Controlled: Story = {
  parameters: {
    docs: { description: { story: '후기 작성 예시(controlled). 값에 따라 도움말을 바꾼다.' } },
  },
  render: () => <ControlledDemo />,
};
