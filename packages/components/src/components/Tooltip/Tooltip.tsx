import * as RadixTooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { tooltip } from './Tooltip.variants';
import styles from './Tooltip.module.css';
import type { TooltipProps } from './Tooltip.types';

export const Tooltip = ({
  className,
  content,
  children,
  side = 'top',
  align = 'center',
  delay = 300,
  open,
  defaultOpen,
  onOpenChange,
  sideOffset = 6,
  ...props
}: TooltipProps) => (
  // Radix Tooltip은 Provider 안에서만 동작한다. 사용하는 쪽이 따로 감싸지 않아도 되게 툴팁마다 둔다.
  <RadixTooltip.Provider delayDuration={delay}>
    <RadixTooltip.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          className={clsx(tooltip(), className)}
          side={side}
          align={align}
          sideOffset={sideOffset}
          collisionPadding={8}
          {...props}
        >
          {content}
          <RadixTooltip.Arrow className={styles.arrow} width={10} height={5} />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
);
