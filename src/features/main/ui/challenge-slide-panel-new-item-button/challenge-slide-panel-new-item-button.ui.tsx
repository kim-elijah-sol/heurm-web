import clsx from 'clsx';
import { createSignal, For } from 'solid-js';
import { CHALLENGE_DAY } from '~/entities/main';
import {
  ArrowLeft,
  BluredPanel,
  Check,
  CheckCheck,
  ChevronsDown,
  ChevronsUp,
  Plus,
  X,
} from '~/shared/ui';
import { createChallengeItemDay } from '../../hook';
import './challenge-slide-panel-new-item-button.ui.css';

type Step = 'type' | 'name' | 'count' | 'day';

export const ChallengeSlidePanelNewItemButton = () => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  const [step, setStep] = createSignal<Step>('day');

  const [day, handleChangeDay] = createChallengeItemDay();

  const buttonBaseClassName =
    'p-6 rounded-[35%] transition-all active:scale-90';

  const handleClickType = () => {
    setStep('name');
  };

  const close = () => {
    setIsBluredPanelShow(true);
    setStep('type');
  };

  return (
    <>
      <button
        class='bg-slate-200 p-2 rounded-[35%] transition-all active:bg-slate-300 active:scale-90'
        onClick={close}
      >
        <Plus className='stroke-slate-800' />
      </button>

      {isBluredPanelShow() && (
        <BluredPanel
          close={() => setIsBluredPanelShow(false)}
          autoClose={false}
        >
          {(close) => (
            <div class='w-full h-full relative'>
              <button
                onClick={close}
                class='p-2 rounded-[35%] transition-all active:scale-90 bg-red-400 absolute right-6 top-6 active:bg-red-500'
              >
                <X />
              </button>

              {/**
               * Type Step
               */}
              <div
                class={clsx(
                  'wys-challenge-slide-panel-new-item-step flex flex-col items-center gap-8',
                  step() === 'type'
                    ? 'wys-challenge-slide-panel-new-item-step-current'
                    : 'wys-challenge-slide-panel-new-item-step-end'
                )}
              >
                <button
                  class={clsx(
                    buttonBaseClassName,
                    'bg-emerald-400 active:bg-emerald-500'
                  )}
                  onClick={() => handleClickType()}
                >
                  <CheckCheck />
                </button>
                <div class='flex gap-12'>
                  <button
                    class={clsx(
                      buttonBaseClassName,
                      'bg-blue-400 active:bg-blue-500'
                    )}
                    onClick={() => handleClickType()}
                  >
                    <ChevronsUp />
                  </button>
                  <button
                    class={clsx(
                      buttonBaseClassName,
                      'bg-rose-400 active:bg-rose-500'
                    )}
                    onClick={() => handleClickType()}
                  >
                    <ChevronsDown />
                  </button>
                </div>
              </div>

              {/**
               * Name Step
               */}
              <div
                class={clsx(
                  'wys-challenge-slide-panel-new-item-step flex flex-col items-center gap-8',
                  step() === 'name'
                    ? 'wys-challenge-slide-panel-new-item-step-current'
                    : step() === 'type'
                    ? 'wys-challenge-slide-panel-new-item-step-ready'
                    : 'wys-challenge-slide-panel-new-item-step-end'
                )}
              >
                <input
                  type='text'
                  class='text-slate-800 text-3xl h-10 font-semibold placeholder:text-gray-400 text-center'
                  placeholder='Challenge Item Name'
                />

                <div class='flex gap-12'>
                  <button
                    class={clsx(
                      buttonBaseClassName,
                      'bg-gray-400 active:bg-gray-500'
                    )}
                    onClick={() => setStep('type')}
                  >
                    <ArrowLeft />
                  </button>

                  <button
                    class={clsx(
                      buttonBaseClassName,
                      'bg-green-400 active:bg-green-500'
                    )}
                    onClick={() => setStep('count')}
                  >
                    <Check />
                  </button>
                </div>
              </div>

              {/**
               * Count Step
               */}
              <div
                class={clsx(
                  'wys-challenge-slide-panel-new-item-step flex flex-col items-center gap-8',
                  step() === 'count'
                    ? 'wys-challenge-slide-panel-new-item-step-current'
                    : step() === 'day'
                    ? 'wys-challenge-slide-panel-new-item-step-end'
                    : 'wys-challenge-slide-panel-new-item-step-ready'
                )}
              >
                <input
                  type='number'
                  pattern='[0-9]*'
                  inputMode='numeric'
                  class='text-slate-800 text-3xl h-10 font-semibold placeholder:text-gray-400 text-center'
                  placeholder='Target'
                />

                <div class='flex gap-12'>
                  <button
                    class={clsx(
                      buttonBaseClassName,
                      'bg-gray-400 active:bg-gray-500'
                    )}
                    onClick={() => setStep('name')}
                  >
                    <ArrowLeft />
                  </button>

                  <button
                    class={clsx(
                      buttonBaseClassName,
                      'bg-green-400 active:bg-green-500'
                    )}
                    onClick={() => setStep('day')}
                  >
                    <Check />
                  </button>
                </div>
              </div>

              {/**
               * Day Step
               */}
              <div
                class={clsx(
                  'wys-challenge-slide-panel-new-item-step flex flex-col items-center gap-8',
                  step() === 'day'
                    ? 'wys-challenge-slide-panel-new-item-step-current'
                    : 'wys-challenge-slide-panel-new-item-step-ready'
                )}
              >
                <div class='flex flex-col gap-4 w-full items-center'>
                  <div class='flex gap-4'>
                    <For each={CHALLENGE_DAY.slice(0, 4)}>
                      {(it) => (
                        <button
                          onClick={() => handleChangeDay(it)}
                          class={clsx(
                            'w-12 h-12 text-2xl bg-slate-50 transition-all active:scale-90 rounded-[35%] shadow-sm active:shadow-md',
                            day().includes(it)
                              ? clsx(
                                  'font-black bg-slate-100',
                                  it === 'SUN'
                                    ? 'text-red-500'
                                    : 'text-gray-700'
                                )
                              : clsx(
                                  'font-semibold',
                                  it === 'SUN'
                                    ? 'text-red-300'
                                    : 'text-gray-400'
                                )
                          )}
                        >
                          {it[0]}
                        </button>
                      )}
                    </For>
                  </div>

                  <div class='flex gap-4'>
                    <For each={CHALLENGE_DAY.slice(4)}>
                      {(it) => (
                        <button
                          onClick={() => handleChangeDay(it)}
                          class={clsx(
                            'w-12 h-12 text-2xl bg-slate-50 transition-all active:scale-90 rounded-[35%] shadow-sm active:shadow-md',
                            day().includes(it)
                              ? clsx(
                                  'font-black bg-slate-100',
                                  it === 'SAT'
                                    ? 'text-blue-500'
                                    : 'text-gray-700'
                                )
                              : clsx(
                                  'font-semibold',
                                  it === 'SAT'
                                    ? 'text-blue-300'
                                    : 'text-gray-400'
                                )
                          )}
                        >
                          {it[0]}
                        </button>
                      )}
                    </For>
                  </div>
                </div>

                <div class='flex gap-12'>
                  <button
                    class={clsx(
                      buttonBaseClassName,
                      'bg-gray-400 active:bg-gray-500'
                    )}
                    onClick={() => setStep('count')}
                  >
                    <ArrowLeft />
                  </button>

                  <button
                    class={clsx(
                      buttonBaseClassName,
                      'bg-green-400 active:bg-green-500'
                    )}
                    onClick={close}
                  >
                    <Check />
                  </button>
                </div>
              </div>
            </div>
          )}
        </BluredPanel>
      )}
    </>
  );
};
