import { type Component } from 'solid-js';
import { ChartLine, Fan, Settings } from '~/shared/ui';
import { NavigationItem } from './navigation-item.ui';
import './navigation.ui.css';

export const Navigation: Component<{}> = () => {
  return (
    <nav class='heurm-navigation fixed bottom-4 left-1/2 -translate-x-1/2 px-1 py-1 bg-white z-30 rounded-[32px] flex justify-between w-max'>
      <NavigationItem href='/' name='Home' icon={Fan} />
      <NavigationItem href='/analytics' name='Analytics' icon={ChartLine} />
      <NavigationItem href='/setting' name='Setting' icon={Settings} />
    </nav>
  );
};
