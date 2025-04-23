import { createSignal } from 'solid-js';
import { BluredPanel, HelloUser, UserAvatar } from '~/features/main';

export const MainTop = () => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  return (
    <div class='flex items-center justify-between mb-4'>
      <HelloUser userName='Sol' />
      <UserAvatar
        onClick={() => setIsBluredPanelShow(true)}
        src='https://avatars.githubusercontent.com/u/86874556?v=4'
      />
      {isBluredPanelShow() && (
        <BluredPanel close={() => setIsBluredPanelShow(false)}>
          <></>
        </BluredPanel>
      )}
    </div>
  );
};
