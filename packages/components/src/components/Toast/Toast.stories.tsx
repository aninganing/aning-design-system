import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Toaster, toast } from './Toast';
import { resetToasts } from './toastStore';

const HeartIcon = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path
      d="M10 16.5s-6-3.6-6-8A3.5 3.5 0 0 1 10 6a3.5 3.5 0 0 1 6 2.5c0 4.4-6 8-6 8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

// 설명 안 코드 블록(```)은 Storybook이 문법 강조를 늦게 불러와 처음엔 비어 있다가 채워지며 레이아웃이 밀린다 — 인라인 코드로 쓴다.
const meta: Meta<typeof Toaster> = {
  title: 'Components/Toast',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
화면 아래에 잠깐 떴다 사라지는 결과 알림. "찜 목록에 담았어요"처럼 방금 일어난 일을 알려 주고, **놓쳐도 문제없는 정보에만** 쓴다.
놓치면 안 되는 정보는 \`Alert\`나 \`Dialog\`로 보낸다. Radix Toast 위에 \`@aninganing/tokens\`의 \`toast.*\` 토큰으로 모양만 입혔다.

### 사용법
- 앱 루트에 \`<Toaster />\`를 한 번 두고, 어디서든 \`toast()\`를 부른다: \`import { Toaster, toast } from '@aninganing/react'\`
- 기본: \`toast({ message: '찜 목록에 담았어요' })\`
- 액션: \`toast({ message: '찜 목록에서 뺐어요', action: { label: '되돌리기', onClick: undo } })\`
- 직접 닫기: \`const id = toast({ message: '업로드 중이에요', duration: Infinity })\` → \`toast.dismiss(id)\`
- \`toast()\` 옵션: \`message\`, \`icon\`, \`action: { label, onClick, altText? }\`, \`duration\`(기본 5초, action이 있으면 8초).
- 한 번에 최대 3개까지 보이고 새 토스트가 아래에 쌓인다. 넘치면 가장 오래된 것부터 닫힌다.
- \`<Toaster />\`가 여러 개 마운트돼도 먼저 마운트된 하나만 토스트를 그린다.
- 하단 고정 CTA가 있는 화면에서는 \`<Toaster offset={CTA 높이} />\`로 CTA 위에 띄운다.

### 사용 기준
- 성공·실패를 색으로 나누지 않는다(톤 없음). 문구로 전달한다: "저장하지 못했어요. 다시 시도해 주세요".
- 액션은 하나만, 되돌리기처럼 바로 할 수 있는 일에만 둔다.

### 접근성
- 메시지는 숨긴 live 영역(\`role="status"\`, polite)으로 읽힌다. 화면에 넣기만 하면 되고 포커스는 옮기지 않는다.
- 마우스를 올리거나 포커스가 안에 있으면 타이머가 멈춘다(WCAG 2.2.1). F8로 토스트 영역에 들어가고, Esc로 닫는다.
- 액션 버튼에 포커스를 자동으로 옮기지 않는다 — 하던 입력을 끊지 않기 위해서. 토스트는 사라지므로 같은 일을 하는 다른
  방법을 \`altText\`로 알려 준다.
- 모션 감소 설정이면 슬라이드 없이 페이드만 한다.
        `.trim(),
      },
    },
  },
  argTypes: {
    offset: {
      control: 'number',
      description: '화면 아래에서 더 띄울 거리(px 또는 CSS 길이). 하단 고정 CTA 높이만큼.',
      table: { defaultValue: { summary: '0' } },
    },
    label: {
      control: 'text',
      description: '토스트 영역 이름. F8로 이동할 때 "알림 (F8)"처럼 읽힌다.',
      table: { defaultValue: { summary: '알림' } },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Basic: Story = {
  parameters: {
    docs: { description: { story: '기본 토스트. 5초 뒤에 사라지고, 마우스를 올리면 멈춘다.' } },
  },
  render: () => <Button onClick={() => toast({ message: '찜 목록에 담았어요' })}>찜하기</Button>,
};

export const WithIcon: Story = {
  parameters: {
    docs: { description: { story: '앞쪽 아이콘. 글자와 같은 색(`currentColor`)이고 스크린 리더에는 숨겨진다.' } },
  },
  render: () => (
    <Button onClick={() => toast({ message: '찜 목록에 담았어요', icon: <HeartIcon /> })}>찜하기</Button>
  ),
};

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story: '되돌리기 액션. 액션이 있으면 8초 동안 보인다. 버튼에 포커스가 자동으로 가지 않는다.',
      },
    },
  },
  render: () => (
    <Button
      variant="secondary"
      onClick={() =>
        toast({
          message: '찜 목록에서 뺐어요',
          action: {
            label: '되돌리기',
            onClick: () => toast({ message: '다시 담았어요' }),
            altText: '찜 목록은 마이페이지에서 다시 담을 수 있어요',
          },
        })
      }
    >
      찜 해제
    </Button>
  ),
};

export const Stack: Story = {
  parameters: {
    docs: {
      description: { story: '여러 번 누르면 아래에 쌓이고, 4번째부터는 가장 오래된 것이 닫혀 최대 3개만 보인다.' },
    },
  },
  render: function Render() {
    const count = useRef(0);
    return (
      <Button
        variant="secondary"
        onClick={() => {
          count.current += 1;
          toast({ message: `${count.current}번째 알림이에요` });
        }}
      >
        알림 쌓기
      </Button>
    );
  },
};

export const WithOffset: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          '하단 고정 CTA가 있는 화면. `offset`으로 CTA 높이(72px)만큼 띄워 버튼을 가리지 않는다. 이 Docs 페이지에서는 먼저 마운트된 다른 스토리의 Toaster가 토스트를 그려 offset이 적용되지 않으므로, 단독 스토리 화면에서 확인한다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster offset={72} />
      </>
    ),
  ],
  render: () => (
    <div style={{ minHeight: 320, position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          left: 0,
          padding: 'var(--space-3) var(--space-4)',
          borderTop: '1px solid var(--color-border-default)',
        }}
      >
        <Button style={{ width: '100%' }} onClick={() => toast({ message: '인원을 2명으로 맞췄어요' })}>
          예약하기
        </Button>
      </div>
    </div>
  ),
};

// 토스트가 떠 있는 모양을 고정해서 보여준다. 타이머가 없도록 duration을 Infinity로 둔다.
// 렌더 effect는 Storybook이 스토리를 다시 그릴 때(테마 전환 등) 겹쳐 실행되므로, 그린 뒤 한 번 도는 play에서 목록을 비우고 띄운다.
export const Shown: Story = {
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
  render: () => <div style={{ minHeight: 240 }} />,
  play: () => {
    resetToasts();
    toast({ message: '찜 목록에 담았어요', icon: <HeartIcon />, duration: Infinity });
    toast({ message: '찜 목록에서 뺐어요', action: { label: '되돌리기', onClick: () => {} }, duration: Infinity });
  },
};
