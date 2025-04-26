import { HelloUser, UserAvatar } from '~/features/main';

export const MainTop = () => {
  return (
    <div class='flex items-center justify-between mb-4'>
      <HelloUser userName='Sol' />
      <UserAvatar src='https://avatars.githubusercontent.com/u/86874556?v=4' />
    </div>
  );
};
