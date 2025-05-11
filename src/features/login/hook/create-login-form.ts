import { createSignal } from 'solid-js';

export const createLoginForm = () => {
  const [email, setEmail] = createSignal<string>('');

  const [password, setPassword] = createSignal<string>('');

  const submitErrorMessage = () => {
    if (email().length === 0) {
      return 'please enter the email';
    }

    if (password().length === 0) {
      return 'please enter the password';
    }

    return null;
  };

  const submitDisabled = () => {
    return submitErrorMessage() !== null;
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (submitErrorMessage()) {
      alert(submitErrorMessage());
      return;
    }

    console.log('login');
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
