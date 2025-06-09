import { userQueries } from '~/entities/user';
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

  const profile = userQueries.getUserProfileQuery();

  return (
    <div class='flex items-center justify-between mb-4'>
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
