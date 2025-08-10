import { userQueries } from '~/entities/user';
import { HelloUser, UserAvatar } from '~/features/user/ui';
import { createBoolean } from '~/shared/hook';
import { UserQuickMenuPanel } from './user-quick-menu-panel.ui';
import { UserSettingPanel } from './user-setting-panel.ui';

export const UserTop = () => {
  const [
    isUserQuickMenuPanel,
    openUserQuickMenuPanel,
    closeUserQuickMenuPanel,
  ] = createBoolean();

  const [isUserSettingPanel, openUserSettingPanel, closeUserSettingPanel] =
    createBoolean();

  const profile = userQueries.getUserProfileQuery();

  return (
    <div class='flex items-start justify-between mb-4'>
      <HelloUser userName={() => profile.data?.name} />
      <UserAvatar
        src={() => profile.data?.profileImage ?? undefined}
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
