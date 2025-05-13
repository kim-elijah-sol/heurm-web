import { useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';
import {
  loginFormValidator,
  unsafeLoginFormValidator,
} from '~/shared/validator';

export const createLoginForm = () => {
  const [email, setEmail] = createSignal<string>('');

  const [password, setPassword] = createSignal<string>('');

  const navigate = useNavigate();

  const submitErrorMessage = () => {
    const loginFormValid = loginFormValidator.safeParse({
      email: email(),
      password: password(),
    });

    if (loginFormValid.success === false) {
      return loginFormValid.error.errors[0].message;
    }

    return null;
  };

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

    if (submitErrorMessage()) {
      alert(submitErrorMessage());
      return;
    }

    navigate('/');
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
