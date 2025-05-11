import { A } from '@solidjs/router';
import clsx from 'clsx';
import { KeyRound, UserPlus } from '~/shared/ui';

export const LoginHelper = () => {
  const buttonBaseClassName =
    'p-4 rounded-[35%] transition-all active:scale-95';

  return (
    <div class='w-full flex justify-center gap-6'>
      <A
        href='/join'
        class={clsx(buttonBaseClassName, 'bg-rose-400 active:bg-rose-500')}
      >
        <KeyRound />
      </A>
      <A
        href='/reset-password'
        class={clsx(buttonBaseClassName, 'bg-blue-400 active:bg-blue-500')}
      >
        <UserPlus />
      </A>
    </div>
  );
};
