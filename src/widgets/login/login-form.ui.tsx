import clsx from 'clsx';
import { createLoginForm } from '~/features/login/hook';
import { Input, Login } from '~/shared/ui';

export const LoginForm = () => {
  const {
    handleSubmit,
    email,
    handleInputEmail,
    password,
    handleInputPassword,
    submitDisabled,
  } = createLoginForm();

  const buttonBaseClassName = 'p-5 rounded-[42%] transition-all';

  return (
    <form
      onSubmit={handleSubmit}
      class='px-4 flex flex-col gap-4 w-full items-center'
    >
      <Input
        type='email'
        placeholder='email'
        value={email()}
        onInput={handleInputEmail}
      />
      <Input
        type='password'
        placeholder='password'
        value={password()}
        onInput={handleInputPassword}
      />
      <button
        type='submit'
        disabled={submitDisabled()}
        class={clsx(
          buttonBaseClassName,
          submitDisabled()
            ? 'bg-gray-300'
            : 'bg-green-400 active:bg-green-500 active:scale-90'
        )}
      >
        <Login />
      </button>
    </form>
  );
};
