import clsx from 'clsx';
import { type Accessor, type Component, type JSX } from 'solid-js';
import { FLOW_TEXT_500 } from '~/shared/constant';
import type { FlowColor } from '~/shared/types';

type Props = {
  children: JSX.Element;
  onClick: () => void;
  selected: Accessor<boolean>;
  color: Accessor<FlowColor>;
};

export const WaveItem: Component<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      class={clsx(
        'font-semibold px-3 py-1.5 rounded-[16px] transition-all active:scale-95',
        /** BACKGROUND */ props.selected() ? 'bg-slate-200' : 'bg-slate-100',
        /** TEXT COLOR */ props.selected()
          ? FLOW_TEXT_500[props.color()]
          : 'text-gray-600',
        /** ACTIVE BACKGROUND */ props.selected()
          ? 'active:bg-slate-400/70'
          : 'active:bg-slate-200/70'
      )}
    >
      {props.children}
    </button>
  );
};
