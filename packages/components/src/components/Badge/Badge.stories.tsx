import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
목록과 상세에서 상태나 속성을 짧게 표시하는 라벨. **클릭되지 않는다** — 누르면 선택·제거되는 요소가
필요하면 Chip을 쓴다. 색상은 \`@aninganing/tokens\`의 \`badge.*\` 컴포넌트 토큰을 소비한다.

모서리는 \`radius-sm\`이다. 누를 수 있는 알약형(Chip, \`radius-full\`)과 모양으로 구분해, 눌리지 않는
요소임을 알린다.

### 언제 어떤 tone을 쓰나
- **neutral** — 소요 시간, 카테고리, 인원 같은 속성.
- **accent** — 신규 오픈, 할인처럼 눈에 띄어야 하는 정보.
- **success** — 예약 확정처럼 완료·정상 상태.
- **danger** — 마감 임박, 취소처럼 주의가 필요한 상태.

경고(warning) 톤은 아직 없다. 필요하면 amber 계열 core 색부터 추가한다.

### 톤마다 표현이 다른 이유 (대비)
현재 팔레트로 두 테마 모두 글자 대비 4.5:1을 맞추기 위해 톤마다 표현을 다르게 했다.
- **success**는 초록 글자 대신 neutral 바탕에 **초록 점 + 기본 글자색**으로 표현한다. 초록 글자는 흰 배경
  대비가 부족하다(green-600 3.3:1).
- **danger**는 연한 바탕 대신 **채움 + 반전 글자**로 표현한다. red-600 on red-50은 4.2:1로 부족하다.
- **accent** 글자는 다크 테마에서 \`color-text-accent\`(blue-300)로 바뀐다. blue-500 on blue-900은 2.8:1이다.

### 접근성
- \`<span>\`을 렌더링하며 포커스를 받지 않는다.
- success의 점은 장식이라 \`aria-hidden\`이다. 상태는 **글자로** 전달하고, 색이나 점에만 의미를 담지 않는다.
- 숫자만 있는 뱃지(예: "3")는 무엇의 개수인지 주변 텍스트나 \`aria-label\`로 알려준다.
        `.trim(),
      },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'accent', 'success', 'danger'],
      description: '라벨의 의미와 색. 위 "언제 어떤 tone을 쓰나" 참고.',
      table: { defaultValue: { summary: 'neutral' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: '라벨 높이 프리셋. `sm` 18px, `md` 22px.',
      table: { defaultValue: { summary: 'md' } },
    },
  },
  args: {
    children: '2시간',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {
  args: { tone: 'neutral', children: '2시간' },
  parameters: {
    docs: { description: { story: '소요 시간, 카테고리 같은 속성. 가장 많이 쓰는 기본 톤.' } },
  },
};

export const Accent: Story = {
  args: { tone: 'accent', children: '신규 오픈' },
  parameters: {
    docs: {
      description: {
        story: '눈에 띄어야 하는 정보. 다크 테마에서 글자가 blue-300으로 바뀌어 대비를 유지한다.',
      },
    },
  },
};

export const Success: Story = {
  args: { tone: 'success', children: '예약 확정' },
  parameters: {
    docs: {
      description: { story: '완료·정상 상태. 초록 글자 대신 초록 점과 기본 글자색으로 표현한다.' },
    },
  },
};

export const Danger: Story = {
  args: { tone: 'danger', children: '마감 임박' },
  parameters: {
    docs: { description: { story: '주의가 필요한 상태. 채움 + 반전 글자로 대비를 확보한다.' } },
  },
};

export const Tones: Story = {
  parameters: {
    docs: { description: { story: '네 가지 톤을 한 화면에서 비교. 테마를 바꿔 다크 테마 표현도 확인한다.' } },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge {...args} tone="neutral">
        2시간
      </Badge>
      <Badge {...args} tone="accent">
        신규 오픈
      </Badge>
      <Badge {...args} tone="success">
        예약 확정
      </Badge>
      <Badge {...args} tone="danger">
        마감 임박
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '`sm`은 카드 메타 줄처럼 좁은 곳에, `md`는 썸네일 위나 제목 옆처럼 독립적으로 쓸 때.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge {...args} size="sm" tone="neutral">
        원데이
      </Badge>
      <Badge {...args} size="sm" tone="accent">
        20% 할인
      </Badge>
      <Badge {...args} size="md" tone="neutral">
        원데이
      </Badge>
      <Badge {...args} size="md" tone="accent">
        20% 할인
      </Badge>
    </div>
  ),
};
