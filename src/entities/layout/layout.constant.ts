import { ChartLine, Fan, Settings } from '~/shared/ui';
import { LayoutType } from '.';

export const NAVIGATION_ANCHORS: LayoutType.NavigationAnchor[] = [
  {
    href: '/',
    name: 'Home',
    icon: Fan,
  },
  {
    href: '/analytics',
    name: 'Analytics',
    icon: ChartLine,
  },
  {
    href: '/setting',
    name: 'Setting',
    icon: Settings,
  },
];

export const NAVIGATION_ANCHOR_WIDTH = 80 as const;

export const NAVIGATION_ANCHOR_WIDTH_PX =
  `w-[${NAVIGATION_ANCHOR_WIDTH}px]` as const;
