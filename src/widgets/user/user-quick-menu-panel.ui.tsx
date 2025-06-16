import clsx from 'clsx';
import { type Component } from 'solid-js';
import { createLogout } from '~/features/user/hook';
import { Logout, Panel, ShieldCheck, UserRoundPen } from '~/shared/ui';

type Props = {
  close: () => void;
  onClickUserSetting: () => void;
};

export const UserQuickMenuPanel: Component<Props> = (props) => {
  const handleLogout = createLogout();

  const buttonBaseClassName =
    'p-6 rounded-[42%] transition-all active:scale-90';

  return (
    <Panel.Blured close={props.close}>
      {() => (
        <div class='w-full h-full flex flex-col items-center justify-center gap-6 touch-none'>
          <div class='flex gap-10'>
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
              onClick={props.onClickUserSetting}
            >
              <UserRoundPen />
            </button>
          </div>

          <button
            class={clsx(buttonBaseClassName, 'bg-rose-400 active:bg-rose-500')}
            onClick={handleLogout}
          >
            <Logout />
          </button>
        </div>
      )}
    </Panel.Blured>
  );
};
