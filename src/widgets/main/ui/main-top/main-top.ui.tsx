import { HelloUser, UserAvatar } from '~/features/main/ui';
import { createBoolean } from '~/shared/hook';
import { UserQuickMenuPanel, UserSettingPanel } from '~/widgets/user/ui';

export const MainTop = () => {
  const [
    isUserQuickMenuPanel,
    openUserQuickMenuPanel,
    closeUserQuickMenuPanel,
  ] = createBoolean();

  const [isUserSettingPanel, openUserSettingPanel, closeUserSettingPanel] =
    createBoolean();

  return (
    <div class='flex items-center justify-between mb-4'>
      <HelloUser userName={() => 'Sol'} />
      <UserAvatar
        src={() => 'https://avatars.githubusercontent.com/u/86874556?v=4'}
        onClick={openUserQuickMenuPanel}
      />
      {isUserQuickMenuPanel() && (
        <UserQuickMenuPanel
          close={closeUserQuickMenuPanel}
          onClickUserSetting={openUserSettingPanel}
        />
      )}
      {isUserSettingPanel() && (
        <UserSettingPanel close={closeUserSettingPanel} />
      )}
    </div>
  );
};
