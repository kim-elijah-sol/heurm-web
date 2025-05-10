import clsx from 'clsx';
import { Accessor } from 'solid-js';
import { Plus } from '~/shared/ui';
import './challenge-edit-new-item-button.ui.css';

type Props = {
  pulse: Accessor<boolean>;
  onClick: () => void;
};

export const ChallengeEditNewItemButton = (props: Props) => {
  return (
    <button
      class={clsx(
        'bg-slate-200 p-3 rounded-[35%] transition-all active:bg-slate-300 active:scale-90',
        props.pulse() ? 'wys-challenge-edit-new-item-button-pulse' : ''
      )}
      onClick={props.onClick}
    >
      <Plus size={28} className='stroke-slate-800' />
    </button>
  );
};
