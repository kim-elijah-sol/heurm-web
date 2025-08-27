import { useNavigate } from '@solidjs/router';
import { userQueries } from '~/entities/user';
import { STORAGE_KEYS } from '~/shared/constant';
import { removeTokens } from '~/shared/fx';

export const createLogout = () => {
  const navigate = useNavigate();

  const logout = userQueries.logoutMutation(removeTokens, removeTokens);

  const handleLogout = () => {
    logout.mutate({
      refreshToken: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)!,
    });

    navigate('/login', { replace: true });
  };

  return handleLogout;
};
