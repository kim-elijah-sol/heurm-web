import clsx from 'clsx';
import { createLoginForm } from '~/features/login/hook';
import { Login } from '~/shared/ui';

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

  const inputBaseClassName =
    'font-semibold px-4 py-3 rounded-[12px] w-full transition-all bg-slate-100 focus:bg-slate-200';

  return (
    <form
      onSubmit={handleSubmit}
      class='px-4 flex flex-col gap-4 w-full items-center'
    >
      <input
        type='email'
        class={inputBaseClassName}
        placeholder='email'
        value={email()}
        onInput={handleInputEmail}
      />
      <input
        type='password'
        class={inputBaseClassName}
        placeholder='password'
        value={password()}
        onInput={handleInputPassword}
      />
      <button
        type='submit'
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
