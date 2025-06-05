import { useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { useLoginMutation } from '~/entities/login/mutation';
import { STORAGE_KEYS } from '~/shared/constant';
import { unsafeLoginFormValidator } from '~/shared/validator';

export const createLoginForm = () => {
  const [email, setEmail] = createSignal<string>('');

  const [password, setPassword] = createSignal<string>('');

  const navigate = useNavigate();

  const { mutate } = useLoginMutation(async (response) => {
    const { accessToken, refreshToken, clientId } = response.data;

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEYS.CLIENT_ID, clientId);

    navigate('/', { replace: true });
  });

  const submitDisabled = () => {
    return (
      unsafeLoginFormValidator.safeParse({
        email: email(),
        password: password(),
      }).success === false
    );
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    mutate({
      email: email(),
      password: password(),
    });
  };

  const handleInputEmail = (e: InputEvent & { target: HTMLInputElement }) => {
    setEmail(e.target.value);
  };

  const handleInputPassword = (
    e: InputEvent & { target: HTMLInputElement }
  ) => {
    setPassword(e.target.value);
  };

  return {
    handleSubmit,
    email,
    handleInputEmail,
    password,
    handleInputPassword,
    submitDisabled,
  };
};
