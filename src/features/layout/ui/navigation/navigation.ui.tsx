import { type Component } from 'solid-js';
import { NavigationItem } from './navigation-item.ui';
import './navigation.ui.css';

export const Navigation: Component<{}> = () => {
  return (
    <nav class='heurm-navigation fixed bottom-4 left-4 px-4 py-3 gap-4 bg-white z-30 rounded-[20px] flex justify-between w-max'>
      <NavigationItem href='/' name='Home' />
      <NavigationItem href='/analytics' name='Analytics' />
      <NavigationItem href='/setting' name='Setting' />
    </nav>
  );
};
