import { HelloUser, UserAvatar } from '~/features/main/ui';
import { createBoolean } from '~/shared/hook';
import { UserQuickMenuPanel } from '~/widgets/user-quick-menu/ui';

export const MainTop = () => {
  const [isUserQuickMenuPanel, open, close] = createBoolean();

  return (
    <div class='flex items-center justify-between mb-4'>
      <HelloUser userName={() => 'Sol'} />
      <UserAvatar
        src={() => 'https://avatars.githubusercontent.com/u/86874556?v=4'}
        onClick={open}
      />
      {isUserQuickMenuPanel() && <UserQuickMenuPanel close={close} />}
    </div>
  );
};
