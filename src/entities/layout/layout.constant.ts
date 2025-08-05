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
