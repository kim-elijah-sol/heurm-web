import { Plus } from '~/shared/ui';

export const ChallengeSlidePanelNewItemButton = () => {
  return (
    <button class='bg-slate-200 p-2 rounded-[35%] transition-all active:bg-slate-300 active:scale-90'>
      <Plus className='stroke-slate-800' />
    </button>
  );
};
