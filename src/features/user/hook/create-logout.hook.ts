import { useNavigate } from '@solidjs/router';
import { userQueries } from '~/entities/user';
import { STORAGE_KEYS } from '~/shared/constant';

export const createLogout = () => {
  const navigate = useNavigate();

  const logout = userQueries.logoutMutation(() => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CLIENT_ID);
  });

  const handleLogout = () => {
    logout.mutate({
      refreshToken: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)!,
    });

    navigate('/login', { replace: true });
  };

  return handleLogout;
};
