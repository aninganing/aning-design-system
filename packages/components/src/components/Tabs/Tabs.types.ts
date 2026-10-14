import type { ComponentProps } from 'react';
import type * as RadixTabs from '@radix-ui/react-tabs';
import type { VariantProps } from 'class-variance-authority';
import type { tabs } from './Tabs.variants';

export interface TabsProps extends Omit<ComponentProps<typeof RadixTabs.Root>, 'activationMode'> {
  /**
   * 탭 모양.
   * - `line`: 상세 페이지의 소개·커리큘럼·후기처럼 **콘텐츠 섹션**을 바꿀 때. 선택 탭 아래 밑줄.
   * - `pill`: 정렬·보기 방식처럼 **같은 콘텐츠의 보기**를 바꾸는 세그먼트. 트랙 안에서 선택 항목만 떠오른다.
   * @default 'line'
   */
  variant?: VariantProps<typeof tabs>['variant'];
  /**
   * 방향키로 탭을 옮길 때 바로 선택할지.
   * - `automatic`: 포커스가 옮겨가면 바로 그 탭이 선택된다. 패널이 가벼울 때.
   * - `manual`: 방향키로는 포커스만 옮기고 Enter·Space로 선택한다. 패널을 그리는 데 요청·연산이 필요할 때.
   * @default 'automatic'
   */
  activation?: 'automatic' | 'manual';
}

export type TabsListProps = ComponentProps<typeof RadixTabs.List>;

export interface TabsTabProps extends ComponentProps<typeof RadixTabs.Trigger> {
  /**
   * 라벨 뒤에 붙일 개수. 예: 후기 128. 숫자 폭이 같은 글꼴(tabular-nums)로 그린다.
   */
  count?: number;
}

export type TabsPanelProps = ComponentProps<typeof RadixTabs.Content>;
