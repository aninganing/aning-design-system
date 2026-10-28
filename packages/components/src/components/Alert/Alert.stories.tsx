import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
화면 안에 자리를 차지하고 머무는 안내. 좌석 홀드 시간, 선택한 회차 마감, 환불 규정처럼 사용자가 읽고 판단해야 하는 정보에 쓴다.
잠깐 떴다 사라지는 결과 알림("저장했어요")은 Toast(추후)를 쓴다. 색은 \`@aninganing/tokens\`의 \`alert.*\` 컴포넌트 토큰을 소비한다.

### 톤
- **info** — 기본. 알고 있어야 할 진행 정보. accent 면.
- **neutral** — 규정·참고 정보. 옅은 회색 면.
- **danger** — 다시 골라야 하는 문제. 면은 칠하지 않고 danger 테두리와 아이콘으로 표시한다(빨간 면 위 빨간 본문은 대비 미달).
- success·warning은 대비를 맞출 색(green-700, amber)이 생긴 뒤 추가한다.

### 사용 기준
- 제목 한 문장으로 무슨 일인지 전달한다. 설명은 다음에 할 일이나 이유를 덧붙일 때만 쓴다.
- 오른쪽 \`action\`에는 Button \`size="sm"\`이나 링크 하나를 둔다.
- 특정 입력과 관련된 안내(예: 마감된 회차)는 Alert에 \`id\`를 주고 그 입력의 \`aria-describedby\`로 연결한다.

### 접근성
- 아이콘은 장식이라 \`aria-hidden\`이다. 의미는 제목이 전부 전달해야 한다.
- 처음부터 화면에 있는 안내는 live 영역이 아니다(\`live="off"\`, 기본).
- 폴링 결과처럼 나중에 나타나는 안내는 \`live\`를 준다 — info·neutral은 \`polite\`(\`role="status"\`), danger는 \`assertive\`(\`role="alert"\`).
  \`role="status"\`는 영역이 내용과 함께 새로 생기면 읽지 않는 스크린 리더가 있다. 놓치면 안 되는 안내는 \`assertive\`를 쓰거나,
  화면에 미리 둔 live 영역 하나에서 따로 알린다.
        `.trim(),
      },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['info', 'neutral', 'danger'],
      description: '안내의 성격.',
      table: { defaultValue: { summary: 'info' } },
    },
    title: { control: 'text', description: '핵심 문장. 의미는 제목이 전부 전달해야 한다.' },
    description: { control: 'text', description: '제목 아래 보충 설명.' },
    icon: { control: false, description: '아이콘 교체. 기본은 tone별 아이콘, `null`이면 없음.' },
    action: { control: false, description: '오른쪽 슬롯. Button `sm`이나 링크.' },
    live: {
      control: 'select',
      options: ['off', 'polite', 'assertive'],
      description: '나중에 나타날 때 알리는 방식. `polite` → `role="status"`, `assertive` → `role="alert"`.',
      table: { defaultValue: { summary: 'off' } },
    },
  },
  args: {
    title: '좌석을 10분 동안 잡아 둘게요',
    description: '시간 안에 결제하지 않으면 다른 분이 예약할 수 있어요.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  parameters: {
    docs: { description: { story: '진행 중에 알고 있어야 할 정보. 예: 좌석 홀드 시간.' } },
  },
};

export const Neutral: Story = {
  args: {
    tone: 'neutral',
    title: '환불 규정',
    description: '클래스 3일 전까지는 전액, 이후에는 환불되지 않아요.',
  },
  parameters: {
    docs: { description: { story: '규정·참고 정보. 판단에 필요하지만 급하지 않은 내용.' } },
  },
};

export const Danger: Story = {
  args: {
    tone: 'danger',
    title: '선택한 회차가 마감됐어요',
    description: '다른 회차를 골라 주세요.',
  },
  parameters: {
    docs: { description: { story: '사용자가 다시 골라야 하는 문제. 면은 칠하지 않고 테두리와 아이콘으로 표시한다.' } },
  },
};

export const TitleOnly: Story = {
  args: { description: undefined, title: '이 클래스는 만 14세 이상만 참여할 수 있어요', tone: 'neutral' },
  parameters: {
    docs: { description: { story: '설명 없이 제목 한 문장으로 충분한 경우.' } },
  },
};

export const WithAction: Story = {
  args: {
    tone: 'danger',
    title: '선택한 회차가 마감됐어요',
    description: undefined,
    action: (
      <Button variant="secondary" size="sm">
        다시 고르기
      </Button>
    ),
  },
  parameters: {
    docs: { description: { story: '바로 할 수 있는 일이 있을 때 오른쪽에 Button `sm` 하나를 둔다.' } },
  },
};

export const WithoutIcon: Story = {
  args: { icon: null, tone: 'neutral' },
  parameters: {
    docs: { description: { story: '좁은 자리에서 아이콘 없이. 의미는 원래 제목이 전달하므로 빠져도 정보가 줄지 않는다.' } },
  },
};

export const Live: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '나중에 나타나는 안내. "마감 확인"을 누르면 `live="assertive"`인 danger Alert가 나타나 스크린 리더가 바로 읽는다.',
      },
    },
  },
  render: function Render() {
    const [closed, setClosed] = useState(false);
    return (
      <div style={{ display: 'grid', gap: 'var(--space-3)', justifyItems: 'start' }}>
        <Button variant="secondary" size="sm" onClick={() => setClosed((value) => !value)}>
          {closed ? '초기화' : '마감 확인'}
        </Button>
        {closed && (
          <Alert
            tone="danger"
            live="assertive"
            title="선택한 회차가 마감됐어요"
            description="다른 회차를 골라 주세요."
            style={{ width: '100%' }}
          />
        )}
      </div>
    );
  },
};
