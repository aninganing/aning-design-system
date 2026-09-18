import { forwardRef } from 'react';
import { IconBase, type IconProps } from './IconBase';

export const CheckIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path
      d="M13.5 4.5L6 12L2.5 8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
));
CheckIcon.displayName = 'CheckIcon';
