import clsx from 'clsx';
import { createSignal } from 'solid-js';
import { BluredPanel, Logout, ShieldCheck, UserRoundPen } from '~/shared/ui';

type Props = {
  src: string;
};

export const UserAvatar = (props: Props) => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  const src = () => props.src;

  const buttonBaseClassName =
    'p-6 rounded-[35%] transition-all active:scale-90';

  return (
    <>
      <div
        on:click={() => setIsBluredPanelShow(true)}
        class='w-12 h-12 rounded-full overflow-hidden border border-gray-300'
      >
        <img src={src()} alt='' class='w-full h-full' />
      </div>

      {isBluredPanelShow() && (
        <BluredPanel close={() => setIsBluredPanelShow(false)}>
          {() => (
            <div class='w-full h-full flex flex-col items-center justify-center gap-8 touch-none'>
              <div class='flex gap-12'>
                <button
                  class={clsx(
                    buttonBaseClassName,
                    'bg-emerald-400 active:bg-emerald-500'
                  )}
                >
                  <ShieldCheck />
                </button>
                <button
                  class={clsx(
                    buttonBaseClassName,
                    'bg-blue-400 active:bg-blue-500'
                  )}
                >
                  <UserRoundPen />
                </button>
              </div>

              <button
                class={clsx(
                  buttonBaseClassName,
                  'bg-rose-400 active:bg-rose-500'
                )}
              >
                <Logout />
              </button>
            </div>
          )}
        </BluredPanel>
      )}
    </>
  );
};
