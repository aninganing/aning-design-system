import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
누르는 즉시 적용되는 켜기·끄기 설정. 마이페이지 알림 설정에 쓴다. 색상은 \`@aninganing/tokens\`의 \`switch.*\`
컴포넌트 토큰을 소비한다.

### Switch와 Checkbox
- **Switch** — 누르는 즉시 적용·저장되는 설정. \`onCheckedChange\`에서 바로 저장한다.
- **Checkbox** — 저장·제출 버튼을 눌러야 반영되는 폼. 스위치는 폼 제출 값으로 전송되지 않는다.

### 배치
설정 목록 패턴으로 라벨(과 설명)은 왼쪽, 스위치는 오른쪽 끝에 둔다. 컴포넌트가 부모 너비를 채우므로 목록의
너비를 부모에서 정한다.

### 접근성
- \`<button role="switch" aria-checked>\`라 스크린 리더가 "켬/끔" 스위치로 읽는다. Space·Enter로 토글된다.
- 라벨은 \`<label htmlFor>\`로 연결되어 이름이 되고, 라벨을 눌러도 토글된다. 설명은 \`aria-describedby\`로 연결되며
  이름에는 섞이지 않는다.
- 켜짐·꺼짐을 색으로만 구분하지 않도록 썸 위치가 함께 바뀐다. 트랙·썸은 두 테마 모두 조작 요소 대비 3:1 이상이다.
        `.trim(),
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: '왼쪽에 표시할 설정 이름. 스위치의 접근 가능한 이름이 된다.' },
    description: { control: 'text', description: '라벨 아래 보충 설명. `aria-describedby`로 연결된다.' },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: '트랙 높이 프리셋. `sm` 20px, `md` 26px.',
      table: { defaultValue: { summary: 'md' } },
    },
    defaultChecked: {
      control: 'boolean',
      description: '처음 켜짐 상태(uncontrolled).',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: { control: 'boolean', description: '바꿀 수 없는 설정.' },
  },
  args: {
    label: '예약 확정 알림',
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
type Story = StoryObj<typeof Switch>;

export const Off: Story = {
  parameters: {
    docs: { description: { story: '꺼진 상태. 트랙은 `color-border-control`(gray-500), 썸은 왼쪽.' } },
  },
};

export const On: Story = {
  args: { defaultChecked: true },
  parameters: {
    docs: { description: { story: '켜진 상태. 트랙은 accent, 썸은 오른쪽.' } },
  },
};

export const WithDescription: Story = {
  args: { description: '수업 하루 전에 알림을 받는다', defaultChecked: true },
  parameters: {
    docs: { description: { story: '설정이 무엇을 하는지 설명을 붙인다. 이름에는 섞이지 않는다.' } },
  },
};

export const Small: Story = {
  args: { size: 'sm', label: '작은 크기' },
  parameters: {
    docs: { description: { story: '좁은 목록이나 표 안에서 쓰는 작은 크기(트랙 높이 20px).' } },
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true, description: '관리자가 설정한 값이라 바꿀 수 없다' },
  parameters: {
    docs: { description: { story: '바꿀 수 없는 설정. 라벨·설명·스위치가 함께 흐려진다.' } },
  },
};

export const SettingsList: Story = {
  parameters: {
    docs: {
      description: { story: '마이페이지 알림 설정 예시. 각 줄이 부모 너비를 채워 스위치가 오른쪽 끝에 정렬된다.' },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
      <Switch label="예약 확정 알림" description="예약이 확정되면 알림을 받는다" defaultChecked />
      <Switch label="수업 전날 알림" description="수업 하루 전에 알림을 받는다" defaultChecked />
      <Switch label="마케팅 정보 수신" description="새 클래스와 할인 소식을 받는다" />
    </div>
  ),
};
