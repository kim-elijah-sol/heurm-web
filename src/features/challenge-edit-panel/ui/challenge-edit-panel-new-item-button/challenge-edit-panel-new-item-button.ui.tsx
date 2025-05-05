import { Plus } from '~/shared/ui';

type Props = {
  onClick: () => void;
};

export const ChallengeEditPanelNewItemButton = (props: Props) => {
  return (
    <button
      class='bg-slate-200 p-3 rounded-[35%] transition-all active:bg-slate-300 active:scale-90'
      onClick={props.onClick}
    >
      <Plus size={28} className='stroke-slate-800' />
    </button>
  );
};
