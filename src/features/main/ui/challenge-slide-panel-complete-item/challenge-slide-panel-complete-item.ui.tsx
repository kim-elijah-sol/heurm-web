import clsx from 'clsx';
import { For } from 'solid-js';
import { X } from '~/shared/ui';

export const ChallengeSlidePanelCompleteItem = () => {
  return (
    <div class='flex flex-col bg-red-100 rounded-[12px] p-3'>
      <div class='flex items-start justify-between mb-6'>
        <div class='flex flex-col gap-1 pl-1'>
          <input type='text' class='font-semibold' value='3km running' />

          <span class='font-semibold text-[12px] text-gray-400'>
            Complete Type
          </span>
        </div>
        <button class='p-1 rounded-[35%] bg-red-400 transition-all active:bg-red-500 active:scale-90'>
          <X size={22} />
        </button>
      </div>

      <div class='flex justify-between'>
        <For each={['S', 'M', 'T', 'W', 'T', 'F', 'S']}>
          {(it) => (
            <button
              class={clsx(
                'w-8 h-8 transition-all active:bg-red-200 active:scale-90 rounded-[35%]',
                it === 'W' || it === 'M' || it === 'F'
                  ? 'text-gray-700 font-black bg-red-300'
                  : 'text-gray-400 font-semibold'
              )}
            >
              {it}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};
