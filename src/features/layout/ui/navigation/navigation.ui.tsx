import { For, type Component } from 'solid-js';
import { LayoutConstant } from '~/entities/layout';
import { NavigationAnchor } from './navigation-anchor.ui';
import './navigation.ui.css';

export const Navigation: Component<{}> = () => {
  return (
    <nav class='heurm-navigation fixed bottom-4 left-1/2 -translate-x-1/2 px-1 py-1 bg-white z-30 rounded-[32px] flex justify-between w-max'>
      <For each={LayoutConstant.NAVIGATION_ANCHORS}>
        {(anchor) => <NavigationAnchor {...anchor} />}
      </For>
    </nav>
  );
};
