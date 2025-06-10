import { type Accessor, type Component } from 'solid-js';
import { X } from '~/shared/ui';

type Props = {
  close: () => void;
  title: Accessor<string>;
};

export const AnalyticsPanelTop: Component<Props> = (props) => {
  return (
    <div class='absolute flex items-center justify-between gap-4 left-0 right-0 top-0 p-4 pb-2 bg-white/75 backdrop-blur-sm z-1'>
      <p class='font-semibold text-2xl'>{props.title()}</p>
      <button
        onClick={props.close}
        class='p-[10px] rounded-[35%] transition-all active:scale-95 bg-red-400 active:bg-red-500'
      >
        <X size={24} />
      </button>
    </div>
  );
};
