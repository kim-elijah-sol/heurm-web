import clsx from 'clsx';
import { For } from 'solid-js';
import { X } from '~/shared/ui';
import { capitalize } from '../../fx';

type Props = {
  type: 'over' | 'under';
  value: string;
};

export const ChallengeSlidePanelCountableItem = (props: Props) => {
  return (
    <div class='flex flex-col bg-red-100 rounded-[12px] p-3'>
      <div class='flex items-start justify-between mb-4'>
        <div class='flex flex-col gap-1 pl-1'>
          <input type='text' class='font-semibold' value={props.value} />

          <span class='font-semibold text-[12px] text-gray-400'>
            {capitalize(props.type)} Type
          </span>
        </div>
        <button class='p-1 rounded-[35%] bg-red-400 transition-all active:bg-red-500 active:scale-90'>
          <X size={22} />
        </button>
      </div>

      <div class='mb-6'>
        <input
          type='number'
          pattern='[0-9]*'
          inputMode='numeric'
          value='82'
          class='font-semibold px-3 py-2 rounded-[12px] bg-red-200 w-full transition-all focus:bg-red-300'
          placeholder='Target'
        />
      </div>

      <div class='flex justify-between'>
        <For each={['S', 'M', 'T', 'W', 'T', 'F', 'S']}>
          {(it) => (
            <button
              class={clsx(
                'w-8 h-8 transition-all active:bg-red-200 active:scale-90 rounded-[35%]',
                it === 'S' || it === 'T'
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
