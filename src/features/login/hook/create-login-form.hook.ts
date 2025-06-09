import { useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { loginQueries, loginSchema } from '~/entities/login';
import { STORAGE_KEYS } from '~/shared/constant';
import { toast } from '~/shared/lib';

export const createLoginForm = () => {
  const [email, setEmail] = createSignal<string>('');

  const [password, setPassword] = createSignal<string>('');

  const navigate = useNavigate();

  const postLogin = loginQueries.postLoginMutation(
    async ({ accessToken, refreshToken, clientId }) => {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(STORAGE_KEYS.CLIENT_ID, clientId);

      navigate('/', { replace: true });
    }
  );

  const submitDisabled = () => {
    return email().length === 0 || password().length === 0;
  };

  const getPostLoginRequestErrorMessage = () => {
    const postLoginRequestParse = loginSchema.postLoginRequestSchema.safeParse({
      email: email(),
      password: password(),
    });

    if (postLoginRequestParse.success === false) {
      return postLoginRequestParse.error.errors[0].message;
    }

    return null;
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const postLoginRequestErrorMessage = getPostLoginRequestErrorMessage();

    if (postLoginRequestErrorMessage) {
      toast.open(postLoginRequestErrorMessage);

      return;
    }

    postLogin.mutate({
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
