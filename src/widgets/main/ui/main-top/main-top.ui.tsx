import { HelloUser, UserAvatar } from '~/features/main';
import { createBoolean } from '~/shared/hook';
import { UserPanel } from '~/widgets/user-panel/ui';

export const MainTop = () => {
  const [isUserPanel, open, close] = createBoolean();

  return (
    <div class='flex items-center justify-between mb-4'>
      <HelloUser userName='Sol' />
      <UserAvatar
        src='https://avatars.githubusercontent.com/u/86874556?v=4'
        onClick={open}
      />
      {isUserPanel() && <UserPanel close={close} />}
    </div>
  );
};
