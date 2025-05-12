import clsx from 'clsx';
import { createBoolean } from '~/shared/hook';
import { KeyRound, UserPlus } from '~/shared/ui';
import { JoinPanel } from '~/widgets/join/ui';

export const LoginHelper = () => {
  const [isJoinPanel, openJoinPanel, closeJoinPanel] = createBoolean();

  const buttonBaseClassName =
    'p-4 rounded-[35%] transition-all active:scale-95';

  return (
    <div class='w-full flex justify-center gap-6'>
      <button
        class={clsx(buttonBaseClassName, 'bg-rose-400 active:bg-rose-500')}
      >
        <KeyRound />
      </button>
      <button
        class={clsx(buttonBaseClassName, 'bg-blue-400 active:bg-blue-500')}
        onClick={openJoinPanel}
      >
        <UserPlus />
      </button>

      {isJoinPanel() && <JoinPanel close={closeJoinPanel} />}
    </div>
  );
};
