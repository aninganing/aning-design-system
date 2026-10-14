import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
데이터를 불러오는 동안 실제 레이아웃 자리를 잡아두는 플레이스홀더. 목록·상세 로딩에 쓰고, Card처럼 실제
컴포넌트와 같은 구조로 조합한다. 색상은 \`@aninganing/tokens\`의 \`skeleton.*\` 컴포넌트 토큰을 소비한다.

### 사용 기준
- 실제 콘텐츠와 **같은 크기·모양**으로 그려 데이터가 들어올 때 레이아웃이 밀리지 않게(CLS) 한다.
- 로딩이 짧아(대략 300ms 이하) 깜빡이기만 한다면 스켈레톤을 생략하는 편이 낫다.
- 진행률을 알 수 있는 작업(업로드 등)에는 스켈레톤 대신 진행 표시를 쓴다.

### 색
바탕은 \`color-bg-muted\`(라이트 gray-100, 다크 gray-800)다. \`color-bg-subtle\`(gray-50)은 흰 배경에서 거의
보이지 않아(1.04:1) 쓰지 않는다. shimmer 하이라이트는 \`color-bg-muted-highlight\`를 반투명하게 섞는다.

### 접근성
- 스켈레톤 자체는 \`aria-hidden\`이다. 스크린 리더가 의미 없는 빈 요소를 읽지 않게 한다.
- 대신 **감싸는 영역**에 \`aria-busy="true"\`와 "클래스 목록 불러오는 중" 같은 라벨을 준다. 로딩이 끝나면
  \`aria-busy\`를 지운다.
- \`prefers-reduced-motion\`에서는 shimmer가 멈추고 바탕만 보인다.
        `.trim(),
      },
    },
  },
  argTypes: {
    shape: {
      control: 'select',
      options: ['text', 'rect', 'circle'],
      description: '자리를 잡을 요소의 모양.',
      table: { defaultValue: { summary: 'text' } },
    },
    width: { control: 'text', description: '너비. 숫자는 px, 문자열은 CSS 값.' },
    height: { control: 'text', description: '높이. 숫자는 px, 문자열은 CSS 값.' },
    lines: {
      control: { type: 'number', min: 1, max: 6 },
      description: '`shape="text"`일 때 줄 수. 마지막 줄은 60% 너비.',
      table: { defaultValue: { summary: '1' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: { shape: 'text', width: 240 },
  parameters: {
    docs: { description: { story: '글자 한 줄. 높이는 본문 글자 크기(14px).' } },
  },
};

export const MultiLine: Story = {
  args: { shape: 'text', lines: 3, width: 280 },
  parameters: {
    docs: { description: { story: '문단 자리. 마지막 줄을 짧게 그려 실제 문단처럼 보이게 한다.' } },
  },
};

export const Rect: Story = {
  args: { shape: 'rect', width: 260, height: 195 },
  parameters: {
    docs: { description: { story: '이미지·미디어 자리. 실제 요소와 같은 비율로 그린다.' } },
  },
};

export const Circle: Story = {
  args: { shape: 'circle', width: 40 },
  parameters: {
    docs: { description: { story: '아바타 자리. `width`만 주면 같은 높이의 원이 된다.' } },
  },
};

export const CardLoading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`Card`와 같은 구조로 조합한 목록 로딩 예시. 감싸는 영역에 `aria-busy`와 라벨을 주고, 카드 자체는 `aria-hidden`으로 숨긴다. 미디어는 Card와 같은 4:3 비율이라 데이터가 들어와도 높이가 바뀌지 않는다.',
      },
    },
  },
  render: () => (
    <section
      aria-busy="true"
      aria-label="클래스 목록 불러오는 중"
      style={{ display: 'flex', gap: 'var(--space-4)' }}
    >
      {[0, 1].map((key) => (
        <Card key={key} aria-hidden="true" style={{ width: 260 }}>
          <Card.Media>
            <Skeleton shape="rect" height="100%" style={{ borderRadius: 0 }} />
          </Card.Media>
          <Card.Body>
            <Skeleton width="80%" height={18} />
            <Skeleton width="55%" />
            <Skeleton width="40%" height={22} style={{ marginTop: 'var(--space-2)' }} />
          </Card.Body>
        </Card>
      ))}
    </section>
  ),
};
