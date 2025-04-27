import clsx from 'clsx';
import { createSignal, For } from 'solid-js';
import {
  CHALLENGE_ACTIVE_BG_400_COLOR,
  CHALLENGE_BG_COLOR,
  CHALLENGE_COLOR,
} from '~/entities/main';
import { BluredPanel } from '~/features/main';
import { Plus, X } from '~/shared/ui';
import './new-challenge-button.css';

export const NewChallengeButton = () => {
  const [color, setColor] =
    createSignal<(typeof CHALLENGE_COLOR)[number]>('red');

  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(true);

  return (
    <>
      <div class='flex justify-center'>
        <button
          class='p-3 rounded-[35%] transition-all active:scale-90 wys-new-challenge-button'
          onClick={() => setIsBluredPanelShow(true)}
        >
          <Plus />
        </button>
      </div>
      {isBluredPanelShow() && (
        <BluredPanel
          close={() => setIsBluredPanelShow(false)}
          autoClose={false}
        >
          {(close) => (
            <div class='w-full h-full touch-none flex flex-col justify-between px-4 pb-4 pt-[152px]'>
              <button
                onClick={close}
                class='p-2 rounded-[35%] transition-all active:scale-90 bg-red-500 absolute right-6 top-6'
              >
                <X />
              </button>

              <div>
                <input
                  type='text'
                  class='text-slate-800 text-3xl h-10 font-semibold placeholder:text-gray-400 mb-10 text-center'
                  placeholder='Challenge Name'
                />

                <div class='flex flex-col gap-6'>
                  <div class='flex justify-evenly'>
                    <For each={CHALLENGE_COLOR.slice(0, 4)}>
                      {(color) => (
                        <button
                          onClick={() => setColor(color)}
                          class={clsx(
                            'w-10 h-10 rounded-[35%]',
                            CHALLENGE_BG_COLOR[color]
                          )}
                        ></button>
                      )}
                    </For>
                  </div>
                  <div class='flex justify-evenly'>
                    <For each={CHALLENGE_COLOR.slice(4)}>
                      {(color) => (
                        <button
                          onClick={() => setColor(color)}
                          class={clsx(
                            'w-10 h-10 rounded-[35%]',
                            CHALLENGE_BG_COLOR[color]
                          )}
                        ></button>
                      )}
                    </For>
                  </div>
                </div>
              </div>

              <button
                class={clsx(
                  'w-full h-[46px] transition-all active:scale-[0.98] rounded-xl text-white font-semibold text-lg',
                  CHALLENGE_BG_COLOR[color()],
                  CHALLENGE_ACTIVE_BG_400_COLOR[color()]
                )}
                onClick={close}
              >
                Create
              </button>
            </div>
          )}
        </BluredPanel>
      )}
    </>
  );
};
