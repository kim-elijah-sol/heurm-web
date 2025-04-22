import { createSignal } from 'solid-js';
import { HelloUser, UserAvatar } from '~/features/main';
import { BluredPanel } from '../blured-panel';

export const MainTop = () => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  return (
    <div class='flex items-center justify-between'>
      <HelloUser userName='Sol' />
      <UserAvatar
        onClick={() => setIsBluredPanelShow(true)}
        src='https://avatars.githubusercontent.com/u/86874556?v=4'
      />
      {isBluredPanelShow() && (
        <BluredPanel close={() => setIsBluredPanelShow(false)} />
      )}
    </div>
  );
};
