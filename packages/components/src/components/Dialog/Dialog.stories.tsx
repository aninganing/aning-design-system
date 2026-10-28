import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Checkbox, CheckboxGroup } from '../Checkbox';
import { Dialog } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  subcomponents: { 'Dialog.Footer': Dialog.Footer },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
화면 위에 떠서 다른 조작을 막는 창. 가운데 뜨는 \`center\`는 확인·경고에, 아래에서 올라오는 \`sheet\`는 모바일 필터와 선택 목록에 쓴다.
Radix Dialog 위에 \`@aninganing/tokens\`의 \`dialog.*\` 컴포넌트 토큰으로 모양만 입혔다.

### 구성
- **\`Dialog\`** — \`trigger\`(여는 버튼) 또는 \`open\`/\`onOpenChange\`, \`title\`, \`description\`, \`variant\`, \`dismissible\`, \`initialFocus\`. children이 본문이다.
- **\`Dialog.Footer\`** — 버튼 영역. 본문 스크롤 밖 아래에 고정된다. \`center\`는 오른쪽 정렬, \`sheet\`는 버튼이 너비를 나눠 채운다(\`layout\`으로 바꿀 수 있음).

### 사용 기준
- 확인 창의 버튼은 [보조 → 주] 순서로 둔다(오른쪽이 주 버튼). 되돌릴 수 없는 작업은 주 버튼에 \`variant="danger"\`.
- 반드시 버튼으로 골라야 하는 확인 창은 \`dismissible={false}\` — Esc·바깥 클릭·닫기(X)가 모두 빠진다.
- 창 안에서 또 창을 열지 않는다. 짧은 결과 알림은 Toast(추후)를 쓴다.

### 접근성
- \`role="dialog"\` + \`aria-modal="true"\`, 이름은 \`title\`(\`aria-labelledby\`), 설명은 \`description\`(\`aria-describedby\`)이다.
- 열리면 포커스가 **제목**으로 간다(첫 버튼이 아님) — 스크린 리더가 제목부터 읽고, Enter 실수로 확인되지 않는다. 입력이 주 목적이면
  \`initialFocus\`로 그 입력에 준다.
- Tab은 창 안에서만 돌고, 바깥은 스크린 리더에서 숨겨지며 페이지 스크롤이 잠긴다. 닫히면 포커스가 연 버튼으로 돌아간다.
- \`sheet\`의 손잡이는 장식이다. 드래그로 닫히지 않으며 닫기 버튼이 항상 있다.
        `.trim(),
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: '창 제목. 창의 접근 가능한 이름이 된다.' },
    description: { control: 'text', description: '제목 아래 설명. `aria-describedby`로 연결된다.' },
    variant: {
      control: 'select',
      options: ['center', 'sheet'],
      description: '`center` 가운데 창 · `sheet` 아래에서 올라오는 시트.',
      table: { defaultValue: { summary: 'center' } },
    },
    dismissible: {
      control: 'boolean',
      description: 'Esc·바깥 클릭·닫기(X)로 닫을 수 있는지.',
      table: { defaultValue: { summary: 'true' } },
    },
    open: { control: false, description: '열림 여부(controlled).' },
    defaultOpen: { control: false, description: '처음 열림 여부(uncontrolled).' },
    onOpenChange: { description: '열리거나 닫힐 때 새 상태로 호출된다.' },
    trigger: { control: false, description: '누르면 창을 여는 버튼. 닫히면 포커스가 여기로 돌아온다.' },
    initialFocus: { control: false, description: '열릴 때 포커스를 줄 요소의 ref. 기본은 제목.' },
    closeLabel: { control: 'text', description: '닫기(X) 버튼 이름.', table: { defaultValue: { summary: '닫기' } } },
  },
  args: {
    title: '예약을 취소할까요?',
    description: '취소하면 좌석이 다른 분께 넘어가요. 결제 금액은 3일 안에 환불돼요.',
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const confirmFooter = (
  <Dialog.Footer>
    <Button variant="secondary">돌아가기</Button>
    <Button variant="danger">예약 취소</Button>
  </Dialog.Footer>
);

export const Confirm: Story = {
  parameters: {
    docs: { description: { story: '되돌릴 수 없는 작업 확인. 버튼을 누르면 열린다.' } },
  },
  render: (args) => (
    <Dialog {...args} trigger={<Button variant="secondary">예약 취소</Button>}>
      {confirmFooter}
    </Dialog>
  ),
};

export const NotDismissible: Story = {
  args: {
    dismissible: false,
    title: '결제를 진행할까요?',
    description: '결제가 시작되면 이 화면을 벗어날 수 없어요.',
  },
  parameters: {
    docs: {
      description: { story: '반드시 버튼으로 골라야 하는 창. Esc·바깥 클릭이 막히고 닫기(X) 버튼이 없다.' },
    },
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <Dialog {...args} open={open} onOpenChange={setOpen} trigger={<Button>결제하기</Button>}>
        <Dialog.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            돌아가기
          </Button>
          <Button onClick={() => setOpen(false)}>결제</Button>
        </Dialog.Footer>
      </Dialog>
    );
  },
};

const regions = ['성수', '합정', '연남', '망원', '을지로', '한남', '서촌', '익선', '문래', '판교'];

export const Sheet: Story = {
  args: { variant: 'sheet', title: '필터', description: '지역은 여러 곳을 고를 수 있어요.' },
  parameters: {
    docs: {
      description: {
        story: '모바일 필터. 아래에서 올라오고, 목록이 길면 본문만 스크롤되며 버튼은 아래에 고정된다. 버튼은 너비를 나눠 채운다.',
      },
    },
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <Dialog {...args} open={open} onOpenChange={setOpen} trigger={<Button variant="secondary">지역 필터</Button>}>
        <CheckboxGroup legend="지역">
          {regions.map((region) => (
            <Checkbox key={region} value={region} label={region} />
          ))}
        </CheckboxGroup>
        <Dialog.Footer>
          <Button variant="secondary">초기화</Button>
          <Button onClick={() => setOpen(false)}>적용</Button>
        </Dialog.Footer>
      </Dialog>
    );
  },
};

export const WithoutDescription: Story = {
  args: { description: undefined, title: '공유하기' },
  parameters: {
    docs: { description: { story: '설명 없이 제목과 본문만. `aria-describedby`가 걸리지 않는다.' } },
  },
  render: (args) => (
    <Dialog {...args} trigger={<Button variant="secondary">공유</Button>}>
      <p style={{ margin: 0 }}>링크를 복사해 친구에게 보내 보세요.</p>
    </Dialog>
  ),
};

// 열린 창은 페이지 스크롤과 바깥 조작을 잠그므로(Radix modal 동작) Docs 페이지에서 빼고 단독 스토리로만 둔다.
export const ConfirmOpen: Story = {
  tags: ['!autodocs'],
  parameters: {
    docs: { description: { story: '열린 모양을 고정해서 보여준다. 실제로는 `defaultOpen`을 쓰지 않는다.' } },
  },
  render: (args) => (
    <Dialog {...args} defaultOpen>
      {confirmFooter}
    </Dialog>
  ),
};

export const SheetOpen: Story = {
  tags: ['!autodocs'],
  args: { variant: 'sheet', title: '필터', description: '지역은 여러 곳을 고를 수 있어요.' },
  parameters: {
    docs: { description: { story: '시트가 열린 모양을 고정해서 보여준다.' } },
  },
  render: (args) => (
    <Dialog {...args} defaultOpen>
      <CheckboxGroup legend="지역">
        {regions.map((region) => (
          <Checkbox key={region} value={region} label={region} />
        ))}
      </CheckboxGroup>
      <Dialog.Footer>
        <Button variant="secondary">초기화</Button>
        <Button>적용</Button>
      </Dialog.Footer>
    </Dialog>
  ),
};
