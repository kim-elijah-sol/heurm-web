import { useLocation } from '@solidjs/router';
import { For, type Component } from 'solid-js';
import { LayoutConstant } from '~/entities/layout';
import { NavigationAnchor } from './navigation-anchor.ui';
import { NavigationCurrentIndicator } from './navigation-current-indicator.ui';
import './navigation.ui.css';

export const Navigation: Component<{}> = () => {
  const location = useLocation();

  const pathname = () => location.pathname;

  if (pathname() === '/login') return <></>;

  return (
    <nav class='heurm-navigation fixed bottom-4 left-1/2 -translate-x-1/2 p-1 bg-white z-30 rounded-[32px] flex justify-between w-max'>
      <For each={LayoutConstant.NAVIGATION_ANCHORS}>
        {(anchor) => <NavigationAnchor {...anchor} />}
      </For>

      <NavigationCurrentIndicator />
    </nav>
  );
};
