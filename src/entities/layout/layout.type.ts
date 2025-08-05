import { type Component } from 'solid-js';

export type NavigationAnchor = {
  href: string;
  name: string;
  icon: Component<{ stroke: string }>;
};
