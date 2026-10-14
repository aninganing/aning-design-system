import * as RadixTabs from '@radix-ui/react-tabs';
import clsx from 'clsx';
import { tabs } from './Tabs.variants';
import styles from './Tabs.module.css';
import type { TabsListProps, TabsPanelProps, TabsProps, TabsTabProps } from './Tabs.types';

const TabsRoot = ({ className, variant, activation = 'automatic', ...props }: TabsProps) => (
  <RadixTabs.Root
    className={clsx(tabs({ variant }), className)}
    activationMode={activation}
    {...props}
  />
);

const TabsList = ({ className, ...props }: TabsListProps) => (
  <RadixTabs.List className={clsx(styles.list, className)} {...props} />
);

const TabsTab = ({ className, count, children, ...props }: TabsTabProps) => (
  <RadixTabs.Trigger className={clsx(styles.tab, className)} {...props}>
    {children}
    {count != null && <span className={styles.count}>{count.toLocaleString('ko-KR')}</span>}
  </RadixTabs.Trigger>
);

const TabsPanel = ({ className, ...props }: TabsPanelProps) => (
  <RadixTabs.Content className={clsx(styles.panel, className)} {...props} />
);

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
});
